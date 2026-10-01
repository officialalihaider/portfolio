import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { cvData } from '../data/cvData';
import { TechIcon } from './TechIcon';

export function ExperienceTimeline() {
  const [open, setOpen] = useState<string | null>(`${cvData.experiences[0].id}-0`);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
        <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/30">
          3+ Years Professional Experience
        </span>
        <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          2 Companies
        </span>
        <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          32+ Projects
        </span>
      </div>

      <div className="space-y-8 pl-4 border-l-2 border-indigo-100 dark:border-indigo-500/30">
        {cvData.experiences.map((exp, i) => (
          <div key={exp.id} className="relative space-y-3">
            <div
              className={`absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full ring-4 ${
                i === 0
                  ? 'bg-indigo-600 ring-indigo-50 dark:ring-indigo-500/20 pulse-indicator'
                  : 'bg-slate-400 ring-slate-100 dark:ring-slate-800'
              }`}
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{exp.role}</h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 w-max">
                {exp.period}
              </span>
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {exp.company}
              </a>{' '}
              — {exp.location}
            </div>

            <div className="space-y-2">
              {exp.projects?.map((p, idx) => {
                const key = `${exp.id}-${idx}`;
                const isOpen = open === key;
                return (
                  <div
                    key={key}
                    className={`rounded-xl border transition-colors ${
                      isOpen
                        ? 'border-indigo-300 dark:border-indigo-500/50 bg-indigo-50/40 dark:bg-indigo-500/5'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : key)}
                      className="w-full flex items-center justify-between gap-3 p-3 text-left cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{p.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Role: <strong className="text-slate-700 dark:text-slate-200">{p.role}</strong>
                          <span className="ml-2 text-slate-400">• {p.bullets.length} highlights</span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 pb-3 space-y-3">
                          <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
                            {p.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-1.5">
                              {p.icons?.map((t, k) => (
                                <span
                                  key={t}
                                  className="tech-icon-animate w-7 h-7 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center"
                                  style={{ animationDelay: `${k * 150}ms` }}
                                  title={t}
                                >
                                  <TechIcon tech={t} size={15} animate={false} />
                                </span>
                              ))}
                            </div>
                            {p.link ? (
                              <a
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                              >
                                Visit live <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
