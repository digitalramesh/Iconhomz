import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ICONHOMZ_PROJECTS,
  IconhomzProject,
  PROJECT_ARCHIVE_ROUTES,
  ProjectRouteMeta
} from '../data/iconhomzData';
import { ArchitecturalImage } from './ArchitecturalImage';

interface ProjectsDirectoryViewProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onEnquireProject: (project: IconhomzProject) => void;
}

const STATUS_TABS = [
  { label: 'All Projects', path: '/projects/' },
  { label: 'Ongoing', path: '/projects/ongoing/' },
  { label: 'Completed', path: '/projects/completed/' },
  { label: 'Upcoming', path: '/projects/upcoming/' }
];

const PROJECTS_PER_PAGE = 3;

export function ProjectsDirectoryView({
  currentPath,
  onNavigate,
  onEnquireProject
}: ProjectsDirectoryViewProps) {
  const [page, setPage] = useState(1);

  const routeMeta: ProjectRouteMeta =
    PROJECT_ARCHIVE_ROUTES[currentPath] ?? PROJECT_ARCHIVE_ROUTES['/projects/'];

  const matchingProjects = ICONHOMZ_PROJECTS.filter((proj) => {
    if (routeMeta.filterStatus && proj.status !== routeMeta.filterStatus) {
      return false;
    }
    if (routeMeta.filterCategory && proj.category !== routeMeta.filterCategory) {
      return false;
    }
    if (routeMeta.filterLocation === 'Gunjur') {
      return proj.corridor === 'Gunjur';
    }
    if (routeMeta.filterLocation === 'Sarjapur Road') {
      return proj.corridor === 'Sarjapur Road' || proj.id === 'ivy-county';
    }
    return true;
  });

  useEffect(() => {
    setPage(1);
  }, [currentPath]);

  const totalPages = Math.max(1, Math.ceil(matchingProjects.length / PROJECTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PROJECTS_PER_PAGE;
  const displayedProjects = matchingProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF9F6]">
      {/* Simple Header & Status Filter Tabs */}
      <section className="border-b border-[#E7E5E4] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 md:py-16 space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#57534E]">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-[#1C1917] transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E]" aria-hidden="true" />
            {currentPath === '/projects/' || currentPath === '/residential/' ? (
              <span className="font-semibold text-[#1C1917]">Projects</span>
            ) : (
              <>
                <a
                  href="/projects/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/projects/');
                  }}
                  className="hover:text-[#1C1917] transition-colors"
                >
                  Projects
                </a>
                <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E]" aria-hidden="true" />
                <span className="font-semibold text-[#1C1917]">
                  {routeMeta.breadcrumbLabel}
                </span>
              </>
            )}
          </nav>

          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              ICONHOMZ Projects
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] text-[#1C1917]">
              {routeMeta.h1}
            </h1>
            <p className="text-base text-[#57534E] leading-relaxed">{routeMeta.intro}</p>
          </div>

          <div className="pt-2">
            <div className="bg-[#FAF9F6] border border-[#E7E5E4] inline-flex flex-wrap gap-1.5 p-1 rounded">
              {STATUS_TABS.map((tab) => (
                <a
                  key={tab.path}
                  href={tab.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(tab.path);
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                    currentPath === tab.path
                      ? 'bg-[#0E3B4C] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {tab.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Paginated Grid (3 Projects at a Time) */}
      <section className="py-14 md:py-20 border-b border-[#E7E5E4]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#57534E]">
            <p className="tabular-nums">
              Showing{' '}
              <strong className="text-[#1C1917]">
                {matchingProjects.length === 0 ? 0 : startIndex + 1}–
                {startIndex + displayedProjects.length}
              </strong>{' '}
              of <strong className="text-[#1C1917]">{matchingProjects.length}</strong> projects
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(Math.max(1, safePage - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous projects page"
                  className="h-9 px-3 bg-white border border-[#E7E5E4] rounded inline-flex items-center gap-1 font-semibold text-[#1C1917] hover:border-[#D96B27] hover:text-[#D96B27] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <span className="px-2 font-medium tabular-nums text-[#1C1917]">
                  {safePage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next projects page"
                  className="h-9 px-3 bg-white border border-[#E7E5E4] rounded inline-flex items-center gap-1 font-semibold text-[#1C1917] hover:border-[#D96B27] hover:text-[#D96B27] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white border border-[#E7E5E4] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#F4F2ED] overflow-hidden">
                    <ArchitecturalImage
                      src={project.image}
                      alt={project.imageAlt}
                      title={project.name}
                      width={800}
                      height={600}
                    />
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
                      {project.status} · {project.location}
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-[#1C1917] leading-snug">
                      {project.name}
                    </h2>
                    <p className="text-sm text-[#57534E] leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-[#E7E5E4] flex items-center justify-between gap-3">
                  <a
                    href={`/projects/${project.slug}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/projects/${project.slug}/`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27] whitespace-nowrap"
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onEnquireProject(project)}
                    className="text-xs font-semibold text-[#57534E] hover:text-[#1C1917] underline underline-offset-4 cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => goToPage(pageNum)}
                  className={`h-9 min-w-[36px] px-3 text-xs font-semibold rounded border transition-colors cursor-pointer tabular-nums ${
                    pageNum === safePage
                      ? 'bg-[#0E3B4C] border-[#0E3B4C] text-white'
                      : 'bg-white border-[#E7E5E4] text-[#57534E] hover:border-[#D96B27] hover:text-[#1C1917]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
