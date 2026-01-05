
import { VisualStyle } from './types';

export const LOGO_URL = 'https://res.cloudinary.com/dwspyodrs/image/upload/v1767403165/4_hvuffa.png';

export const LENS_MAPPING = {
  angular: 'ultra-wide angle lens, 14mm, cinematic perspective, expansive view',
  medio: 'standard 35mm lens, natural perspective, balanced composition',
  retrato: '85mm prime lens, tight composition, portrait photography style, detailed features'
};

export const LIGHT_MAPPING = {
  dawn: 'dawn lighting, soft blue and pink morning hues, ethereal atmosphere, low contrast',
  noon: 'high noon sunlight, bright clear shadows, vibrant colors, high clarity',
  golden: 'golden hour, warm amber glow, long dramatic shadows, soft backlight',
  night: 'midnight atmosphere, deep shadows, subtle moonlight, nocturnal cinematic lighting'
};

export const ENV_MAPPING = {
  interior: 'indoor setting, architectural interior, controlled environment',
  exterior: 'outdoor setting, natural environment, open air'
};

export const OPTICS_MAPPING = {
  bokeh: 'creamy bokeh, shallow depth of field, blurred background',
  source: 'sharp focus throughout, high frequency detail, technical precision'
};

export const VISUAL_STYLES: VisualStyle[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Night',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'angular', light: 'night', environment: 'exterior', optics: 'bokeh' }
  },
  {
    id: 'minimal',
    name: 'Soft Minimal',
    thumbnail: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'medio', light: 'noon', environment: 'interior', optics: 'source' }
  },
  {
    id: 'editorial',
    name: 'Vogue Editorial',
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'retrato', light: 'golden', environment: 'exterior', optics: 'bokeh' }
  },
  {
    id: 'noir',
    name: 'Film Noir',
    thumbnail: 'https://images.unsplash.com/photo-1554126807-6b10f6f6692a?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'retrato', light: 'night', environment: 'interior', optics: 'source' }
  },
  {
    id: 'architecture',
    name: 'Hyper Architecture',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'angular', light: 'noon', environment: 'exterior', optics: 'source' }
  },
  {
    id: 'ethereal',
    name: 'Dreamy Ethereal',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'medio', light: 'dawn', environment: 'exterior', optics: 'bokeh' }
  },
  {
    id: 'cinematic',
    name: 'Moody Cinema',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'angular', light: 'golden', environment: 'exterior', optics: 'bokeh' }
  },
  {
    id: 'neon-street',
    name: 'Neon Street',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'medio', light: 'night', environment: 'exterior', optics: 'bokeh' }
  },
  {
    id: 'golden-nature',
    name: 'Golden Nature',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'angular', light: 'golden', environment: 'exterior', optics: 'source' }
  },
  {
    id: 'analog',
    name: 'Analog Film',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'medio', light: 'golden', environment: 'exterior', optics: 'source' }
  },
  {
    id: 'macro',
    name: 'Macro Detail',
    thumbnail: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'retrato', light: 'noon', environment: 'interior', optics: 'bokeh' }
  },
  {
    id: 'synthwave',
    name: 'Retro Synth',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&h=400&q=80',
    config: { lens: 'angular', light: 'night', environment: 'exterior', optics: 'bokeh' }
  }
];
