interface IconhomzLogoProps {
  theme?: 'light' | 'dark';
  showTagline?: boolean;
  size?: 'sm' | 'md';
}

export function IconhomzLogo({
  theme = 'light',
  showTagline = false,
  size = 'md'
}: IconhomzLogoProps) {
  const isDark = theme === 'dark';
  const primaryFill = isDark ? '#FFFFFF' : '#0E3B4C';
  const accentFill = isDark ? '#E07A38' : '#D96B27';
  const mutedText = isDark ? 'text-slate-300' : 'text-[#57534E]';

  const iconSize = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9 md:w-10 md:h-10';
  const titleSize =
    size === 'sm'
      ? 'text-xl tracking-[0.04em]'
      : 'text-2xl md:text-[26px] tracking-[0.04em]';

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      {/* Architectural Pavilion & Courtyard 'I' Monogram */}
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`${iconSize} shrink-0`}
      >
        {/* Cantilevered Pitched Roofline */}
        <path
          d="M5 20.5L22 6L39 20.5"
          stroke={accentFill}
          strokeWidth="2.8"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Inner Architectural Eave Accent */}
        <path
          d="M12.5 21.5L22 13.5L31.5 21.5"
          stroke={primaryFill}
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Left & Right Structural Courtyard Walls */}
        <path
          d="M10.5 22.5V37.5H17.5V27.5H26.5V37.5H33.5V22.5"
          stroke={primaryFill}
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Ground Plinth Line */}
        <path
          d="M6.5 37.5H37.5"
          stroke={primaryFill}
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        {/* Central Hearth / 'I' Monogram Core */}
        <rect x="20.25" y="21" width="3.5" height="9" fill={accentFill} />
      </svg>

      <span className="flex flex-col leading-none">
        <span className={`font-display font-bold ${titleSize}`}>
          <span style={{ color: primaryFill }}>ICON</span>
          <span style={{ color: accentFill }}>HOMZ</span>
        </span>
        {showTagline && (
          <span
            className={`text-[9px] font-semibold uppercase tracking-[0.26em] mt-1 ${mutedText}`}
          >
            Conscious Living
          </span>
        )}
      </span>
    </span>
  );
}
