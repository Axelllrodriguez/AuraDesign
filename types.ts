
export type LensGeometry = 'angular' | 'medio' | 'retrato';
export type LightProfile = 'dawn' | 'noon' | 'golden' | 'night';
export type Environment = 'interior' | 'exterior';
export type Optics = 'bokeh' | 'source';

export interface ArtDirection {
  lens: LensGeometry;
  light: LightProfile;
  environment: Environment;
  optics: Optics;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  config: ArtDirection;
  timestamp: number;
}

export type AppMode = 'generate' | 'edit';

/**
 * Added VisualStyle interface to fix the missing member error in StyleSelector.tsx
 */
export interface VisualStyle {
  id: string;
  name: string;
  thumbnail: string;
  config: ArtDirection;
}
