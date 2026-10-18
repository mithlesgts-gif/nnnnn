import { BimService } from '../types';

export const bimServices: BimService[] = [
  {
    id: 'architectural-bim',
    title: 'Architectural BIM Modeling',
    shortDesc: 'Parametric 3D architectural models from conceptual schematic design up to detailed LOD 400/500 construction delivery.',
    fullDesc: 'We translate architectural 2D drawings, design briefs, and schematic concepts into highly accurate, data-rich Building Information Models. Our models encompass building envelopes, interior partitions, curtain walls, doors, windows, millwork, and architectural finishes strictly aligned with international building codes and client-specific BIM Execution Plans (BEP).',
    iconName: 'Building2',
    lodLevels: ['LOD 100', 'LOD 200', 'LOD 300', 'LOD 350', 'LOD 400', 'LOD 500'],
    scope: [
      'Site context and building massing models',
      'Exterior facades, curtain wall framing, cladding, and parametric glazing systems',
      'Interior partition layouts, ceilings, floor finishes, and door/window schedules',
      'Staircases, ramps, elevators, railings, and egress path verification',
      'LOD 400 fabrication-ready architectural elements and assemblies',
      'Integration of non-graphical asset parameters (COBie compliance)'
    ],
    deliverables: [
      'Native Autodesk Revit (.RVT) Model Files',
      'IFC 2x3 & IFC 4 OpenBIM Exchange Files',
      'Architectural GA Drawings, Plans, Elevations, and Sections (PDF/DWG)',
      'Automated Door, Window, Finishes, and Material Take-Off Schedules',
      'Navisworks Coordination Models (.NWC/.NWD)'
    ],
    workflow: [
      { step: 'Input Ingestion & Standard Setup', detail: 'Audit of architectural drawings, establishing shared project coordinates, survey benchmark alignment, and project templates.' },
      { step: 'Core Shell & Massing Modeling', detail: 'Modeling primary exterior walls, floor slabs, structural interfaces, and roof assemblies at LOD 200/300.' },
      { step: 'Interior & Architectural Detailing', detail: 'Development of interior core, partitions, ceiling grids, fenestrations, and fixture schedules to LOD 350/400.' },
      { step: 'QA/QC & Model Validation', detail: 'Automated parameter checking, room tagging, code compliance audit, and federated clash coordination.' }
    ],
    software: ['Autodesk Revit', 'AutoCAD', 'Navisworks Manage', 'BIM 360 / ACC', 'Enscape'],
    benefits: [
      'Eliminates design discrepancies before construction starts',
      'Accurate bill of materials extracted straight from geometry',
      'Accelerates local authority submission and design coordination',
      'Seamless multidisciplinary integration with structural and MEP models'
    ],
    faqs: [
      { question: 'What Level of Development (LOD) can Shilp BIM provide?', answer: 'We deliver architectural models from LOD 100 conceptual massing up to LOD 500 facility management models with custom asset parameters.' },
      { question: 'Do you work in client-hosted Autodesk Construction Cloud (ACC)?', answer: 'Yes, our team connects directly to your ACC, BIM 360, or internal CDE server according to your project protocols.' }
    ],
    relatedServices: ['structural-bim', 'mep-bim', 'clash-detection', 'revit-families']
  },
  {
    id: 'structural-bim',
    title: 'Structural BIM Modeling',
    shortDesc: 'High-fidelity reinforced concrete, structural steelwork, and rebar detailing models engineered for constructability.',
    fullDesc: 'Our structural engineering modeling team crafts robust digital structures representing foundation systems, cast-in-place and precast concrete, structural steel frames, trusses, connections, and rebar reinforcement. We coordinate structural members with architectural intent and MEP penetration requirements to eliminate site-level rework.',
    iconName: 'Boxes',
    lodLevels: ['LOD 200', 'LOD 300', 'LOD 350', 'LOD 400'],
    scope: [
      'Substructure foundations: piles, pile caps, raft foundations, and grade beams',
      'Superstructure concrete: columns, shear walls, beams, post-tensioned slabs, and stairs',
      'Structural steel framing: hot-rolled sections, purlins, bracing, baseplates, and gusset plates',
      'Rebar modeling & detailing with bend schedules according to ACI, BS, and Eurocodes',
      'Coordinated MEP sleeve penetrations and structural opening validation'
    ],
    deliverables: [
      'Revit Structural Models (.RVT) with accurate connection parameters',
      'Structural General Arrangement (GA) and Foundation Drawings',
      'Rebar Placement Drawings and Bar Bending Schedules (BBS)',
      'Structural Steel Fabrication Drawings and Anchor Bolt Layouts',
      'Navisworks Export files for interdisciplinary clash testing'
    ],
    workflow: [
      { step: 'Structural Calculation & Marking Review', detail: 'Cross-checking structural design calculations, framing plans, and architectural grid alignment.' },
      { step: 'Primary Frame Generation', detail: 'Modeling foundation pads, concrete columns, shear cores, and major transfer slabs.' },
      { step: 'Secondary Steel & Reinforcement Detailing', detail: 'Modeling steel connections, stiffeners, anchor bolts, and 3D rebar cages for critical nodes.' },
      { step: 'Penetration Coordination & Sign-off', detail: 'Verifying structural integrity around MEP pipe and duct sleeves prior to freeze.' }
    ],
    software: ['Autodesk Revit Structure', 'Tekla Structures', 'Navisworks Manage', 'AutoCAD Structural'],
    benefits: [
      'Early identification of structural clashes with building services',
      'Accurate steel tonnage and concrete volume estimates for procurement',
      'Minimized field modification of heavy steel and reinforced concrete',
      'Streamlined fabrication with direct NC file export capabilities'
    ],
    faqs: [
      { question: 'Can you handle complex steel connection detailing?', answer: 'Yes, we model custom moment connections, baseplates, shear plates, and bracing assemblies according to structural engineer drawings.' },
      { question: 'Are structural models coordinated with architectural finishes?', answer: 'Always. We federate structural grids with architectural finishes to ensure correct cover, slab drops, and threshold clearances.' }
    ],
    relatedServices: ['architectural-bim', 'mep-bim', 'shop-drawings', 'clash-detection']
  },
  {
    id: 'mep-bim',
    title: 'MEP BIM Modeling & Coordination',
    shortDesc: 'Multidisciplinary Mechanical (HVAC), Electrical, Plumbing, and Fire Protection digital systems engineering.',
    fullDesc: 'We engineer clash-free, constructible 3D MEPF models that ensure mechanical equipment, ductwork, piping networks, cable trays, conduits, and sprinkler systems fit seamlessly within ceiling plenums and service risers. Our multidisciplinary team coordinates disciplines into one federated model adhering to ASHRAE, NFPA, and SMACNA standards.',
    iconName: 'Layers',
    lodLevels: ['LOD 300', 'LOD 350', 'LOD 400', 'LOD 500'],
    scope: [
      'HVAC: supply, return, exhaust ductwork, dampers, AHUs, chillers, and VAV boxes',
      'Plumbing: domestic water supply, drainage, storm water, vents, and grease interceptors',
      'Fire Fighting: sprinkler mains, branch lines, alarm valves, standpipes, and hydrants',
      'Electrical: cable containment trays, conduits, panels, transformers, lighting, and bus ducts',
      'Plant rooms: 3D mechanical room layouts, pump manifolds, and equipment clearance zones'
    ],
    deliverables: [
      'Federated Coordinated MEP Revit Models (.RVT)',
      'Navisworks Coordination Cache files (.NWC, .NWD)',
      'Clash-Free MEP Combined Services Drawings (CSD)',
      'Structural Penetration Drawings (Sleeves & Openings for casting)',
      'Individual Builders Work Drawings (BWD) per discipline'
    ],
    workflow: [
      { step: 'Schematic to 3D System Conversion', detail: 'Inputting P&IDs, single-line diagrams, duct sizing calculations, and equipment specifications.' },
      { step: 'Priority-Based Routing', detail: 'Routing gravity drainage and large ductwork first, followed by pressure piping and flexible cable containment.' },
      { step: 'Inter-Service Coordination', detail: 'Resolving trade-to-trade clashes within ceiling voids and vertical service risers.' },
      { step: 'Maintenance Clearance Validation', detail: 'Ensuring valves, dampers, filters, and equipment access panels have compliant clearances.' }
    ],
    software: ['Autodesk Revit MEP', 'Navisworks Manage', 'AutoCAD MEP', 'Fabrication CADmep'],
    benefits: [
      'Prevents costly site shutdowns caused by trade interferences',
      'Eliminates improvisational pipe/duct routing in the field',
      'Guarantees adequate maintenance and service access for facility operations',
      'Produces authoritative builders work drawings before concrete is poured'
    ],
    faqs: [
      { question: 'What international standards do you apply for MEP modeling?', answer: 'We align with SMACNA for ductwork, NFPA for fire suppression, IPC/UPC for plumbing, and NEC/BS 7671 for electrical containment.' },
      { question: 'Can you deliver LOD 400 fabrication spool models for MEP?', answer: 'Yes, we generate fabrication-ready MEP models with hanger locations, insulation thickness, and pipe spools with bill of materials.' }
    ],
    relatedServices: ['clash-detection', 'shop-drawings', 'as-built-bim', 'structural-bim']
  },
  {
    id: 'clash-detection',
    title: 'Clash Detection & Resolution Support',
    shortDesc: 'Automated geometric hard/soft clash auditing, interdisciplinary coordination meetings, and engineering issue resolution.',
    fullDesc: 'We implement disciplined clash identification, categorization, and resolution workflows using Autodesk Navisworks Manage and cloud collaboration platforms. Rather than merely flagging thousands of raw collisions, our engineers filter duplicates, distinguish hard collisions from clearance tolerances, and formulate actionable engineering solutions.',
    iconName: 'AlertTriangle',
    lodLevels: ['LOD 300', 'LOD 350', 'LOD 400'],
    scope: [
      'Matrix-based clash tests: Structure vs MEP, Architecture vs MEP, MEP vs MEP, and Maintenance Clearance zones',
      'Identification of hard clashes (direct physical intersections) and soft clashes (insufficient maintenance clearances)',
      'Filtering of false positives and categorization by severity and construction sequencing priority',
      'Formulating proposed reroutes, offset calculations, or structural sleeve proposals',
      'Weekly coordination meeting management and real-time issue tracking via BCF/cloud'
    ],
    deliverables: [
      'Navisworks Clash Audit Reports with viewpoints, coordinates, and trade assignments',
      'BCF (BIM Collaboration Format) issue logs integrated into Revizto/BIM Track/ACC',
      'Weekly Clash Resolution Progress Dashboards and Burn-down charts',
      'Coordinated and clash-free federated models ready for construction release'
    ],
    workflow: [
      { step: 'Clash Matrix Definition', detail: 'Setting up tolerance rules, priority trades, and clearance envelopes in Navisworks.' },
      { step: 'Automated Collision Run', detail: 'Running federated tests across structural, architectural, mechanical, electrical, and plumbing packages.' },
      { step: 'Engineering Triage & Filtering', detail: 'Eliminating false positives, grouping related collisions, and drafting rerouting recommendations.' },
      { step: 'Resolution Coordination & Sign-off', detail: 'Collaborating with design consultants to approve solutions and rechecking updated models.' }
    ],
    software: ['Navisworks Manage', 'Autodesk Construction Cloud (ACC)', 'Revizto', 'BIM Track / Newforma'],
    benefits: [
      'Reduces site RFIs by up to 75% through proactive pre-construction resolution',
      'Saves substantial contingency budget by avoiding rework and demolition',
      'Accelerates project timeline by enabling off-site fabrication with confidence',
      'Provides transparent accountability across all consulting engineering trades'
    ],
    faqs: [
      { question: 'What is the difference between a hard clash and a soft clash?', answer: 'A hard clash is a physical intersection (e.g. a 300mm pipe cutting through a concrete beam). A soft clash occurs when two objects infringe on necessary operational or maintenance buffer zones (e.g. insufficient clearance to replace an air filter).' },
      { question: 'How do you coordinate with our existing project team?', answer: 'We conduct regular virtual coordination workshops, manage cloud issue trackers (BCF/ACC), and present 3D viewpoints with proposed solutions.' }
    ],
    relatedServices: ['mep-bim', 'structural-bim', 'shop-drawings', '4d-5d-bim']
  },
  {
    id: 'shop-drawings',
    title: 'Shop Drawings & Construction Documentation',
    shortDesc: 'Fully annotated, dimensional, and fabrication-ready 2D construction drawings extracted directly from verified BIM models.',
    fullDesc: 'We extract accurate, coordinated shop drawings, installation drawings, and fabrication packages directly from validated LOD 400 BIM models. Every drawing includes precise dimensions, elevation annotations, room callouts, bill of materials, hanger spacings, and structural penetration sleeves.',
    iconName: 'FileText',
    lodLevels: ['LOD 350', 'LOD 400'],
    scope: [
      'Architectural shop drawings: curtain walls, interior fit-outs, doors, partitions, and reflected ceiling plans (RCP)',
      'Structural shop drawings: foundation layouts, column schedules, steel connection sheets, and rebar bending schedules',
      'MEP shop drawings: single-service ductwork, piping spools, plumbing risers, and electrical containment layouts',
      'Combined Services Drawings (CSD) and Builders Work in Connection (BWIC) penetrations',
      'Setting-out coordinates, grid offsets, and invert level elevations'
    ],
    deliverables: [
      'Fabrication and installation drawing sheets in DWG and high-res vector PDF formats',
      'Bill of Quantities (BOQ) and itemized Cut-Lists for fabrication shops',
      'Pipe Spool Isometric Drawings with weld mapping and flange callouts',
      'Detailed sleeve and opening layout drawings for site casting'
    ],
    workflow: [
      { step: 'Model Geometry Sign-off', detail: 'Confirming the federated model is 100% clash-free and coordinated.' },
      { step: 'Sheet Generation & Viewporting', detail: 'Creating plan, section, and elevation viewports according to client title block standards.' },
      { step: 'Dimensioning & Annotation', detail: 'Adding datum references, invert levels, duct dimensions, insulation tags, and hanger notes.' },
      { step: 'Quality Control Review', detail: 'Rigorous cross-checking between drawing schedules and underlying BIM parameters.' }
    ],
    software: ['Autodesk Revit', 'AutoCAD', 'Bluebeam Revu', 'Navisworks'],
    benefits: [
      'Direct synchronization between 3D model and 2D drawing sheets prevents discrepancy errors',
      'Enables fast offsite prefabrication, reducing expensive onsite labor hours',
      'Minimizes site contractor RFIs with clear dimensional and elevation callouts',
      'Complies strictly with local building standards and municipal drawing codes'
    ],
    faqs: [
      { question: 'Can you use our corporate drawing title blocks and layer standards?', answer: 'Yes, we ingest and configure your exact sheet templates, title blocks, fonts, line weights, and dimension styles.' },
      { question: 'Are drawings updated automatically if the 3D model changes?', answer: 'Because drawings are generated directly inside Revit, all geometry changes reflect dynamically on sheets, preserving synchronization.' }
    ],
    relatedServices: ['mep-bim', 'structural-bim', 'architectural-bim', 'quantity-takeoffs']
  },
  {
    id: 'scan-to-bim',
    title: 'Scan-to-BIM & Reality Capture',
    shortDesc: 'Converting 3D point cloud data from LiDAR laser scans and photogrammetry into intelligent, millimeter-precise BIM models.',
    fullDesc: 'We convert raw 3D point cloud data (.E57, .RCS, .RCP, .LAS) collected via terrestrial laser scanning, mobile mapping, or drone photogrammetry into intelligent, parametric BIM models. Our engineers meticulously trace existing structural geometries, historical details, architectural features, and MEP routing.',
    iconName: 'ScanLine',
    lodLevels: ['LOD 200', 'LOD 300', 'LOD 350', 'LOD 400'],
    scope: [
      'Processing and registering dense point clouds into Autodesk ReCap',
      'Modeling existing architectural heritage elements, facades, and irregular geometries',
      'Capturing MEP pipe networks, duct runs, cable trays, and plant room layouts',
      'Identifying building deformations, floor deflections, plumbness, and out-of-square elements',
      'Retrofit, historic preservation, renovation, and brownfield industrial plant projects'
    ],
    deliverables: [
      'Intelligent Revit Models (.RVT) built to agreed Level of Accuracy (LOA 10–50)',
      'Point Cloud vs BIM Surface Deviation Analysis & Heatmaps',
      'Existing Conditions 2D Measured Survey Drawings (PDF/DWG)',
      'Asset identification schedules for existing equipment and MEP infrastructure'
    ],
    workflow: [
      { step: 'Point Cloud Audit & Decimation', detail: 'Inspecting scan point density, verifying survey control targets, and cleaning noise.' },
      { step: 'Coordinate Alignment', detail: 'Setting project origin and true north to match global survey coordinates.' },
      { step: 'Precision Parametric Modeling', detail: 'Modeling walls, structural framing, and MEP runs aligned to laser points.' },
      { step: 'Deviation Analysis', detail: 'Running model-to-point cloud comparison to ensure tolerances comply with USIBD LOA guidelines.' }
    ],
    software: ['Autodesk ReCap Pro', 'Autodesk Revit', 'CloudCompare', 'Navisworks'],
    benefits: [
      'Eliminates guesswork and inaccurate manual surveys for renovation projects',
      'Provides an authoritative baseline for brownfield engineering and MEP upgrades',
      'Drastically minimizes unforeseen site surprises and retrofitting clashes',
      'Preserves historical structures digitally with millimeter precision'
    ],
    faqs: [
      { question: 'What scan file formats do you accept?', answer: 'We accept .E57, .RCS, .RCP, .LAS, .LAZ, and .PTS from all major scanner brands including Faro, Leica, Trimble, and NavVis.' },
      { question: 'What is Level of Accuracy (LOA)?', answer: 'We follow USIBD standards ranging from LOA 20 (approximate) up to LOA 40/50 (accurate to within 1 to 5 millimeters for critical equipment).' }
    ],
    relatedServices: ['as-built-bim', 'architectural-bim', 'mep-bim', 'clash-detection']
  },
  {
    id: 'bep-consulting',
    title: 'BIM Execution Planning & Consulting',
    shortDesc: 'Strategic BIM protocols, ISO 19650 standard alignment, EIR/BEP formulation, and Common Data Environment setup.',
    fullDesc: 'We assist AEC owners, main contractors, and design consultants in drafting project-specific BIM Execution Plans (BEP), Employer Information Requirements (EIR), model governance standards, and Common Data Environment (CDE) workflows. We establish the protocols that make multi-party digital delivery succeed.',
    iconName: 'ClipboardCheck',
    lodLevels: ['ISO 19650', 'PAS 1192', 'US National BIM Standard'],
    scope: [
      'Pre-contract and post-contract BIM Execution Plan (BEP) authoring',
      'Defining Information Delivery Milestones (IDM) and Model Element Breakdown',
      'Setting up Common Data Environments (CDE) on Autodesk Construction Cloud, BIM 360, or Procore',
      'Folder structure, document naming conventions, and revision control workflows',
      'BIM Manager on Demand and client representation during design coordination'
    ],
    deliverables: [
      'Comprehensive BIM Execution Plan (BEP) Documentation',
      'Model Auditing Checklists and QA/QC Protocols',
      'Custom Revit Template Files (.RTE) with standardized parameters and line weights',
      'Shared Parameter text files and BIM Content Style Guides'
    ],
    workflow: [
      { step: 'Requirement Discovery', detail: 'Analyzing client organizational goals, contract conditions, and procurement model.' },
      { step: 'EIR & BEP Formulation', detail: 'Documenting Level of Information Need, roles, software versions, and delivery milestones.' },
      { step: 'CDE Architecture Setup', detail: 'Configuring project cloud workspaces, permission tiers, and transmittal workflows.' },
      { step: 'Team Enablement & Governance', detail: 'Periodic audits of subconsultant models to verify adherence to agreed protocols.' }
    ],
    software: ['Autodesk Construction Cloud (ACC)', 'BIM 360', 'Revizto', 'Notion/Sharepoint'],
    benefits: [
      'Ensures seamless data exchange across multi-disciplinary, multi-firm teams',
      'Mitigates legal and contractual disputes over digital model ownership',
      'Standardizes quality benchmarks from schematic design through handover',
      'Positions projects for compliance with global standards including ISO 19650'
    ],
    faqs: [
      { question: 'Can you act as our third-party BIM Coordinator or Manager?', answer: 'Yes, we provide fractional or full-time BIM Management services to oversee your subconsultants and maintain model integrity.' },
      { question: 'Do you help contractors who are new to ISO 19650 requirements?', answer: 'We guide contractors through every step of ISO 19650 compliance, from appointment documents to final asset information model verification.' }
    ],
    relatedServices: ['clash-detection', '4d-5d-bim', 'architectural-bim', 'mep-bim']
  },
  {
    id: '4d-5d-bim',
    title: '4D & 5D BIM Construction Simulation',
    shortDesc: 'Time-sequenced 4D scheduling and 5D quantity-linked cost planning to visualize constructability and control project cash flow.',
    fullDesc: 'We connect 3D BIM models with construction schedules (Primavera P6, MS Project) for 4D visual sequencing and connect cost databases for 5D budget planning. This enables project teams to rehearse construction virtually, identify logistical bottlenecks, crane conflicts, and track planned vs. actual cash flow.',
    iconName: 'Clock',
    lodLevels: ['4D Time Sequencing', '5D Cost Integration'],
    scope: [
      'Linking 3D model elements to Primavera P6 / Microsoft Project Gantt charts',
      'Visualizing site logistics: crane radiuses, laydown zones, temporary works, and hoist locations',
      'Simulating floor-by-floor structural concrete pouring and MEP installation sequencing',
      'Generating 4D construction milestone videos and planned vs. actual visual progress tracking',
      '5D integration: linking material quantities with unit rates for time-phased cost forecasts'
    ],
    deliverables: [
      'Synchro 4D or Navisworks TimeLiner Simulation Packages',
      'High-Definition 4D Construction Sequencing Animations (MP4/WebM)',
      'Visual Logistics and Egress Phasing Plan Graphics',
      '5D Cash Flow and Progress S-Curve Forecast Reports'
    ],
    workflow: [
      { step: 'Schedule Ingestion & WBS Mapping', detail: 'Importing the master construction schedule and aligning Work Breakdown Structure (WBS) with 3D elements.' },
      { step: 'Model Element Partitioning', detail: 'Splitting slabs and walls into pours and construction phases matching physical sequence.' },
      { step: 'Simulation Engine Linking', detail: 'Binding tasks to geometry with appearance profiles (Construct, Demolish, Temporary).' },
      { step: 'Scenario Analysis & Optimization', detail: 'Testing alternative logistics strategies, crane positions, and safety clearance zones.' }
    ],
    software: ['Bentley Synchro Pro', 'Navisworks TimeLiner', 'Primavera P6', 'MS Project'],
    benefits: [
      'Rehearses the build sequence virtually to prevent site logistics gridlocks',
      'Improves stakeholder communication through intuitive visual timelines',
      'Identifies safety hazards and critical path delays months before ground-break',
      'Enables realistic cash flow projections linked directly to verified quantities'
    ],
    faqs: [
      { question: 'Can you update the 4D simulation during live construction?', answer: 'Yes, we ingest monthly progress updates to produce side-by-side planned vs. actual 4D video comparisons.' },
      { question: 'What schedule formats do you integrate with?', answer: 'We import directly from Oracle Primavera P6 (.XER), Microsoft Project (.MPP), and Excel task matrices.' }
    ],
    relatedServices: ['clash-detection', 'quantity-takeoffs', 'structural-bim', 'bep-consulting']
  },
  {
    id: 'quantity-takeoffs',
    title: 'Quantity Take-Offs & 5D BOQ Extraction',
    shortDesc: 'Automated, highly accurate Bill of Quantities (BOQ) and material take-offs mined straight from parametric model geometry.',
    fullDesc: 'We extract accurate material quantities directly from validated BIM elements, eliminating manual measuring errors. Our quantity take-offs cover concrete volumes, formwork areas, rebar weights, steel tonnage, duct surface areas, pipe lengths, and architectural finishes, structured for estimating software.',
    iconName: 'Calculator',
    lodLevels: ['LOD 300', 'LOD 350', 'LOD 400'],
    scope: [
      'Automated extraction of structural concrete volumes, formwork, and reinforcement weights',
      'Structural steel tonnage broken down by member profile, grade, and connection hardware',
      'MEP quantities: pipe lengths by diameter/material, ductwork poundage, fixture and damper counts',
      'Architectural takeoffs: wall finish areas, floor tile counts, ceiling systems, and paint coverage',
      'Cost-code classification using MasterFormat, UniFormat, or NRM2 standards'
    ],
    deliverables: [
      'Detailed Bill of Quantities (BOQ) in formatted Excel spreadsheets',
      'QTO Model Views with color-coded verification highlighting',
      'Variance reports comparing design revisions and cost impact analyses',
      'Data exports compatible with CostX, Assemble Systems, and PlanSwift'
    ],
    workflow: [
      { step: 'Model Audit for QTO Readiness', detail: 'Verifying all geometry is watertight, non-overlapping, and has correct material parameters.' },
      { step: 'Classification & Formula Setup', detail: 'Assigning CSI MasterFormat/UniFormat codes and calculating gross vs. net deductions.' },
      { step: 'Automated Schedule Extraction', detail: 'Exporting raw quantities into structured spreadsheets with embedded audit formulas.' },
      { step: 'Spot-Checking & QA Sign-off', detail: 'Independent manual spot-checks on 10% of critical high-value materials.' }
    ],
    software: ['Autodesk Revit', 'Assemble Systems', 'Navisworks Manage', 'Microsoft Excel'],
    benefits: [
      'Up to 80% faster quantity takeoff turnaround compared to manual 2D takeoff methods',
      'Eliminates human arithmetic and scaling errors across complex building geometries',
      'Rapid variance analysis when design modifications are issued',
      'Provides transparent audit trails between spreadsheet line items and 3D model elements'
    ],
    faqs: [
      { question: 'How do you handle openings and deductions in concrete walls?', answer: 'We follow standard surveying rules (such as NRM or POMI) to deduct window/door voids based on predefined threshold criteria.' },
      { question: 'Can you categorize quantities according to our internal cost codes?', answer: 'Yes, we map your proprietary cost breakdown structure into custom shared parameters inside the model.' }
    ],
    relatedServices: ['4d-5d-bim', 'structural-bim', 'architectural-bim', 'mep-bim']
  },
  {
    id: 'cad-drafting',
    title: 'CAD Drafting & Legacy Conversion',
    shortDesc: 'Professional 2D drafting, paper-to-CAD conversion, redline updates, and CAD-to-BIM migration with high precision.',
    fullDesc: 'We provide comprehensive 2D CAD drafting support for architects, structural engineers, and MEP contractors. We convert legacy hand-drawn blueprints, scanned PDFs, or microfiche records into clean, layered, and standardized AutoCAD DWG files, as well as providing the foundational step toward full BIM migration.',
    iconName: 'PenTool',
    lodLevels: ['AIA CAD Standards', 'ISO CAD Standards', 'Custom Layers'],
    scope: [
      'Architectural floor plans, elevations, building sections, and interior elevations',
      'Structural framing layouts, foundation details, and typical standard connection sheets',
      'MEP schematic line diagrams, single-line diagrams, and schematic flow charts',
      'Vectorization of scanned raster PDF and TIFF blueprints into editable DWG vectors',
      'Redline markup incorporation and as-built drawing revisions'
    ],
    deliverables: [
      'Layer-standardized AutoCAD files (.DWG and .DXF)',
      'Plot-ready vector PDF drawing sets with CTB plot style configurations',
      'CAD Block Libraries standardized with clean insertion points and attributes',
      'CAD to Revit preparatory spatial alignment drawings'
    ],
    workflow: [
      { step: 'Source Material Assessment', detail: 'Inspecting scan resolution, identifying dimensional benchmarks, and checking scaling.' },
      { step: 'Layer & Template Configuration', detail: 'Applying AIA/ISO layer conventions, line types, text styles, and dimension styles.' },
      { step: 'Precision Drafting & Dimensioning', detail: 'Re-drawing elements strictly to real-world metric or imperial dimensions.' },
      { step: 'Over-Plot Comparison Audit', detail: 'Overlaying vector DWG over original scans to guarantee 100% geometric faithfulness.' }
    ],
    software: ['Autodesk AutoCAD', 'AutoCAD Architecture', 'Bluebeam Revu', 'DraftSight'],
    benefits: [
      'Preserves legacy asset records in digital vector format',
      'Quick turnaround for high-volume redline drafting packages',
      'Strict adherence to client layering conventions and pen tables',
      'Cost-effective option for projects that do not require full 3D BIM parametric data'
    ],
    faqs: [
      { question: 'Can you work with both Imperial (feet/inches) and Metric units?', answer: 'Yes, our team is proficient with both US Imperial standards and International Metric units.' },
      { question: 'What layer standard do you default to?', answer: 'We default to AIA (American Institute of Architects) or ISO 13567 CAD standards unless your office standard is specified.' }
    ],
    relatedServices: ['architectural-bim', 'shop-drawings', 'as-built-bim', 'revit-families']
  },
  {
    id: 'as-built-bim',
    title: 'As-Built BIM & Digital Twin Handover',
    shortDesc: 'Reflecting actual site-installed conditions, field changes, and COBie asset metadata for operational facility management.',
    fullDesc: 'We deliver true As-Built BIM models that reflect the verified physical reality of the constructed facility. We incorporate field redlines, site survey notes, and post-construction laser scans to adjust element positions, invert elevations, and embed operations-and-maintenance (O&M) asset parameters for FM/Digital Twin systems.',
    iconName: 'CheckCircle2',
    lodLevels: ['LOD 500', 'COBie', 'BIM for FM'],
    scope: [
      'Updating design models to match field-verified as-built redlines and survey notes',
      'Reconciling laser scan point clouds with final constructed element locations',
      'Embedding COBie (Construction Operations Building Information Exchange) parameters',
      'Attaching equipment O&M manuals, serial numbers, warranty dates, and supplier info',
      'Preparing models for integration with CAFM / IWMS platforms like Maximo and Archibus'
    ],
    deliverables: [
      'LOD 500 As-Built Revit Models (.RVT) populated with verified field metadata',
      'COBie-compliant Excel Spreadsheets validated with COBie QC tools',
      'OpenBIM IFC Handover packages with custom FM property sets',
      'As-Built 2D Record Drawing Sets (PDF/DWG)'
    ],
    workflow: [
      { step: 'Field Markup Collection', detail: 'Compiling site contractor redlines, RFI responses, and final commissioning logs.' },
      { step: 'Model Geometry Realignment', detail: 'Adjusting duct runs, pipe elevations, and structural member positions to match as-built state.' },
      { step: 'Asset Parameter Injection', detail: 'Populating asset tags, serial numbers, manufacturer codes, and maintenance intervals.' },
      { step: 'COBie Validation Check', detail: 'Running automated schema checkers to guarantee data completeness for FM handover.' }
    ],
    software: ['Autodesk Revit', 'COBie Extension for Revit', 'Navisworks Manage', 'Autodesk Tandem'],
    benefits: [
      'Provides facility managers with an accurate digital twin for lifelong operations',
      'Reduces maintenance search times for valves, filters, and equipment isolation switches',
      'Enables smooth handover from general contractor to building owner',
      'Forms the foundation for IoT sensor integration and smart building analytics'
    ],
    faqs: [
      { question: 'What is COBie and why is it important?', answer: 'COBie is an international standard for publishing building asset data (equipment lists, warranty dates, spare parts) directly from the BIM model for facility management systems without manual data entry.' },
      { question: 'How do you verify as-built accuracy?', answer: 'We cross-reference contractor site redline drawings, submittal documents, and point cloud verification scans.' }
    ],
    relatedServices: ['scan-to-bim', 'mep-bim', 'bep-consulting', 'architectural-bim']
  },
  {
    id: 'revit-families',
    title: 'Revit Family Creation (BIM Content)',
    shortDesc: 'Custom parametric Revit family (.RFA) libraries for building product manufacturers, contractors, and design firms.',
    fullDesc: 'We develop intelligent, parametric Revit families (.RFA) for building product manufacturers, MEP equipment suppliers, and architectural practices. Our families feature lightweight geometry, multiple levels of detail (Coarse, Medium, Fine), customizable parametric constraints, electrical/piping connectors, and shared parameter integration.',
    iconName: 'Component',
    lodLevels: ['Parametric .RFA', 'LOD 200 to 400 Content'],
    scope: [
      'Architectural families: parametric doors, windows, curtain panels, furniture, and cabinetry',
      'MEP equipment families: pumps, air handling units, chillers, boilers, luminaires, and electrical switchgear',
      'Structural components: parametric precast panels, custom steel brackets, and foundations',
      'Parametric type catalogs (.txt) allowing hundreds of size variations from one lightweight family',
      'Embedded MEP flow rates, electrical voltage, connector orientations, and pressure drops'
    ],
    deliverables: [
      'Clean, lightweight Revit Family Files (.RFA) with optimized file sizes (<1 MB where possible)',
      'Type Catalog Text Files (.TXT) for multi-variant product lines',
      'Sample Revit Project (.RVT) demonstrating all family types, flex parameters, and schedules',
      'User guides and parameter mapping specification sheets'
    ],
    workflow: [
      { step: 'Manufacturer Cut-sheet Ingestion', detail: 'Reviewing 2D CAD drawings, dimension matrices, and technical product catalogs.' },
      { step: 'Reference Plane & Parameter Skeleton', detail: 'Setting up robust reference planes, dimension parameters, and formula constraints.' },
      { step: 'Geometry Modeling & LOD Control', detail: 'Creating clean solids and assign display visibility for Coarse, Medium, and Fine views.' },
      { step: 'Connector Configuration & Flex Testing', detail: 'Configuring MEP connectors with appropriate flow direction and testing extreme parameter values.' }
    ],
    software: ['Autodesk Revit Family Editor', 'AutoCAD', 'SolidWorks / Inventor (for geometry import)'],
    benefits: [
      'Product manufacturers can get their exact products specified directly by architects and engineers',
      'Eliminates bloated, slow-loading project models through optimized family geometry',
      'Accurate MEP system calculations with correctly defined system connectors',
      'Custom formulas automatically drive clearances and mounting options'
    ],
    faqs: [
      { question: 'Why shouldn’t we just convert 3D CAD or STEP files directly into Revit?', answer: 'Direct CAD imports bloat Revit file sizes and lack parametric flexibility, formula controls, proper MEP connectors, and 2D symbol overrides. We build native Revit geometry with optimized reference planes.' },
      { question: 'Do you create type catalogs for families with dozens of sizes?', answer: 'Yes, we provide external type catalogs (.txt) so designers only load the specific product size needed, keeping models fast.' }
    ],
    relatedServices: ['architectural-bim', 'mep-bim', 'structural-bim', 'shop-drawings']
  }
];
