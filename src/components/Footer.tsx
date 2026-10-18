import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { bimServices } from '../data/servicesData';
import { CompanyLogo } from './CompanyLogo';
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSelectService?: (serviceTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onSelectService }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="bg-[#0B1530] border-t border-blue-900/50 text-slate-400 text-xs font-body relative overflow-hidden">
      {/* Architectural Skyscraper Building Background (>=70% Visual Prominence) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <img
          src={bgTower}
          alt="Modern architectural building background"
          className="w-full h-full object-cover object-center opacity-70 sm:opacity-75 filter contrast-125 saturate-[0.85]"
        />
        {/* Targeted Deep Navy Gradient Scrim Overlay for crisp readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1530] via-[#0B1530]/80 to-[#0B1530]/75" />
        <div className="absolute inset-0 bg-grid-light opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Identity with Prominent Corporate Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <CompanyLogo size="lg" variant="dark" />
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Integrated Building Information Modeling (BIM) solutions designed to improve coordination, visualization, and collaboration throughout the building lifecycle.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Dedicated Project Manager on every account</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ISO 19650 Aligned CDE Protocols</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core BIM Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              BIM Services
            </h4>
            <ul className="space-y-2">
              {bimServices.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={() => onSelectService && onSelectService(service.title)}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#project-management" className="text-blue-400 font-semibold hover:underline">
                  Dedicated Project Manager
                </a>
              </li>
              <li>
                <a href="#bim-in-motion" className="hover:text-blue-400 transition-colors">
                  BIM in Motion Suite
                </a>
              </li>
              <li>
                <a href="#viewer-3d" className="hover:text-blue-400 transition-colors">
                  Interactive 3D Viewer
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  Case Studies &amp; Capabilities
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-blue-400 transition-colors">
                  Our Engineering Approach
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-blue-400 transition-colors">
                  Technical Insights
                </a>
              </li>
              <li>
                <a href="#careers" className="text-red-400 font-semibold hover:text-red-300 transition-colors">
                  Careers at SHILP BIM
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Contact &amp; Location
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="font-semibold text-white">Jamshedpur, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a 
                  href="tel:+919373381310" 
                  className="font-mono font-bold text-white hover:text-blue-400 hover:underline transition-colors text-sm"
                >
                  +91 9373381310
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a 
                  href="mailto:info@shilpbimsolutions.com" 
                  className="font-mono text-white hover:text-blue-400 hover:underline transition-colors text-xs break-all"
                >
                  info@shilpbimsolutions.com
                </a>
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Let's Discuss Your Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} SHILP BIM Solutions Pvt. Ltd. Jamshedpur, India. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700" aria-hidden="true">|</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-slate-700" aria-hidden="true">|</span>
            <span className="text-blue-400">LOD 100 to LOD 500</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
