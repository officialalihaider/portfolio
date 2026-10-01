import { useEffect, useRef, useState } from 'react';
import { cvData } from '../data/cvData';

const skillsData = cvData.skills as Record<string, { label: string; items: string[] }>;

const lines = [
  { type: 'cmd', text: `whoami` },
  { type: 'out', text: cvData.personal.name },
  { type: 'cmd', text: `cat profile.txt` },
  { type: 'out', text: cvData.personal.summary },
  { type: 'cmd', text: `ls skills/` },
  { type: 'out', text: Object.keys(skillsData).join('  ') },
  { type: 'cmd', text: `cat skills/frontEnd` },
  { type: 'out', text: skillsData.frontEnd.items.join(' • ') },
  { type: 'cmd', text: `cat skills/backEnd` },
  { type: 'out', text: skillsData.backEnd.items.slice(0, 4).join(' • ') },
  { type: 'cmd', text: `cat skills/deploymentAndHosting` },
  { type: 'out', text: skillsData.deploymentAndHosting.items.join(' • ') },
  { type: 'cmd', text: `git log --oneline -3` },
  { type: 'out', text: `a1f3c2b feat: AutoGemz — Vehicle Inspection MERN System` },
  { type: 'out', text: `7d2e841 feat: CyberDefenderPro — Phishing SaaS Platform` },
  { type: 'out', text: `b9c4e5f feat: CyberSense — Learning Dashboard` },
  { type: 'cmd', text: `curl ${cvData.personal.email}` },
  { type: 'out', text: `HTTP/2 200 OK • Available for hire ✨` },
];

export function InteractiveTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) setStarted(true);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= lines.length) return;

    const delay = lines[visibleLines]?.type === 'cmd' ? 400 : 180;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [started, visibleLines]);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-950 shadow-2xl shadow-indigo-500/20"
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-[11px] text-slate-400 font-mono">ali@portfolio:~</span>
        <span className="w-12" />
      </div>

      <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed text-slate-200 max-h-[360px] overflow-y-auto">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 20}ms` }}>
            {line.type === 'cmd' ? (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">➜</span>
                <span className="text-cyan-400">~</span>
                <span className="text-white">{line.text}</span>
              </div>
            ) : (
              <div className="text-slate-400 ml-4 break-words">{line.text}</div>
            )}
          </div>
        ))}

        {visibleLines < lines.length && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-emerald-400">➜</span>
            <span className="text-cyan-400">~</span>
            <span className="animate-caret text-white">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}
