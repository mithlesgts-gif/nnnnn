import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, ArrowUpRight, Calendar, Mail } from 'lucide-react';
import { bimServices } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';

interface NavbarProps {
  onSelectService?: (serviceId: string) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectService, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-md shadow-blue-500/5' 
        : 'bg-white/80 backdrop-blur-xs border-b border-slate-100'
    }`}>
      {/* Top Micro Information Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-slate-900 text-[11px] font-mono text-slate-300 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Jamshedpur, India · Global Delivery
          </span>
          <span className="text-slate-600" aria-hidden="true">|</span>
          <span className="text-blue-300">ISO 19650 Certified BIM &amp; AEC Engineering Services</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+919373381310" className="text-white hover:text-blue-300 flex items-center gap-1.5 transition-colors font-semibold">
            <Phone className="w-3 h-3 text-blue-400" />
            <span>+91 9373381310</span>
          </a>
          <span className="text-slate-600" aria-hidden="true">|</span>
          <a href="mailto:info@shilpbimsolutions.com" className="text-white hover:text-blue-300 flex items-center gap-1.5 transition-colors font-semibold">
            <Mail className="w-3 h-3 text-blue-400" />
            <span>info@shilpbimsolutions.com</span>
          </a>
          <span className="text-slate-600" aria-hidden="true">|</span>
          <button 
            onClick={onOpenBooking}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-semibold"
          >
            <Calendar className="w-3 h-3 text-emerald-400" />
            <span>Book 1:1 Consultation</span>
          </button>
        </div>
      </div>

      {/* Main Navbar with Increased Height for Prominent Logo */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        {/* Brand Logo with Prominent Company Emblem */}
        <a href="#" className="flex items-center group py-2">
          <CompanyLogo size="md" variant="auto" />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-700">
          <a href="#" className="hover:text-blue-600 transition-colors py-1 relative group">
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
          </a>

          <a href="#about" className="hover:text-blue-600 transition-colors py-1 relative group">
            <span>About Us</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
          </a>

          {/* Services with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
          >
            <a 
              href="#services" 
              className="flex items-center gap-1 hover:text-blue-600 transition-colors py-1 group"
            >
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform" />
            </a>

            {isServicesDropdownOpen && (
              <div className="absolute top-full -left-20 w-80 bg-[#EAF1F8] border border-blue-200 rounded-xl shadow-2xl p-3 grid grid-cols-1 gap-1 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-mono text-blue-700 uppercase tracking-wider border-b border-blue-200/60 font-bold">
                  BIM Engineering Capabilities
                </div>
                {bimServices.slice(0, 6).map((service) => (
                  <a
                    key={service.id}
                    href="#services"
                    onClick={() => {
                      if (onSelectService) onSelectService(service.id);
                      setIsServicesDropdownOpen(false);
                    }}
                    className="px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-blue-700 hover:bg-[#DFEAF5] transition-colors flex items-center justify-between"
                  >
                    <span>{service.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">{service.lodLevels[0]}</span>
                  </a>
                ))}
                <div className="pt-2 border-t border-blue-200/60 px-3">
                  <a
                    href="#services"
                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>View all 12 services</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          <a href="#lifecycle-animation" className="hover:text-blue-600 transition-colors py-1 relative group text-[#165DFF] font-semibold">
            <span>Lifecycle Sim</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#165DFF] transition-all group-hover:w-full" />
          </a>

          <a href="#project-management" className="text-blue-600 hover:text-blue-700 font-bold transition-colors py-1 relative group">
            <span>Project Manager</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
          </a>

          <a href="#bim-in-motion" className="hover:text-blue-600 transition-colors py-1 relative group">
            <span>BIM in Motion</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
          </a>

          <a href="#viewer-3d" className="hover:text-blue-600 transition-colors py-1 relative group">
            <span>3D Viewer</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
          </a>

          <a href="#projects" className="hover:text-blue-600 transition-colors py-1 relative group">
            <span>Capabilities</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
          </a>

          <a href="#leadership" className="hover:text-blue-600 transition-colors py-1 relative group">
            <span>Leadership</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
          </a>

          <a href="#collaboration" className="hover:text-blue-600 transition-colors py-1 relative group">
            <span>Collaboration</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
          </a>

          <a href="#insights" className="hover:text-blue-600 transition-colors py-1 relative group">
            <span>Insights</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
          </a>

          <a href="#careers" className="hover:text-blue-600 transition-colors py-1 relative group text-slate-800">
            <span>Careers</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full" />
          </a>
        </div>

        {/* CTA Phone, Book Appointment & Discuss Project Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="tel:+919373381310"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold text-slate-800 hover:text-blue-600 hover:bg-slate-100 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>+91 9373381310</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:-translate-y-0.5"
          >
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Book Appointment</span>
          </button>

          <a
            href="#contact"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 hover:-translate-y-0.5"
          >
            <span>Discuss Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <a
            href="tel:+919373381310"
            className="p-2 text-blue-600 bg-blue-50 rounded-lg"
            aria-label="Call Mobile"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg bg-slate-100 border border-slate-200"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#EAF1F8] border-b border-blue-200 px-6 py-6 space-y-4 animate-fadeIn shadow-xl">
          <div className="space-y-3 text-sm font-semibold text-slate-800">
            <a 
              href="#" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              About SHILP BIM
            </a>
            <a 
              href="#services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              BIM Services (12 Capabilities)
            </a>
            <a 
              href="#lifecycle-animation" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-[#165DFF] font-semibold"
            >
              Construction Lifecycle (5 Stages)
            </a>
            <a 
              href="#project-management" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-blue-600 font-bold"
            >
              Dedicated Project Manager
            </a>
            <a 
              href="#bim-in-motion" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              BIM in Motion Suite
            </a>
            <a 
              href="#viewer-3d" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Interactive 3D BIM Viewer
            </a>
            <a 
              href="#projects" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Case Studies &amp; Capabilities
            </a>
            <a 
              href="#leadership" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Leadership Team
            </a>
            <a 
              href="#insights" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Technical Insights
            </a>
            <a 
              href="#careers" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block hover:text-blue-600 text-blue-700 font-semibold"
            >
              Careers at SHILP BIM
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-blue-600 font-bold"
            >
              Let's Discuss Your Project
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-2 border border-blue-200 transition-colors"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Book Appointment (Supabase)</span>
            </button>
            <a
              href="tel:+919373381310"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-mono font-bold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call: +91 9373381310</span>
            </a>
            <a
              href="mailto:info@shilpbimsolutions.com"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-mono font-bold text-xs flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>info@shilpbimsolutions.com</span>
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
