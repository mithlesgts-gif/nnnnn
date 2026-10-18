export interface BimService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  lodLevels: string[];
  scope: string[];
  deliverables: string[];
  workflow: { step: string; detail: string }[];
  software: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: 'Architecture' | 'Structure' | 'MEP' | 'BIM Coordination' | 'Shop Drawings' | 'Scan-to-BIM';
  clientSector: string;
  location: string;
  lod: string;
  area: string;
  software: string[];
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  deliverables: string[];
  imageUrl: string;
  secondaryImages?: string[];
  isSampleDemonstration?: boolean;
}

export interface Leader {
  name: string;
  designation: string;
  roleType: string;
  bio: string;
  quote: string;
  image: string;
  specialties: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  author: string;
}

export interface QaQcStage {
  id: number;
  name: string;
  shortDesc: string;
  fullAuditCriteria: string[];
  statusType: 'Normal' | 'Audit' | 'Issue' | 'Resolved' | 'Approved';
  statusLabel: string;
  icon: string;
}

export interface ConstructionPhase {
  id: number;
  name: string;
  durationWeeks: string;
  discipline: string;
  description: string;
  keyActivities: string[];
  progressPercent: number;
  elementTypesVisible: {
    ground: boolean;
    excavation: boolean;
    foundation: boolean;
    superstructure: boolean;
    envelope: boolean;
    mepPipes: boolean;
    interior: boolean;
    cranes: boolean;
  };
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  discipline: 'Architecture' | 'Structure' | 'MEP' | 'Coordination' | 'Project Management';
  scopeOverview: string;
  primarySoftware: string[];
  keyCompetencies: string[];
  sampleDeliverables: string[];
  isOpenInquiry: boolean;
}

export interface CandidateApplication {
  fullName: string;
  email: string;
  mobile: string;
  areaOfExpertise: string;
  portfolioUrl?: string;
  coverNote?: string;
  resumeFileName?: string;
  resumeFileSize?: string;
}

export interface ConstructionVideoSim {
  id: string;
  title: string;
  duration: string;
  discipline: string;
  videoType: string;
  fiveDLinkage: string;
  description: string;
  posterUrl: string;
  videoUrl?: string;
  badgeColor?: string;
}
