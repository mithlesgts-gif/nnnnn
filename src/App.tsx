import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AnimatedStats } from './components/AnimatedStats';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { DedicatedProjectManagerSection } from './components/DedicatedProjectManagerSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { Bim3dViewer } from './components/Bim3dViewer';
import { BimInMotionSection } from './components/bim-in-motion/BimInMotionSection';
import { ClashDetectionDemo } from './components/ClashDetectionDemo';
import { IndustriesSection } from './components/IndustriesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { LeadershipSection } from './components/LeadershipSection';
import { BimCollaborationSection } from './components/BimCollaborationSection';
import { WorkflowSection } from './components/WorkflowSection';
import { SoftwareTechSection } from './components/SoftwareTechSection';
import { QualityCultureSection } from './components/QualityCultureSection';
import { FaqSection } from './components/FaqSection';
import { InsightsBlogSection } from './components/InsightsBlogSection';
import { CareersSection } from './components/CareersSection';
import { EnquirySection } from './components/EnquirySection';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Footer } from './components/Footer';
import { PrivacyTermsModals } from './components/PrivacyTermsModals';
import { ConstructionLifecycleAnimation } from './components/ConstructionLifecycleAnimation';
import { BimService, ProjectCaseStudy } from './types';
import { bimServices } from './data/servicesData';
import { ArrowUpRight, Compass, Layers, ShieldCheck, Box } from 'lucide-react';

export default function App() {
  const [selectedService, setSelectedService] = useState<BimService | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [enquiryInitialService, setEnquiryInitialService] = useState<string>('');
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string>('');

  const handleOpenBooking = (serviceName?: string) => {
    setBookingService(serviceName || '');
    setIsBookingModalOpen(true);
  };

  const handleOpenService = (service: BimService) => {
    setSelectedService(service);
  };

  const handleEnquireFromService = (serviceTitle: string) => {
    setEnquiryInitialService(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectRelatedService = (serviceId: string) => {
    const s = bimServices.find(item => item.id === serviceId);
    if (s) {
      setSelectedService(s);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF2F9] text-slate-800 font-body selection:bg-blue-600/20 selection:text-blue-700">
      {/* 1. Sticky Navigation */}
      <Navbar
        onSelectService={(serviceId) => {
          const s = bimServices.find(item => item.id === serviceId);
          if (s) setSelectedService(s);
        }}
        onOpenPrivacy={() => setPolicyModal('privacy')}
        onOpenTerms={() => setPolicyModal('terms')}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 2. Hero Section with dynamic word-by-word reveal & marquee */}
      <HeroSection onOpenBooking={() => handleOpenBooking()} />

      {/* 3. Capabilities Strip */}
      <div className="bg-slate-900 border-y border-slate-800 py-3.5 overflow-x-auto select-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-8 min-w-[700px] text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            LOD 100 Conceptual Massing
          </span>
          <span className="text-slate-600">→</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            LOD 300 Design Development
          </span>
          <span className="text-slate-600">→</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            LOD 350 Trade Coordination
          </span>
          <span className="text-slate-600">→</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            LOD 400 Fabrication Spools
          </span>
          <span className="text-slate-600">→</span>
          <span className="flex items-center gap-2 text-blue-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            LOD 500 Digital Twin As-Built
          </span>
        </div>
      </div>

      {/* 4. Animated Verified Engineering Metrics */}
      <AnimatedStats />

      {/* 5. About Shilp BIM Solutions */}
      <AboutSection />

      {/* 6. Comprehensive Services Section (12 Capabilities) */}
      <ServicesSection onSelectService={handleOpenService} />

      {/* 7. Dedicated Project Manager Section (1:1 Governance Model) */}
      <DedicatedProjectManagerSection onOpenBooking={handleOpenBooking} />

      {/* 8. Interactive 3D BIM Viewer Section (Dark Studio CAD Viewport Frame) */}
      <section id="viewer-3d" className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-blue-500/30 text-xs font-mono text-blue-400">
              <Box className="w-3.5 h-3.5" />
              <span>Real-Time WebGL 3D Geometry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
              Interactive 3D BIM Building Explorer
            </h2>
            <p className="text-base text-slate-300 font-body leading-relaxed">
              Rotate, zoom, and inspect coordinated architectural glazing, concrete structural cores, and multi-tier MEP engineering services in real-time 3D.
            </p>
          </div>

          {/* Real Three.js BIM 3D Viewer */}
          <Bim3dViewer />
        </div>
      </section>

      {/* 9. Construction From Scratch to Completion Lifecycle Visualizer (16:9 Cinematic Video Simulator) */}
      <section id="lifecycle-animation" className="py-24 bg-[#0B1530] text-white relative overflow-hidden border-t border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-xs font-mono text-blue-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#165DFF] animate-ping" />
              <span>Cinematic Engineering Simulation</span>
              <span className="text-blue-500">·</span>
              <span className="text-white font-semibold">Concept to LOD 500</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              Construction From Scratch to Completion
            </h2>
            <p className="text-base text-slate-300 font-body leading-relaxed max-w-2xl mx-auto">
              Follow how an architectural concept progresses through 2D CAD drafting, 3D parametric Revit modeling, high-rise structural erection, Navisworks clash federation, and completed digital twin handover.
            </p>
          </div>

          <ConstructionLifecycleAnimation />
        </div>
      </section>

      {/* 10. BIM in Motion — From Model to Construction (Master Section with 4 Modules) */}
      <BimInMotionSection />

      {/* 10. Interactive Clash Detection & Resolution Sandbox */}
      <section id="clash-demo" className="py-20 bg-gradient-to-b from-[#E2ECF7] via-[#EDF3FA] to-[#E2ECF7] relative overflow-hidden border-t border-blue-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Multi-Trade Collision Resolution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Clash Detection &amp; Resolution Support
            </h2>
            <p className="text-sm text-slate-600">
              Interactive simulation illustrating how trade conflicts are identified and resolved before construction release.
            </p>
          </div>
          <ClashDetectionDemo />
        </div>
      </section>

      {/* 11. Our Engineering Approach & Leadership Governance */}
      <LeadershipSection />

      {/* 12. Multidisciplinary Collaboration & BIM Workstations (Meeting Room to 3D Model) */}
      <BimCollaborationSection />

      {/* 13. Featured Projects & Case Studies */}
      <PortfolioSection
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* 13. Our 5-Stage BIM Delivery Process */}
      <WorkflowSection />

      {/* 14. Industries We Serve */}
      <IndustriesSection />

      {/* 15. Software & Digital Technology Stack */}
      <SoftwareTechSection />

      {/* 16. Quality Assurance & Culture */}
      <QualityCultureSection />

      {/* 17. Technical Insights & Blog Articles */}
      <InsightsBlogSection />

      {/* 18. Careers at SHILP BIM Solutions */}
      <CareersSection />

      {/* 19. Frequently Asked Questions */}
      <FaqSection />

      {/* 19. Project Enquiry & Proposal Form */}
      <EnquirySection 
        initialService={enquiryInitialService} 
        onOpenBooking={handleOpenBooking}
      />

      {/* 20. Corporate Footer */}
      <Footer
        onOpenPrivacy={() => setPolicyModal('privacy')}
        onOpenTerms={() => setPolicyModal('terms')}
        onSelectService={(serviceTitle) => {
          const s = bimServices.find(item => item.title === serviceTitle);
          if (s) setSelectedService(s);
        }}
      />

      {/* Modals & Overlays */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onEnquire={handleEnquireFromService}
        onSelectRelated={handleSelectRelatedService}
      />

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquire={handleEnquireFromService}
      />

      <PrivacyTermsModals
        type={policyModal}
        onClose={() => setPolicyModal(null)}
      />

      {/* Supabase Appointment Booking Modal */}
      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedService={bookingService}
      />

      {/* Floating BIM Assistant Chat Widget */}
      <LiveChatWidget />
    </div>
  );
}
