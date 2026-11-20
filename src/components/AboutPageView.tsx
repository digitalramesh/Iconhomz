import { ArrowRight, CheckCircle2, ChevronRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import {
  ABOUT_BANNER,
  COMPANY_MILESTONES,
  COMPANY_STATISTICS,
  CORPORATE_CONTACT,
  ICONHOMZ_PROJECTS,
  LEADERSHIP_TEAM,
  QUALITY_STANDARDS,
  WHY_ICONHOMZ_PILLARS
} from '../data/iconhomzData';
import { ArchitecturalImage } from './ArchitecturalImage';
import { FloatingTestimonials } from './FloatingTestimonials';

interface AboutPageViewProps {
  onNavigate: (path: string) => void;
}

export function AboutPageView({ onNavigate }: AboutPageViewProps) {
  const completedProjects = ICONHOMZ_PROJECTS.filter((p) => p.status === 'Completed');

  return (
    <div className="bg-[#FAF9F6]">
      {/* 1. About ICONHOMZ Hero & Breadcrumb */}
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
            <span className="font-semibold text-[#1C1917]">About Us</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                  About ICONHOMZ · Real Estate Developer in Bangalore
                </p>
                <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] text-[#1C1917]">
                  Building Better Living Experiences – The ICONHOMZ Journey
                </h1>
                <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
                  Operating under ICON Infra Shelters India Pvt. Ltd. and a registered CREDAI Bengaluru member, ICONHOMZ develops ecologically conscious residential layouts, apartments, villas, and Fluid Homes across East and South Bengaluru.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="/projects/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/projects/');
                  }}
                  className="inline-flex items-center gap-2 h-12 px-6 bg-[#D96B27] hover:bg-[#B85418] text-white text-sm font-semibold rounded transition-colors"
                >
                  <span>Explore Project Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/contact-us/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact-us/');
                  }}
                  className="inline-flex items-center h-12 px-5 border border-[#1C1917] bg-white hover:border-[#D96B27] hover:text-[#D96B27] text-sm font-semibold text-[#1C1917] rounded transition-colors"
                >
                  Contact HSR Corporate Desk
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[320px] lg:min-h-[420px] bg-[#F4F2ED] border border-[#E7E5E4] overflow-hidden">
                <ArchitecturalImage
                  src={ABOUT_BANNER.image}
                  alt={ABOUT_BANNER.alt}
                  title="ICONHOMZ Conscious Living Architecture"
                  priority
                  width={1200}
                  height={900}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Metrics Strip */}
      <section className="py-12 border-b border-[#E7E5E4]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="p-7 sm:p-9 bg-white border border-[#E7E5E4] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPANY_STATISTICS.map((stat) => (
              <div key={stat.label} className="space-y-1.5">
                <div className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917] tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-[#D96B27]">{stat.label}</div>
                <p className="text-xs text-[#57534E] leading-relaxed">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Company History & Journey */}
      <section className="py-16 md:py-20 border-b border-[#E7E5E4] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-10">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              Company History &amp; Journey
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917]">
              Over Two Decades of Bengaluru Land &amp; Housing Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_MILESTONES.map((step) => (
              <div
                key={step.period}
                className="p-6 bg-[#FAF9F6] border border-[#E7E5E4] space-y-3"
              >
                <div className="text-xs font-mono font-semibold text-[#0E3B4C]">{step.period}</div>
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">{step.title}</h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 & 4. Vision, Mission & Leadership Team */}
      <section className="py-16 md:py-24 border-b border-[#E7E5E4]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-[#E7E5E4] space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                Our Vision
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Inspiring Conscious Living Across Bengaluru
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                Constructing sustainable, space-efficient homes utilizing fluid spatial designs, multi-functional rooms, transformative spaces, and modern technology so every square foot delivers meaningful daily utility.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E7E5E4] space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                Our Mission &amp; Core Values
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Ethics, Honesty &amp; Stakeholder Value
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                Built on honesty, transparent customer communication, clear statutory titles, and accountable execution across BDA &amp; RERA-compliant layouts, apartments, and villas.
              </p>
            </div>
          </div>

          <div className="space-y-8 pt-6 border-t border-[#E7E5E4]">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                Leadership Team
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917]">
                Executive Leadership Guided by Experience Since 2001
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEADERSHIP_TEAM.map((member) => {
                const initials = member.name
                  .split(' ')
                  .filter((w) => !w.includes('.'))
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('');
                return (
                  <div
                    key={member.id}
                    className="p-7 bg-white border border-[#E7E5E4] space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        role="img"
                        aria-label={`ICONHOMZ leadership team – ${member.name}`}
                        className="w-14 h-14 rounded bg-[#0E3B4C] text-white font-display font-semibold text-lg flex items-center justify-center shrink-0"
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#D96B27]">{member.role}</div>
                        <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                          {member.name}
                        </h3>
                      </div>
                    </div>
                    <div className="text-xs text-[#57534E]">{member.focus}</div>
                    <p className="text-sm text-[#57534E] leading-relaxed pt-3 border-t border-[#E7E5E4]">
                      {member.bio}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5 & 8. Development Philosophy + Quality & Construction Standards */}
      <section className="py-16 md:py-24 border-b border-[#E7E5E4] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              Development Philosophy
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917]">
              Four Pillars Demonstrated Across Our Communities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_ICONHOMZ_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="p-7 bg-[#FAF9F6] border border-[#E7E5E4] flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono font-medium text-[#D96B27] tabular-nums">
                    {pillar.index}. Development Standard
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#1C1917]">{pillar.title}</h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">{pillar.summary}</p>
                </div>
                <div className="pt-4 border-t border-[#E7E5E4] space-y-2.5">
                  <div className="text-xs font-semibold text-[#0E3B4C]">{pillar.projectProof}</div>
                  <ul className="space-y-1.5">
                    {pillar.details.map((detail) => (
                      <li key={detail} className="text-xs sm:text-sm text-[#57534E]">
                        — {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* 8. Quality & Construction Standards */}
          <div className="space-y-6 pt-8 border-t border-[#E7E5E4]">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                Quality &amp; Construction Standards
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Engineering, Statutory &amp; Legal Benchmarks
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {QUALITY_STANDARDS.map((item) => (
                <div key={item.title} className="p-6 bg-[#FAF9F6] border border-[#E7E5E4] space-y-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#0E3B4C]" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold text-[#1C1917]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. Project Portfolio Snapshot & Completed Milestones */}
      <section className="py-16 md:py-20 border-b border-[#E7E5E4]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                Completed Project Milestones &amp; Portfolio
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#1C1917]">
                Delivered Communities &amp; Active Bengaluru Enclaves
              </h2>
            </div>
            <a
              href="/projects/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/projects/');
              }}
              className="inline-flex items-center gap-2 h-11 px-5 bg-[#0E3B4C] hover:bg-[#D96B27] text-white text-xs font-semibold rounded transition-colors whitespace-nowrap"
            >
              <span>View All {ICONHOMZ_PROJECTS.length} Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {completedProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white border border-[#E7E5E4] overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto bg-[#F4F2ED]">
                  <ArchitecturalImage src={proj.image} alt={proj.imageAlt} title={proj.name} />
                </div>
                <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D96B27]" />
                      <span>Completed &amp; Occupied</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#1C1917]">{proj.name}</h3>
                    <p className="text-xs text-[#57534E]">{proj.location}</p>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{proj.summary}</p>
                  </div>
                  <a
                    href={`/projects/${proj.slug}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/projects/${proj.slug}/`);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27] underline underline-offset-4"
                  >
                    <span>Inspect Delivered Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* 9. Customer Testimonials */}
          <div className="pt-10 border-t border-[#E7E5E4]">
            <FloatingTestimonials
              title="Customer Testimonials"
              kicker="Verified Homeowner Feedback"
            />
          </div>

          {/* 10. Corporate Office & Contact Details */}
          <div className="p-7 sm:p-8 bg-[#0E3B4C] border border-[#1D5368] text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F3A871]">
                Corporate Office · Bengaluru
              </div>
              <h2 className="font-display text-2xl font-semibold">{CORPORATE_CONTACT.entity}</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-200 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#F3A871] shrink-0" />
                  {CORPORATE_CONTACT.address}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Phone className="w-4 h-4 text-[#F3A871] shrink-0" />
                  {CORPORATE_CONTACT.phone}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#F3A871] shrink-0" />
                  {CORPORATE_CONTACT.email}
                </span>
              </div>
            </div>
            <a
              href="/contact-us/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact-us/');
              }}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#D96B27] hover:bg-[#B85418] text-white text-sm font-semibold rounded transition-colors whitespace-nowrap shrink-0"
            >
              <span>Visit Contact Desk</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
