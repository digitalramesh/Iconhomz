import { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Compass } from 'lucide-react';
import { IconhomzProject } from '../data/iconhomzData';
import { ArchitecturalImage } from './ArchitecturalImage';
import { ProjectGallery } from './ProjectGallery';
import { VirtualTourModal } from './VirtualTourModal';

interface ProjectDetailViewProps {
  project: IconhomzProject;
  onNavigate: (path: string) => void;
  onScheduleSiteVisit: (projectId: string) => void;
}

export function ProjectDetailView({
  project,
  onNavigate,
  onScheduleSiteVisit
}: ProjectDetailViewProps) {
  const [selectedConfigId, setSelectedConfigId] = useState<string>(
    project.configurations[0]?.id ?? ''
  );
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState<boolean>(false);

  const activeConfig =
    project.configurations.find((c) => c.id === selectedConfigId) ?? project.configurations[0];

  const totalInr = activeConfig.priceLakhs * 100000;
  const principalInr = totalInr * (1 - downPaymentPct / 100);
  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;
  const emiInr =
    monthlyRate === 0
      ? principalInr / months
      : (principalInr * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <div className="bg-[#FAF9F6]">
      {/* 1. Project Breadcrumb & Hero */}
      <section className="border-b border-[#E7E5E4] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 md:py-16 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
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
              <a
                href="/projects/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/projects/');
                }}
                className="hover:text-[#1C1917]"
              >
                Projects
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E]" />
              <span className="font-semibold text-[#1C1917]">{project.name}</span>
            </nav>

            <a
              href="/projects/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/projects/');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Projects</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                  <span className="font-semibold text-[#D96B27]">{project.status}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.approvals}</span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] text-[#1C1917]">
                  {project.name} — {project.category} in {project.corridor}, Bangalore
                </h1>

                <p className="text-base text-[#57534E] leading-relaxed">{project.summary}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#E7E5E4]">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917] tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-xs text-[#57534E] mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onScheduleSiteVisit(project.id)}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#D96B27] hover:bg-[#B85418] text-white text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Schedule a Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsVirtualTourOpen(true)}
                  className="inline-flex items-center justify-center gap-2 h-12 px-5 bg-[#0E3B4C] hover:bg-[#1C1917] text-white text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>360° Virtual Tour</span>
                </button>
                <button
                  type="button"
                  onClick={() => onScheduleSiteVisit(project.id)}
                  className="h-12 px-5 border border-[#1C1917] hover:border-[#D96B27] hover:text-[#D96B27] text-[#1C1917] text-sm font-semibold rounded transition-colors whitespace-nowrap cursor-pointer"
                >
                  Request Cost Sheet
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
              <div className="aspect-[16/10] bg-[#F4F2ED] border border-[#E7E5E4] overflow-hidden">
                <ArchitecturalImage
                  src={project.image}
                  alt={project.imageAlt}
                  title={project.name}
                  priority
                  width={1200}
                  height={900}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#57534E]">
                <span>{project.location} · {project.approvals}</span>
                <button
                  type="button"
                  onClick={() => setIsVirtualTourOpen(true)}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#0E3B4C] hover:text-[#D96B27] cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Open 360° Panoramic View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. Project Overview & Key Highlights */}
      <section className="py-16 md:py-20 border-b border-[#E7E5E4]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              Project Overview
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#1C1917]">
              About {project.name}
            </h2>
            <p className="text-base text-[#57534E] leading-relaxed">{project.overview}</p>
          </div>

          <div className="lg:col-span-5 p-6 bg-white border border-[#E7E5E4] space-y-4">
            <h3 className="font-display text-2xl font-semibold text-[#1C1917]">Key Highlights</h3>
            <ul className="space-y-2.5">
              {project.highlights.map((item) => (
                <li key={item} className="text-sm text-[#57534E] pb-2 border-b border-[#E7E5E4] last:border-b-0">
                  — {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Project Photography Gallery */}
      <ProjectGallery project={project} />

      {/* 4 & 5. Connectivity & Amenities */}
      <section className="py-16 md:py-20 border-b border-[#E7E5E4] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-7 bg-[#FAF9F6] border border-[#E7E5E4] space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              Location &amp; Connectivity
            </p>
            <h2 className="font-display text-2xl font-semibold text-[#1C1917]">{project.location}</h2>
            <ul className="space-y-2.5 pt-2">
              {project.connectivity.map((item) => (
                <li key={item} className="text-sm text-[#57534E] py-1.5 border-b border-[#E7E5E4] last:border-b-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7 bg-[#FAF9F6] border border-[#E7E5E4] space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              Community Infrastructure
            </p>
            <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
              Amenities &amp; Specifications
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {project.amenities.map((item) => (
                <li key={item} className="text-sm text-[#57534E] py-1.5 border-b border-[#E7E5E4]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6, 7 & 8. Configurations, Approvals, Cost Sheet & Payment Planner */}
      <section className="py-16 md:py-20 border-b border-[#E7E5E4]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                  Master Plan &amp; Configurations
                </p>
                <h2 className="font-display text-3xl font-semibold text-[#1C1917] mt-1">
                  Unit &amp; Plot Specifications
                </h2>
              </div>

              <div className="inline-flex flex-wrap p-1 bg-white border border-[#E7E5E4] rounded">
                {project.configurations.map((cfg) => (
                  <button
                    key={cfg.id}
                    type="button"
                    onClick={() => setSelectedConfigId(cfg.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer ${
                      activeConfig.id === cfg.id
                        ? 'bg-[#0E3B4C] text-white'
                        : 'text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-white border border-[#E7E5E4]">
              <div>
                <div className="text-xs text-[#57534E]">Typology</div>
                <div className="text-sm font-semibold text-[#1C1917] mt-1">
                  {activeConfig.dimensionOrType}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#57534E]">Area</div>
                <div className="font-mono text-base font-semibold text-[#1C1917] tabular-nums mt-1">
                  {activeConfig.areaSqFt.toLocaleString()} sq. ft.
                </div>
              </div>
              <div>
                <div className="text-xs text-[#57534E]">Orientation</div>
                <div className="text-sm font-medium text-[#1C1917] mt-1">{activeConfig.facing}</div>
              </div>
            </div>

            <div className="p-6 bg-white border border-[#E7E5E4] space-y-2">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D96B27]">
                Approvals &amp; RERA Registration
              </div>
              <div className="text-base font-semibold text-[#1C1917]">{project.approvals}</div>
              <p className="font-mono text-xs text-[#0E3B4C]">{project.reraId}</p>
              <p className="text-xs text-[#57534E] leading-relaxed">{project.reraNote}</p>
            </div>
          </div>

          <div className="lg:col-span-5 p-7 bg-[#0E3B4C] border border-[#1D5368] text-white flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">
                Indicative Loan &amp; Outlay Planner
              </h3>
              <p className="text-xs text-slate-200 mt-1">
                Model indicative monthly installments for {activeConfig.label}.
              </p>

              <div className="space-y-4 mt-6">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-200">Own Contribution</span>
                    <span className="font-mono tabular-nums text-[#F3A871]">{downPaymentPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={75}
                    step={5}
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    aria-label="Own contribution percentage"
                    className="w-full accent-[#D96B27] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-200">Loan Tenure</span>
                    <span className="font-mono tabular-nums text-[#F3A871]">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={25}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    aria-label="Loan tenure in years"
                    className="w-full accent-[#D96B27] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-200">Interest Rate</span>
                    <span className="font-mono tabular-nums text-[#F3A871]">
                      {interestRate.toFixed(1)}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={7.5}
                    max={10.5}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    aria-label="Interest rate percentage"
                    className="w-full accent-[#D96B27] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#1D5368] space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-200">Indicative Monthly EMI</span>
                <span className="font-mono text-xl font-bold text-white tabular-nums">
                  INR {Math.round(emiInr).toLocaleString()} / mo
                </span>
              </div>
              <button
                type="button"
                onClick={() => onScheduleSiteVisit(project.id)}
                className="w-full h-12 inline-flex items-center justify-center gap-2 px-5 bg-[#D96B27] hover:bg-[#B85418] text-white text-sm font-semibold rounded transition-colors cursor-pointer"
              >
                <span>Schedule a Site Visit for {project.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Project-Specific FAQs */}
      <section className="py-16 md:py-20 border-b border-[#E7E5E4] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
              Project FAQs
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#1C1917]">
              {project.name} Buyer Questions
            </h2>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#E7E5E4] bg-[#FAF9F6] border border-[#E7E5E4] px-6">
            {project.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={faq.question} className="py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
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

      <VirtualTourModal
        project={project}
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
        onScheduleVisit={onScheduleSiteVisit}
      />
    </div>
  );
}
