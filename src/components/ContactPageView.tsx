import { ChevronRight, Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CORPORATE_CONTACT } from '../data/iconhomzData';

interface ContactPageViewProps {
  onNavigate: (path: string) => void;
}

export function ContactPageView({ onNavigate }: ContactPageViewProps) {
  return (
    <div className="bg-[#FAF9F6]">
      <section className="border-b border-[#E7E5E4] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 md:py-16 space-y-8">
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
            <span className="font-semibold text-[#1C1917]">Contact Us</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">
                ICONHOMZ Corporate Desk · Bengaluru
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] text-[#1C1917]">
                Get in Touch with ICONHOMZ
              </h1>
              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl">
                Connect directly with our HSR Layout headquarters for private project site visits across Bengaluru, verified BDA &amp; RERA documentation packs, or RERA channel partner empanelment.
              </p>

              {/* Direct Call & WhatsApp Advisory Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={CORPORATE_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-5 bg-[#0E3B4C] hover:bg-[#D96B27] text-white text-xs sm:text-sm font-semibold rounded transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Advisory ({CORPORATE_CONTACT.phone})</span>
                </a>
                <a
                  href={`tel:${CORPORATE_CONTACT.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 h-11 px-5 border border-[#1C1917] bg-white hover:border-[#D96B27] hover:text-[#D96B27] text-xs sm:text-sm font-semibold text-[#1C1917] rounded transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D96B27]" />
                  <span>Call Corporate Desk</span>
                </a>
              </div>
            </div>

            {/* Interactive Location Map Summary & Directions Card */}
            <div className="lg:col-span-5 bg-[#FAF9F6] border border-[#E7E5E4] p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D96B27]">
                    Corporate Headquarters Map
                  </div>
                  <h2 className="font-display text-lg font-semibold text-[#1C1917] mt-0.5">
                    Jai Plaza Symphony, HSR Layout
                  </h2>
                </div>
                <MapPin className="w-5 h-5 text-[#0E3B4C] shrink-0" />
              </div>

              {/* Clean Architectural Grid Vector Locator */}
              <div className="relative h-36 bg-white border border-[#E7E5E4] overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 400 160"
                  className="w-full h-full text-[#E7E5E4]"
                  aria-label="Map schematic of ICONHOMZ HSR Layout Sector 6 Bengaluru office"
                >
                  <path
                    d="M0 40 H400 M0 85 H400 M0 130 H400 M70 0 V160 M160 0 V160 M250 0 V160 M335 0 V160"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path d="M0 85 H400" stroke="#A8A29E" strokeWidth="3.5" fill="none" />
                  <path d="M250 0 V160" stroke="#A8A29E" strokeWidth="3" fill="none" />
                  <circle cx="250" cy="85" r="10" fill="#D96B27" fillOpacity="0.22" />
                  <circle cx="250" cy="85" r="5" fill="#D96B27" />
                  <text x="15" y="76" fill="#57534E" fontSize="10" fontFamily="sans-serif">
                    14th Cross Road, Sector 6
                  </text>
                  <text x="260" y="22" fill="#57534E" fontSize="10" fontFamily="sans-serif">
                    9th Main Road
                  </text>
                </svg>
                <div className="absolute bottom-2.5 right-3 bg-white border border-[#E7E5E4] px-2.5 py-1 text-[11px] font-mono text-[#57534E]">
                  {CORPORATE_CONTACT.coordinates}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {CORPORATE_CONTACT.address}
                </p>
                <a
                  href={CORPORATE_CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B4C] hover:text-[#D96B27] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 4 Corporate Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            <div className="p-5 bg-[#FAF9F6] border border-[#E7E5E4] space-y-2">
              <MapPin className="w-4 h-4 text-[#D96B27]" aria-hidden="true" />
              <div className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                Corporate Office
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#1C1917] leading-relaxed">
                {CORPORATE_CONTACT.address}
              </p>
            </div>

            <div className="p-5 bg-[#FAF9F6] border border-[#E7E5E4] space-y-2">
              <Phone className="w-4 h-4 text-[#D96B27]" aria-hidden="true" />
              <div className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                Sales &amp; Advisory Phone
              </div>
              <p className="font-mono text-sm font-semibold text-[#1C1917] tabular-nums">
                {CORPORATE_CONTACT.phone}
              </p>
            </div>

            <div className="p-5 bg-[#FAF9F6] border border-[#E7E5E4] space-y-2">
              <Mail className="w-4 h-4 text-[#D96B27]" aria-hidden="true" />
              <div className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                Email Desk
              </div>
              <p className="text-sm font-semibold text-[#1C1917]">{CORPORATE_CONTACT.email}</p>
            </div>

            <div className="p-5 bg-[#FAF9F6] border border-[#E7E5E4] space-y-2">
              <Clock className="w-4 h-4 text-[#D96B27]" aria-hidden="true" />
              <div className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                Business &amp; Site Visit Hours
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#1C1917]">
                {CORPORATE_CONTACT.hours}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
