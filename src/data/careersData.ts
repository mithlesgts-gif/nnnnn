import { CareerRole } from '../types';

export const sampleCareerRoles: CareerRole[] = [
  {
    id: 'arch-modeler',
    title: 'BIM Modeler — Architecture',
    department: 'Architectural BIM Division',
    discipline: 'Architecture',
    scopeOverview: 'Development of coordinated parametric architectural models, exterior facades, curtain walls, and interior layouts from LOD 200 through LOD 400 with construction document extraction.',
    primarySoftware: ['Autodesk Revit Architecture', 'AutoCAD Architecture', 'Navisworks Manage', 'Enscape'],
    keyCompetencies: [
      'Parametric Revit Family (RFA) creation and nested components',
      'Architectural detailing, elevations, sections, and floor schedules',
      'Design authoring coordination adhering to project BEP standards',
      'IFC schema export and Common Data Environment maintenance'
    ],
    sampleDeliverables: [
      'LOD 300/350 Coordinated Architectural BIM Models',
      'Architectural General Arrangement (GA) Drawings',
      'Door, Window, and Finish Schedules',
      'Visual Renderings and Spatial Verification Studies'
    ],
    isOpenInquiry: false
  },
  {
    id: 'struct-modeler',
    title: 'Structural BIM Modeler',
    department: 'Structural Engineering Division',
    discipline: 'Structure',
    scopeOverview: 'Precision 3D modeling of reinforced concrete (RCC) frames, post-tensioned slabs, structural steel frameworks, foundation systems, and fabrication-ready rebar schedules.',
    primarySoftware: ['Autodesk Revit Structure', 'Tekla Structures', 'Navisworks Manage', 'AutoCAD'],
    keyCompetencies: [
      'Reinforced concrete detailing and 3D rebar cage modeling',
      'Structural steel connection modeling and member coordination',
      'Integration with structural engineering design calculations',
      'Quantity take-off (QTO) extraction for concrete and tonnage'
    ],
    sampleDeliverables: [
      'LOD 350/400 Structural Framework & Rebar Models',
      'Structural GA and Member Framing Sheets',
      'Bending Schedules (BBS) & Steel Erection Drawings',
      'Foundation & Cast-in-Place Concrete Package Sets'
    ],
    isOpenInquiry: false
  },
  {
    id: 'mep-modeler',
    title: 'MEP BIM Modeler',
    department: 'Building Services (MEPF) Division',
    discipline: 'MEP',
    scopeOverview: 'Multi-service routing of HVAC ductwork, hydronic chilled water pipes, plumbing drainage, fire protection sprinklers, and electrical cable trays with spatial clearance checks.',
    primarySoftware: ['Autodesk Revit MEP', 'Navisworks Manage', 'AutoCAD MEP', 'Bluebeam Revu'],
    keyCompetencies: [
      'Mechanical ductwork, terminal units, and damper coordination',
      'Hydronic and gravity plumbing slope routing',
      'Electrical tray, conduit, and switchgear layout modeling',
      'Hanger, bracket, and riser sleeve penetration coordination'
    ],
    sampleDeliverables: [
      'LOD 350 MEP Coordinated Service Models',
      'Trade Spool Drawings & Sleeve Location Drawings',
      'Equipment Layouts & Penetration Builders Work Sheets',
      'Service Run Isometric Views and Bill of Quantities'
    ],
    isOpenInquiry: false
  },
  {
    id: 'bim-coordinator',
    title: 'BIM Coordinator',
    department: 'Digital Delivery & Coordination',
    discipline: 'Coordination',
    scopeOverview: 'Federating multidisciplinary models in Navisworks Manage, running hard and soft collision matrix reports, chairing trade clash resolution meetings, and maintaining project BEP protocols.',
    primarySoftware: ['Navisworks Manage', 'Autodesk Construction Cloud (ACC)', 'Revit', 'BIM Track'],
    keyCompetencies: [
      'Federated clash detection matrix setup and tolerance rules',
      'Issue assignment, tracking, and trade resolution moderation',
      'Model health audit, naming conventions, and coordinate datum verification',
      'ISO 19650 Common Data Environment (CDE) workflow administration'
    ],
    sampleDeliverables: [
      'Weekly Multi-Disciplinary Clash Detection Reports',
      'Federated Navisworks (.NWD) Audited Packages',
      'Trade Coordination Action Trackers and BCF Files',
      'Model Compliance & Quality Assurance Checklists'
    ],
    isOpenInquiry: false
  },
  {
    id: 'pm-bim-delivery',
    title: 'Project Management and BIM Delivery',
    department: 'Project Management & Client Accounts',
    discipline: 'Project Management',
    scopeOverview: 'Leading client engagement as a Single Point of Contact, translating project requirements into delivery milestones, overseeing quality audits, and ensuring on-time project completion.',
    primarySoftware: ['Autodesk Construction Cloud', 'Microsoft Project', 'Navisworks', 'Power BI'],
    keyCompetencies: [
      'Dedicated 1:1 client governance and milestone scheduling',
      'Scope verification, change control, and resource allocation',
      'Interdisciplinary quality gatekeeping before deliverable release',
      'International client communication across time zones'
    ],
    sampleDeliverables: [
      'BIM Execution Plans (BEP) and Milestone Delivery Master Schedules',
      'Project Dashboard Progress Reports and QA Gate Sign-Offs',
      'Client Coordination Agendas and Transmittal Records',
      'Final As-Built / LOD 500 Handover Documentation'
    ],
    isOpenInquiry: false
  }
];
