import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { CUSTOMER_EXPERIENCES } from '../data/iconhomzData';

interface FloatingTestimonialsProps {
  title?: string;
  kicker?: string;
}

export function FloatingTestimonials({
  title = 'Homeowner & Investor Experiences',
  kicker = 'Resident Voices'
}: FloatingTestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const testimonials = CUSTOMER_EXPERIENCES.slice(0, 4);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const syncScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    syncScrollState();
    window.addEventListener('resize', syncScrollState);
    return () => window.removeEventListener('resize', syncScrollState);
  }, []);

  const handleStep = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const stepDistance = Math.max(320, Math.round(el.clientWidth * 0.52));
    el.scrollBy({
      left: direction === 'left' ? -stepDistance : stepDistance,
      behavior: 'smooth'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96B27]">{kicker}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1C1917]">{title}</h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleStep('left')}
            disabled={!canScrollLeft}
            aria-label="Previous testimonial"
            className="bg-white border border-[#E7E5E4] h-11 w-11 rounded inline-flex items-center justify-center text-[#1C1917] hover:border-[#D96B27] hover:text-[#D96B27] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => handleStep('right')}
            disabled={!canScrollRight}
            aria-label="Next testimonial"
            className="bg-white border border-[#E7E5E4] h-11 w-11 rounded inline-flex items-center justify-center text-[#1C1917] hover:border-[#D96B27] hover:text-[#D96B27] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={syncScrollState}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((exp) => (
          <blockquote
            key={exp.id}
            className="snap-start bg-white border border-[#E7E5E4] w-full sm:w-[calc(50%-12px)] shrink-0 p-7 sm:p-9 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <Quote className="w-5 h-5 text-[#D96B27]" aria-hidden="true" />
              <p className="text-sm sm:text-base text-[#1C1917] leading-relaxed">“{exp.quote}”</p>
            </div>

            <footer className="pt-5 border-t border-[#E7E5E4]">
              <div className="text-sm font-semibold text-[#1C1917]">{exp.name}</div>
              <div className="text-xs font-semibold text-[#D96B27] mt-0.5">{exp.community}</div>
              <div className="text-xs text-[#57534E] mt-0.5">{exp.context}</div>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
