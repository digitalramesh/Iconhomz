import type { ReactNode } from 'react';

interface BankPartner {
  id: string;
  name: string;
  subtitle: string;
  renderLogo: (uid: string) => ReactNode;
}

const BANK_PARTNERS: BankPartner[] = [
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    subtitle: 'Home & Plot Finance',
    renderLogo: () => (
      <svg
        viewBox="0 0 210 44"
        className="h-8 sm:h-9 w-auto"
        role="img"
        aria-label="HDFC Bank"
      >
        <rect x="2" y="6" width="32" height="32" fill="#ED1C24" />
        <rect x="8.5" y="12.5" width="19" height="19" fill="#FFFFFF" />
        <rect x="16.5" y="6" width="3" height="32" fill="#FFFFFF" />
        <rect x="2" y="20.5" width="32" height="3" fill="#FFFFFF" />
        <rect x="13" y="17" width="10" height="10" fill="#004C8F" />
        <rect x="38" y="6" width="168" height="32" fill="#004C8F" />
        <text
          x="122"
          y="28"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Plus Jakarta Sans, Arial, sans-serif"
          fontWeight="800"
          fontSize="16.5"
          letterSpacing="1.2"
        >
          HDFC BANK
        </text>
      </svg>
    )
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    subtitle: 'Approved Mortgage Partner',
    renderLogo: (uid: string) => (
      <svg
        viewBox="0 0 205 44"
        className="h-8 sm:h-9 w-auto"
        role="img"
        aria-label="ICICI Bank"
      >
        <defs>
          <linearGradient id={`iciciFlame-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F58220" />
            <stop offset="100%" stopColor="#B02A30" />
          </linearGradient>
        </defs>
        <path
          d="M22 4C11.5 5.5 4 14.5 4 25.5C4 34.5 10.5 40 19.5 40C29 40 36 33 36 22.5C36 14 30.5 6.5 22 4Z"
          fill={`url(#iciciFlame-${uid})`}
        />
        <circle cx="24" cy="13" r="3" fill="#FFFFFF" />
        <path
          d="M17.5 21C15.5 26 14.5 32 16 36.5C18.5 34.5 21.5 28 23.5 20.5L17.5 21Z"
          fill="#FFFFFF"
        />
        <text
          x="44"
          y="30"
          fill="#9E1B32"
          fontFamily="Plus Jakarta Sans, Georgia, serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="22"
          letterSpacing="-0.5"
        >
          ICICI Bank
        </text>
      </svg>
    )
  },
  {
    id: 'sbi',
    name: 'State Bank of India',
    subtitle: 'Public Sector Lending',
    renderLogo: () => (
      <svg
        viewBox="0 0 140 44"
        className="h-8 sm:h-9 w-auto"
        role="img"
        aria-label="SBI"
      >
        <circle cx="22" cy="22" r="17" fill="#00B5EF" />
        <circle cx="22" cy="19.5" r="4.5" fill="#FFFFFF" />
        <rect x="20.4" y="23.5" width="3.2" height="16" fill="#FFFFFF" />
        <text
          x="48"
          y="33"
          fill="#280071"
          fontFamily="Outfit, Arial Black, sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="-0.8"
        >
          SBI
        </text>
      </svg>
    )
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    subtitle: 'Pre-Approved Projects',
    renderLogo: () => (
      <svg
        viewBox="0 0 195 44"
        className="h-8 sm:h-9 w-auto"
        role="img"
        aria-label="Axis Bank"
      >
        <path d="M22 5L4 38H15L22 25L29 38H40L22 5Z" fill="#97144D" />
        <path d="M22 17L16.5 27H27.5L22 17Z" fill="#FFFFFF" />
        <text
          x="50"
          y="29"
          fill="#97144D"
          fontFamily="Outfit, Plus Jakarta Sans, sans-serif"
          fontWeight="700"
          fontSize="19"
          letterSpacing="1"
        >
          AXIS BANK
        </text>
      </svg>
    )
  },
  {
    id: 'lic-hfl',
    name: 'LIC Housing Finance Ltd',
    subtitle: 'Home Loan Institution',
    renderLogo: () => (
      <svg
        viewBox="0 0 185 48"
        className="h-9 sm:h-10 w-auto"
        role="img"
        aria-label="LIC HFL Housing Finance Ltd"
      >
        <path d="M22 4L4 17H9V34H35V17H40L22 4Z" fill="#00529B" />
        <path d="M13 20C13 15 20 12 22 12C24 12 31 15 31 20C31 26 22 31 22 31C22 31 13 26 13 20Z" fill="#FFFFFF" />
        <path d="M18 19L22 14L26 19V25H18V19Z" fill="#00529B" />
        <rect x="42" y="13" width="106" height="21" rx="2" fill="#FFCB05" />
        <text
          x="95"
          y="29"
          textAnchor="middle"
          fill="#004C97"
          fontFamily="Outfit, Arial Black, sans-serif"
          fontWeight="800"
          fontSize="16"
          letterSpacing="0.8"
        >
          LIC HFL
        </text>
        <text
          x="95"
          y="44"
          textAnchor="middle"
          fill="#004C97"
          fontFamily="Plus Jakarta Sans, Arial, sans-serif"
          fontWeight="700"
          fontSize="8.5"
          letterSpacing="0.3"
        >
          LIC HOUSING FINANCE LTD
        </text>
      </svg>
    )
  },
  {
    id: 'bajaj',
    name: 'Bajaj Housing Finance',
    subtitle: 'Rapid Sanction Desk',
    renderLogo: () => (
      <svg
        viewBox="0 0 205 44"
        className="h-8 sm:h-9 w-auto"
        role="img"
        aria-label="Bajaj Housing Finance"
      >
        <rect x="4" y="5" width="40" height="34" fill="#005BAA" />
        <path
          d="M17 12H27C30 12 31.5 13.5 31.5 15.8C31.5 17.5 30.2 18.7 28.6 19.1C30.6 19.6 32 21 32 23.1C32 25.8 30 27.5 26.8 27.5H17L20 24H26C27.2 24 27.9 23.4 27.9 22.4C27.9 21.4 27.2 20.8 26 20.8H20.5L22.5 18.2H25.7C26.8 18.2 27.5 17.6 27.5 16.7C27.5 15.8 26.8 15.2 25.7 15.2H18.5L17 12Z"
          fill="#FFFFFF"
        />
        <text
          x="24"
          y="36.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Outfit, Arial, sans-serif"
          fontWeight="800"
          fontSize="7"
          letterSpacing="0.8"
        >
          BAJAJ
        </text>
        <text
          x="53"
          y="20"
          fill="#005BAA"
          fontFamily="Outfit, Arial, sans-serif"
          fontWeight="800"
          fontSize="13.5"
          letterSpacing="0.5"
        >
          HOUSING
        </text>
        <text
          x="53"
          y="34"
          fill="#005BAA"
          fontFamily="Outfit, Arial, sans-serif"
          fontWeight="800"
          fontSize="13.5"
          letterSpacing="0.5"
        >
          FINANCE
        </text>
      </svg>
    )
  }
];

interface FloatingBankingPartnersProps {
  compact?: boolean;
}

export function FloatingBankingPartners({ compact = false }: FloatingBankingPartnersProps) {
  return (
    <section
      aria-label="Banking and Finance Partners"
      className={`${
        compact ? 'py-10 md:py-12' : 'py-12 md:py-16'
      } bg-[#FAF9F6] border-b border-[#E7E5E4]`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0E3B4C]">
            BANKING &amp; FINANCE PARTNERS
          </p>
          <p className="text-xs text-[#57534E]">
            Approved housing finance institutions supporting ICONHOMZ residential allotments
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BANK_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-white border border-[#E7E5E4] px-4 py-4 flex items-center justify-center h-[80px]"
              title={`${partner.name} — ${partner.subtitle}`}
            >
              {partner.renderLogo(partner.id)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
