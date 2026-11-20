import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import {
  AEO_FAQS,
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

const STATUS_SECTION_META: Array<{
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  anchorId: string;
  title: string;
  description: string;
  routePath: string;
  ctaLabel: string;
}> = [
  {
    status: 'Ongoing',
    anchorId: 'ongoing-projects',
    title: 'Ongoing Projects',
    description:
      'Active BDA & RERA-registered residential enclaves currently open for site visits and allotment.',
    routePath: '/projects/ongoing/',
    ctaLabel: 'View Ongoing Page'
  },
  {
    status: 'Completed',
    anchorId: 'completed-projects',
    title: 'Completed Projects',
    description:
      'Delivered and occupied residential communities demonstrating ICONHOMZ’s build finish and title track record.',
    routePath: '/projects/completed/',
    ctaLabel: 'View Completed Page'
  },
  {
    status: 'Upcoming',
    anchorId: 'upcoming-projects',
    title: 'Upcoming Projects',
    description:
      'Forthcoming villa and apartment releases open for early architectural previews and priority interest registration.',
    routePath: '/projects/upcoming/',
    ctaLabel: 'View Upcoming Page'
  }
];

export function ProjectsDirectoryView({
  currentPath,
  onNavigate,
  onEnquireProject
}: ProjectsDirectoryViewProps) {
  const [openFaqId, setOpenFaqId] = useState<string>(AEO_FAQS[1].id);

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

  const groupedSections = STATUS_SECTION_META.map((meta) => ({
    ...meta,
    projects: matchingProjects.filter((proj) => proj.status === meta.status)
  })).filter((group) => group.projects.length > 0);

  const showGroupedByStatus = !routeMeta.filterStatus && groupedSections.length > 1;

  const scrollToSection = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const renderProjectCard = (project: IconhomzProject) => (
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

        <div className="p-6 sm:p-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
            <span className="font-semibold text-[#D96B27]">{project.status}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
          </div>

          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              {project.name}
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed mt-2">{project.summary}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#E7E5E4] text-xs">
            <div>
              <span className="text-[#57534E] block">Configuration</span>
              <span className="font-semibold text-[#1C1917] mt-0.5 block">
                {project.configurationSummary}
              </span>
            </div>
            <div>
              <span className="text-[#57534E] block">Pricing Status</span>
              <span className="font-semibold text-[#1C1917] mt-0.5 block">
                {project.startingPriceDisplay}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E7E5E4] text-xs text-[#57534E]">
            <span className="font-semibold text-[#0E3B4C]">{project.approvals}</span>
            <span aria-hidden="true"> · </span>
            <span>{project.reraId}</span>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#E7E5E4] flex flex-wrap items-center justify-between gap-3">
        <a
          href={`/projects/${project.slug}/`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/projects/${project.slug}/`);
          }}
          className="inline-flex items-center gap-2 h-11 px-5 bg-[#0E3B4C] text-white hover:bg-[#D96B27] text-xs font-semibold rounded transition-colors whitespace-nowrap"
        >
          <span>Explore Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        <button
          type="button"
          onClick={() => onEnquireProject(project)}
          className="h-11 px-5 border border-[#1C1917] text-[#1C1917] hover:border-[#D96B27] hover:text-[#D96B27] text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer"
        >
          Enquire Now
        </button>
      </div>
    </article>
  );

  return (
    <div className="bg-[#FAF9F6]">
      {/* 1 & 2. Page Header, Breadcrumb, H1 & Unique Portfolio Introduction */}
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
              <span className="font-semibold text-[#1C1917]">
                {currentPath === '/residential/' ? 'Residential' : 'Projects'}
              </span>
            ) : (
              <>
                <a
                  href="/residential/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/residential/');
                  }}
                  className="hover:text-[#1C1917] transition-colors"
                >
                  Residential
                </a>
                <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E]" aria-hidden="true" />
                <span className="font-semibold text-[#1C1917]">
                  {routeMeta.breadcrumbLabel}
                </span>
              </>
            )}
          </nav>

          <div className="space-y-4 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              {routeMeta.kicker}
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] text-[#1C1917]">
              {routeMeta.h1}
            </h1>
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
              {routeMeta.intro}
            </p>
          </div>

          {/* 3. Canonical URL Status Filter Controls */}
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#57534E] shrink-0">
                By Status
              </span>
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
        </div>
      </section>

      {/* 4–9. Project Cards — Grouped by Ongoing, Completed, and Upcoming on Residential Overview */}
      <section className="py-16 md:py-20 border-b border-[#E7E5E4]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-14">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
            <p className="text-sm text-[#57534E]">
              Showing <strong className="text-[#1C1917] tabular-nums">{matchingProjects.length}</strong>{' '}
              {matchingProjects.length === 1 ? 'development' : 'developments'} under{' '}
              <span className="font-semibold text-[#D96B27]">{routeMeta.breadcrumbLabel}</span>
            </p>

            {showGroupedByStatus ? (
              <div className="flex flex-wrap items-center gap-2">
                {groupedSections.map((group) => (
                  <button
                    key={group.status}
                    type="button"
                    onClick={() => scrollToSection(group.anchorId)}
                    className="h-9 px-3.5 border border-[#E7E5E4] bg-white hover:border-[#D96B27] text-xs font-semibold text-[#1C1917] hover:text-[#D96B27] rounded transition-colors cursor-pointer"
                  >
                    {group.title} ({group.projects.length})
                  </button>
                ))}
              </div>
            ) : (
              <span className="font-mono text-xs text-[#57534E]">{routeMeta.path}</span>
            )}
          </div>

          {showGroupedByStatus ? (
            <div className="space-y-16">
              {groupedSections.map((group) => (
                <section
                  key={group.status}
                  id={group.anchorId}
                  className="space-y-6 scroll-mt-24"
                >
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
                    <div className="space-y-1.5 max-w-2xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27] tabular-nums">
                        {group.projects.length}{' '}
                        {group.projects.length === 1 ? 'Development' : 'Developments'}
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                        {group.title}
                      </h2>
                      <p className="text-sm text-[#57534E] leading-relaxed">{group.description}</p>
                    </div>

                    <a
                      href={group.routePath}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(group.routePath);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27] underline underline-offset-8 decoration-[#0E3B4C]/40 whitespace-nowrap self-start sm:self-auto"
                    >
                      <span>{group.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {group.projects.map(renderProjectCard)}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {matchingProjects.map(renderProjectCard)}
            </div>
          )}
        </div>
      </section>

      {/* 10. Project Listing FAQs */}
      <section className="py-16 md:py-20 border-b border-[#E7E5E4] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              Portfolio FAQs
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#1C1917]">
              Questions About ICONHOMZ Projects
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Clear answers on BDA/RERA approvals, Fluid Homes, and Bangalore micro-markets.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#E7E5E4] bg-[#FAF9F6] border border-[#E7E5E4] px-6">
            {AEO_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="w-full flex items-start justify-between gap-4 text-left cursor-pointer"
                  >
                    <h3 className="font-display text-lg font-semibold text-[#1C1917]">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#57534E] shrink-0 mt-1 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm text-[#57534E] leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
