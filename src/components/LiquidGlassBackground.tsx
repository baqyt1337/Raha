import React from 'react';

export const LiquidGlassBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Base deep dark gradient */}
      <div className="absolute inset-0 bg-[#070b14]" />

      {/* Floating fluid gradient blob 1 - Cyan / Teal */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-cyan-600/15 blur-[120px] animate-liquid-1"
        style={{ willChange: 'transform' }}
      />

      {/* Floating fluid gradient blob 2 - Deep Blue / Indigo */}
      <div 
        className="absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-blue-600/12 blur-[130px] animate-liquid-2"
        style={{ willChange: 'transform' }}
      />

      {/* Floating fluid gradient blob 3 - Soft Violet / Cobalt */}
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[140px] animate-liquid-1"
        style={{ animationDuration: '28s', willChange: 'transform' }}
      />

      {/* Subtle fine dot grid texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};
