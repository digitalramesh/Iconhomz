import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { IconhomzLogo } from './IconhomzLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string, hashTarget?: string) => void;
  onEnquireNow: () => void;
}

const PROJECT_STATUS_LINKS = [
  { label: 'All Projects Directory', path: '/projects/' },
  { label: 'Ongoing Projects', path: '/projects/ongoing/' },
  { label: 'Completed Projects', path: '/projects/completed/' },
  { label: 'Upcoming Projects', path: '/projects/upcoming/' }
];

export function Navbar({ currentPath, onNavigate, onEnquireNow }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProjectsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProjectsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleLinkClick = (path: string, hashTarget?: string) => {
    setProjectsOpen(false);
    setMobileOpen(false);
    onNavigate(path, hashTarget);
  };

  const isProjectsActive = currentPath.startsWith('/projects');
  const navLinkClass = (active: boolean) =>
    `text-sm font-medium underline-offset-8 decoration-[#D96B27] decoration-2 transition-colors duration-150 whitespace-nowrap shrink-0 ${
      active
        ? 'text-[#D96B27] underline font-semibold'
        : 'text-[#57534E] hover:text-[#1C1917] hover:underline'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E7E5E4]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          aria-label="ICONHOMZ Home"
          className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96B27] rounded py-1"
        >
          <IconhomzLogo theme="light" showTagline />
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className={navLinkClass(currentPath === '/')}
          >
            Home
          </a>

          <a
            href="/about-us/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/about-us/');
            }}
            className={navLinkClass(currentPath === '/about-us/')}
          >
            About Us
          </a>

          {/* Projects Dropdown Menu (Status links only) */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={projectsOpen}
              aria-haspopup="true"
              onClick={() => setProjectsOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 text-sm font-medium underline-offset-8 decoration-[#D96B27] decoration-2 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isProjectsActive
                  ? 'text-[#D96B27] underline font-semibold'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:underline'
              }`}
            >
              <span>Projects</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  projectsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {projectsOpen && (
              <div className="absolute left-0 top-full mt-3 w-64 bg-white border border-[#E7E5E4] rounded-lg shadow-lg p-5 z-50">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#D96B27] mb-3">
                  Project Portfolio
                </div>
                <ul className="space-y-2.5">
                  {PROJECT_STATUS_LINKS.map((item) => (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(item.path);
                        }}
                        className={`block text-xs font-medium transition-colors ${
                          currentPath === item.path
                            ? 'text-[#D96B27] font-semibold'
                            : 'text-[#1C1917] hover:text-[#D96B27]'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <a
            href="/blogs/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/blogs/');
            }}
            className={navLinkClass(currentPath.startsWith('/blogs'))}
          >
            Blog
          </a>

          <a
            href="/contact-us/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/contact-us/');
            }}
            className={navLinkClass(currentPath === '/contact-us/')}
          >
            Contact Us
          </a>
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onEnquireNow}
            className="hidden sm:inline-flex items-center justify-center h-11 px-5 text-sm font-semibold bg-[#D96B27] text-white hover:bg-[#B85418] rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96B27] focus-visible:ring-offset-2"
          >
            Enquire Now
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#1C1917] hover:bg-[#FAF9F6] rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96B27]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E7E5E4] bg-white px-5 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              className={`py-2.5 text-base font-medium border-b border-[#E7E5E4] ${
                currentPath === '/' ? 'text-[#D96B27] font-semibold' : 'text-[#1C1917]'
              }`}
            >
              Home
            </a>

            <a
              href="/about-us/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/about-us/');
              }}
              className={`py-2.5 text-base font-medium border-b border-[#E7E5E4] ${
                currentPath === '/about-us/' ? 'text-[#D96B27] font-semibold' : 'text-[#1C1917]'
              }`}
            >
              About Us
            </a>

            <div className="py-2.5 border-b border-[#E7E5E4] space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#D96B27]">
                Projects
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {PROJECT_STATUS_LINKS.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.path);
                    }}
                    className={`py-1 ${
                      currentPath === item.path
                        ? 'text-[#D96B27] font-semibold'
                        : 'text-[#57534E] hover:text-[#D96B27]'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/blogs/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/blogs/');
              }}
              className={`py-2.5 text-base font-medium border-b border-[#E7E5E4] ${
                currentPath.startsWith('/blogs') ? 'text-[#D96B27] font-semibold' : 'text-[#1C1917]'
              }`}
            >
              Blog
            </a>
            <a
              href="/contact-us/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/contact-us/');
              }}
              className={`py-2.5 text-base font-medium ${
                currentPath === '/contact-us/' ? 'text-[#D96B27] font-semibold' : 'text-[#1C1917]'
              }`}
            >
              Contact Us
            </a>
          </nav>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onEnquireNow();
            }}
            className="w-full h-11 px-4 text-sm font-semibold bg-[#D96B27] text-white hover:bg-[#B85418] rounded transition-colors cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      )}
    </header>
  );
}
