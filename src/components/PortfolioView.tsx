import React, { useMemo, useState } from 'react';
import {
  Server, ExternalLink, Code2, Car, Terminal, ChevronRight, Mail, Phone, MapPin,
  CheckCircle2, ArrowUpRight, Database, Cloud, Zap, GraduationCap, Briefcase,
  Sparkles, Layers, ShieldCheck,
} from 'lucide-react';
import { cvData } from '../data/cvData';
import { TechIcon, TechMarquee, type TechKey } from './TechIcon';
import { TypingText } from './TypingText';
import { StatsSection } from './StatsSection';
import { InteractiveTerminal } from './InteractiveTerminal';
import { ValuesSection } from './ValuesSection';
import { TiltCard } from './TiltCard';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ContactSection } from './ContactSection';
import { SectionNav } from './SectionNav';
import { FloatingTechIcons } from './FloatingTechIcons';
// import { OrbitAvatar } from './OrbitAvatar';

const LinkedInIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

type FilterKey = 'all' | 'mern' | 'saas' | 'frontend';

const FILTERS: { key: FilterKey; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All Projects', icon: <Layers className="w-3.5 h-3.5" /> },
  { key: 'mern', label: 'MERN & Full Stack', icon: <Server className="w-3.5 h-3.5" /> },
  { key: 'saas', label: 'SaaS & Dashboards', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { key: 'frontend', label: 'Frontend UI', icon: <Code2 className="w-3.5 h-3.5" /> },
];

const CATEGORY_BADGE: Record<FilterKey, { text: string; cls: string }> = {
  all: { text: 'Project', cls: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700' },
  mern: { text: 'MERN · Full Stack', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30' },
  saas: { text: 'SaaS Platform', cls: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30' },
  frontend: { text: 'Frontend UI', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30' },
};

const SKILL_CARD_STYLES = [
  'from-indigo-500/10 to-indigo-500/0 dark:from-indigo-500/20',
  'from-emerald-500/10 to-emerald-500/0 dark:from-emerald-500/20',
  'from-sky-500/10 to-sky-500/0 dark:from-sky-500/20',
  'from-amber-500/10 to-amber-500/0 dark:from-amber-500/20',
  'from-orange-500/10 to-orange-500/0 dark:from-orange-500/20',
  'from-rose-500/10 to-rose-500/0 dark:from-rose-500/20',
  'from-purple-500/10 to-purple-500/0 dark:from-purple-500/20',
];

const SKILL_ICONS = [Code2, Server, Zap, Database, Cloud, Terminal, Sparkles];

interface PortfolioViewProps {
  onOpenAutoGemzDemo: () => void;
  onSwitchToCV: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onOpenAutoGemzDemo,
  onSwitchToCV,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterKey>('all');
  const [search, setSearch] = useState('');

  const filteredProjects = useMemo(() => {
    const base =
      activeCategory === 'all'
        ? cvData.featuredProjects
        : cvData.featuredProjects.filter((p) => p.category === activeCategory);
    const q = search.trim().toLowerCase();
    if (!q) return base;
    return base.filter((p) =>
      `${p.title} ${p.description} ${p.role} ${p.tags.join(' ')} ${p.icons.join(' ')}`.toLowerCase().includes(q)
    );
  }, [activeCategory, search]);

  const counts = useMemo(() => {
    const map: Record<FilterKey, number> = { all: cvData.featuredProjects.length, mern: 0, saas: 0, frontend: 0 };
    cvData.featuredProjects.forEach((p) => { map[p.category] += 1; });
    return map;
  }, []);

  const allIcons = useMemo(
    () => Array.from(new Set(cvData.featuredProjects.flatMap((p) => p.icons))) as TechKey[],
    []
  );

  const skillIcons = useMemo(
    () => Array.from(new Set(Object.values(cvData.skills).flatMap((g) => g.icons))) as TechKey[],
    []
  );

  const skillEntries = Object.entries(cvData.skills) as [
    keyof typeof cvData.skills,
    (typeof cvData.skills)[keyof typeof cvData.skills],
  ][];

  return (
    <div className="space-y-14 sm:space-y-20 pb-16 sm:pb-24">
      <SectionNav />
      {/* ================= HERO ================= */}
      <section id="home" className="reveal scroll-mt-24 relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-8 lg:p-12 shadow-sm">
        {/* animated blobs */}
        <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-indigo-400/20 dark:bg-indigo-500/25 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-sky-400/20 dark:bg-sky-500/20 blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

        <div className="relative space-y-5 sm:space-y-7 text-center">
          {/* <OrbitAvatar /> */}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-indicator" />
            Available for Full Stack & Cloud Developer Roles
          </div>

          <h1 className="text-[2rem] leading-tight sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-700 dark:from-indigo-400 dark:via-sky-400 dark:to-indigo-300 animate-gradient-text">
              {cvData.personal.name}
            </span>
          </h1>

          <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight min-h-[3.4rem] sm:min-h-[2.8rem]">
            I build <TypingText />
          </div>

          <p className="text-sm sm:text-base lg:text-lg font-medium text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {cvData.personal.summary} With <strong className="text-indigo-600 dark:text-indigo-400">3+ years of experience</strong> and{' '}
            <strong className="text-indigo-600 dark:text-indigo-400">32+ projects delivered</strong>, I work across MERN platforms, JWT &amp; RBAC security, Cloudinary media pipelines and AWS EC2 deployments with Nginx + PM2.
          </p>

          {/* Stat pills */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto pt-1">
            {[
              { top: 'MERN Stack', sub: 'React · Node · Express · Mongo' },
              { top: 'AWS EC2', sub: 'Nginx & PM2 Production' },
              { top: 'JWT + RBAC', sub: 'Secure Multi-Role APIs' },
              { top: 'Islamabad, PK', sub: cvData.personal.phone },
            ].map((s, i) => (
              <div
                key={s.top}
                className="animate-fade-up rounded-xl bg-slate-50 dark:bg-slate-800/70 p-3 border border-slate-200/80 dark:border-slate-700 text-center"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">{s.top}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-tight">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-3">
            <button
              onClick={onOpenAutoGemzDemo}
              className="shine group w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Car className="w-4 h-4 transition-transform group-hover:rotate-6" />
              Explore AutoGemz System
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={onSwitchToCV}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-xs transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              View CV
            </button>

            <a
              href={`mailto:${cvData.personal.email}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* ================= TECH MARQUEE ================= */}
      <section className="reveal -mt-6 sm:-mt-8">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-3.5 shadow-sm">
          <TechMarquee techs={allIcons} />
        </div>
      </section>

      {/* ================= STATS ================= */}
      <StatsSection />

      {/* ================= SKILLS (MOVED TO TOP) ================= */}
      <section id="skills" className="space-y-6">
        <div className="reveal text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/30">
            <Sparkles className="w-3 h-3" /> Core Competencies
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Skills
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Languages, frameworks, databases and cloud tooling practiced across commercial SaaS platforms and MERN systems.
          </p>
        </div>

        {/* Floating animated icons — no boxes */}
        <FloatingTechIcons techs={skillIcons} />

        {/* Skill category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {skillEntries.map(([key, group], idx) => {
            const IconCmp = SKILL_ICONS[idx % SKILL_ICONS.length];
            return (
              <div
                key={key}
                className={`reveal group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br ${SKILL_CARD_STYLES[idx % SKILL_CARD_STYLES.length]}`}
              >
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-xs transition-transform group-hover:scale-110">
                    <IconCmp className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{group.label}</h3>
                </div>

                {/* animated icons row */}
                <div className="flex flex-wrap items-center gap-2 mb-3.5">
                  {group.icons.map((t, i) => (
                    <span
                      key={t}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-transform hover:scale-110 hover:-translate-y-1 tech-icon-animate"
                      style={{ animationDelay: `${i * 260}ms` }}
                      title={t}
                    >
                      <TechIcon tech={t} size={19} animate={false} />
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= AUTOGEMZ SPOTLIGHT ================= */}
      <section id="flagship" className="reveal scroll-mt-24 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-8 lg:p-10 shadow-2xl border border-slate-800">
        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl animate-float-slow" />

        <div className="relative space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-indicator" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
                Flagship MERN + AWS Deployment
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-slate-300">
              {['AWS EC2', 'Nginx', 'PM2', 'Cloudinary'].map((t) => (
                <span key={t} className="bg-slate-800 px-2 py-1 rounded-md border border-slate-700">{t}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold">AutoGemz — Vehicle Inspection Management System</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Full-stack MERN application for professional vehicle inspection management with role-based access, Cloudinary image storage, interactive car diagrams, and automated PDF report generation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  { t: 'Interactive SVG Car Diagram', d: 'PakWheels-style defect markers with clickable zones.' },
                  { t: 'Cloudinary Multi-Zone Storage', d: 'Multer memory uploads with permanent HTTPS URLs.' },
                  { t: 'Dynamic A4 PDF Reports', d: 'HTML-to-print engine with ratings & checklists.' },
                  { t: '2-Role RBAC System', d: 'Admin full CRUD; User view, PDF download & issues.' },
                ].map((f, i) => (
                  <div
                    key={f.t}
                    className="animate-fade-up p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5 hover:bg-slate-800 transition-colors"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-[11px] sm:text-xs text-slate-300">
                      <strong className="text-white block font-semibold">{f.t}</strong>
                      {f.d}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                <button
                  onClick={onOpenAutoGemzDemo}
                  className="shine w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <Car className="w-4 h-4" /> Launch Live Interactive Simulator
                </button>
                <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-1.5">
                  <span>Node.js/Express on AWS EC2</span><span className="hidden sm:inline">•</span>
                  <span className="sm:hidden">·</span>
                  <span>React.js on Vercel</span>
                </div>
              </div>
            </div>

            {/* Architecture card */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-800/70 border border-slate-700 p-4 sm:p-5 space-y-3 font-mono text-[11px] sm:text-xs">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2.5 font-sans">
                <span className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase">Deployment Architecture</span>
                <span className="text-emerald-400 text-[10px] sm:text-[11px]">EC2 Live</span>
              </div>
              <div className="space-y-2 text-slate-300">
                {[
                  ['Frontend', 'React 18 + Bootstrap 5 + Router v6'],
                  ['Backend', 'Node.js + Express.js REST API'],
                  ['Database', 'MongoDB + Mongoose ODM'],
                  ['Auth', 'JWT + bcryptjs (2 roles)'],
                  ['Media CDN', 'Cloudinary (multer memory)'],
                  ['Web Server', 'Nginx Reverse Proxy + SSL'],
                  ['Daemon', 'PM2 Cluster Mode'],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className="animate-fade-up flex flex-col sm:flex-row justify-between gap-0.5 sm:gap-2 py-1 border-b border-slate-700/50"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <span className="text-slate-400">{k}:</span>
                    <span className="text-white text-right sm:text-right">{v}</span>
                  </div>
                ))}
              </div>

              {/* animated tech icons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {(['react', 'nodejs', 'mongodb', 'cloudinary', 'aws', 'nginx', 'pm2'] as TechKey[]).map((t, i) => (
                  <span
                    key={t}
                    className="tech-icon-animate w-8 h-8 rounded-lg bg-slate-900/70 border border-slate-700 flex items-center justify-center"
                    style={{ animationDelay: `${i * 200}ms` }}
                    title={t}
                  >
                    <TechIcon tech={t} size={17} animate={false} />
                  </span>
                ))}
              </div>

              <button
                onClick={onOpenAutoGemzDemo}
                className="w-full py-2.5 bg-slate-700/70 hover:bg-slate-700 text-indigo-300 hover:text-white rounded-lg font-sans font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Inspect Interactive Car Model <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS WITH WORKING TABS ================= */}
      <section id="projects" className="scroll-mt-24 space-y-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Projects &amp; Systems
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              <strong className="text-slate-700 dark:text-slate-200">32+ projects delivered</strong> — here are {cvData.featuredProjects.length} detailed case studies. Filter by stack or search by technology.
            </p>
          </div>

          {/* Live search */}
          <div className="relative w-full md:w-72">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search: react, mysql, aws, jwt…"
              aria-label="Search projects"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 pl-9 pr-9 py-2.5 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
            <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
            </svg>
            {search ? (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 text-[11px] leading-none flex items-center justify-center cursor-pointer"
              >
                ×
              </button>
            ) : null}
          </div>
        </div>

        {/* WORKING FILTER TABS */}
        <div className="reveal -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-1">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs min-w-max">
            {FILTERS.map((f) => {
              const active = activeCategory === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveCategory(f.key)}
                  className={`relative px-3 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {f.icon}
                  {f.label}
                  <span
                    className={`ml-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      active ? 'bg-white/25 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {counts[f.key]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Project Cards */}
        <div key={activeCategory} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredProjects.map((p, i) => {
            const badge = CATEGORY_BADGE[p.category];
            return (
              <TiltCard key={p.id} className="h-full">
              <article
                className="animate-pop-in group flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full border ${badge.cls}`}>
                    {badge.text}
                  </span>
                  {p.liveUrl && p.liveUrl !== '#' ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                    >
                      Live <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={onOpenAutoGemzDemo}
                      className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Demo <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {p.title}
                </h3>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Role: <strong className="text-slate-700 dark:text-slate-200">{p.role}</strong>
                  {p.period ? <span className="ml-2 text-slate-400">• {p.period}</span> : null}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">{p.description}</p>

                <ul className="mt-3 space-y-1.5 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 list-disc list-inside leading-relaxed">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                {/* animated project tech icons */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.icons.map((t, idx) => (
                    <span
                      key={t}
                      className="tech-icon-animate w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:scale-110 transition-transform"
                      style={{ animationDelay: `${idx * 220}ms` }}
                      title={t}
                    >
                      <TechIcon tech={t} size={17} animate={false} />
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] sm:text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
              </TiltCard>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400">
            No projects match {search ? `“${search}”` : 'this category'}.{' '}
            {search ? (
              <button type="button" onClick={() => setSearch('')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer">
                Clear search
              </button>
            ) : null}
          </div>
        )}

        {/* 32+ projects note */}
        <div className="reveal flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-dashed border-indigo-300 dark:border-indigo-500/40 bg-indigo-50/60 dark:bg-indigo-500/5 p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 text-center sm:text-left">
            <strong className="text-indigo-700 dark:text-indigo-300">32+ projects</strong> built so far — landing pages, client websites, dashboards, SaaS and full-stack systems. More samples & live demos available on request.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shine shrink-0 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            Request more samples <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* ================= VALUES / WHAT I BRING ================= */}
      <ValuesSection />

      {/* ================= DEVELOPER TERMINAL ================= */}
      <section className="reveal">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/30">
            <Terminal className="w-3 h-3" /> Developer Mode
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Peek under the hood
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            An interactive glimpse into my workflow. Try it — it's real data.
          </p>
        </div>
        <InteractiveTerminal />
      </section>

      {/* ================= EXPERIENCE + EDUCATION ================= */}
      <section id="experience" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        <div className="reveal lg:col-span-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Work Experience Timeline
          </h2>

          <ExperienceTimeline />
        </div>

        <div className="lg:col-span-4 space-y-5">
          <div className="reveal rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 space-y-3 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Education
            </h3>
            <div className="text-sm font-bold text-slate-800 dark:text-white">{cvData.education.degree}</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300">{cvData.education.institution}</div>
            <div className="text-[11px] text-slate-400">
              {cvData.education.period} • {cvData.education.location}
            </div>
          </div>

          <div className="reveal rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-5 sm:p-6 shadow-lg space-y-3.5">
            <h3 className="font-bold text-base">Direct Contact</h3>
            <div className="space-y-2 text-[11px] sm:text-xs">
              <a href={`mailto:${cvData.personal.email}`} className="flex items-center gap-2 hover:underline font-mono break-all">
                <Mail className="w-4 h-4 text-indigo-200 shrink-0" /> {cvData.personal.email}
              </a>
              <a href={`tel:${cvData.personal.phone}`} className="flex items-center gap-2 hover:underline font-mono">
                <Phone className="w-4 h-4 text-indigo-200 shrink-0" /> {cvData.personal.phone}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-200 shrink-0" />
                <span>{cvData.personal.location} ({cvData.personal.nationality})</span>
              </div>
              <a
                href={cvData.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline break-all"
              >
                <LinkedInIcon className="w-4 h-4 text-indigo-200 shrink-0" /> {cvData.personal.linkedin}
              </a>
            </div>
            <button
              onClick={onSwitchToCV}
              className="shine w-full py-2.5 bg-white hover:bg-slate-100 text-indigo-900 font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Open Print-Ready CV
            </button>
          </div>

          <div className="reveal rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Also Comfortable With
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {['Vue.js', 'Axios', 'Fetch API', 'Bitbucket', 'cPanel', 'GoDaddy', 'LDAP', 'Postman', 'Figma'].map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <ContactSection />
    </div>
  );
};
