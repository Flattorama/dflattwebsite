import { CardData, OrbiterDef, OrbitConfig } from './types';

import tbdcCover from './assets/cards/tbdc.svg';
import lumin8Cover from './assets/cards/lumin8.svg';
import sportballCover from './assets/cards/sportball.svg';
import bellCover from './assets/cards/bell.svg';
import metavrseCover from './assets/cards/metavrse.svg';
import amdCover from './assets/cards/amd.svg';
import naborinoCover from './assets/cards/naborino.svg';
import merckuCover from './assets/cards/mercku.svg';
import communityCover from './assets/cards/community.svg';
import reportingCover from './assets/cards/reporting.svg';

export const CARDS: CardData[] = [
  {
    id: 'card-tbdc',
    clientName: 'TBDC / BHIVE',
    projectTitle: 'Running 5 Brands on an AI-Native Operating System',
    years: '2025 – Present',
    tags: ['AI Operations', 'Multi-Brand', 'Ecosystem'],
    image: tbdcCover,
    imageAlt: 'Branded cover for TBDC / BHive with a pixel-art neural node motif on a purple gradient.',
    link: 'https://www.tbdc.com',
    themeColor: '#8082f8',
    rotation: -4,
  },
  {
    id: 'card-lumin8',
    clientName: 'LUMIN8 AGENCY',
    projectTitle: 'Scaling a Distributed Global Growth Engine (+35% ROAS, +40% LinkedIn Leads)',
    years: '2020 – Present',
    tags: ['Growth Strategy', 'AI Operations', 'Agency Leadership'],
    image: lumin8Cover,
    imageAlt: 'Branded cover for Lumin8 Agency with a pixel-art rising arrow motif on a blue gradient.',
    link: 'https://lumin8.agency',
    themeColor: '#0055FF',
    rotation: 3,
  },
  {
    id: 'card-sportball',
    clientName: 'SPORTBALL',
    projectTitle: 'Digital Transformation & CAC Reduction (-67%)',
    years: '2023 – 2024',
    tags: ['Franchise Growth', 'Performance Marketing', 'Analytics'],
    image: sportballCover,
    imageAlt: 'Branded cover for Sportball with a pixel-art ball motif on an orange gradient.',
    link: 'https://sportball.com',
    themeColor: '#FF4500',
    rotation: -2,
  },
  {
    id: 'card-bell',
    clientName: 'BELL CANADA',
    projectTitle: '#BellLetsTalk & Social Data at National Scale',
    years: '2012 – 2016',
    tags: ['Social Analytics', 'Customer Experience', 'Telecom'],
    image: bellCover,
    imageAlt: 'Branded cover for Bell Canada with a pixel-art speech bubble motif on a green gradient.',
    link: '',
    themeColor: '#006400',
    rotation: 4,
  },
  {
    id: 'card-metavrse',
    clientName: 'METAVRSE',
    projectTitle: "Founding One of Canada's First Enterprise VR/AR Agencies",
    years: '2016 – 2018',
    tags: ['VR/AR', 'Founder', 'Innovation'],
    image: metavrseCover,
    imageAlt: 'Branded cover for Metavrse with a pixel-art VR headset motif on a magenta gradient.',
    link: '',
    themeColor: '#C71585',
    rotation: -5,
  },
  {
    id: 'card-amd',
    clientName: 'AMD (GPUOPEN)',
    projectTitle: 'Building an Open-Source Developer Community',
    years: '2018',
    tags: ['DevRel', 'Open Source', 'Tech Marketing'],
    image: amdCover,
    imageAlt: 'Branded cover for AMD GPUOpen with a pixel-art GPU chip motif on a red gradient.',
    link: '',
    themeColor: '#B22222',
    rotation: 2,
  },
  {
    id: 'card-naborino',
    clientName: 'NABORINO',
    projectTitle: 'Bootstrapping a Hyperlocal Commerce Marketplace',
    years: '2020 – 2023',
    tags: ['Founder', 'Community Building', 'PR Strategy'],
    image: naborinoCover,
    imageAlt: 'Branded cover for Naborino with a pixel-art house motif on a teal gradient.',
    link: '',
    themeColor: '#008B8B',
    rotation: 5,
  },
  {
    id: 'card-mercku',
    clientName: 'MERCKU',
    projectTitle: 'Global Go-To-Market for Consumer Hardware',
    years: '2019 – 2020',
    tags: ['E-Commerce', 'Global Strategy', 'Consumer Tech'],
    image: merckuCover,
    imageAlt: 'Branded cover for Mercku with a pixel-art Wi-Fi motif on a steel-blue gradient.',
    link: '',
    themeColor: '#4682B4',
    rotation: -3,
  },
  {
    id: 'card-community',
    clientName: 'COMMUNITY LEADERSHIP',
    projectTitle: 'Community Leadership & Crisis Mobilization',
    years: '2023 – Present',
    tags: ['Leadership', 'Mobilization', 'Non-Profit'],
    image: communityCover,
    imageAlt: 'Branded cover for Community Leadership with a pixel-art megaphone motif on a sienna gradient.',
    link: '/community',
    themeColor: '#A0522D',
    rotation: 2,
  },
  {
    id: 'card-reporting',
    clientName: 'DIGITAL CORPORATE REPORTING',
    projectTitle: 'Interactive Financial Storytelling (React + D3.js)',
    years: '2024 – Present',
    tags: ['Data Visualization', 'Creative Tech'],
    image: reportingCover,
    imageAlt: 'Branded cover for Digital Corporate Reporting with a pixel-art bar chart motif on an indigo gradient.',
    link: '',
    themeColor: '#4B0082',
    rotation: -2,
  },
];

export const HERO_PHRASES: string[] = [
  'I USED TO BE A LAWYER, BUT I GOT BETTER',
  "I DON'T TALK ABOUT AI. I SHIP IT",
  'STRUCTURING CHAOS FOR GROWTH',
  '5 BRANDS. ONE OPERATING SYSTEM',
  'AGENTS, WORKFLOWS & TEAMS',
  '2X FOUNDER. FULL-TIME OPERATOR',
  'MARKETING THAT RUNS ON AI',
  'BUILDING IN TORONTO',
];

export const HERO_MICROCOPY =
  'Senior Director of Marketing, TBDC · Partner, Lumin8 · Ex-Bell, AMD';

export const ORBITERS: OrbiterDef[] = [
  { id: 'ai-spark', label: 'AI Operations' },
  { id: 'chart-up', label: 'Growth' },
  { id: 'scales', label: 'Legal Rigor' },
  { id: 'megaphone', label: 'Community' },
  { id: 'code', label: 'Builder' },
  { id: 'rocket', label: 'Founder' },
];

export const ORBIT_CONFIG: OrbitConfig = {
  durationMs: 12000,
  radiusXFactor: 0.6,
  flattenDeg: 70,
  tiltDeg: -10,
  speedOffsets: [1.02, 0.98, 1.03, 0.97, 1.01, 0.99],
  bobAmplitudePx: 4,
  bobFrequencies: [0.9, 1.1, 1.0, 1.2, 0.8, 1.05],
  labelDepthThreshold: 0.85,
  repelRadiusPx: 120,
  repelStrength: 0.4,
};

export const SITE = {
  url: 'https://danflatt.ca',
  title: 'Dan Flatt — Marketing & AI Leader | Speaker, 2x Founder',
  description:
    'Senior marketing executive and 2x tech founder building AI-native marketing organizations — agents, workflows, and teams. Speaker and writer on AI in marketing. Toronto.',
  email: 'hi@danflatt.ca',
  linkedin: 'https://www.linkedin.com/in/danielflatt/',
  github: 'https://github.com/Flattorama',
  lumin8: 'https://lumin8.agency',
};
