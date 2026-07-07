import React from 'react';
import { OrbiterId } from '../types';

const STROKE = '#8082f8';

/** Pixel-art icons for the six disciplines orbiting the hero. */
const ICONS: Record<OrbiterId, React.ReactNode> = {
  // AI spark / neural node — AI Operations
  'ai-spark': (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" fill="none" stroke={STROKE} strokeWidth="1" aria-hidden="true">
      <rect x="10" y="10" width="4" height="4" fill={STROKE} stroke="none" />
      <rect x="11" y="2" width="2" height="5" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="11" y="17" width="2" height="5" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="2" y="11" width="5" height="2" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="17" y="11" width="5" height="2" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="4" y="4" width="3" height="3" stroke={STROKE} fill="none" />
      <rect x="17" y="4" width="3" height="3" stroke={STROKE} fill="none" />
      <rect x="4" y="17" width="3" height="3" stroke={STROKE} fill="none" />
      <rect x="17" y="17" width="3" height="3" stroke={STROKE} fill="none" />
      <rect x="8" y="8" width="1" height="1" fill={STROKE} stroke="none" opacity="0.6" />
      <rect x="15" y="8" width="1" height="1" fill={STROKE} stroke="none" opacity="0.6" />
      <rect x="8" y="15" width="1" height="1" fill={STROKE} stroke="none" opacity="0.6" />
      <rect x="15" y="15" width="1" height="1" fill={STROKE} stroke="none" opacity="0.6" />
    </svg>
  ),
  // Chart trending up — Growth
  'chart-up': (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" fill="none" stroke={STROKE} strokeWidth="1" aria-hidden="true">
      <rect x="3" y="3" width="1" height="18" fill={STROKE} stroke="none" />
      <rect x="3" y="20" width="18" height="1" fill={STROKE} stroke="none" />
      <rect x="6" y="14" width="3" height="6" stroke={STROKE} fill="none" />
      <rect x="11" y="10" width="3" height="10" stroke={STROKE} fill="none" />
      <rect x="16" y="6" width="3" height="14" stroke={STROKE} fill="none" />
      <rect x="7" y="10" width="2" height="2" fill={STROKE} stroke="none" opacity="0.7" />
      <rect x="10" y="8" width="2" height="2" fill={STROKE} stroke="none" opacity="0.7" />
      <rect x="13" y="6" width="2" height="2" fill={STROKE} stroke="none" opacity="0.7" />
      <rect x="16" y="3" width="2" height="2" fill={STROKE} stroke="none" />
      <rect x="19" y="3" width="2" height="1" fill={STROKE} stroke="none" />
      <rect x="20" y="3" width="1" height="3" fill={STROKE} stroke="none" />
    </svg>
  ),
  // Scales of justice — Legal Rigor
  scales: (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" fill="none" stroke={STROKE} strokeWidth="1" aria-hidden="true">
      <rect x="11" y="2" width="2" height="2" fill={STROKE} stroke="none" />
      <rect x="11" y="4" width="2" height="14" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="4" y="5" width="16" height="1" fill={STROKE} stroke="none" />
      <rect x="4" y="6" width="1" height="4" fill={STROKE} stroke="none" opacity="0.7" />
      <rect x="19" y="6" width="1" height="4" fill={STROKE} stroke="none" opacity="0.7" />
      <rect x="1" y="10" width="7" height="1" fill={STROKE} stroke="none" />
      <rect x="1" y="11" width="1" height="2" fill={STROKE} stroke="none" opacity="0.6" />
      <rect x="7" y="11" width="1" height="2" fill={STROKE} stroke="none" opacity="0.6" />
      <rect x="2" y="13" width="5" height="1" fill={STROKE} stroke="none" opacity="0.8" />
      <rect x="16" y="10" width="7" height="1" fill={STROKE} stroke="none" />
      <rect x="16" y="11" width="1" height="2" fill={STROKE} stroke="none" opacity="0.6" />
      <rect x="22" y="11" width="1" height="2" fill={STROKE} stroke="none" opacity="0.6" />
      <rect x="17" y="13" width="5" height="1" fill={STROKE} stroke="none" opacity="0.8" />
      <rect x="8" y="19" width="8" height="1" fill={STROKE} stroke="none" />
      <rect x="10" y="18" width="4" height="1" fill={STROKE} stroke="none" opacity="0.7" />
    </svg>
  ),
  // Megaphone — Community
  megaphone: (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" fill="none" stroke={STROKE} strokeWidth="1" aria-hidden="true">
      <rect x="2" y="9" width="8" height="6" stroke={STROKE} fill="none" />
      <rect x="10" y="8" width="1" height="1" fill={STROKE} stroke="none" />
      <rect x="11" y="7" width="1" height="1" fill={STROKE} stroke="none" />
      <rect x="12" y="6" width="1" height="1" fill={STROKE} stroke="none" />
      <rect x="10" y="15" width="1" height="1" fill={STROKE} stroke="none" />
      <rect x="11" y="16" width="1" height="1" fill={STROKE} stroke="none" />
      <rect x="12" y="17" width="1" height="1" fill={STROKE} stroke="none" />
      <rect x="13" y="4" width="1" height="16" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="14" y="5" width="1" height="14" fill={STROKE} stroke="none" opacity="0.4" />
      <rect x="4" y="15" width="3" height="5" stroke={STROKE} fill="none" />
      <rect x="17" y="7" width="2" height="1" fill={STROKE} stroke="none" opacity="0.8" />
      <rect x="18" y="11" width="3" height="1" fill={STROKE} stroke="none" opacity="0.8" />
      <rect x="17" y="15" width="2" height="1" fill={STROKE} stroke="none" opacity="0.8" />
    </svg>
  ),
  // Code brackets { } — Builder
  code: (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" fill="none" stroke={STROKE} strokeWidth="1" aria-hidden="true">
      <rect x="7" y="3" width="3" height="1" fill={STROKE} stroke="none" />
      <rect x="6" y="4" width="2" height="6" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="4" y="10" width="3" height="1" fill={STROKE} stroke="none" />
      <rect x="4" y="13" width="3" height="1" fill={STROKE} stroke="none" />
      <rect x="6" y="14" width="2" height="6" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="7" y="20" width="3" height="1" fill={STROKE} stroke="none" />
      <rect x="14" y="3" width="3" height="1" fill={STROKE} stroke="none" />
      <rect x="16" y="4" width="2" height="6" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="17" y="10" width="3" height="1" fill={STROKE} stroke="none" />
      <rect x="17" y="13" width="3" height="1" fill={STROKE} stroke="none" />
      <rect x="16" y="14" width="2" height="6" fill={STROKE} stroke="none" opacity="0.9" />
      <rect x="14" y="20" width="3" height="1" fill={STROKE} stroke="none" />
      <rect x="11" y="8" width="2" height="2" fill={STROKE} stroke="none" opacity="0.5" />
      <rect x="11" y="14" width="2" height="2" fill={STROKE} stroke="none" opacity="0.5" />
    </svg>
  ),
  // Rocket — Founder (kept from the original set)
  rocket: (
    <svg viewBox="0 0 32 32" shapeRendering="crispEdges" fill="none" stroke={STROKE} strokeWidth="0.5" aria-hidden="true">
      <rect x="15" y="1" width="2" height="1" fill={STROKE} stroke="none" />
      <rect x="14" y="2" width="4" height="1" fill={STROKE} stroke="none" />
      <rect x="13" y="3" width="6" height="1" stroke={STROKE} fill="none" />
      <rect x="12" y="4" width="8" height="1" stroke={STROKE} fill="none" />
      <rect x="11" y="5" width="10" height="1" stroke={STROKE} fill="none" />
      <rect x="11" y="6" width="10" height="12" stroke={STROKE} fill="none" />
      <rect x="14" y="8" width="4" height="3" stroke={STROKE} fill="none" />
      <rect x="15" y="9" width="2" height="1" fill={STROKE} stroke="none" />
      <rect x="12" y="12" width="8" height="1" stroke={STROKE} fill="none" />
      <rect x="12" y="15" width="8" height="1" stroke={STROKE} fill="none" />
      <rect x="8" y="14" width="3" height="1" stroke={STROKE} fill="none" />
      <rect x="7" y="15" width="4" height="1" stroke={STROKE} fill="none" />
      <rect x="6" y="16" width="5" height="2" stroke={STROKE} fill="none" />
      <rect x="7" y="18" width="4" height="1" stroke={STROKE} fill="none" />
      <rect x="8" y="19" width="3" height="1" stroke={STROKE} fill="none" />
      <rect x="8" y="16" width="2" height="1" fill={STROKE} stroke="none" opacity="0.6" />
      <rect x="21" y="14" width="3" height="1" stroke={STROKE} fill="none" />
      <rect x="21" y="15" width="4" height="1" stroke={STROKE} fill="none" />
      <rect x="21" y="16" width="5" height="2" stroke={STROKE} fill="none" />
      <rect x="21" y="18" width="4" height="1" stroke={STROKE} fill="none" />
      <rect x="21" y="19" width="3" height="1" stroke={STROKE} fill="none" />
      <rect x="22" y="16" width="2" height="1" fill={STROKE} stroke="none" opacity="0.6" />
      <rect x="13" y="18" width="6" height="2" stroke={STROKE} fill="none" />
      <rect x="14" y="20" width="4" height="1" stroke={STROKE} fill="none" />
      <rect x="15" y="21" width="2" height="2" fill={STROKE} stroke="none" />
      <rect x="14" y="23" width="1" height="2" fill={STROKE} stroke="none" opacity="0.7" />
      <rect x="17" y="23" width="1" height="2" fill={STROKE} stroke="none" opacity="0.7" />
      <rect x="15" y="23" width="2" height="4" fill={STROKE} stroke="none" opacity="0.85" />
      <rect x="15" y="27" width="2" height="2" fill={STROKE} stroke="none" opacity="0.5" />
      <rect x="16" y="29" width="1" height="1" fill={STROKE} stroke="none" opacity="0.3" />
    </svg>
  ),
};

export const OrbiterIcon: React.FC<{ id: OrbiterId }> = ({ id }) => <>{ICONS[id]}</>;
