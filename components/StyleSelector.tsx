
import React from 'react';
import { VISUAL_STYLES } from '../constants';
import { VisualStyle } from '../types';

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (style: VisualStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelect }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If image fails to load, use a solid dark background as fallback
    e.currentTarget.style.display = 'none';
    e.currentTarget.parentElement!.style.backgroundColor = '#1a1a1a';
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-2 custom-scrollbar snap-x">
      {VISUAL_STYLES.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelect(style)}
          className={`group flex-shrink-0 relative w-40 h-40 rounded-2xl overflow-hidden transition-all duration-300 snap-start border-2 ${
            selectedStyleId === style.id ? 'border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-transparent hover:border-white/30'
          }`}
        >
          <img 
            src={style.thumbnail} 
            alt={style.name} 
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-3">
            <span className="text-xs font-semibold text-white tracking-wide uppercase">{style.name}</span>
          </div>
          {selectedStyleId === style.id && (
            <div className="absolute top-2 right-2 bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
