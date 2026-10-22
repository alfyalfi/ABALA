'use client';

import React from 'react';

/**
 * Ambient Animated Fluid Mesh Background
 * Gives the Liquid Glass components vibrant colors to refract, blur and distort.
 */
export const LiquidMeshBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Background Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-rose-50/40 to-amber-50/50" />

      {/* Fluid Blob 1: Hero Ruby / Coral Glow (Top-Left) */}
      <div 
        className="absolute -top-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-rose-400/35 to-red-500/25 blur-3xl animate-blob-1"
      />

      {/* Fluid Blob 2: Warm Amber / Gold Sun (Bottom-Right) */}
      <div 
        className="absolute -bottom-28 -right-24 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-bl from-amber-400/30 to-orange-400/20 blur-3xl animate-blob-2"
      />

      {/* Fluid Blob 3: Vibrant Azure / Cyan Breeze (Top-Right) */}
      <div 
        className="absolute -top-20 -right-20 w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-br from-sky-400/25 to-blue-500/20 blur-3xl animate-blob-3"
      />

      {/* Fluid Blob 4: Soft Violet / Rose Dream (Center-Bottom) */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-purple-300/20 to-pink-300/25 blur-3xl animate-blob-1"
      />
    </div>
  );
};

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'glass' | 'ruby' | 'emerald' | 'amber' | 'azure' | 'rose' | 'subtle';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  pill?: boolean;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  className = '',
  variant = 'glass',
  size = 'md',
  pill = true,
  disabled = false,
  ...props
}) => {
  const variantStyles = {
    glass: 'liquid-glass text-hero-black hover:bg-white/80 active:bg-white/60',
    ruby: 'liquid-tint-ruby text-white hover:brightness-105 active:brightness-95',
    emerald: 'liquid-tint-emerald text-white hover:brightness-105 active:brightness-95',
    amber: 'liquid-tint-amber text-white hover:brightness-105 active:brightness-95',
    azure: 'liquid-tint-azure text-white hover:brightness-105 active:brightness-95',
    rose: 'liquid-tint-rose text-white hover:brightness-105 active:brightness-95',
    subtle: 'liquid-glass-subtle text-slate-700 hover:text-hero-black hover:bg-white/60 active:bg-white/40'
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[42px]',
    lg: 'text-base px-5 py-3 gap-2.5 min-h-[50px]',
    icon: 'p-0 w-9 h-9 sm:w-10 sm:h-10 justify-center items-center'
  };

  const shapeStyle = pill ? 'rounded-full' : 'rounded-2xl sm:rounded-3xl';

  return (
    <button
      disabled={disabled}
      className={`relative inline-flex items-center justify-center font-black liquid-interactive liquid-lens-sheen cursor-pointer ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${shapeStyle} ${
        disabled ? 'opacity-40 pointer-events-none grayscale' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
