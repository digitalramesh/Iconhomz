import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import {
  ABOUT_BANNER,
  AEO_FAQS,
  BLOG_ARCHIVE_ROUTES,
  BLOG_ARTICLES,
  BlogArticle,
  COMPANY_STATISTICS,
  HERO_BANNER,
  ICONHOMZ_PROJECTS,
  PROJECT_ARCHIVE_ROUTES
} from './data/iconhomzData';
import { AboutPageView } from './components/AboutPageView';
import { ArchitecturalImage } from './components/ArchitecturalImage';
import { BlogsPageView } from './components/BlogsPageView';
import { ContactPageView } from './components/ContactPageView';
import { FloatingBankingPartners } from './components/FloatingBankingPartners';
import { FloatingProjectsShowcase } from './components/FloatingProjectsShowcase';
import { FloatingTestimonials } from './components/FloatingTestimonials';
import { IconhomzLogo } from './components/IconhomzLogo';
import { LegalModal, LegalTopic } from './components/LegalModal';
import { MonographModal } from './components/MonographModal';
import { Navbar } from './components/Navbar';
import { NotFoundView } from './components/NotFoundView';
import { PrivateViewingSection } from './components/PrivateViewingSection';
import { ProjectDetailView } from './components/ProjectDetailView';
import { ProjectsDirectoryView } from './components/ProjectsDirectoryView';
import { applyRouteSeoAndSchema } from './utils/seoSchema';

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/' || rawPath === '/index.html') return '/';
  const withSlash = rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
  const legacyRedirects: Record<string, string> = {
    '/about/': '/about-us/',
    '/contact/': '/contact-us/',
    '/blog/': '/blogs/',
    '/residential-projects/': '/projects/',
    '/residential/': '/projects/',
    '/locations/': '/projects/'
  };
  return legacyRedirects[withSlash] ?? withSlash;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );
  const [activeFaqId, setActiveFaqId] = useState<string>(AEO_FAQS[0].id);

  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [legalTopic, setLegalTopic] = useState<LegalTopic>(null);

  const [enquiryProjectId, setEnquiryProjectId] = useState<string | undefined>(undefined);
  const [enquiryLocation, setEnquiryLocation] = useState<string | undefined>(undefined);

  // Resolve valid routes vs 404
  const matchedProjectDetail = ICONHOMZ_PROJECTS.find(
    (p) => `/projects/${p.slug}/` === currentPath
  );
  const isProjectArchive = Boolean(PROJECT_ARCHIVE_ROUTES[currentPath]);
  const isBlogArchive = Boolean(BLOG_ARCHIVE_ROUTES[currentPath]);
  const isKnownStaticRoute =
    currentPath === '/' ||
    currentPath === '/about-us/' ||
    currentPath === '/contact-us/';
  const isNotFound =
    !isKnownStaticRoute && !matchedProjectDetail && !isProjectArchive && !isBlogArchive;

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Update <title>, canonical URL, OpenGraph, robots, & JSON-LD structured data per route
  useEffect(() => {
    applyRouteSeoAndSchema({
      currentPath,
      matchedProjectDetail,
      isProjectArchive,
      isBlogArchive,
      activeArticle,
      isNotFound
    });
  }, [currentPath, matchedProjectDetail, isProjectArchive, isBlogArchive, activeArticle, isNotFound]);

  const navigateTo = (targetPath: string, hashTarget?: string) => {
    const normalized = normalizePath(targetPath);
    if (normalized !== currentPath) {
      window.history.pushState({}, '', normalized);
      setCurrentPath(normalized);
    }

    if (hashTarget) {
      setTimeout(() => {
        const el = document.getElementById(hashTarget);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToEnquiry = (projectId?: string, locationName?: string) => {
    if (projectId) setEnquiryProjectId(projectId);
    if (locationName) setEnquiryLocation(locationName);
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFaqLink = (target: 'projects' | 'insights' | 'contact' | 'about') => {
    const routeMap = {
      projects: '/projects/',
      insights: '/blogs/',
      contact: '/contact-us/',
      about: '/about-us/'
    };
    navigateTo(routeMap[target], target === 'contact' ? 'enquiry' : undefined);
  };

  return (
    <div id="top" className="min-h-screen bg-[#FAF9F6] text-[#1C1917] flex flex-col">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onEnquireNow={() => navigateTo('/contact-us/', 'enquiry')}
      />

      <main className="flex-1">
        {matchedProjectDetail ? (
          <ProjectDetailView
            project={matchedProjectDetail}
            onNavigate={navigateTo}
            onScheduleSiteVisit={(projId) => scrollToEnquiry(projId)}
          />
        ) : isProjectArchive ? (
          <ProjectsDirectoryView
            currentPath={currentPath}
            onNavigate={navigateTo}
            onEnquireProject={(proj) => scrollToEnquiry(proj.id, proj.corridor)}
          />
        ) : currentPath === '/about-us/' ? (
          <AboutPageView onNavigate={navigateTo} />
        ) : isBlogArchive ? (
          <BlogsPageView
            currentPath={currentPath}
            onNavigate={navigateTo}
            onSelectArticle={(art) => setActiveArticle(art)}
          />
        ) : currentPath === '/contact-us/' ? (
          <ContactPageView onNavigate={navigateTo} />
        ) : isNotFound ? (
          <NotFoundView requestedPath={currentPath} onNavigate={navigateTo} />
        ) : (
          <>
            {/* 1. HERO SECTION — Clean Editorial Typography + Unadorned Architecture Photography */}
            <section className="bg-white border-b border-[#E7E5E4]">
              <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  <div className="lg:col-span-5 space-y-7">
                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D96B27]">
                        ICONHOMZ · Bengaluru
                      </p>
                      <h1 className="font-display text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1.06] tracking-tight text-[#1C1917]">
                        Building Better Living Experiences
                      </h1>
                      <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-lg">
                        Discover thoughtfully planned communities, BDA &amp; RERA approved villa plots, apartments, and villas across Bengaluru.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <a
                        href="/projects/"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('/projects/');
                        }}
                        className="inline-flex items-center justify-center gap-2.5 h-12 px-7 bg-[#D96B27] text-white hover:bg-[#B85418] text-sm font-semibold rounded transition-colors duration-150 whitespace-nowrap shrink-0"
                      >
                        <span>Explore Our Projects</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => scrollToEnquiry()}
                        className="inline-flex items-center justify-center h-12 px-6 border border-[#1C1917] bg-white text-sm font-semibold text-[#1C1917] hover:bg-[#FAF9F6] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-3">
                    <div className="aspect-[16/10] overflow-hidden bg-[#F4F2ED] border border-[#E7E5E4]">
                      <ArchitecturalImage
                        src={HERO_BANNER.image}
                        alt={HERO_BANNER.alt}
                        title="ICONHOMZ Bangalore Developments"
                        priority
                        width={1920}
                        height={850}
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                      <span className="font-medium text-[#1C1917]">
                        IVY COUNTY · Gunjur, East Bengaluru
                      </span>
                      <a
                        href="/projects/ivy-county-gunjur/"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('/projects/ivy-county-gunjur/');
                        }}
                        className="inline-flex items-center gap-1.5 font-semibold text-[#D96B27] hover:text-[#1C1917]"
                      >
                        <span>View Flagship Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. COMPANY STATISTICS DECK */}
                <div className="mt-14 md:mt-16 pt-10 border-t border-[#E7E5E4] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {COMPANY_STATISTICS.map((stat) => (
                    <div key={stat.label} className="space-y-1.5">
                      <div className="font-display text-3xl sm:text-4xl font-semibold text-[#0E3B4C] tracking-tight tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
                        {stat.label}
                      </div>
                      <p className="text-xs text-[#57534E] leading-relaxed">{stat.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2.25 BANKING & FINANCE PARTNERS */}
            <FloatingBankingPartners />

            {/* 2.5 PROJECTS CAROUSEL */}
            <FloatingProjectsShowcase onNavigate={navigateTo} />

            {/* 4. CORPORATE SUMMARY & 4 TESTIMONIALS */}
            <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-[#E7E5E4]">
              <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  <div className="lg:col-span-6 space-y-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                      Conscious Living · Since 2001
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-[#1C1917]">
                      Thoughtful Urban Spaces Designed Around Everyday Life
                    </h2>
                    <p className="text-base text-[#57534E] leading-relaxed">
                      Operating under ICON Infra Shelters India Pvt. Ltd., ICONHOMZ pairs BDA &amp; RERA-compliant plotted enclaves with space-efficient Fluid Homes engineered for natural light, ecological balance, and enduring homeowner value.
                    </p>
                    <div className="pt-2">
                      <a
                        href="/about-us/"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('/about-us/');
                        }}
                        className="inline-flex items-center gap-2 h-11 px-6 bg-[#0E3B4C] hover:bg-[#D96B27] text-white text-sm font-semibold rounded transition-colors"
                      >
                        <span>About ICONHOMZ &amp; Leadership</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="aspect-[16/10] overflow-hidden bg-[#F4F2ED] border border-[#E7E5E4]">
                      <ArchitecturalImage
                        src={ABOUT_BANNER.image}
                        alt={ABOUT_BANNER.alt}
                        title="ICONHOMZ Conscious Living Architecture"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-[#E7E5E4]">
                  <FloatingTestimonials />
                </div>
              </div>
            </section>

            {/* 5. BLOG SECTION */}
            <section id="blog" className="py-20 md:py-24 bg-[#FAF9F6] border-b border-[#E7E5E4]">
              <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-3 max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                      Blog
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-[#1C1917]">
                      Bengaluru Real Estate Blog &amp; Buyer Guides
                    </h2>
                    <p className="text-base text-[#57534E] leading-relaxed">
                      Factual, answer-first articles across Real Estate, Property Investment, Vastu, Home Buying Guides, Bangalore Corridors, and Lifestyle.
                    </p>
                  </div>
                  <a
                    href="/blogs/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/blogs/');
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D96B27] hover:text-[#1C1917] underline underline-offset-8 decoration-[#D96B27]/50 whitespace-nowrap self-start md:self-auto"
                  >
                    <span>Explore All Blog Articles</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {BLOG_ARTICLES.slice(0, 3).map((article) => {
                    const relatedProj = ICONHOMZ_PROJECTS.find(
                      (p) => p.id === article.relatedProjectId
                    );
                    return (
                      <article
                        key={article.id}
                        className="bg-white border border-[#E7E5E4] overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-[16/9] bg-[#F4F2ED] overflow-hidden">
                            <ArchitecturalImage
                              src={article.image}
                              alt={article.imageAlt}
                              title={article.title}
                              width={1200}
                              height={675}
                            />
                          </div>
                          <div className="p-6 space-y-3">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                              <span className="font-semibold text-[#D96B27]">{article.category}</span>
                              <span aria-hidden="true">·</span>
                              <span>{article.publishedDate}</span>
                              <span aria-hidden="true">·</span>
                              <span>{article.readTime}</span>
                            </div>
                            <h3 className="font-display text-xl font-semibold leading-snug text-[#1C1917]">
                              {article.title}
                            </h3>
                            <p className="text-sm text-[#57534E] leading-relaxed line-clamp-3">
                              {article.answerFirstSummary}
                            </p>
                          </div>
                        </div>

                        <div className="px-6 pb-6 pt-3 border-t border-[#E7E5E4] flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setActiveArticle(article)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27] cursor-pointer"
                          >
                            <span>Read Article</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          {relatedProj && (
                            <a
                              href={`/projects/${relatedProj.slug}/`}
                              onClick={(e) => {
                                e.preventDefault();
                                navigateTo(`/projects/${relatedProj.slug}/`);
                              }}
                              className="text-xs text-[#57534E] hover:text-[#1C1917] underline underline-offset-4"
                            >
                              {relatedProj.name}
                            </a>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 6. AEO FAQs */}
            <section id="faqs" className="py-20 md:py-24 bg-white border-b border-[#E7E5E4]">
              <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  <div className="lg:col-span-4 space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                      Buyer &amp; Investor FAQs
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-[#1C1917]">
                      Direct Answers on Approvals, Projects &amp; Process
                    </h2>
                    <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                      Structured guidance covering BDA/BMRDA regulations, RERA due diligence, NRI investments, and ICONHOMZ residential offerings.
                    </p>
                  </div>

                  <div className="lg:col-span-8 divide-y divide-[#E7E5E4] border-y border-[#E7E5E4] bg-[#FAF9F6] px-6">
                    {AEO_FAQS.map((faq) => {
                      const isOpen = activeFaqId === faq.id;
                      return (
                        <div key={faq.id} className="py-5">
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setActiveFaqId(isOpen ? '' : faq.id)}
                            className="w-full flex items-start justify-between gap-4 text-left cursor-pointer group"
                          >
                            <div className="space-y-1">
                              <span className="text-xs text-[#D96B27] font-semibold">
                                {faq.category}
                              </span>
                              <h3 className="font-display text-lg sm:text-xl font-semibold text-[#1C1917] group-hover:text-[#D96B27] transition-colors">
                                {faq.question}
                              </h3>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-[#57534E] shrink-0 mt-2 transition-transform duration-150 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="mt-3 space-y-3 pr-6">
                              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                                {faq.answer}
                              </p>
                              <button
                                type="button"
                                onClick={() => handleFaqLink(faq.relatedTarget)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27] cursor-pointer"
                              >
                                <span>{faq.relatedLabel}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* 10. CONVERSION & ENQUIRY SECTION */}
        <PrivateViewingSection
          preselectedProjectId={matchedProjectDetail?.id ?? enquiryProjectId}
          preselectedLocation={matchedProjectDetail?.corridor ?? enquiryLocation}
        />
      </main>

      {/* QUIET CORPORATE FOOTER */}
      <footer className="bg-[#092834] text-slate-200 border-t border-[#164A5E]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3 space-y-3">
              <IconhomzLogo theme="dark" showTagline />
              <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
                Building Better Living Experiences — ICON Infra Shelters India Pvt. Ltd.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                47/9, Jai Plaza Symphony, 9th Main, 14th Cross, Sector 6, HSR Layout, Bengaluru – 560102 · +91 83101 81484
              </p>
            </div>

            <div className="md:col-span-2 space-y-3 text-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#F3A871]">
                Company
              </div>
              <ul className="space-y-2">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About Us', path: '/about-us/' },
                  { label: 'Blog', path: '/blogs/' },
                  { label: 'Contact Us', path: '/contact-us/' }
                ].map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(item.path);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3 text-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#F3A871]">
                Projects Directory
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/projects/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/projects/');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    All Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/projects/ongoing/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/projects/ongoing/');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Ongoing Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/projects/completed/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/projects/completed/');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Completed Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/projects/upcoming/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('/projects/upcoming/');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Upcoming Projects
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3 text-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#F3A871]">
                Featured Projects
              </div>
              <ul className="space-y-2">
                {ICONHOMZ_PROJECTS.slice(0, 5).map((proj) => (
                  <li key={proj.id}>
                    <a
                      href={`/projects/${proj.slug}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(`/projects/${proj.slug}/`);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {proj.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3 text-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#F3A871]">
                Governance
              </div>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalTopic('privacy')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalTopic('terms')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalTopic('disclaimer')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Disclaimer
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalTopic('rera')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    RERA Disclaimer
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLegalTopic('sitemap')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Sitemap
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#164A5E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-300">
            <div>© {new Date().getFullYear()} ICONHOMZ. All rights reserved. Bengaluru, India.</div>
            <div>Architectural imagery and specifications are subject to official RERA disclosures.</div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <MonographModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onSelectArticle={(nextArt) => setActiveArticle(nextArt)}
        onExploreProject={(projId) => {
          const proj = ICONHOMZ_PROJECTS.find((p) => p.id === projId);
          if (proj) navigateTo(`/projects/${proj.slug}/`);
        }}
      />

      <LegalModal
        topic={legalTopic}
        onClose={() => setLegalTopic(null)}
        onNavigate={navigateTo}
      />
    </div>
  );
}
