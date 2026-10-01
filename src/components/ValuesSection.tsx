import { Code2, ShieldCheck, Zap, Users, Sparkles, GitBranch } from 'lucide-react';

const values = [
  {
    icon: Code2,
    title: 'Clean, Scalable Code',
    desc: 'Writing code that future me (and teammates) will actually enjoy reading.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: ShieldCheck,
    title: 'Security First',
    desc: 'JWT auth, middleware, and input validation baked into every API.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Performance Obsessed',
    desc: 'Optimized bundles, lazy routes, and sub-second load times.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'User-Centric UX',
    desc: 'Building interfaces that feel intuitive, not engineered.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Attention to Detail',
    desc: 'Pixel-perfect polish, micro-interactions, and accessibility.',
    gradient: 'from-purple-500 to-fuchsia-500',
  },
  {
    icon: GitBranch,
    title: 'DevOps Mindset',
    desc: 'CI/CD, AWS EC2, Nginx, PM2 — shipping to production is half the job.',
    gradient: 'from-sky-500 to-cyan-500',
  },
];

export function ValuesSection() {
  return (
    <section className="reveal">
      <div className="mb-8 text-center">
        <span className="section-kicker">WHY ME</span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          What I bring to every project
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Beyond code — the principles and mindset I apply to every line I ship.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {values.map((v, i) => (
          <div
            key={v.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 hover:border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Animated gradient border on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />

            {/* Icon container */}
            <div className={`relative mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${v.gradient} text-white shadow-lg shadow-slate-900/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
              <v.icon className="w-6 h-6" strokeWidth={2} />
            </div>

            <h3 className="relative text-base font-bold text-slate-900 dark:text-white mb-2">
              {v.title}
            </h3>
            <p className="relative text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {v.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
