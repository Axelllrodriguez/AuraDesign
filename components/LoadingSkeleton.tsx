
import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full aspect-square bg-[#121212] rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
        <div className="text-center">
          <p className="text-white/80 font-medium text-lg">Visualizing your aura...</p>
          <p className="text-white/40 text-sm mt-1">Nano Banana is crafting perfection</p>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
