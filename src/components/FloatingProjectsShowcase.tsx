import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ICONHOMZ_PROJECTS, IconhomzProject, ProjectStatus } from '../data/iconhomzData';
import { ArchitecturalImage } from './ArchitecturalImage';

interface FloatingProjectsShowcaseProps {
  onNavigate: (path: string) => void;
}

const STREAM_STATUSES: ProjectStatus[] = ['All', 'Ongoing', 'Completed', 'Upcoming'];

export function FloatingProjectsShowcase({ onNavigate }: FloatingProjectsShowcaseProps) {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>('All');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const visibleProjects =
    statusFilter === 'All'
      ? ICONHOMZ_PROJECTS
      : ICONHOMZ_PROJECTS.filter((proj) => proj.status === statusFilter);

  const syncScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
    const id = window.requestAnimationFrame(syncScrollState);
    return () => window.cancelAnimationFrame(id);
  }, [statusFilter]);

  useEffect(() => {
    window.addEventListener('resize', syncScrollState);
    return () => window.removeEventListener('resize', syncScrollState);
  }, []);

  const handleStep = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const stepDistance = Math.max(320, Math.round(el.clientWidth * 0.7));
    el.scrollBy({
      left: direction === 'left' ? -stepDistance : stepDistance,
      behavior: 'smooth'
    });
  };

  const renderProjectCard = (project: IconhomzProject) => (
    <a
      key={project.id}
      href={`/projects/${project.slug}/`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(`/projects/${project.slug}/`);
      }}
      className="snap-start w-[290px] sm:w-[345px] shrink-0 bg-white border border-[#E7E5E4] flex flex-col justify-between text-left"
    >
      <div>
        <div className="aspect-[4/3] overflow-hidden bg-[#F4F2ED]">
          <ArchitecturalImage
            src={project.image}
            alt={project.imageAlt}
            title={project.name}
            width={800}
            height={600}
          />
        </div>

        <div className="p-6 space-y-2.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#D96B27]">
            {project.status} · {project.location}
          </div>
          <h3 className="font-display text-2xl font-semibold text-[#1C1917] leading-snug">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#0E3B4C]">
          <span>Explore Project</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D96B27]" aria-hidden="true" />
        </span>
      </div>
    </a>
  );

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E7E5E4]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              Selected Developments
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-[#1C1917]">
              Ongoing, Completed &amp; Upcoming Communities
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Filter projects showcase"
              className="inline-flex flex-wrap gap-1 p-1 bg-[#FAF9F6] border border-[#E7E5E4] rounded"
            >
              {STREAM_STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                    statusFilter === status
                      ? 'bg-[#0E3B4C] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStep('left')}
                disabled={!canScrollLeft}
                aria-label="Previous projects"
                className="h-10 w-10 bg-white border border-[#E7E5E4] rounded inline-flex items-center justify-center text-[#1C1917] hover:border-[#D96B27] hover:text-[#D96B27] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleStep('right')}
                disabled={!canScrollRight}
                aria-label="Next projects"
                className="h-10 w-10 bg-white border border-[#E7E5E4] rounded inline-flex items-center justify-center text-[#1C1917] hover:border-[#D96B27] hover:text-[#D96B27] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={syncScrollState}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleProjects.map(renderProjectCard)}
        </div>
      </div>
    </section>
  );
}
