export interface LeaderProfile {
  id: string;
  name: string;
  designation: string;
  discipline: string;
  initials: string;
  leadershipMessage: string;
  focusAreas: string[];
  accentColor: 'blue' | 'red';
  iconType: 'compass' | 'building' | 'layers';
}

export const leadershipTeam: LeaderProfile[] = [
  {
    id: 'gunja-ranjana-sharma',
    name: 'Gunja and Ranjana Sharma',
    designation: 'Director',
    discipline: 'Strategic Direction & Client Partnerships',
    initials: 'GRS',
    leadershipMessage:
      'Driving the vision of SHILP BIM Solutions with a focus on quality, innovation, and long-term client relationships. Committed to building a collaborative team culture and delivering professional BIM solutions that meet the evolving needs of the construction industry.',
    focusAreas: [
      'Strategic Vision & Growth',
      'Client Relationship Governance',
      'Quality Standards & Culture',
      'Collaborative Team Development'
    ],
    accentColor: 'blue',
    iconType: 'compass'
  },
  {
    id: 'aman-kumar',
    name: 'Aman Kumar',
    designation: 'Head of Operations & Delivery, Architecture and Structure',
    discipline: 'Architecture & Structural Delivery',
    initials: 'AK',
    leadershipMessage:
      'Leading architectural and structural BIM operations with an emphasis on coordinated modeling, technical accuracy, and efficient project delivery. Focused on strengthening collaboration between teams and maintaining consistent quality throughout the project lifecycle.',
    focusAreas: [
      'Parametric Architectural Modeling',
      'Structural Framing & Rebar Detailing',
      'Constructability & Code Validation',
      'Cross-Disciplinary Coordination'
    ],
    accentColor: 'blue',
    iconType: 'building'
  },
  {
    id: 'mithilesh-sharma',
    name: 'Mithilesh Sharma',
    designation: 'Head of Operations & Delivery, MEP',
    discipline: 'MEP Operations & Multi-Trade Delivery',
    initials: 'MS',
    leadershipMessage:
      'Overseeing MEP BIM operations and delivery with a focus on coordinated building services, interdisciplinary collaboration, and systematic quality reviews. Committed to improving coordination workflows and supporting efficient, reliable project execution.',
    focusAreas: [
      'HVAC, Electrical & Plumbing Services',
      'Federated Clash Detection & Triage',
      'Builders Work in Connection (BWIC)',
      'Combined Services Documentation'
    ],
    accentColor: 'blue',
    iconType: 'layers'
  }
];
