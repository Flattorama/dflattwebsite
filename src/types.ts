export interface CardData {
  id: string;
  clientName: string;
  projectTitle: string;
  years: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /** External URL (https://…), internal route (/…), or '' for no link. */
  link: string;
  themeColor: string;
  rotation: number;
}

export type OrbiterId =
  | 'ai-spark'
  | 'chart-up'
  | 'scales'
  | 'megaphone'
  | 'code'
  | 'rocket';

export interface OrbiterDef {
  id: OrbiterId;
  /** Discipline label shown as a chip when the orbiter is at front-of-orbit. */
  label: string;
}

export interface OrbitConfig {
  durationMs: number;
  /** Ellipse X radius as a fraction of the hero content width. */
  radiusXFactor: number;
  /** Degrees the orbit plane is flattened by (Y radius = X radius * cos). */
  flattenDeg: number;
  /** Rotation of the whole ellipse in the page plane. */
  tiltDeg: number;
  /** Per-orbiter angular speed multipliers (~±3%). */
  speedOffsets: number[];
  bobAmplitudePx: number;
  bobFrequencies: number[];
  /** depthFactor above which the discipline label chip fades in. */
  labelDepthThreshold: number;
  repelRadiusPx: number;
  repelStrength: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface Post extends PostMeta {
  html: string;
}
