import { useEffect, useState } from 'react';
import { ArrowRight, Compass, Expand, RotateCw, X } from 'lucide-react';
import { IconhomzProject } from '../data/iconhomzData';

interface VirtualTourModalProps {
  project: IconhomzProject | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleVisit: (projectId: string) => void;
}

interface PanoramicStop {
  id: string;
  label: string;
  subtitle: string;
  image: string;
  hotspotLabel: string;
  hotspotDetail: string;
}

export function VirtualTourModal({
  project,
  isOpen,
  onClose,
  onScheduleVisit
}: VirtualTourModalProps) {
  const [activeStopIdx, setActiveStopIdx] = useState(0);
  const [panDegrees, setPanDegrees] = useState(180);
  const [zoomScale, setZoomScale] = useState(1);

  useEffect(() => {
    setActiveStopIdx(0);
    setPanDegrees(180);
    setZoomScale(1);
  }, [project?.id, isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const panoramicStops: PanoramicStop[] =
    project.category === 'Villa Plots'
      ? [
          {
            id: 'entrance',
            label: 'Grand Entry & Avenue',
            subtitle: `Primary landscaped approach into ${project.name}`,
            image: project.image,
            hotspotLabel: 'Gated Security & Underground Utilities',
            hotspotDetail: 'Asphalt internal avenues, concealed power/fiber ducts, and 24/7 perimeter access.'
          },
          {
            id: 'clubhouse',
            label: 'Clubhouse & Central Greens',
            subtitle: 'Community leisure, wellness & landscaped lawns',
            image: '/src/assets/images/hero_luxury_residence_1795081866369.jpg',
            hotspotLabel: project.amenities[0] || 'Residents Clubhouse',
            hotspotDetail: 'Dedicated social lounge, wellness zones, and walking trails surrounded by open parks.'
          },
          {
            id: 'sample-villa',
            label: 'Custom Villa Enclave View',
            subtitle: 'Plot orientation & future villa elevation preview',
            image: '/src/assets/images/residence_veridian_estate_1795081868333.jpg',
            hotspotLabel: project.configurationSummary,
            hotspotDetail: `${project.approvals} · Orthogonal Vastu-compliant plot geometry.`
          }
        ]
      : [
          {
            id: 'facade',
            label: 'Exterior Elevation & Courtyard',
            subtitle: `Architectural arrival plaza at ${project.name}`,
            image: project.image,
            hotspotLabel: project.location,
            hotspotDetail: project.connectivity[0] || 'Direct arterial connectivity.'
          },
          {
            id: 'interior',
            label: 'Model Residence Living Suite',
            subtitle: 'Fluid spatial layout with natural cross-ventilation',
            image: '/src/assets/images/residence_meridian_penthouse_1795081868822.jpg',
            hotspotLabel: project.configurationSummary,
            hotspotDetail: 'Multi-functional living and work zones designed around Conscious Living.'
          },
          {
            id: 'amenities',
            label: 'Clubhouse & Landscape Terrace',
            subtitle: 'Dedicated recreational deck and wellness zones',
            image: '/src/assets/images/residence_aurelia_courtyard_1795081866867.jpg',
            hotspotLabel: project.amenities[0] || 'Community Amenities',
            hotspotDetail: 'Resident social lounge, outdoor fitness deck, and landscaped seating.'
          }
        ];

  const activeStop = panoramicStops[activeStopIdx] ?? panoramicStops[0];
  // Map 0..360° pan slider onto horizontal object-position X% (0% -> 100%)
  const panPercent = Math.round((panDegrees / 360) * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="virtual-tour-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#092834]/90"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#092834] border border-[#1D5368] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#1D5368]">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-[#F3A871] font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Interactive 360° Virtual Tour Preview · AZIMUTH {panDegrees}° · ZOOM {zoomScale.toFixed(1)}×</span>
            </div>
            <h2
              id="virtual-tour-modal-title"
              className="font-display text-xl sm:text-2xl font-semibold text-white truncate mt-0.5"
            >
              {project.name} · {activeStop.label}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close 360-degree virtual tour"
            className="inline-flex items-center justify-center w-10 h-10 border border-[#1D5368] rounded text-slate-200 hover:bg-[#D96B27] hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panoramic Interactive Stage */}
        <div className="p-6 space-y-6">
          <div className="h-[300px] sm:h-[400px] overflow-hidden border border-[#1D5368] bg-[#0E3B4C] select-none">
            <img
              src={activeStop.image}
              alt={`${project.name} panoramic view – ${activeStop.label}`}
              style={{
                objectPosition: `${panPercent}% 50%`,
                transform: `scale(${zoomScale})`
              }}
              className="w-full h-full object-cover transition-all duration-200"
            />
          </div>

          <div className="p-4 bg-[#0E3B4C] border border-[#1D5368] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#F3A871]">
                Scene Pin · {activeStop.label}
              </div>
              <div className="text-sm font-semibold text-white">{activeStop.hotspotLabel}</div>
              <p className="text-xs text-slate-200 leading-relaxed">{activeStop.hotspotDetail}</p>
            </div>
          </div>

          {/* Pan & Zoom Controls + Scene Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-3 p-4 bg-[#0E3B4C] border border-[#1D5368]">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-200">
                  <RotateCw className="w-3.5 h-3.5 text-[#F3A871]" />
                  360° Horizontal Pan
                </span>
                <span className="font-mono text-[#F3A871] tabular-nums">{panDegrees}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={panDegrees}
                onChange={(e) => setPanDegrees(Number(e.target.value))}
                aria-label="Rotate panoramic camera angle"
                className="w-full accent-[#D96B27] cursor-pointer"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-200">
                  <Expand className="w-3.5 h-3.5 text-[#F3A871]" />
                  Detail Zoom
                </span>
                <div className="inline-flex gap-1.5">
                  {[1, 1.2, 1.5].map((scale) => (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => setZoomScale(scale)}
                      className={`px-2.5 py-1 text-xs font-mono rounded border cursor-pointer transition-colors ${
                        zoomScale === scale
                          ? 'bg-[#D96B27] border-[#D96B27] text-white'
                          : 'bg-[#092834] border-[#1D5368] text-slate-200 hover:border-[#F3A871]'
                      }`}
                    >
                      {scale.toFixed(1)}×
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {panoramicStops.map((stop, idx) => (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => setActiveStopIdx(idx)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                      activeStopIdx === idx
                        ? 'bg-[#D96B27] border-[#D96B27] text-white'
                        : 'bg-[#0E3B4C] border-[#1D5368] text-slate-200 hover:border-[#F3A871]'
                    }`}
                  >
                    {stop.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onScheduleVisit(project.id);
                }}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 bg-[#D96B27] hover:bg-[#B85418] text-white text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Book Guided Site Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
