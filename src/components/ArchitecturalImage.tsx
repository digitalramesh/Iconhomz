import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ArchitecturalImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function ArchitecturalImage({
  src,
  alt,
  title,
  className = '',
  priority = false,
  width = 1200,
  height = 900
}: ArchitecturalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#F4F2ED] text-[#57534E] p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 mb-3 stroke-[1.5] text-[#D96B27]" aria-hidden="true" />
        <p className="font-display text-lg font-semibold text-[#1C1917]">
          {title || 'ICONHOMZ Residence'}
        </p>
        <p className="text-xs text-[#57534E] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
