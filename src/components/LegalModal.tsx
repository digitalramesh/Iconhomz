import { useEffect } from 'react';
import { X } from 'lucide-react';
import {
  BLOG_ARCHIVE_ROUTES,
  ICONHOMZ_PROJECTS,
  KEYWORD_TO_URL_MAP,
  PROJECT_ARCHIVE_ROUTES
} from '../data/iconhomzData';

export type LegalTopic = 'privacy' | 'terms' | 'disclaimer' | 'rera' | 'sitemap' | null;

interface LegalModalProps {
  topic: LegalTopic;
  onClose: () => void;
  onNavigate: (path: string, hashTarget?: string) => void;
}

const LEGAL_COPY: Record<
  Exclude<LegalTopic, null | 'sitemap'>,
  { title: string; paragraphs: string[] }
> = {
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'ICONHOMZ respects your privacy and collects contact information (name, telephone number, email address, and property preferences) solely to respond to residential enquiries, arrange site visits, and share statutory project disclosures.',
      'Submitted enquiry records are routed exclusively to ICONHOMZ Private Client Advisory and are never sold or leased to third-party marketing lists. By submitting an enquiry form, you consent to communication via phone, email, or WhatsApp regarding your requested development.',
      'To request deletion or modification of your enquiry record, contact info@iconhomz.com.'
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    paragraphs: [
      'Information presented on www.iconhomz.com—including architectural imagery, indicative layouts, connectivity timings, and specification summaries—is intended for general informational guidance and does not constitute a binding legal offer or contract.',
      'Final plot dimensions, apartment carpet areas, allotment terms, payment milestones, and specifications are governed strictly by the executed Agreement for Sale and statutory Karnataka RERA filings.',
      'ICONHOMZ reserves the right to update architectural finishes or masterplan phasing in accordance with planning authority guidelines.'
    ]
  },
  disclaimer: {
    title: 'Website Disclaimer',
    paragraphs: [
      'Architectural perspectives, floor plans, landscape concepts, and travel time estimates displayed across www.iconhomz.com are artistic impressions and illustrative references intended to help prospective homebuyers evaluate community planning.',
      'While ICONHOMZ makes every effort to keep market commentary, regulatory articles, and project specifications accurate and current, visitors should rely on executed sale agreements, official sanction blueprints, and direct advisory briefings before making property commitments.'
    ]
  },
  rera: {
    title: 'RERA & Statutory Disclaimer',
    paragraphs: [
      'All ongoing residential developments marketed by ICONHOMZ are registered under the Real Estate (Regulation and Development) Act, 2016 (Karnataka RERA). Prospective buyers are advised to review official project registration certificates, layout sanctions, and quarterly progress disclosures directly on the Karnataka RERA portal or with our legal desk prior to booking.',
      'Upcoming or pre-release concepts (such as ICON LAURELS and ICON CENTRAL PARK) are shared strictly for early architectural preview and expression of interest; formal allotment and sale occur only upon receipt of final statutory approvals and RERA registration.'
    ]
  }
};

export function LegalModal({ topic, onClose, onNavigate }: LegalModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (topic) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [topic, onClose]);

  if (!topic) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#092834]/80"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          topic === 'sitemap' ? 'max-w-4xl' : 'max-w-2xl'
        } max-h-[85vh] overflow-y-auto bg-white border border-[#E7E5E4] shadow-2xl p-6 sm:p-8 text-[#1C1917]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
          <h2 id="legal-modal-title" className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            {topic === 'sitemap' ? 'Complete Website Architecture & Sitemap' : LEGAL_COPY[topic].title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal dialog"
            className="inline-flex items-center justify-center w-9 h-9 border border-[#E7E5E4] rounded text-[#1C1917] hover:bg-[#0E3B4C] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {topic === 'sitemap' ? (
          <div className="pt-6 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
                    Primary Menu Pages
                  </h3>
                  <ul className="space-y-1.5 text-[#57534E]">
                    {[
                      { label: 'Home', path: '/' },
                      { label: 'About Us', path: '/about-us/' },
                      { label: 'All Projects', path: '/projects/' },
                      { label: 'Contact Us', path: '/contact-us/' }
                    ].map((page) => (
                      <li key={page.path}>
                        <a
                          href={page.path}
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            onNavigate(page.path);
                          }}
                          className="hover:text-[#D96B27] hover:underline"
                        >
                          {page.label} ({page.path})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
                    Blog Categories
                  </h3>
                  <ul className="space-y-1.5 text-[#57534E]">
                    {Object.values(BLOG_ARCHIVE_ROUTES).map((rt) => (
                      <li key={rt.path}>
                        <a
                          href={rt.path}
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            onNavigate(rt.path);
                          }}
                          className="hover:text-[#D96B27] hover:underline"
                        >
                          {rt.breadcrumbLabel} ({rt.path})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
                  Project Status Directories
                </h3>
                <ul className="space-y-1.5 text-[#57534E]">
                  {Object.values(PROJECT_ARCHIVE_ROUTES)
                    .filter((route) => route.path.startsWith('/projects'))
                    .map((route) => (
                      <li key={route.path}>
                        <a
                          href={route.path}
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            onNavigate(route.path);
                          }}
                          className="hover:text-[#D96B27] hover:underline"
                        >
                          {route.breadcrumbLabel} ({route.path})
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
                    Individual Project Pages
                  </h3>
                  <ul className="space-y-1.5 text-[#57534E]">
                    {ICONHOMZ_PROJECTS.map((proj) => (
                      <li key={proj.id}>
                        <a
                          href={`/projects/${proj.slug}/`}
                          onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            onNavigate(`/projects/${proj.slug}/`);
                          }}
                          className="hover:text-[#D96B27] hover:underline"
                        >
                          {proj.name} (/projects/{proj.slug}/)
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E7E5E4]">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
                    Crawler Files
                  </h3>
                  <ul className="space-y-1 text-xs font-mono text-[#57534E]">
                    <li>
                      <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-[#D96B27] hover:underline">
                        /sitemap.xml
                      </a>
                    </li>
                    <li>
                      <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-[#D96B27] hover:underline">
                        /robots.txt (Googlebot &amp; AI Crawlers)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 7: Keyword-to-URL Intent Map */}
            <div className="pt-6 border-t border-[#E7E5E4] space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
                  SEO Intent-to-URL Mapping Architecture
                </h3>
                <span className="text-xs text-[#57534E]">
                  Anti-cannibalization canonical mapping
                </span>
              </div>
              <div className="overflow-x-auto border border-[#E7E5E4]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F6] border-b border-[#E7E5E4] text-[#1C1917]">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Keyword Intent</th>
                      <th className="py-2.5 px-3 font-semibold">Target Examples</th>
                      <th className="py-2.5 px-3 font-semibold">Target Page</th>
                      <th className="py-2.5 px-3 font-semibold">Canonical URL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E5E4] text-[#57534E]">
                    {KEYWORD_TO_URL_MAP.map((row) => (
                      <tr key={row.intentGroup}>
                        <td className="py-2 px-3 font-semibold text-[#1C1917]">{row.intentGroup}</td>
                        <td className="py-2 px-3">{row.examples}</td>
                        <td className="py-2 px-3">{row.targetPage}</td>
                        <td className="py-2 px-3">
                          <a
                            href={row.targetPath}
                            onClick={(e) => {
                              e.preventDefault();
                              onClose();
                              onNavigate(row.targetPath);
                            }}
                            className="font-mono text-[#0E3B4C] hover:text-[#D96B27] hover:underline"
                          >
                            {row.targetPath}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#57534E]">
            {LEGAL_COPY[topic].paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
