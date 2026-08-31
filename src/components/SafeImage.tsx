import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  alt?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc, 
  className,
  ...props 
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const [failed, setFailed] = useState(false);

  // Helper to resolve URL for GitHub Pages / subpaths
  const resolveUrl = (targetUrl?: string): string => {
    if (!targetUrl) return '';
    let resolved = targetUrl;
    if (resolved.startsWith('/') && !resolved.startsWith('//')) {
      const base = import.meta.env.BASE_URL || '/';
      let prefix = '';
      if (base !== '/') {
        prefix = base.endsWith('/') ? base.slice(0, -1) : base;
      } else if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
          prefix = `/${pathParts[0]}`;
        }
      }
      if (prefix) {
        resolved = `${prefix}${resolved}`;
      }
    }
    return resolved.replace(/^http:\/\//i, 'https://');
  };

  const currentSrc = resolveUrl(useFallback ? (fallbackSrc || '') : (src || ''));

  if (failed || !currentSrc) {
    return (
      <div className={`w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-[#0B3D91] flex flex-col items-center justify-center p-4 text-white text-center select-none ${className || ''}`}>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 shadow-inner">
          <Building2 className="w-5 h-5 text-orange-400" />
        </div>
        <span className="text-xs font-semibold tracking-wide text-slate-200 line-clamp-1 px-2">{alt || 'Professional Service'}</span>
        <span className="text-[10px] text-blue-300 mt-0.5">Verified Compliance</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt || 'Image'}
      className={`block max-w-full h-auto object-cover ${className || ''}`}
      onError={() => {
        if (!useFallback && fallbackSrc) {
          setUseFallback(true);
        } else {
          setFailed(true);
        }
      }}
      loading="lazy"
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};



