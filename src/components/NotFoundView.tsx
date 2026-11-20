import { ArrowRight, BookOpen, Compass, Home, Phone } from 'lucide-react';

interface NotFoundViewProps {
  requestedPath: string;
  onNavigate: (path: string) => void;
}

const RECOVERY_LINKS = [
  {
    title: 'ICONHOMZ Homepage',
    path: '/',
    description: 'Overview of Fluid Homes, flagship Bangalore developments, and company milestones.',
    icon: Home
  },
  {
    title: 'Project Portfolio',
    path: '/projects/',
    description: 'Browse all Ongoing, Completed, and Upcoming ICONHOMZ communities.',
    icon: Compass
  },
  {
    title: 'Blog & Buyer Guides',
    path: '/blogs/',
    description: 'Explore BDA/RERA due diligence guides and Bengaluru property articles.',
    icon: BookOpen
  },
  {
    title: 'Contact & Site Visits',
    path: '/contact-us/',
    description: 'Connect with our HSR Layout corporate office or request a project cost sheet.',
    icon: Phone
  }
];

export function NotFoundView({ requestedPath, onNavigate }: NotFoundViewProps) {
  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6] border-b border-[#E7E5E4]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-12">
        <div className="max-w-2xl space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#D96B27] tabular-nums">
            HTTP 404 · Requested Path: {requestedPath}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.1] text-[#1C1917]">
            This Page Could Not Be Located
          </h1>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            The URL you requested may have been relocated during our site restructure. Use the verified directory links below to explore ICONHOMZ projects, research guides, or advisory contacts.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-flex items-center gap-2 h-11 px-6 bg-[#D96B27] hover:bg-[#B85418] text-white text-sm font-semibold rounded transition-colors"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/projects/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/projects/');
              }}
              className="inline-flex items-center gap-2 h-11 px-6 border border-[#1C1917] bg-white hover:border-[#D96B27] text-[#1C1917] hover:text-[#D96B27] text-sm font-semibold rounded transition-colors"
            >
              <span>View All Projects</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[#E7E5E4]">
          {RECOVERY_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.path);
                }}
                className="group p-6 bg-white border border-[#E7E5E4] hover:border-[#D96B27] space-y-3 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <Icon className="w-5 h-5 text-[#D96B27]" aria-hidden="true" />
                  <h2 className="font-display text-lg font-semibold text-[#1C1917] group-hover:text-[#D96B27] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs text-[#57534E] leading-relaxed">{item.description}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] pt-2">
                  <span>Open {item.path}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
