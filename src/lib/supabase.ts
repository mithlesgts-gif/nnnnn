import { createClient } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID || 'dbhtxsucjsftgapafgdc';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_2Hpa1GeJ24RqZBqiDJvr2g_KL2RgtBP';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface AppointmentBooking {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  company?: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  timezone: string;
  notes?: string;
  status?: string;
  created_at?: string;
  is_local_fallback?: boolean;
}

export interface ProjectInquiryData {
  id?: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  country?: string;
  service: string;
  description: string;
  file_name?: string;
  created_at?: string;
  is_local_fallback?: boolean;
}

const LOCAL_STORAGE_APPOINTMENTS_KEY = 'shilp_bim_appointments';
const LOCAL_STORAGE_INQUIRIES_KEY = 'shilp_bim_inquiries';

export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor:
-- Project: ${SUPABASE_PROJECT_ID} (${SUPABASE_URL})
-- Direct SQL Editor: https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new

-- 1. Create the appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_type TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    timezone TEXT DEFAULT 'UTC',
    notes TEXT,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 3. Allow public booking submissions via publishable API key
DROP POLICY IF EXISTS "Allow public insert on appointments" ON public.appointments;
CREATE POLICY "Allow public insert on appointments" 
ON public.appointments 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select on appointments" ON public.appointments;
CREATE POLICY "Allow public select on appointments" 
ON public.appointments 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- 4. Create inquiries table for RFP project proposals
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    service TEXT NOT NULL,
    description TEXT NOT NULL,
    file_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert on inquiries" 
ON public.inquiries 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select on inquiries" ON public.inquiries;
CREATE POLICY "Allow public select on inquiries" 
ON public.inquiries 
FOR SELECT 
TO anon, authenticated 
USING (true);
`;

/**
 * Checks connection health to the configured Supabase instance.
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  hasAppointmentsTable: boolean;
  message: string;
}> {
  try {
    const { data, error } = await supabase.from('appointments').select('id').limit(1);

    if (error) {
      if (
        error.code === 'PGRST205' || 
        error.code === '42P01' ||
        error.message?.includes('schema cache') || 
        error.message?.includes('does not exist')
      ) {
        return {
          connected: true,
          hasAppointmentsTable: false,
          message: `Connected to Supabase project (${SUPABASE_PROJECT_ID}), but the 'appointments' table needs to be created in your SQL Editor.`,
        };
      }
      return {
        connected: false,
        hasAppointmentsTable: false,
        message: error.message || 'Supabase returned an error during connection test.',
      };
    }

    return {
      connected: true,
      hasAppointmentsTable: true,
      message: `Successfully connected to Supabase (${SUPABASE_PROJECT_ID}). Table 'appointments' is active and ready for live bookings.`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown connection error';
    return {
      connected: false,
      hasAppointmentsTable: false,
      message: msg,
    };
  }
}

/**
 * Save an appointment to Supabase with fallback to local state if table isn't created yet.
 */
export async function saveAppointment(
  appointment: Omit<AppointmentBooking, 'id' | 'created_at'>
): Promise<{
  success: boolean;
  savedInSupabase: boolean;
  appointment: AppointmentBooking;
  error?: string;
  needsSqlSetup?: boolean;
}> {
  const generatedId = `apt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          full_name: appointment.full_name,
          email: appointment.email,
          phone: appointment.phone || '',
          company: appointment.company || '',
          service_type: appointment.service_type,
          appointment_date: appointment.appointment_date,
          appointment_time: appointment.appointment_time,
          timezone: appointment.timezone || 'UTC',
          notes: appointment.notes || '',
          status: 'confirmed',
        },
      ])
      .select();

    if (error) {
      console.warn('Supabase insert warning:', error);
      // Fallback save to local storage
      const fallbackRecord: AppointmentBooking = {
        ...appointment,
        id: generatedId,
        created_at: now,
        status: 'confirmed',
        is_local_fallback: true,
      };
      saveToLocalAppointments(fallbackRecord);

      return {
        success: true,
        savedInSupabase: false,
        appointment: fallbackRecord,
        error: error.message,
        needsSqlSetup: error.code === 'PGRST205' || error.message?.includes('schema cache'),
      };
    }

    const savedRecord = data && data[0] ? data[0] : { ...appointment, id: generatedId, created_at: now };
    // Also mirror in local cache for instant UI availability
    saveToLocalAppointments(savedRecord);

    return {
      success: true,
      savedInSupabase: true,
      appointment: savedRecord,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error during database save';
    const fallbackRecord: AppointmentBooking = {
      ...appointment,
      id: generatedId,
      created_at: now,
      status: 'confirmed',
      is_local_fallback: true,
    };
    saveToLocalAppointments(fallbackRecord);

    return {
      success: true,
      savedInSupabase: false,
      appointment: fallbackRecord,
      error: errorMsg,
      needsSqlSetup: true,
    };
  }
}

/**
 * Retrieve all appointments from Supabase (merged with local fallback cache).
 */
export async function fetchAppointments(): Promise<AppointmentBooking[]> {
  const localItems = getLocalAppointments();

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true });

    if (error || !data) {
      return localItems;
    }

    // Merge: Supabase records take precedence, include any unsynced local records
    const supabaseIds = new Set(data.map((item) => item.id));
    const unsyncedLocal = localItems.filter((item) => item.id && !supabaseIds.has(item.id) && item.is_local_fallback);

    return [...data, ...unsyncedLocal];
  } catch {
    return localItems;
  }
}

/**
 * Save RFP inquiry to Supabase with local fallback.
 */
export async function saveInquiry(
  inquiry: Omit<ProjectInquiryData, 'id' | 'created_at'>
): Promise<{
  success: boolean;
  savedInSupabase: boolean;
  inquiry: ProjectInquiryData;
  error?: string;
  needsSqlSetup?: boolean;
}> {
  const generatedId = `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: inquiry.name,
          email: inquiry.email,
          company: inquiry.company,
          phone: inquiry.phone || '',
          country: inquiry.country || '',
          service: inquiry.service,
          description: inquiry.description,
          file_name: inquiry.file_name || '',
        },
      ])
      .select();

    if (error) {
      console.warn('Supabase inquiry insert note:', error);
      const fallbackRecord: ProjectInquiryData = {
        ...inquiry,
        id: generatedId,
        created_at: now,
        is_local_fallback: true,
      };
      saveToLocalInquiries(fallbackRecord);

      return {
        success: true,
        savedInSupabase: false,
        inquiry: fallbackRecord,
        error: error.message,
        needsSqlSetup: error.code === 'PGRST205' || error.message?.includes('schema cache'),
      };
    }

    const saved = data && data[0] ? data[0] : { ...inquiry, id: generatedId, created_at: now };
    saveToLocalInquiries(saved);

    return {
      success: true,
      savedInSupabase: true,
      inquiry: saved,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error during inquiry save';
    const fallbackRecord: ProjectInquiryData = {
      ...inquiry,
      id: generatedId,
      created_at: now,
      is_local_fallback: true,
    };
    saveToLocalInquiries(fallbackRecord);

    return {
      success: true,
      savedInSupabase: false,
      inquiry: fallbackRecord,
      error: errorMsg,
      needsSqlSetup: true,
    };
  }
}

function getLocalAppointments(): AppointmentBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToLocalAppointments(item: AppointmentBooking) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalAppointments();
    const updated = [item, ...current.filter((c) => c.id !== item.id)];
    localStorage.setItem(LOCAL_STORAGE_APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
}

function getLocalInquiries(): ProjectInquiryData[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToLocalInquiries(item: ProjectInquiryData) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalInquiries();
    const updated = [item, ...current.filter((c) => c.id !== item.id)];
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
}

/**
 * Attempts to push any cached local appointments into Supabase cloud database.
 */
export async function syncLocalAppointmentsToSupabase(): Promise<{
  syncedCount: number;
  remainingCount: number;
  success: boolean;
  message: string;
}> {
  const localItems = getLocalAppointments();
  const pending = localItems.filter((i) => i.is_local_fallback);

  if (pending.length === 0) {
    return {
      syncedCount: 0,
      remainingCount: 0,
      success: true,
      message: 'All appointments are currently synchronized with Supabase.',
    };
  }

  let synced = 0;
  const remaining: AppointmentBooking[] = [];

  for (const item of pending) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            full_name: item.full_name,
            email: item.email,
            phone: item.phone || '',
            company: item.company || '',
            service_type: item.service_type,
            appointment_date: item.appointment_date,
            appointment_time: item.appointment_time,
            timezone: item.timezone || 'UTC',
            notes: item.notes || '',
            status: 'confirmed',
          },
        ])
        .select();

      if (!error && data && data.length > 0) {
        synced++;
        // Update local item
        const nonPending = localItems.filter((x) => x.id !== item.id);
        const updated = { ...data[0], is_local_fallback: false };
        localStorage.setItem(
          LOCAL_STORAGE_APPOINTMENTS_KEY,
          JSON.stringify([updated, ...nonPending])
        );
      } else {
        remaining.push(item);
      }
    } catch {
      remaining.push(item);
    }
  }

  return {
    syncedCount: synced,
    remainingCount: remaining.length,
    success: remaining.length === 0,
    message:
      synced > 0
        ? `Successfully synchronized ${synced} appointment(s) to Supabase cloud database!`
        : `Could not push bookings yet. Ensure the 'appointments' table is created in Supabase SQL editor.`,
  };
}
