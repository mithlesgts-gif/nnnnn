import { ProjectCaseStudy } from '../types';
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';
import airportBim from '../assets/images/airport_aviation_bim_1792312026653.jpg';
import mepPlantroom from '../assets/images/mep_plantroom_bim_1792312027331.jpg';
import healthcareMep from '../assets/images/healthcare_corridor_mep_1792317942269.jpg';
import clashResolutionModel from '../assets/images/bim_clash_resolution_model_1792317942291.jpg';
import navisworksClash from '../assets/images/navisworks_clash_det_1792312024999.jpg';
import shopDrawings from '../assets/images/bim_shop_drawings_1792312053086.jpg';
import scanToBim from '../assets/images/scan_to_bim_cloud_1792312025955.jpg';

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    id: 'proj-commercial-architecture',
    title: 'Commercial High-Rise Architectural & Envelope Modeling',
    category: 'Architecture',
    clientSector: 'Commercial High-Rise Typology',
    location: 'Metropolitan District',
    lod: 'LOD 350 / 400',
    area: '85,000 m² (42 Levels)',
    software: ['Autodesk Revit', 'Rhino Inside Revit', 'Navisworks Manage', 'Enscape'],
    summary: 'Comprehensive architectural BIM modeling of multi-story commercial high-rise buildings featuring parametric double-skin curtain walls, complex atriums, and coordinated architectural core layouts.',
    challenge: 'Curtain wall systems involving complex geometric glass panels with shifting solar orientation fins, creating tight interfaces with perimeter structural columns and floor slab edge drops.',
    solution: 'Engineered parametric Revit families driven by computational geometry workflows. Established precise grid coordinates and floor slab edge setback parameters, coordinating closely with facade engineering packages to eliminate assembly discrepancies.',
    results: [
      'Model delivered with zero uncoordinated perimeter slab clashes',
      'Extracted 100% synchronized exterior facade drawings and panel schedules',
      'Accelerated design revision coordination cycles',
      'Provided verified model geometry for aerodynamic and thermal performance analysis'
    ],
    deliverables: [
      'LOD 350 Architectural Revit Model with parameter-rich family library',
      'High-Resolution Facade General Arrangement Sheets, Transom & Mullion Details',
      'Door, Window, and Glazing Schedule Exports (Excel/PDF)',
      'Navisworks Federated Coordination Cache (.NWC)'
    ],
    imageUrl: bgTower,
    isSampleDemonstration: true
  },
  {
    id: 'proj-infrastructure-structure',
    title: 'Multi-Modal Infrastructure & Aviation Structural BIM',
    category: 'Structure',
    clientSector: 'Infrastructure & Transportation Typology',
    location: 'International Airport Concourse',
    lod: 'LOD 400 Fabrication',
    area: '140,000 m²',
    software: ['Autodesk Revit Structure', 'Tekla Structures', 'Navisworks Manage'],
    summary: 'Airport terminal infrastructure BIM modeling encompassing curved space-frame roof trusses, deep foundations, baggage handling conveyor interfaces, and coordinated MEP systems.',
    challenge: 'High rebar congestion at main post-tensioned transfer girder nodes interfacing with critical passenger transit culverts and automated baggage conveyor service corridors.',
    solution: 'Modeled full 3D structural frames and dense MEP distribution at LOD 400, eliminating rebar-to-duct clashes digitally prior to steel fabrication and concrete casting.',
    results: [
      'Eliminated on-site rebar cutting and sleeve relocation delays',
      'Automated Bar Bending Schedule (BBS) minimized steel wastage',
      'Delivered CNC-ready fabrication files for structural steel packages',
      'Maintained strict international aviation authority compliance'
    ],
    deliverables: [
      'LOD 400 Tekla and Revit Structural Models',
      'Structural Steel Space Frame & Fabrication Shop Drawing Packages',
      'Bar Bending Schedules (BBS) and Rebar Placement Drawings',
      'Coordinated Sleeve Penetration Layouts for cast-in casting'
    ],
    imageUrl: airportBim,
    isSampleDemonstration: true
  },
  {
    id: 'proj-healthcare-mep',
    title: 'Healthcare Complex & Specialized Clinical MEPF Services',
    category: 'MEP',
    clientSector: 'Specialized Healthcare Campus',
    location: 'Medical Research & Acute Care Center',
    lod: 'LOD 350 / 400',
    area: '62,000 m² (Hospital & Cleanroom Suites)',
    software: ['Autodesk Revit MEP', 'Navisworks Manage', 'Fabrication CADmep'],
    summary: 'Full MEPF modeling and high-density hospital infrastructure coordination featuring medical gas networks, cleanroom laminar flow HVAC, and coordinated ceiling plenum systems.',
    challenge: 'Restricted ceiling voids accommodating medical gas distribution, HVAC supply/return ducts, pneumatic tubes, and emergency power risers above clinical corridors.',
    solution: 'Established disciplined priority-based routing hierarchies. Medical gas lines, cleanroom air distribution, and fire suppression mains were coordinated with seismic pipe hangers and inspection access points.',
    results: [
      'Resolved 2,800+ interdisciplinary trade clashes digitally prior to hospital installation',
      'Coordinated NFPA 99 compliant medical gas clearance zones with zero field rework',
      'Achieved full equipment maintenance clearance compliance for cleanroom filter units',
      'Delivered clash-free Combined Services Drawings (CSD) on schedule'
    ],
    deliverables: [
      'Coordinated Revit MEP 3D Models (.RVT) with medical gas asset data',
      'Combined Services Drawings (CSD) and Builders Work Drawings (BWD)',
      'Clinical Corridor Section Cuts and Medical Gas Valve Tag Schedules',
      'Navisworks Clash Audit Reports and BCF Action Logs'
    ],
    imageUrl: healthcareMep,
    isSampleDemonstration: true
  },
  {
    id: 'proj-datacenter-coordination',
    title: 'Navisworks Federated Clash Detection & Resolution',
    category: 'BIM Coordination',
    clientSector: 'Mission-Critical & Technology Typology',
    location: 'High-Tech Facility',
    lod: 'LOD 350 / 400',
    area: '32,000 m²',
    software: ['Navisworks Manage', 'Autodesk Construction Cloud', 'Revit', 'Revizto'],
    summary: 'Interdisciplinary federated BIM coordination using Autodesk Navisworks Manage Clash Detective, identifying structural beam to HVAC duct clashes and routing solutions.',
    challenge: 'Compressed delivery schedule requiring zero construction stoppage where overhead electrical bus ducts, structural steel I-beams, and large supply air ducts conflicted.',
    solution: 'Conducted weekly virtual coordination meetings using Navisworks Clash Detective. Triaged active clashes, isolated false positives, and calculated precision duct offsets to clear structural beams.',
    results: [
      'Closed 100% of hard structural-to-MEP clashes before site fabrication',
      'Zero reported site collisions between structural steel and mechanical ductwork',
      'Enabled offsite prefabrication of duct spools with verified dimensional certainty',
      'Maintained total alignment with project delivery milestones'
    ],
    deliverables: [
      'Clash-Free Federated NWD Model Cache with Viewpoints',
      'BCF Cloud Coordination Logs with issue audit history',
      'Detailed Builders Work in Connection (BWIC) Penetration Sheets',
      'Equipment Maintenance Clearance Volume Verification Model'
    ],
    imageUrl: clashResolutionModel,
    isSampleDemonstration: true
  },
  {
    id: 'proj-residential-shopdrawings',
    title: 'Construction Documentation & Mechanical Fabrication Shop Drawings',
    category: 'Shop Drawings',
    clientSector: 'Commercial & Residential Typology',
    location: 'Urban Development',
    lod: 'LOD 400',
    area: '95,000 m² (Multi-Building)',
    software: ['Autodesk Revit', 'AutoCAD', 'Bluebeam Revu'],
    summary: 'Extraction and delivery of fully dimensioned, annotated 2D mechanical HVAC floor plans, section cuts, bill of materials schedules, and isometric 3D piping spools.',
    challenge: 'Tight fabrication deadlines requiring exact dimensional alignment between duct sizes, weld symbols, flange connections, and cast-in structural sleeves.',
    solution: 'Directly synchronized 2D sheet viewports inside Revit from the validated LOD 400 model. Embedded complete equipment tag schedules, cut lengths, and invert level elevations.',
    results: [
      'Delivered 350+ approved shop drawing sheets across mechanical and plumbing packages',
      'Eliminated typical discrepancy errors between architectural floor plans and mechanical layouts',
      'Pre-cut pipe spools matched on-site installation with zero rework',
      'Smooth municipal drawing review and contractor installation sign-off'
    ],
    deliverables: [
      'Vector PDF and DWG Shop Drawing packages matching client title blocks',
      'Level 3 Mechanical HVAC Floor Plans & Detailed Elevation Sections',
      'Isometric 3D Piping Spool Drawings with weld callouts',
      'Itemized Bill of Materials (BOM) & Equipment Schedules'
    ],
    imageUrl: shopDrawings,
    isSampleDemonstration: true
  },
  {
    id: 'proj-heritage-scantobim',
    title: '3D Terrestrial Laser Scan-to-BIM & Digital Twin Reconstruction',
    category: 'Scan-to-BIM',
    clientSector: 'Heritage Preservation & Adaptive Reuse',
    location: 'Historic District',
    lod: 'LOD 350 / LOA 30',
    area: '24,000 m²',
    software: ['Autodesk ReCap Pro', 'Autodesk Revit', 'CloudCompare'],
    summary: 'Point cloud processing from terrestrial LiDAR laser scans, converting millions of raw scan points into an intelligent Autodesk Revit as-built digital twin.',
    challenge: 'Absence of reliable historical blueprints with masonry walls exhibiting non-standard arches, out-of-plumb bowing, and undocumented ceiling voids.',
    solution: 'Registered dense TLS point clouds in Autodesk ReCap. Modeled irregular heritage walls, vaults, stairs, and MEP fixtures side-by-side with colorized point clouds to LOA 30 accuracy.',
    results: [
      'Delivered an accurate digital twin within ±3mm point cloud tolerance',
      'Identified structural floor slab sagging enabling early reinforcement planning',
      'Successfully routed modern HVAC services through existing shafts without damaging historic elements',
      'Provided verified 2D measured survey drawings for conservation planning'
    ],
    deliverables: [
      'Parametric Revit As-Built Model (.RVT) segmented by conservation phases',
      'Point Cloud vs. BIM Surface Deviation Analysis & Color Heatmaps',
      'Existing Conditions Measured Architectural Drawings (Plans, Sections, Elevations)',
      'Digital Twin Asset Metadata ready for facility management'
    ],
    imageUrl: scanToBim,
    isSampleDemonstration: true
  }
];
