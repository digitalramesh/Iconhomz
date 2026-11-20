import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  BLOG_ARCHIVE_ROUTES,
  BLOG_ARTICLES,
  BlogArticle,
  ICONHOMZ_PROJECTS
} from '../data/iconhomzData';
import { ArchitecturalImage } from './ArchitecturalImage';

interface BlogsPageViewProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onSelectArticle: (article: BlogArticle) => void;
}

export function BlogsPageView({ currentPath, onNavigate, onSelectArticle }: BlogsPageViewProps) {
  const routeMeta = BLOG_ARCHIVE_ROUTES[currentPath] ?? BLOG_ARCHIVE_ROUTES['/blogs/'];
  const isAllRoute = routeMeta.path === '/blogs/';

  const routeLinks = Object.values(BLOG_ARCHIVE_ROUTES);
  const categoryRoutes = routeLinks.filter((rt) => rt.path !== '/blogs/');

  const categorySections = (isAllRoute ? categoryRoutes : [routeMeta])
    .map((cat) => ({
      route: cat,
      articles: BLOG_ARTICLES.filter((art) => art.routeCategoryPath === cat.path)
    }))
    .filter((group) => group.articles.length > 0);

  const totalDisplayedArticles = categorySections.reduce(
    (sum, group) => sum + group.articles.length,
    0
  );

  return (
    <div className="bg-[#FAF9F6]">
      {/* Page Header & Category URL Navigation */}
      <section className="border-b border-[#E7E5E4] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 md:py-16 space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#57534E]">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-[#1C1917]"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E]" />
            {isAllRoute ? (
              <span className="font-semibold text-[#1C1917]">Blog</span>
            ) : (
              <>
                <a
                  href="/blogs/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blogs/');
                  }}
                  className="hover:text-[#1C1917]"
                >
                  Blog
                </a>
                <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span className="font-semibold text-[#1C1917]">{routeMeta.breadcrumbLabel}</span>
              </>
            )}
          </nav>

          <div className="space-y-4 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              ICONHOMZ Blog · {routeMeta.path}
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] text-[#1C1917]">
              {routeMeta.h1}
            </h1>
            <p className="text-base text-[#57534E] leading-relaxed">{routeMeta.intro}</p>
          </div>

          {/* Canonical Blog Category Tabs */}
          <div
            role="navigation"
            aria-label="Blog category URLs"
            className="bg-[#FAF9F6] border border-[#E7E5E4] inline-flex flex-wrap gap-2 p-1.5 rounded"
          >
            {routeLinks.map((rt) => {
              const isActive = rt.path === routeMeta.path;
              return (
                <a
                  key={rt.path}
                  href={rt.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(rt.path);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0E3B4C] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {rt.breadcrumbLabel}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Published Articles Grouped Under Each Category */}
      <section className="py-16 md:py-20 border-b border-[#E7E5E4]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#E7E5E4] pb-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Published Blog Articles by Category ({totalDisplayedArticles})
              </h2>
              <p className="text-sm text-[#57534E] mt-1">
                All research articles are published with answer-first summaries, regulatory checklists, and direct FAQs.
              </p>
            </div>
          </div>

          {categorySections.map(({ route: catRoute, articles }) => (
            <div key={catRoute.path} className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E7E5E4] pb-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                    {catRoute.breadcrumbLabel} · {articles.length}{' '}
                    {articles.length === 1 ? 'Article' : 'Articles'}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                    {catRoute.h1}
                  </h3>
                </div>
                {isAllRoute && (
                  <a
                    href={catRoute.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(catRoute.path);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27] whitespace-nowrap"
                  >
                    <span>Open {catRoute.breadcrumbLabel} Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article) => {
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
                          <h4 className="font-display text-xl font-semibold leading-snug text-[#1C1917]">
                            {article.title}
                          </h4>
                          <p className="text-sm text-[#57534E] leading-relaxed line-clamp-3">
                            {article.answerFirstSummary}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-3 border-t border-[#E7E5E4] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => onSelectArticle(article)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27] cursor-pointer"
                        >
                          <span>Read Full Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        {relatedProj && (
                          <a
                            href={`/projects/${relatedProj.slug}/`}
                            onClick={(e) => {
                              e.preventDefault();
                              onNavigate(`/projects/${relatedProj.slug}/`);
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
          ))}
        </div>
      </section>
    </div>
  );
}
