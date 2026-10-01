import { AnimatedCounter } from './AnimatedCounter';
import { Award, Code, Briefcase, Layers, ThumbsUp } from 'lucide-react';

const stats = [
  { icon: Code, value: 32, suffix: '+', label: 'Projects Delivered', sub: 'Web apps, dashboards, SaaS & client sites', color: 'text-indigo-600 dark:text-indigo-400', glow: 'from-indigo-500/10' },
  { icon: Briefcase, value: 3, suffix: '+', label: 'Years Experience', sub: 'Frontend → Full Stack → Cloud', color: 'text-emerald-600 dark:text-emerald-400', glow: 'from-emerald-500/10' },
  { icon: Layers, value: 25, suffix: '+', label: 'Technologies', sub: 'React, Node, MongoDB, MySQL, AWS…', color: 'text-amber-600 dark:text-amber-400', glow: 'from-amber-500/10' },
  { icon: Award, value: 2, suffix: '', label: 'Live SaaS Platforms', sub: 'CyberSense & CyberDefenderPro', color: 'text-sky-600 dark:text-sky-400', glow: 'from-sky-500/10' },
  { icon: ThumbsUp, value: 100, suffix: '%', label: 'Client Satisfaction', sub: 'Happy clients, repeat work', color: 'text-rose-600 dark:text-rose-400', glow: 'from-rose-500/10' },
];

export function StatsSection() {
  return (
    <section className="reveal grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
            i === stats.length - 1 ? 'col-span-2 lg:col-span-1' : ''
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${s.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

          <s.icon className={`relative w-6 h-6 sm:w-7 sm:h-7 ${s.color} mb-3 transition-transform group-hover:scale-110 group-hover:-rotate-6`} strokeWidth={1.75} />

          <div className="relative text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
            <AnimatedCounter end={s.value} suffix={s.suffix} duration={1800 + i * 200} />
          </div>
          <p className="relative mt-1.5 text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-bold">{s.label}</p>
          <p className="relative mt-0.5 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{s.sub}</p>
        </div>
      ))}
    </section>
  );
}
