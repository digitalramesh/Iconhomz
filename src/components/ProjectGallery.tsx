import { PointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import {
  GalleryCategoryFilter,
  getProjectGalleryPhotos,
  IconhomzProject
} from '../data/iconhomzData';
import { ArchitecturalImage } from './ArchitecturalImage';

interface ProjectGalleryProps {
  project: IconhomzProject;
}

const FILTER_OPTIONS: GalleryCategoryFilter[] = [
  'All Views',
  'Architecture & Masterplan',
  'Clubhouse & Landscape',
  'Living Spaces'
];

const ZOOM_LEVELS = [1, 1.5, 2, 3];

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const allPhotos = useMemo(() => getProjectGalleryPhotos(project), [project]);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategoryFilter>('All Views');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragStartRef = useRef<{ x: number; y: number; originX: number; originY: number } | null>(
    null
  );
  const didDragRef = useRef<boolean>(false);

  // Reset filter when navigating between different projects
  useEffect(() => {
    setSelectedCategory('All Views');
    setActiveIndex(null);
  }, [project.id]);

  const visiblePhotos = useMemo(() => {
    if (selectedCategory === 'All Views') return allPhotos;
    return allPhotos.filter((item) => item.category === selectedCategory);
  }, [allPhotos, selectedCategory]);

  // Reset zoom and pan whenever active photo changes or closes
  useEffect(() => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragStartRef.current = null;
  }, [activeIndex]);

  const activePhoto =
    activeIndex !== null && visiblePhotos[activeIndex] ? visiblePhotos[activeIndex] : null;

  const stepPhoto = (delta: number) => {
    if (activeIndex === null || visiblePhotos.length === 0) return;
    setActiveIndex((activeIndex + delta + visiblePhotos.length) % visiblePhotos.length);
  };

  const adjustZoom = (nextScale: number) => {
    const clamped = Math.min(3, Math.max(1, Number(nextScale.toFixed(2))));
    setZoomScale(clamped);
    if (clamped === 1) {
      setPanOffset({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoomScale((prev) => Math.min(3, Number((prev + 0.5).toFixed(2))));
      } else if (e.key === '-') {
        e.preventDefault();
        setZoomScale((prev) => {
          const next = Math.max(1, Number((prev - 0.5).toFixed(2)));
          if (next === 1) setPanOffset({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === '0') {
        setZoomScale(1);
        setPanOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, visiblePhotos.length]);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (zoomScale <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    didDragRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      originX: panOffset.x,
      originY: panOffset.y
    };
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current || zoomScale <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      didDragRef.current = true;
    }
    const maxOffset = (zoomScale - 1) * 280;
    setPanOffset({
      x: Math.max(-maxOffset, Math.min(maxOffset, dragStartRef.current.originX + dx)),
      y: Math.max(-maxOffset, Math.min(maxOffset, dragStartRef.current.originY + dy))
    });
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already ended
      }
    }
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleStageClick = () => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    adjustZoom(zoomScale > 1 ? 1 : 2);
  };

  return (
    <section
      id="project-gallery"
      className="py-16 md:py-20 bg-[#FAF9F6] border-b border-[#E7E5E4]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-10">
        {/* Section Header & Segmented Gallery Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              Architectural Gallery · 1200 × 900 High-Res Views
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-[#1C1917]">
              {project.name} Photography &amp; Perspectives
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              Inspect masterplan streetscapes, clubhouse spaces, and residential perspectives. Select any frame to launch full-screen detail zoom.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter project gallery by view type"
            className="inline-flex flex-wrap gap-1 p-1 bg-white border border-[#E7E5E4] rounded self-start lg:self-auto"
          >
            {FILTER_OPTIONS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#0E3B4C] text-white'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {visiblePhotos.map((photo, index) => (
            <figure
              key={photo.id}
              className="break-inside-avoid mb-6 bg-white border border-[#E7E5E4] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open full-screen zoom view for ${photo.title}`}
                className="block w-full text-left overflow-hidden bg-[#F4F2ED] cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96B27] focus-visible:ring-inset"
              >
                <div className={`${photo.masonryAspect} w-full overflow-hidden`}>
                  <ArchitecturalImage
                    src={photo.src}
                    alt={photo.alt}
                    title={photo.title}
                    width={1200}
                    height={900}
                  />
                </div>
              </button>

              <figcaption className="p-5 space-y-2 border-t border-[#E7E5E4]">
                <div className="flex items-center justify-between gap-2 text-xs text-[#57534E]">
                  <span className="font-semibold text-[#D96B27]">{photo.category}</span>
                  <span className="font-mono tabular-nums text-[#57534E]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#1C1917] leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed">{photo.caption}</p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27] cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>View Large</span>
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Full-Screen High-Resolution Zoom Lightbox */}
      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          className="fixed inset-0 z-50 flex flex-col bg-[#092834]/96 text-white"
          onClick={() => setActiveIndex(null)}
        >
          {/* Top Toolbar */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-[#1D5368] bg-[#092834]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-semibold text-[#F3A871]">{project.name}</span>
                <span aria-hidden="true">·</span>
                <span>{activePhoto.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-slate-200">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(visiblePhotos.length).padStart(2, '0')}
                </span>
              </div>
              <h3
                id="gallery-lightbox-title"
                className="font-display text-lg sm:text-xl font-semibold text-white truncate"
              >
                {activePhoto.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Zoom Presets & Stepper Controls */}
              <div className="inline-flex items-center gap-1 p-1 bg-[#0E3B4C] border border-[#1D5368] rounded">
                <button
                  type="button"
                  onClick={() => adjustZoom(zoomScale - 0.5)}
                  disabled={zoomScale <= 1}
                  aria-label="Zoom out"
                  className="inline-flex items-center justify-center w-9 h-9 rounded text-slate-200 hover:bg-[#1D5368] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <div className="hidden sm:inline-flex items-center gap-1">
                  {ZOOM_LEVELS.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => adjustZoom(level)}
                      className={`px-2.5 h-8 text-xs font-mono tabular-nums rounded transition-colors cursor-pointer ${
                        zoomScale === level
                          ? 'bg-[#D96B27] text-white'
                          : 'text-slate-200 hover:bg-[#1D5368]'
                      }`}
                    >
                      {level}×
                    </button>
                  ))}
                </div>

                <span className="sm:hidden px-2 text-xs font-mono tabular-nums text-[#F3A871]">
                  {zoomScale.toFixed(1)}×
                </span>

                <button
                  type="button"
                  onClick={() => adjustZoom(zoomScale + 0.5)}
                  disabled={zoomScale >= 3}
                  aria-label="Zoom in"
                  className="inline-flex items-center justify-center w-9 h-9 rounded text-slate-200 hover:bg-[#1D5368] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {zoomScale > 1 && (
                  <button
                    type="button"
                    onClick={() => adjustZoom(1)}
                    aria-label="Reset zoom"
                    className="inline-flex items-center justify-center w-9 h-9 rounded text-slate-200 hover:bg-[#1D5368] cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close full-screen gallery"
                className="inline-flex items-center justify-center w-11 h-11 border border-[#1D5368] bg-[#0E3B4C] hover:bg-[#D96B27] rounded text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Zoomable Photo Stage */}
          <div
            className="relative flex-1 flex items-center justify-center overflow-hidden p-4 sm:p-8 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {visiblePhotos.length > 1 && (
              <button
                type="button"
                onClick={() => stepPhoto(-1)}
                aria-label="Previous project photograph"
                className="absolute left-3 sm:left-6 z-20 inline-flex items-center justify-center w-11 h-11 rounded bg-[#0E3B4C] hover:bg-[#D96B27] border border-[#1D5368] text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Image Pan & Zoom Frame */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onClick={handleStageClick}
              style={{ touchAction: zoomScale > 1 ? 'none' : 'auto' }}
              className={`relative max-w-5xl max-h-full flex items-center justify-center overflow-hidden border border-[#1D5368] bg-[#092834] ${
                zoomScale > 1
                  ? isDragging
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-zoom-in'
              }`}
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                draggable={false}
                style={{
                  transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0) scale(${zoomScale})`,
                  transition: isDragging ? 'none' : 'transform 200ms ease-out'
                }}
                className="max-h-[68vh] w-auto max-w-full object-contain select-none"
              />
            </div>

            {/* Next Button */}
            {visiblePhotos.length > 1 && (
              <button
                type="button"
                onClick={() => stepPhoto(1)}
                aria-label="Next project photograph"
                className="absolute right-3 sm:right-6 z-20 inline-flex items-center justify-center w-11 h-11 rounded bg-[#0E3B4C] hover:bg-[#D96B27] border border-[#1D5368] text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bottom Caption & Thumbnail Filmstrip */}
          <div
            className="px-5 sm:px-8 py-4 border-t border-[#1D5368] bg-[#092834] space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <p className="text-slate-200 leading-relaxed">{activePhoto.caption}</p>
              <span className="text-slate-300 whitespace-nowrap">
                {zoomScale > 1
                  ? 'Drag image to pan · Click to reset 1×'
                  : 'Click image to zoom 2× · Use ← / → keys'}
              </span>
            </div>

            <div className="max-w-5xl mx-auto flex items-center gap-2.5 overflow-x-auto pb-1">
              {visiblePhotos.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View ${thumb.title}`}
                  className={`relative shrink-0 w-20 h-14 overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'border-[#D96B27] opacity-100'
                      : 'border-[#1D5368] opacity-60 hover:opacity-90'
                  }`}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
