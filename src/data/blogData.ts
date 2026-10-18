import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 'lod-specifications-guide',
    title: 'Understanding LOD 100 to LOD 500: A Practical Guide for AEC Project Managers',
    category: 'BIM Standards',
    readTime: '6 min read',
    date: 'October 2026',
    author: 'Aman Kumar, Head of Operations — Architecture & Structure',
    summary: 'Demystifying BIMForum Level of Development specifications and setting realistic information expectations across project milestones.',
    content: [
      'Level of Development (LOD) is often misunderstood as a measure of 3D visual detail (Level of Detail). In reality, LOD defines the reliability of the model element geometry and non-graphical information at each stage of design and construction.',
      'At LOD 100, building massing and overall volume are conceptualized. By LOD 300, elements are graphically represented as specific systems with precise dimensions, quantity, size, shape, and orientation.',
      'Moving into LOD 350, model elements interface with other building systems, incorporating connection brackets and clear service clearances. LOD 400 models are fabrication-ready with shop-level parameters, while LOD 500 represents field-verified as-built conditions with COBie asset tags for lifelong facility management.'
    ]
  },
  {
    id: 'mep-clash-matrix-strategy',
    title: 'Zero-Collision BIM: Designing a Multi-Disciplinary MEP Clash Matrix',
    category: 'Coordination',
    readTime: '5 min read',
    date: 'September 2026',
    author: 'Mithilesh Sharma, Head of Operations & Delivery — MEP',
    summary: 'How to structure tolerance rules in Navisworks to avoid coordination gridlock and focus engineering teams on high-impact conflicts.',
    content: [
      'Running automated clash tests without a well-defined matrix results in thousands of false positives that overwhelm coordination teams. A true engineering approach categorizes clashes by trade priority and construction sequencing.',
      'Gravity-driven drainage piping and large ductwork must hold priority over flexible cable containment and domestic water lines. Structural concrete elements must never be compromised without registered structural engineer calculations and sleeve review.',
      'By establishing standard tolerance envelopes (e.g. 25mm clearance for insulated chilled water pipes and 500mm maintenance access for AHU filter pull), coordination meetings shift from finger-pointing to proactive engineering solutions.'
    ]
  },
  {
    id: 'scan-to-bim-renovation-success',
    title: 'High-Precision Scan-to-BIM: Mitigating Risk in Complex Heritage and Brownfield Retrofits',
    category: 'Reality Capture',
    readTime: '7 min read',
    date: 'August 2026',
    author: 'BIM Engineering Research Team',
    summary: 'Harnessing terrestrial LiDAR laser scanning and LOA tolerances to modernize historical buildings without structural surprises.',
    content: [
      'Brownfield renovations and historic restorations carry immense financial risks when legacy blueprints are inaccurate or missing. Laser scanning captures millions of coordinates with millimeter accuracy, providing an undeniable record of existing conditions.',
      'Converting point cloud data into parametric Revit elements requires strict adherence to USIBD Level of Accuracy (LOA) specifications. Understanding which elements require LOA 20 (approximate location) versus LOA 40 (high-precision structural tie-ins) keeps project budgets efficient.',
      'Surface deviation heatmaps generated between point clouds and proposed new structural frames immediately identify sagging floor slabs, out-of-plumb masonry, and potential clash points months before contractor mobilization.'
    ]
  }
];
