import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Database, 
  Copy, 
  ExternalLink, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Globe, 
  FileText, 
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { 
  saveAppointment, 
  fetchAppointments, 
  testSupabaseConnection, 
  syncLocalAppointmentsToSupabase,
  AppointmentBooking, 
  SUPABASE_PROJECT_ID, 
  SUPABASE_SETUP_SQL 
} from '../lib/supabase';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const APPOINTMENT_SERVICES = [
  { id: 'discovery', label: 'BIM Project Discovery & Scoping', duration: '30 min', desc: 'Overview of building typology, LOD targets, and BEP alignment.' },
  { id: 'coordination', label: 'Clash Detection & Multi-Trade Audit', duration: '45 min', desc: 'Review hard/soft spatial coordination and Navisworks federation.' },
  { id: 'lod-review', label: 'LOD 100–500 Technical Specification', duration: '45 min', desc: 'Define model element requirements from concept to digital twin.' },
  { id: 'pm-consult', label: 'Dedicated Project Manager Consultation', duration: '30 min', desc: '1:1 governance model, communication protocols, and delivery schedules.' },
  { id: 'scan-to-bim', label: 'Scan-to-BIM & Reality Capture Review', duration: '30 min', desc: 'Point cloud ingestion, deviation tolerances, and As-Built handover.' },
];

const TIME_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
  '07:30 PM'
];

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService = ''
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'view' | 'sql'>('book');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [selectedService, setSelectedService] = useState(
    preselectedService || APPOINTMENT_SERVICES[0].label
  );
  
  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  const [appointmentDate, setAppointmentDate] = useState(minDate);
  const [appointmentTime, setAppointmentTime] = useState(TIME_SLOTS[1]);
  const [userTimezone, setUserTimezone] = useState('');
  const [notes, setNotes] = useState('');

  // Status and feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);
  const [supabaseSaved, setSupabaseSaved] = useState<boolean | null>(null);
  const [needsSqlSetup, setNeedsSqlSetup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  // Live appointments list
  const [existingAppointments, setExistingAppointments] = useState<AppointmentBooking[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{ connected: boolean; message: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    try {
      setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
    } catch {
      setUserTimezone('UTC');
    }
  }, []);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (isOpen) {
      testConnection();
      loadAppointments();
    }
  }, [isOpen]);

  const testConnection = async () => {
    const res = await testSupabaseConnection();
    setConnectionStatus({
      connected: res.connected,
      message: res.message
    });
    if (!res.hasAppointmentsTable) {
      setNeedsSqlSetup(true);
    } else {
      setNeedsSqlSetup(false);
    }
  };

  const loadAppointments = async () => {
    setIsLoadingAppointments(true);
    try {
      const data = await fetchAppointments();
      setExistingAppointments(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const handleSyncAppointments = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await syncLocalAppointmentsToSupabase();
      if (res.syncedCount > 0) {
        setSyncFeedback({ type: 'success', text: res.message });
      } else {
        setSyncFeedback({ type: 'error', text: res.message });
      }
      await loadAppointments();
      await testConnection();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sync failed';
      setSyncFeedback({ type: 'error', text: msg });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide a contact phone or WhatsApp number.');
      return;
    }
    if (!appointmentDate) {
      setErrorMessage('Please choose a preferred appointment date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await saveAppointment({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim() || undefined,
        service_type: selectedService,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        timezone: userTimezone || 'UTC',
        notes: notes.trim() || undefined,
      });

      setConfirmedBooking(result.appointment);
      setSupabaseSaved(result.savedInSupabase);
      setNeedsSqlSetup(Boolean(result.needsSqlSetup));

      // Refresh appointments list
      loadAppointments();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to schedule appointment';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setSupabaseSaved(null);
    setErrorMessage('');
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setNotes('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-3xl bg-[#EAF1F8] rounded-3xl shadow-2xl border border-blue-200 overflow-hidden my-6"
      >
        {/* Top Accent Gradient Bar (Blue & Red Theme) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-sky-500 to-red-500" />

        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-blue-200/80 bg-[#DFEAF5]/80 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700 font-bold">
                <Database className="w-3 h-3 text-emerald-600" />
                <span>Supabase Connected</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-[11px] font-mono text-slate-500">
                Project: <strong className="text-slate-800">{SUPABASE_PROJECT_ID}</strong>
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
              Book a BIM Consultation &amp; Appointment
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-body">
              Schedule a dedicated video or telephone session with our engineering directors and project managers.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-blue-100 rounded-xl transition-colors shrink-0 cursor-pointer"
            aria-label="Close appointment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-blue-200 px-6 sm:px-8 bg-[#E5EEF7] text-xs font-semibold">
          <button
            onClick={() => {
              setActiveTab('book');
              setConfirmedBooking(null);
            }}
            className={`py-3.5 px-4 border-b-2 font-display transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'book'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Schedule Appointment</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('view');
              loadAppointments();
            }}
            className={`py-3.5 px-4 border-b-2 font-display transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'view'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Live Supabase Bookings</span>
            {existingAppointments.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 text-[10px] font-mono font-bold">
                {existingAppointments.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`py-3.5 px-4 border-b-2 font-display transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'sql'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase SQL Setup</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {activeTab === 'book' && (
            <div>
              {confirmedBooking ? (
                /* Booking Confirmation Screen */
                <div className="py-6 text-center space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold font-display text-slate-900">
                      Appointment Confirmed!
                    </h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, <strong>{confirmedBooking.full_name}</strong>. Your consultation has been scheduled with SHILP BIM Solutions.
                    </p>
                  </div>

                  {/* Supabase Storage Status Callout */}
                  <div className={`p-4 rounded-2xl border text-left text-xs space-y-1.5 max-w-md mx-auto ${
                    supabaseSaved 
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <div className="flex items-center gap-2 font-bold font-mono">
                      <Database className="w-4 h-4" />
                      <span>
                        {supabaseSaved
                          ? '✓ Verified Saved in Supabase PostgreSQL Account'
                          : 'Cached Locally (Supabase Table Needs Initialization)'}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {supabaseSaved
                        ? `Stored in Supabase Project '${SUPABASE_PROJECT_ID}' in table 'appointments'.`
                        : `Your booking is preserved. Please run the 1-click SQL in your Supabase SQL editor to enable remote cloud persistence.`}
                    </p>
                  </div>

                  {/* Appointment Summary Box */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs max-w-md mx-auto space-y-2.5 font-mono">
                    <div className="flex justify-between border-b border-slate-200 pb-2 font-bold text-slate-800">
                      <span>Appointment Reference</span>
                      <span className="text-blue-600 truncate max-w-[180px]">{confirmedBooking.id}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-600">
                      <div><strong>Service:</strong> {confirmedBooking.service_type}</div>
                      <div><strong>Date:</strong> {confirmedBooking.appointment_date}</div>
                      <div><strong>Time:</strong> {confirmedBooking.appointment_time}</div>
                      <div><strong>Timezone:</strong> {confirmedBooking.timezone}</div>
                      <div><strong>Phone:</strong> {confirmedBooking.phone}</div>
                      <div><strong>Email:</strong> {confirmedBooking.email}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Book Another Appointment
                    </button>
                    <button
                      onClick={() => setActiveTab('view')}
                      className="px-5 py-2.5 rounded-xl bg-[#DFEAF5] border border-blue-200 text-slate-700 hover:bg-[#D5E4F2] font-bold text-xs transition-colors cursor-pointer"
                    >
                      View All Bookings
                    </button>
                    {needsSqlSetup && (
                      <button
                        onClick={() => setActiveTab('sql')}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Run Supabase SQL Setup
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleBook} className="space-y-6">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Consultation Service Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                      1. Select Consultation Focus
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {APPOINTMENT_SERVICES.map((srv) => (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedService(srv.label)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            selectedService === srv.label
                              ? 'bg-[#DCE7F3] border-blue-600 ring-2 ring-blue-500/10'
                              : 'bg-[#DFEAF5]/70 border-blue-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-slate-900 font-display">
                            <span>{srv.label}</span>
                            <span className="text-[10px] font-mono text-blue-600 px-1.5 py-0.5 rounded bg-blue-100/60">
                              {srv.duration}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                            {srv.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time Slot Grid */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                      2. Date &amp; Time Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-500 block">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          min={minDate}
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl border border-blue-200/90 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-[#DFEAF5]/60"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-500 block">
                          Time Slot (Your Zone: {userTimezone}) *
                        </label>
                        <select
                          value={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-blue-200/90 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-[#DFEAF5]/60"
                        >
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot} ({userTimezone || 'Local'})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Candidate / Client Information */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                      3. Your Contact Details
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-500 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Johnathan Doe"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-blue-200/90 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-[#DFEAF5]/60"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-500 block">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@studioarchitecture.com"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-blue-200/90 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-[#DFEAF5]/60"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-500 block">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 234-5678 or +91 ..."
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-blue-200/90 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-[#DFEAF5]/60"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-500 block">
                          Company / Firm Name
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Apex Engineering Consultants"
                          className="w-full px-3.5 py-2 rounded-xl border border-blue-200/90 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-[#DFEAF5]/60"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="text-[11px] font-mono text-slate-500 block">
                        Project Notes / Specific Scope to Review (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Mention building typology, BIM software (Revit/Navisworks), or specific questions for our team..."
                        className="w-full px-3.5 py-2 rounded-xl border border-blue-200/90 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-[#DFEAF5]/60 resize-none"
                      />
                    </div>
                  </div>

                  {/* Supabase Storage Notice */}
                  <div className="p-3.5 rounded-xl bg-[#DFEAF5]/80 border border-blue-200/80 text-[11px] text-slate-600 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        All appointment records are automatically dispatched and persisted to your Supabase PostgreSQL database (<strong>{SUPABASE_PROJECT_ID}</strong>).
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('sql')}
                      className="text-blue-600 font-bold hover:underline shrink-0"
                    >
                      View SQL
                    </button>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Recording into Supabase...</span>
                      </>
                    ) : (
                      <>
                        <CalendarIcon className="w-4 h-4" />
                        <span>Confirm Appointment Booking</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'view' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-base font-bold font-display text-slate-900">
                    Appointments Stored in Supabase
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    Target Table: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">public.appointments</code>
                  </p>
                </div>

                <button
                  onClick={loadAppointments}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAppointments ? 'animate-spin text-blue-600' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Sync Feedback Message */}
              {syncFeedback && (
                <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                  syncFeedback.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{syncFeedback.text}</span>
                  </div>
                  <button
                    onClick={() => setSyncFeedback(null)}
                    className="text-xs font-bold hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Pending Sync Alert */}
              {existingAppointments.some(a => a.is_local_fallback) && (
                <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>{existingAppointments.filter(a => a.is_local_fallback).length} booking(s)</strong> stored locally. Once your SQL table is created, sync them directly to your Supabase project.
                    </span>
                  </div>
                  <button
                    onClick={handleSyncAppointments}
                    disabled={isSyncing}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50 transition-colors shadow-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync to Supabase'}</span>
                  </button>
                </div>
              )}

              {isLoadingAppointments ? (
                <div className="py-12 text-center text-slate-400 text-xs font-mono space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-600" />
                  <p>Querying Supabase database...</p>
                </div>
              ) : existingAppointments.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold font-display text-slate-800 text-sm">
                    No Appointments Found Yet
                  </h5>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Schedule your first appointment using the "Schedule Appointment" tab to test your live Supabase connection.
                  </p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Schedule an Appointment Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {existingAppointments.map((apt, idx) => (
                    <div
                      key={apt.id || idx}
                      className="p-4 rounded-2xl bg-[#DFEAF5]/90 border border-blue-200/90 hover:border-blue-400 transition-all shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <h5 className="font-bold font-display text-slate-900 text-sm">
                            {apt.service_type}
                          </h5>
                          {apt.is_local_fallback && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono">
                              Cached Pending SQL Setup
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                          <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                          <span>{apt.appointment_date}</span>
                          <span className="text-slate-300">·</span>
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>{apt.appointment_time}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 font-mono">
                        <div>
                          <span className="text-slate-400">Client:</span> {apt.full_name}
                        </div>
                        <div>
                          <span className="text-slate-400">Email:</span> {apt.email}
                        </div>
                        <div>
                          <span className="text-slate-400">Phone:</span> {apt.phone}
                        </div>
                      </div>

                      {apt.notes && (
                        <div className="p-2.5 rounded-lg bg-[#E5EEF7] text-[11px] text-slate-600">
                          <span className="font-semibold text-slate-700">Notes:</span> {apt.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-blue-900 flex items-center gap-1.5 font-display text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>One-Time Supabase Table Initialization</span>
                </div>
                <p className="leading-relaxed">
                  To allow public appointment booking and RFP inquiries to write directly into your Supabase database (<strong>{SUPABASE_PROJECT_ID}</strong>), run this standard SQL snippet in your Supabase SQL Editor. It creates the <code className="bg-[#DFEAF5] px-1 py-0.5 rounded text-blue-800 font-bold border border-blue-200">appointments</code> and <code className="bg-[#DFEAF5] px-1 py-0.5 rounded text-blue-800 font-bold border border-blue-200">inquiries</code> tables with Row Level Security (RLS) configured for anonymous inserts.
                </p>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between bg-slate-900 text-slate-300 px-4 py-2 rounded-t-xl text-xs font-mono">
                  <span>Supabase SQL Script</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopySql}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1 text-[11px] cursor-pointer transition-colors"
                    >
                      <Copy className="w-3 h-3 text-blue-400" />
                      <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                    </button>
                    <a
                      href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 text-[11px] transition-colors"
                    >
                      <span>Open SQL Editor</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-b-xl overflow-x-auto max-h-64 leading-relaxed">
                  {SUPABASE_SETUP_SQL}
                </pre>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-2">
                <span>Dashboard: supabase.com/dashboard/project/{SUPABASE_PROJECT_ID}</span>
                <button
                  onClick={testConnection}
                  className="text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-test Connection</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
