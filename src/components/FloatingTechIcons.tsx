import { TechIcon, TECH_COLORS, TECH_LABELS, type TechKey } from './TechIcon';

/** Pure icons (no boxes) that float, glow and show a label on hover. */
export function FloatingTechIcons({ techs }: { techs: TechKey[] }) {
  return (
    <div className="reveal flex flex-wrap items-center justify-center gap-x-5 gap-y-7 sm:gap-x-9 sm:gap-y-9 px-2 py-4">
      {techs.map((t, i) => (
        <div
          key={t}
          className="group relative flex items-center justify-center"
          style={{
            animation: `float-icon ${3.2 + (i % 5) * 0.55}s ease-in-out ${-(i * 0.37)}s infinite`,
          }}
        >
          {/* brand colour glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full blur-xl opacity-25 group-hover:opacity-70 scale-100 group-hover:scale-[1.8] transition-all duration-500"
            style={{ background: TECH_COLORS[t] }}
          />
          <span className="relative block transition-transform duration-300 ease-out group-hover:scale-[1.45] group-hover:-translate-y-1 group-hover:rotate-6 drop-shadow-[0_4px_10px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)]">
            <TechIcon tech={t} size={46} animate={false} className="w-9 h-9 sm:w-[46px] sm:h-[46px]" />
          </span>

          <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 dark:bg-white px-2 py-0.5 text-[10px] font-bold text-white dark:text-slate-900 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-lg">
            {TECH_LABELS[t]}
          </span>
        </div>
      ))}
    </div>
  );
}
