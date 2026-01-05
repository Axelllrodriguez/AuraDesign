
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageHistoryProps {
  history: GeneratedImage[];
  onSelect: (image: GeneratedImage) => void;
}

export const ImageHistory: React.FC<ImageHistoryProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12 w-full max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/60 text-sm font-medium uppercase tracking-widest">Recent Generations</h3>
        <span className="text-white/30 text-xs">{history.length} items</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {history.map((img) => (
          <button
            key={img.id}
            onClick={() => onSelect(img)}
            className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-white/5 hover:border-white/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
