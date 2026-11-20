import { useEffect } from 'react';
import { ArrowRight, BookOpen, CalendarCheck2, X } from 'lucide-react';
import { BLOG_ARTICLES, BlogArticle, ICONHOMZ_PROJECTS } from '../data/iconhomzData';
import { ArchitecturalImage } from './ArchitecturalImage';

interface MonographModalProps {
  article: BlogArticle | null;
  onClose: () => void;
  onExploreProject: (projectId: string) => void;
  onSelectArticle: (article: BlogArticle) => void;
}

export function MonographModal({
  article,
  onClose,
  onExploreProject,
  onSelectArticle
}: MonographModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [article, onClose]);

  if (!article) return null;

  const relatedProject =
    ICONHOMZ_PROJECTS.find((p) => p.id === article.relatedProjectId) ?? ICONHOMZ_PROJECTS[0];

  const relatedArticles = BLOG_ARTICLES.filter((a) => article.relatedArticleIds.includes(a.id));

  const scrollToSection = (idx: number) => {
    const el = document.getElementById(`article-sec-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#092834]/80"
      onClick={onClose}
    >
      <article
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-[#E7E5E4] text-[#1C1917] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 sm:px-10 py-4 bg-white border-b border-[#E7E5E4]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
            <span className="font-semibold text-[#D96B27]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close insight article"
            className="inline-flex items-center justify-center w-9 h-9 border border-[#E7E5E4] rounded text-[#1C1917] hover:bg-[#0E3B4C] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 sm:px-10 py-8 space-y-8">
          {/* 1 & 2. Clear H1 & Author / Updated Metadata */}
          <header className="space-y-3">
            <div className="text-[11px] text-[#57534E]">
              SEO Title: <span className="text-[#1C1917] font-medium">{article.seoTitle}</span>
            </div>
            <h1
              id="article-modal-title"
              className="font-display text-2xl sm:text-4xl font-semibold leading-tight text-[#1C1917]"
            >
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#57534E] pt-1">
              <span>
                By <strong className="text-[#1C1917]">{article.author}</strong> ({article.authorRole})
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#0E3B4C] font-medium">
                <CalendarCheck2 className="w-3.5 h-3.5 text-[#D96B27]" />
                {article.updatedDate}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[16/9] overflow-hidden bg-[#F4F2ED] border border-[#E7E5E4]">
            <ArchitecturalImage
              src={article.image}
              alt={article.imageAlt}
              title={article.title}
              width={1200}
              height={675}
            />
          </div>

          {/* 3. Direct Answer / First 100 Words */}
          <div className="p-6 bg-[#FAF9F6] border border-[#E7E5E4] space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
              Direct Summary (Key Answer)
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#1C1917] font-medium">
              {article.answerFirstSummary}
            </p>
            <ul className="space-y-1.5 pt-3 border-t border-[#E7E5E4]">
              {article.keyTakeaways.map((point) => (
                <li key={point} className="text-xs sm:text-sm text-[#57534E]">
                  — {point}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Table of Contents */}
          <nav
            aria-label="Article table of contents"
            className="p-5 bg-white border border-[#E7E5E4] space-y-2.5"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
              <BookOpen className="w-3.5 h-3.5 text-[#D96B27]" />
              <span>Table of Contents</span>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#0E3B4C]">
              {article.sections.map((sec, idx) => (
                <li key={sec.heading}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(idx)}
                    className="text-left hover:text-[#D96B27] hover:underline cursor-pointer"
                  >
                    {sec.heading}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection(99)}
                  className="text-left hover:text-[#D96B27] hover:underline cursor-pointer"
                >
                  Data Sources, Commentary &amp; FAQs
                </button>
              </li>
            </ol>
          </nav>

          {/* 5. Main H2 and H3 Sections */}
          <div className="space-y-7">
            {article.sections.map((sec, idx) => (
              <section key={sec.heading} id={`article-sec-${idx}`} className="space-y-2 scroll-mt-24">
                <h2 className="font-display text-2xl font-semibold text-[#1C1917]">{sec.heading}</h2>
                {sec.subHeading && (
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D96B27]">
                    {sec.subHeading}
                  </h3>
                )}
                <p className="text-base leading-relaxed text-[#57534E]">{sec.body}</p>
              </section>
            ))}
          </div>

          {/* 6. Facts, Statistics & Regulatory Sources */}
          <div id="article-sec-99" className="space-y-4 pt-4 border-t border-[#E7E5E4] scroll-mt-24">
            <h2 className="font-display text-xl font-semibold text-[#1C1917]">
              Verified Facts &amp; Regulatory Sources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.factsAndSources.map((fact) => (
                <div
                  key={fact.stat}
                  className="p-4 bg-[#FAF9F6] border border-[#E7E5E4] space-y-1.5"
                >
                  <div className="font-display text-lg font-semibold text-[#D96B27]">{fact.stat}</div>
                  <p className="text-xs sm:text-sm text-[#1C1917] leading-relaxed">{fact.context}</p>
                  <p className="text-[11px] text-[#57534E]">Source: {fact.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Comparison Table (where structured) */}
          {article.comparisonTable && (
            <div className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                {article.comparisonTable.caption}
              </h2>
              <div className="overflow-x-auto border border-[#E7E5E4]">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-[#0E3B4C] text-white">
                    <tr>
                      {article.comparisonTable.headers.map((header) => (
                        <th key={header} className="px-4 py-3 font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E5E4] bg-white">
                    {article.comparisonTable.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={`${row[0]}-${cIdx}`}
                            className={`px-4 py-3 ${
                              cIdx === 0 ? 'font-semibold text-[#1C1917]' : 'text-[#57534E]'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. Expert Insights / Author Commentary */}
          <div className="p-5 bg-[#FAF9F6] border-l-4 border-l-[#D96B27] border border-[#E7E5E4] space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
              Advisory Perspective
            </div>
            <p className="text-sm sm:text-base text-[#1C1917] leading-relaxed">
              {article.expertCommentary}
            </p>
          </div>

          {/* 9. Article FAQs */}
          {article.faqs.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#E7E5E4]">
              <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {article.faqs.map((faq) => (
                  <div key={faq.question} className="p-4 bg-[#FAF9F6] border border-[#E7E5E4]">
                    <h3 className="font-display text-base font-semibold text-[#1C1917]">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-[#57534E] leading-relaxed mt-1">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#E7E5E4]">
              <h2 className="font-display text-lg font-semibold text-[#1C1917]">Related Research Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => onSelectArticle(rel)}
                    className="p-4 bg-[#FAF9F6] hover:border-[#D96B27] border border-[#E7E5E4] text-left transition-colors cursor-pointer"
                  >
                    <div className="text-[11px] font-semibold text-[#D96B27]">{rel.category}</div>
                    <div className="font-display text-sm font-semibold text-[#1C1917] mt-1">
                      {rel.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 11. Relevant ICONHOMZ Project CTA */}
          <div className="pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#57534E]">Relevant ICONHOMZ Project</div>
              <div className="font-display text-lg font-semibold text-[#1C1917]">
                {relatedProject.name} · {relatedProject.location}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onExploreProject(relatedProject.id);
              }}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 bg-[#D96B27] text-white hover:bg-[#B85418] text-sm font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore {relatedProject.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
