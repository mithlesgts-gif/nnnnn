import { QaQcStage, ConstructionPhase, ConstructionVideoSim } from '../types';
export type { ConstructionVideoSim };
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';
import structuralSteel from '../assets/images/structural_steel_tower_erection.jpg';
import mepPlantroom from '../assets/images/mep_plantroom_bim_1792312027331.jpg';
import airportBim from '../assets/images/airport_aviation_bim_1792312026653.jpg';
import clashResolutionModel from '../assets/images/bim_clash_resolution_model_1792317942291.jpg';
import bimOfficeStudio from '../assets/images/bim_engineering_studio_office_1792317943099.jpg';
import shopDrawings from '../assets/images/bim_shop_drawings_1792312053086.jpg';
import scanToBim from '../assets/images/scan_to_bim_cloud_1792312025955.jpg';

export interface BimProcessGalleryItem {
  id: string;
  category: string;
  title: string;
  technicalDescription: string;
  discipline: 'Architecture' | 'Structure' | 'MEP' | 'Coordination' | 'Fabrication' | 'Reality Capture';
  stage: string;
  features: string[];
  imageUrl: string;
}

export const bimProcessGalleryItems: BimProcessGalleryItem[] = [
  {
    id: 'process-arch',
    category: 'Model Development',
    discipline: 'Architecture',
    stage: 'LOD 350',
    title: 'Architectural Parametric Modeling',
    technicalDescription: 'Comprehensive envelope, double-skin facade assemblies, curtain wall grids, interior core partition systems, and room schedule parameter assignments.',
    features: ['Glazing & Mullion Spacing', 'Fire-Rated Partition Verification', 'Ceiling Grid & Height Datum', 'Space Programming Metadata'],
    imageUrl: bgTower
  },
  {
    id: 'process-struct',
    category: 'Model Development',
    discipline: 'Structure',
    stage: 'LOD 400',
    title: 'Structural Steel & Concrete Detailing',
    technicalDescription: 'Accurate reinforced concrete geometry, deep foundation piles, post-tensioned slabs, structural steel trusses, and fabrication connection nodes.',
    features: ['Grade 500 Rebar Bend Schedules', 'Moment & Shear Connections', 'Cast-in Anchor Bolt Patterns', 'Penetration Stress Zones'],
    imageUrl: structuralSteel
  },
  {
    id: 'process-mep',
    category: 'Model Development',
    discipline: 'MEP',
    stage: 'LOD 350/400',
    title: 'MEP Systems Engineering & Routing',
    technicalDescription: 'Central utility plant rooms, centrifugal chillers, pumps, blue chilled-water and green condenser piping networks, and overhead HVAC ductwork.',
    features: ['Chiller & Boiler Piping Risers', 'SMACNA Duct Pressure Standards', 'Equipment Maintenance Clearances', 'Prefabricated Pipe Spool Headers'],
    imageUrl: mepPlantroom
  },
  {
    id: 'process-federation',
    category: 'Coordination',
    discipline: 'Coordination',
    stage: 'LOD 350',
    title: 'Federated Infrastructure & Aviation BIM',
    technicalDescription: 'Airport terminal scale integration of curved structural steel space frames, passenger concourse corridors, automated baggage conveyors, and dense MEP.',
    features: ['Shared Project Base Point', 'Long-Span Roof Coordination', 'Subsurface Baggage & MEP Routing', 'Dynamic Section Cut Auditing'],
    imageUrl: airportBim
  },
  {
    id: 'process-clash',
    category: 'Quality Assurance',
    discipline: 'Coordination',
    stage: 'Resolution',
    title: 'Navisworks Clash Detection & Resolution',
    technicalDescription: 'Algorithmic collision detection in Autodesk Navisworks Manage Clash Detective, pinpointing hard clashes between steel beams and ducts with red marker highlights and clearance rerouting.',
    features: ['Automated False-Positive Filtering', 'BCF Real-time Issue Exchange', 'Sleeve Reroute Calculations', 'Discipline Accountability Matrix'],
    imageUrl: clashResolutionModel
  },
  {
    id: 'process-qaqc',
    category: 'Quality Assurance',
    discipline: 'Coordination',
    stage: 'Audit & Compliance',
    title: 'Model QA/QC & Engineering Governance',
    technicalDescription: 'Multidisciplinary team review at dual-monitor engineering workstations, auditing Revit models, coordinate datums, and COBie asset completeness.',
    features: ['Model Health Scoring', 'Dual-Monitor Model Inspection', 'IFC Property Set Validation', 'Geometric Redundancy Purging'],
    imageUrl: bimOfficeStudio
  },
  {
    id: 'process-docs',
    category: 'Documentation',
    discipline: 'Fabrication',
    stage: 'LOD 400',
    title: 'Construction Documentation & Shop Drawings',
    technicalDescription: 'Detailed 2D mechanical floor plans, elevation sections, bill of materials schedules, and isometric 3D piping spool details on standardized title blocks.',
    features: ['Combined Services Drawings (CSD)', 'Builders Work in Connection (BWIC)', 'Cut-Length Spool Schedules', 'Setting-Out Coordinates'],
    imageUrl: shopDrawings
  },
  {
    id: 'process-reality',
    category: 'Reality Capture',
    discipline: 'Reality Capture',
    stage: 'LOD 500',
    title: 'Scan-to-BIM & As-Built Digital Twin',
    technicalDescription: 'Side-by-side comparison of terrestrial LiDAR laser scan point clouds with reconstructed Autodesk Revit parametric as-built models to LOA 30/40 standards.',
    features: ['LOA 30–40 Positional Accuracy', 'Point Cloud Overlay Heatmaps', 'Structural Plumbness Verification', 'Facility Management Metadata'],
    imageUrl: scanToBim
  }
];

export const qaqcWorkflowStages: QaQcStage[] = [
  {
    id: 1,
    name: 'Model Received',
    shortDesc: 'Ingestion of native trade models and validation of file structures, links, and CAD imports.',
    statusType: 'Normal',
    statusLabel: 'Stage 01 Initiated',
    icon: 'FolderDown',
    fullAuditCriteria: [
      'File format verification (.RVT, .IFC, .NWC) and software version compatibility',
      'Purging unlinked CAD imports, non-standard line styles, and orphaned views',
      'Verification of central model detachment and worksharing permissions',
      'Audit of file sizes to maintain workspace performance thresholds'
    ]
  },
  {
    id: 2,
    name: 'Model Audit',
    shortDesc: 'Verification of project origin, shared coordinates, grid alignments, and vertical story levels.',
    statusType: 'Audit',
    statusLabel: 'Coordinate Audit Active',
    icon: 'Crosshair',
    fullAuditCriteria: [
      'Project Base Point and Survey Point benchmark coordinate alignment',
      'True North vs. Project North rotation validation across all disciplines',
      'Grid line naming, pinning, and 3D level extent consistency',
      'Units check: metric millimetre vs. imperial decimal foot consistency'
    ]
  },
  {
    id: 3,
    name: 'Standards & Information Checks',
    shortDesc: 'Parameter validation, element classification, naming conventions, and Level of Information Need.',
    statusType: 'Audit',
    statusLabel: 'Information Validation',
    icon: 'FileCheck',
    fullAuditCriteria: [
      'OmniClass, UniFormat, and MasterFormat classification code completeness',
      'Family and type naming conventions according to the project BIM Execution Plan',
      'Spatial boundaries: room and space tag containment and volume calculations',
      'Validation of non-graphical asset parameters (COBie compliance parameters)'
    ]
  },
  {
    id: 4,
    name: 'Clash Detection',
    shortDesc: 'Automated multi-trade spatial intersection and clearance tolerance testing in Navisworks.',
    statusType: 'Issue',
    statusLabel: 'Potential Clashes Flagged',
    icon: 'AlertOctagon',
    fullAuditCriteria: [
      'Structure vs. MEP hard intersection audit (concrete beams vs. duct runs)',
      'MEP trade-to-trade clash testing (gravity drainage vs. chilled water pipes)',
      'Clearance envelopes: maintenance buffer around AHU filters, valves, and electrical panels',
      'Elimination of false positives (insulation overlaps, touching coplanar faces)'
    ]
  },
  {
    id: 5,
    name: 'Issue Assignment',
    shortDesc: 'Categorization by trade priority, creation of BCF viewpoints, and assignment to discipline leads.',
    statusType: 'Issue',
    statusLabel: 'Action Items Assigned',
    icon: 'UserCheck',
    fullAuditCriteria: [
      'Clash severity scoring: Critical (Structural), Moderate (MEP), Low (Finishes)',
      'BCF issue package generation with 3D viewpoint coordinates and camera angles',
      'Clear assignment of responsibility (Architectural, Structural, MEP contractor)',
      'Deadline setting aligned with milestone model freezing schedules'
    ]
  },
  {
    id: 6,
    name: 'Resolution & Rechecking',
    shortDesc: 'Implementation of engineered reroutes, sleeve penetrations, and automated delta regression testing.',
    statusType: 'Resolved',
    statusLabel: 'Engineered Solutions Applied',
    icon: 'RefreshCw',
    fullAuditCriteria: [
      'Review of proposed duct/pipe reroutes against hydraulic and pressure drop criteria',
      'Structural review of required slab and beam sleeve penetrations',
      'Automated batch clash re-run in Navisworks to verify issue resolution',
      'Regression checking to guarantee that modifications have not triggered secondary clashes'
    ]
  },
  {
    id: 7,
    name: 'Final Approval',
    shortDesc: 'Sign-off of coordinated federated model, issuance of clash-free certificate, and release for fabrication.',
    statusType: 'Approved',
    statusLabel: 'Model Approved & Released',
    icon: 'ShieldCheck',
    fullAuditCriteria: [
      'Zero unresolved critical hard clashes in the federated model',
      'Sign-off by Lead BIM Coordinator, Structural Engineer, and MEP Consultant',
      'Export of final coordinated NWD cache and OpenBIM IFC deliverables',
      'Release of validated model for 2D shop drawing sheet generation and 4D sequencing'
    ]
  }
];

export const constructionSimVideos: ConstructionVideoSim[] = [
  {
    id: 'sim-1',
    title: 'Deep Foundations, Excavation & Substructure Framing',
    duration: '0:10',
    discipline: 'Civil & Substructure',
    videoType: '4D Sequencing',
    fiveDLinkage: 'Earthwork volume (34,500 m³), concrete pile caps, and heavy structural precast procurement schedule.',
    description: 'Sequenced foundation excavation, ground anchoring, precast columns, crane rigging, and site logistics staging.',
    posterUrl: '/videos/sim_1_excavation_poster.jpg',
    videoUrl: '/videos/sim_1_excavation.mp4',
    badgeColor: 'border-blue-500/40 text-blue-400'
  },
  {
    id: 'sim-2',
    title: 'High-Rise Superstructure & Tower Crane Steel Erection',
    duration: '0:10',
    discipline: 'Structural Frame',
    videoType: '4D Sequencing',
    fiveDLinkage: 'Structural steel tonnage (4,200 metric tons) and floor-by-floor concrete pour progression (7 days/slab).',
    description: 'Tower crane hoisting heavy steel sections, moment connections, and multi-tier floor slab erection.',
    posterUrl: '/videos/sim_2_structural_rise_poster.jpg',
    videoUrl: '/videos/sim_2_structural_rise.mp4',
    badgeColor: 'border-blue-500/40 text-blue-400'
  },
  {
    id: 'sim-3',
    title: 'Tower Crane Logistics & Curtain Wall Panel Erection',
    duration: '0:10',
    discipline: 'Envelope & Logistics',
    videoType: 'Site Logistics',
    fiveDLinkage: 'Crane hook allocation, safety perimeter exclusion zones, and unitized glazing panel lifting cycle times.',
    description: 'High-precision crane hoist lifting glazed facade modules, assisted by certified on-site rigging specialists in PPE.',
    posterUrl: '/videos/sim_3_crane_logistics_poster.jpg',
    videoUrl: '/videos/sim_3_crane_logistics.mp4',
    badgeColor: 'border-amber-500/40 text-amber-400'
  },
  {
    id: 'sim-4',
    title: 'Curtain Wall Facade & Aerodynamic Envelope',
    duration: '0:10',
    discipline: 'Architectural Glazing',
    videoType: '4D Sequencing',
    fiveDLinkage: 'Unitized facade panels (1,850 assemblies) with bracket anchor coordination and air/water infiltration verification.',
    description: 'Architectural envelope modeling, double-skin facade detailing, solar mullion alignment, and weather seal integrity.',
    posterUrl: '/videos/sim_4_curtain_wall_poster.jpg',
    videoUrl: '/videos/sim_4_curtain_wall.mp4',
    badgeColor: 'border-cyan-500/40 text-cyan-400'
  },
  {
    id: 'sim-5',
    title: 'Coordinated Central Plant Room & Multi-Service MEP',
    duration: '0:10',
    discipline: 'MEP Services',
    videoType: 'Building Services',
    fiveDLinkage: 'Fabricated pipe spools, chiller manifolds, and linear ductwork takeoff with 35% on-site labor reduction.',
    description: 'Centrifugal chillers, primary/secondary pumping headers, color-coded chilled water lines, and coordinated HVAC ducting.',
    posterUrl: '/videos/sim_5_mep_services_poster.jpg',
    videoUrl: '/videos/sim_5_mep_services.mp4',
    badgeColor: 'border-emerald-500/40 text-emerald-400'
  },
  {
    id: 'sim-6',
    title: 'Multidisciplinary BIM Engineering & Workstation Review',
    duration: '0:10',
    discipline: 'Engineering Studio',
    videoType: 'Coordination',
    fiveDLinkage: 'Synchronized common data environment (CDE), model audit scorecards, and cross-trade issue tracking.',
    description: 'BIM engineers at dual-monitor workstations coordinating 3D Revit models, technical shop drawings, and clash resolution.',
    posterUrl: '/videos/sim_6_interior_turnkey_poster.jpg',
    videoUrl: '/videos/sim_6_interior_turnkey.mp4',
    badgeColor: 'border-purple-500/40 text-purple-400'
  },
  {
    id: 'sim-7',
    title: 'Navisworks Federated Clash Detection & Resolution',
    duration: '0:10',
    discipline: 'Clash Resolution',
    videoType: 'Collision Audit',
    fiveDLinkage: 'Zero-rework guarantee eliminating up to $180,000 in projected structural sleeve cutting and field rerouting costs.',
    description: 'Autodesk Navisworks Manage Clash Detective inspecting hard collisions between structural beams and mechanical ductwork.',
    posterUrl: '/videos/sim_clash_detection_poster.jpg',
    videoUrl: '/videos/sim_clash_detection.mp4',
    badgeColor: 'border-red-500/40 text-red-400'
  },
  {
    id: 'sim-8',
    title: 'Terrestrial LiDAR Scan-to-BIM & As-Built Digital Twin',
    duration: '0:10',
    discipline: 'Reality Capture',
    videoType: 'Digital Twin',
    fiveDLinkage: 'Point-cloud deviation heatmaps verified to LOA 30/40 for facility management lifecycle asset loading.',
    description: 'Side-by-side verification of dense intensity-colorized point cloud survey data with reconstructed parametric Revit geometry.',
    posterUrl: '/videos/sim_scan_to_bim_poster.jpg',
    videoUrl: '/videos/sim_scan_to_bim.mp4',
    badgeColor: 'border-indigo-500/40 text-indigo-400'
  }
];

export const constructionPhases: ConstructionPhase[] = [
  {
    id: 1,
    name: 'Excavation & Site Preparation',
    durationWeeks: 'Weeks 01–08',
    discipline: 'Earthwork & Shoring',
    description: 'Topsoil stripping, retention wall secant piling, bulk earthwork excavation to -9.0m datum, and dewatering setup.',
    keyActivities: ['Bulk earthworks (42,000 m³)', 'Secant pile wall installation', 'Ground tiebacks and struts', 'Survey control datum alignment'],
    progressPercent: 14,
    elementTypesVisible: {
      ground: true,
      excavation: true,
      foundation: false,
      superstructure: false,
      envelope: false,
      mepPipes: false,
      interior: false,
      cranes: false
    }
  },
  {
    id: 2,
    name: 'Substructure & Foundations',
    durationWeeks: 'Weeks 09–18',
    discipline: 'Deep Foundation',
    description: 'Bored concrete piling, pile cap construction, ground moisture barriers, and reinforced concrete raft foundation casting.',
    keyActivities: ['120 bored piles with sonic logging', '2,400 m³ raft foundation mass pour', 'Basement perimeter retaining walls', 'Sub-slab MEP drainage sleeves'],
    progressPercent: 28,
    elementTypesVisible: {
      ground: true,
      excavation: true,
      foundation: true,
      superstructure: false,
      envelope: false,
      mepPipes: false,
      interior: false,
      cranes: true
    }
  },
  {
    id: 3,
    name: 'Superstructure Framework',
    durationWeeks: 'Weeks 19–42',
    discipline: 'Concrete & Steel Framing',
    description: 'Slipform central core rise, reinforced concrete columns, post-tensioned floor slabs, and structural steel roof crown erection.',
    keyActivities: ['Vertical core climbing system', '7-day slab cycle per floor', 'Tower crane logistics orchestration', 'Structural rebar placement verification'],
    progressPercent: 52,
    elementTypesVisible: {
      ground: true,
      excavation: false,
      foundation: true,
      superstructure: true,
      envelope: false,
      mepPipes: false,
      interior: false,
      cranes: true
    }
  },
  {
    id: 4,
    name: 'Building Envelope & Glazing',
    durationWeeks: 'Weeks 38–58',
    discipline: 'Facade Engineering',
    description: 'Installation of high-performance unitized curtain wall glazing, spandrel panels, louvers, and roof waterproofing membranes.',
    keyActivities: ['Unitized facade bracket setting', 'Curtain wall installation (floors 01–15)', 'Waterproofing & weather envelope lock', 'Acoustic seal testing'],
    progressPercent: 68,
    elementTypesVisible: {
      ground: true,
      excavation: false,
      foundation: true,
      superstructure: true,
      envelope: true,
      mepPipes: false,
      interior: false,
      cranes: false
    }
  },
  {
    id: 5,
    name: 'MEP Installation & Coordination',
    durationWeeks: 'Weeks 46–68',
    discipline: 'Mechanical, Electrical & Plumbing',
    description: 'High-density MEP rough-in: primary AHU equipment, chilled water risers, fire sprinkler distribution, and main electrical switchboards.',
    keyActivities: ['Plant room equipment rigging', 'Prefabricated multi-service ceiling racks', 'Fire pump & sprinkler manifold testing', 'Cable tray & electrical bus duct runs'],
    progressPercent: 82,
    elementTypesVisible: {
      ground: true,
      excavation: false,
      foundation: true,
      superstructure: true,
      envelope: true,
      mepPipes: true,
      interior: false,
      cranes: false
    }
  },
  {
    id: 6,
    name: 'Interior Fit-Out & Finishes',
    durationWeeks: 'Weeks 56–78',
    discipline: 'Architectural Interiors',
    description: 'Drywall partitioning, acoustic ceiling tile installation, flooring finishes, architectural joinery, and building automation sensor connections.',
    keyActivities: ['Drywall stud framing and boarding', 'Raised access floor installation', 'Door and architectural ironmongery', 'Terminal MEP fixture installation'],
    progressPercent: 94,
    elementTypesVisible: {
      ground: true,
      excavation: false,
      foundation: true,
      superstructure: true,
      envelope: true,
      mepPipes: true,
      interior: true,
      cranes: false
    }
  },
  {
    id: 7,
    name: 'Testing, Commissioning & Handover',
    durationWeeks: 'Weeks 79–86',
    discipline: 'Quality & Digital Twin Handover',
    description: 'TAB air & water balancing, fire life-safety integration testing, As-Built BIM model reconciliation, and COBie asset data delivery.',
    keyActivities: ['Air & water system balancing (TAB)', 'Integrated fire life-safety smoke test', 'LOD 500 As-Built model verification', 'COBie asset parameter export to CAFM'],
    progressPercent: 100,
    elementTypesVisible: {
      ground: true,
      excavation: false,
      foundation: true,
      superstructure: true,
      envelope: true,
      mepPipes: true,
      interior: true,
      cranes: false
    }
  }
];
