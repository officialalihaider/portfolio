import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'flagship', label: 'AutoGemz' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/** Floating scroll-spy dots (desktop only). */
export function SectionNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav aria-label="Section navigation" className="no-print hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3.5">
      {SECTIONS.map((s) => {
        const on = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to ${s.label}`}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="group flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`text-[10px] font-bold px-2 py-1 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg transition-all duration-200 ${
                on ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                on
                  ? 'w-3 h-3 bg-indigo-600 shadow-[0_0_0_4px_rgba(99,102,241,0.25)]'
                  : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-400'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
