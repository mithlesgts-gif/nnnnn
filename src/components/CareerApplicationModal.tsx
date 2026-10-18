import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  ArrowRight, 
  Copy, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { sampleCareerRoles } from '../data/careersData';

interface CareerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoleTitle?: string;
}

export const CareerApplicationModal: React.FC<CareerApplicationModalProps> = ({
  isOpen,
  onClose,
  selectedRoleTitle = ''
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [areaOfExpertise, setAreaOfExpertise] = useState(
    selectedRoleTitle || sampleCareerRoles[0].title
  );
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValidatedStep, setIsValidatedStep] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync if selectedRoleTitle changes
  React.useEffect(() => {
    if (selectedRoleTitle) {
      setAreaOfExpertise(selectedRoleTitle);
    }
  }, [selectedRoleTitle]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max 10MB check
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size exceeds 10MB limit. Please upload a smaller file.' }));
        return;
      }
      const allowedExt = ['.pdf', '.doc', '.docx'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!allowedExt.includes(fileExt)) {
        setErrors(prev => ({ ...prev, resume: 'Please upload a PDF or Word document (.pdf, .doc, .docx).' }));
        return;
      }
      setResumeFile(file);
      setErrors(prev => {
        const next = { ...prev };
        delete next.resume;
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter a valid full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const phoneClean = mobile.replace(/[\s\-\+\(\)]/g, '');
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (phoneClean.length < 8) {
      newErrors.mobile = 'Please enter a valid phone number with country/area code.';
    }

    if (!areaOfExpertise.trim()) {
      newErrors.areaOfExpertise = 'Please choose your primary area of expertise.';
    }

    if (!resumeFile) {
      newErrors.resume = 'Please select your resume/CV file (PDF or DOC).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsValidatedStep(true);
    }
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`Candidate Application — ${areaOfExpertise} — ${fullName}`);
    const body = encodeURIComponent(
      `Dear SHILP BIM Solutions Recruitment Team,\n\n` +
      `I would like to submit my application for opportunities in Building Information Modeling.\n\n` +
      `Candidate Details:\n` +
      `• Full Name: ${fullName}\n` +
      `• Email: ${email}\n` +
      `• Mobile: ${mobile}\n` +
      `• Primary Area of Expertise: ${areaOfExpertise}\n` +
      `${portfolioUrl ? `• Portfolio / Profile URL: ${portfolioUrl}\n` : ''}` +
      `${resumeFile ? `• Attached Resume: ${resumeFile.name} (${(resumeFile.size / 1024).toFixed(1)} KB)\n` : ''}` +
      `\nMessage / Note:\n${coverNote || 'Please find my resume attached. I look forward to hearing about potential opportunities at SHILP BIM Solutions Pvt. Ltd.'}\n\n` +
      `Best regards,\n${fullName}`
    );
    return `mailto:info@shilpbimsolutions.com?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = () => {
    const text = 
      `Candidate Application for SHILP BIM Solutions Pvt. Ltd.\n` +
      `Name: ${fullName}\n` +
      `Email: ${email}\n` +
      `Mobile: ${mobile}\n` +
      `Area of Expertise: ${areaOfExpertise}\n` +
      (portfolioUrl ? `Portfolio: ${portfolioUrl}\n` : '') +
      (resumeFile ? `Resume: ${resumeFile.name}\n` : '') +
      `Note: ${coverNote || 'N/A'}\n` +
      `Direct Contact: +91 9373381310 (Jamshedpur, India)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setMobile('');
    setPortfolioUrl('');
    setCoverNote('');
    setResumeFile(null);
    setErrors({});
    setIsValidatedStep(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-2xl bg-[#EAF1F8] rounded-3xl shadow-2xl border border-blue-200 overflow-hidden my-8"
      >
        {/* Top Accent Strip (Blue & Red) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-sky-500 to-red-500" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-blue-200/80 flex items-start justify-between bg-[#DFEAF5]/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-700 font-semibold mb-1">
              <span>SHILP BIM Solutions Pvt. Ltd.</span>
              <span className="text-slate-300">·</span>
              <span className="text-red-600">Careers &amp; Talent Pool</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-900">
              Apply for Career Opportunities
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Join our engineering team shaping high-precision BIM and digital construction delivery.
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
            aria-label="Close application modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {!isValidatedStep ? (
            <form onSubmit={handleProceedToSubmission} className="space-y-5">
              {/* Note on company recruitment policy */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-blue-800 flex items-center gap-1.5 font-display">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Verified Application Intake</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Roles are displayed as sample discipline tracks. Submit your verified credentials to be considered as active requirements open across our Jamshedpur engineering center and global project teams.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-blue-200/90 focus:border-blue-500 bg-[#DFEAF5]/60'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.email ? 'border-red-400 bg-red-50/20' : 'border-blue-200/90 focus:border-blue-500 bg-[#DFEAF5]/60'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }));
                    }}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.mobile ? 'border-red-400 bg-red-50/20' : 'border-blue-200/90 focus:border-blue-500 bg-[#DFEAF5]/60'
                    }`}
                  />
                  {errors.mobile && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.mobile}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Area of Expertise */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Area of Expertise <span className="text-red-500">*</span>
                </label>
                <select
                  value={areaOfExpertise}
                  onChange={(e) => {
                    setAreaOfExpertise(e.target.value);
                    if (errors.areaOfExpertise) setErrors(prev => ({ ...prev, areaOfExpertise: '' }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-200/90 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-[#DFEAF5]/60 focus:outline-none"
                >
                  {sampleCareerRoles.map((role) => (
                    <option key={role.id} value={role.title}>
                      {role.title} ({role.department})
                    </option>
                  ))}
                  <option value="Other BIM / AEC Specialization">
                    Other Specialized AEC / Scan-to-BIM / Automation Focus
                  </option>
                </select>
              </div>

              {/* Portfolio / Profile URL */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Portfolio / LinkedIn / Work Samples URL <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/... or Google Drive portfolio link"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-200/90 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-[#DFEAF5]/60 focus:outline-none"
                />
              </div>

              {/* Resume Upload File Box */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Resume / CV Upload <span className="text-red-500">*</span> <span className="text-slate-400 font-normal">(PDF, DOC, DOCX up to 10MB)</span>
                </label>

                <div className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center transition-all ${
                  resumeFile 
                    ? 'border-emerald-400 bg-emerald-50/30' 
                    : errors.resume 
                    ? 'border-red-300 bg-red-50/20' 
                    : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
                }`}>
                  <input
                    type="file"
                    id="resume-file-input"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {resumeFile ? (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 truncate max-w-xs sm:max-w-sm">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-slate-500 font-mono">
                            {(resumeFile.size / 1024).toFixed(1)} KB · Ready to submit
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg bg-[#DFEAF5] border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="resume-file-input" className="cursor-pointer block space-y-2">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-slate-600">
                        <span className="font-semibold text-blue-600 hover:underline">Click to browse your resume</span> or drag and drop here
                      </div>
                      <p className="text-[11px] text-slate-400">Supported formats: PDF, DOCX (Max 10MB)</p>
                    </label>
                  )}
                </div>

                {errors.resume && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.resume}</span>
                  </p>
                )}
              </div>

              {/* Brief Cover Note */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Brief Note / Technical Background <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Tell us briefly about your BIM software experience, project typologies, or career goals..."
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-200/90 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-[#DFEAF5]/60 focus:outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Submit Application Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          ) : (
            /* Validated Step: Instructions & Genuine Contact Option (No fake backend success claim) */
            <div className="space-y-6 animate-fadeIn py-2">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold font-display text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Application Details Validated</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your application information for <strong>{areaOfExpertise}</strong> has been structured and validated.
                </p>
              </div>

              {/* Application Summary Box */}
              <div className="p-5 rounded-2xl bg-[#DFEAF5]/80 border border-blue-200/80 text-xs space-y-2.5 font-mono">
                <div className="flex items-center justify-between text-slate-700 pb-2 border-b border-blue-200 font-bold">
                  <span>Candidate Summary</span>
                  <span className="text-blue-600">{areaOfExpertise}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                  <div><strong>Name:</strong> {fullName}</div>
                  <div><strong>Mobile:</strong> {mobile}</div>
                  <div><strong>Email:</strong> {email}</div>
                  {resumeFile && <div><strong>Resume:</strong> {resumeFile.name}</div>}
                  {portfolioUrl && <div className="sm:col-span-2 truncate"><strong>Portfolio:</strong> {portfolioUrl}</div>}
                </div>
              </div>

              {/* Direct Action Instructions */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider font-mono">
                  Next Step to Complete Your Application:
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To ensure your resume and project portfolio reach our technical review panel directly, please send your files to our talent coordinator or contact our office in Jamshedpur:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href={generateMailtoLink()}
                    className="p-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/10 text-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Email Client with Draft</span>
                  </a>

                  <button
                    onClick={handleCopySummary}
                    className="p-3.5 rounded-xl bg-[#DFEAF5] border border-blue-200 hover:border-blue-500 hover:bg-[#D5E4F2] text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-blue-600" />
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Application Summary'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <span className="font-semibold block sm:inline">Recruitment Inbox: </span>
                        <a href="mailto:info@shilpbimsolutions.com" className="text-blue-600 hover:underline font-bold font-mono">
                          info@shilpbimsolutions.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                      <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Direct: <a href="tel:+919373381310" className="text-slate-800 hover:underline font-mono font-semibold">+91 9373381310</a></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Jamshedpur, Jharkhand, India</span>
                  </div>
                </div>
              </div>

              {/* Reset or Close */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsValidatedStep(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  ← Edit Application Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
