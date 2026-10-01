import React, { useState } from 'react';
import { Printer, Copy, Check, ExternalLink, Car } from 'lucide-react';
import { cvData } from '../data/cvData';

interface CVDocumentViewProps {
  onOpenAutoGemzDemo: () => void;
  onPrint: () => void;
}

export const CVDocumentView: React.FC<CVDocumentViewProps> = ({
  onOpenAutoGemzDemo,
  onPrint,
}) => {
  const [copied, setCopied] = useState(false);

  const skillEntries = Object.entries(cvData.skills) as [
    keyof typeof cvData.skills,
    (typeof cvData.skills)[keyof typeof cvData.skills],
  ][];

  const copyCvToClipboard = () => {
    const lines: string[] = [];
    lines.push('ALI HAIDER', 'Full Stack Developer');
    lines.push('aliseeyam@gmail.com | +923156500236 | Islamabad, Pakistan | Pakistani');
    lines.push('LinkedIn: https://www.linkedin.com/in/ali-haider-command-user', '', 'PROFILE');
    lines.push(cvData.personal.summary, '', 'TECHNICAL SKILLS');
    skillEntries.forEach(([, g]) => {
      lines.push(`• ${g.label}: ${g.items.join(', ')}`);
    });
    lines.push('', 'PROFESSIONAL EXPERIENCE');
    cvData.experiences.forEach((exp) => {
      lines.push('', `${exp.role} | ${exp.company} (${exp.companyUrl})`);
      lines.push(`${exp.period} | ${exp.location}`);
      exp.projects?.forEach((p, idx) => {
        lines.push('', `${idx + 1}. ${p.name}`);
        lines.push(`Role: ${p.role}${p.link ? ` | Link: ${p.link}` : ''}`);
        p.bullets.forEach((b) => lines.push(`- ${b}`));
      });
    });
    lines.push('', 'PROJECTS');
    cvData.featuredProjects.forEach((p, idx) => {
      lines.push('', `${idx + 1}. ${p.title}`);
      lines.push(`Role: ${p.role}${p.period ? ` | ${p.period}` : ''}`);
      lines.push(p.description);
      p.bullets.forEach((b) => lines.push(`- ${b}`));
    });
    lines.push('', 'EDUCATION');
    lines.push(cvData.education.degree);
    lines.push(`${cvData.education.institution} | ${cvData.education.period} | ${cvData.education.location}`);
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="cv-document-shell max-w-5xl mx-auto py-5 sm:py-8 px-0 sm:px-6">
      {/* Action bar (hidden in print) */}
      <div className="no-print mb-5 sm:mb-7 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-100 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
            CV
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-white">Executive CV / Resume Format</h2>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              Clean, text-focused ATS resume. Printing uses a separate light layout.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full lg:w-auto">
          <button
            onClick={onOpenAutoGemzDemo}
            className="shine px-3.5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Car className="w-4 h-4" /> AutoGemz Demo
          </button>
          <button
            onClick={copyCvToClipboard}
            className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy ATS Text'}
          </button>
          <button
            onClick={onPrint}
            className="px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Resume Sheet — plain text only, no tech icons */}
      <div className="cv-document print-page rounded-none sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 shadow-lg p-5 sm:p-8 lg:p-12 text-slate-800 dark:text-slate-200">
        {/* Header */}
        <header className="border-b-2 border-slate-900 dark:border-slate-700 pb-5 sm:pb-6 mb-5 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-[1.75rem] sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {cvData.personal.name}
              </h1>
              <div className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 mt-1 flex flex-wrap items-center gap-2">
                <span>{cvData.personal.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                  React.js • Node.js • AWS
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
              <span className="font-medium">{cvData.personal.email}</span>
              <span className="font-medium">{cvData.personal.phone}</span>
              <span>
                {cvData.personal.location} • <strong className="font-semibold">{cvData.personal.nationality}</strong>
              </span>
              <span className="font-medium break-all">{cvData.personal.linkedin}</span>
            </div>
          </div>
        </header>

        {/* Profile */}
        <section className="mb-5 sm:mb-6">
          <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Profile
          </h2>
          <p className="cv-summary text-xs sm:text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/70 p-3.5 rounded-lg border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200">
            {cvData.personal.summary}
          </p>
        </section>

        {/* Technical Skills — text only, no icons */}
        <section className="mb-6">
          <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
            {skillEntries.map(([, g]) => (
              <div key={g.label} className="page-break-inside-avoid text-xs sm:text-sm leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-slate-100">{g.label}: </span>
                <span className="text-slate-700 dark:text-slate-300">{g.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            Professional Experience
          </h2>

          <div className="space-y-6">
            {cvData.experiences.map((exp, expIdx) => (
              <div key={exp.id} className="page-break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1 gap-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">{exp.role}</h3>
                    <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 break-words">
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                        {exp.company} ({exp.companyUrl})
                        <ExternalLink className="w-3 h-3 text-slate-400 no-print" />
                      </a>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium sm:text-right">
                    <div>{exp.period}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>

                <div className={`mt-3 space-y-4 ${expIdx === 0 ? 'pl-3 border-l-2 border-slate-200 dark:border-slate-700' : ''}`}>
                  {exp.projects?.map((p, idx) => (
                    <div key={p.name}>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-1 text-[11px] sm:text-xs">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">
                          {exp.projects && exp.projects.length > 1 ? `${idx + 1}. ` : ''}
                          {p.name}
                        </h4>
                        <span className="text-slate-600 dark:text-slate-300">
                          <strong>Role:</strong> {p.role}
                          {p.link ? (
                            <>
                              {' '}| Link:{' '}
                              <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-200 hover:underline break-all">
                                {p.link}
                              </a>
                            </>
                          ) : null}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-1 text-[11px] sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects — text only, no icons */}
        <section className="mb-6">
          <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            Projects
          </h2>

          <div className="space-y-5">
            {cvData.featuredProjects.map((p, idx) => {
              const isFlagship = p.id === 'autogemz-inspections';
              return (
                <div
                  key={p.id}
                  className={`page-break-inside-avoid ${isFlagship ? 'cv-highlight p-3.5 sm:p-4 rounded-lg bg-slate-50 dark:bg-indigo-500/10 border border-slate-200 dark:border-indigo-500/30' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 mb-1.5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                          {idx + 1}. {p.title}
                        </h3>
                        {isFlagship ? (
                          <span className="text-[9px] font-bold bg-slate-800 dark:bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                            MERN + AWS
                          </span>
                        ) : null}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 flex flex-wrap items-center gap-x-2">
                        <span><strong>Role:</strong> {p.role}</span>
                        {p.period ? <span className="text-slate-500 dark:text-slate-400">• {p.period}</span> : null}
                      </div>
                    </div>

                    {p.liveUrl && p.liveUrl !== '#' ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-print text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1 shrink-0"
                      >
                        Live Link <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : isFlagship ? (
                      <button
                        onClick={onOpenAutoGemzDemo}
                        className="no-print shrink-0 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 transition-colors self-start cursor-pointer"
                      >
                        <Car className="w-3 h-3" /> Interactive Demo
                      </button>
                    ) : null}
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mt-1">
                    {p.description}
                  </p>

                  <ul className="mt-2 space-y-1 text-[11px] sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Education — no CGPA, no icons */}
        <section className="page-break-inside-avoid">
          <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">{cvData.education.degree}</h3>
              <div className="text-[11px] sm:text-sm text-slate-700 dark:text-slate-300 font-medium mt-0.5">
                {cvData.education.institution}
              </div>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium sm:text-right">
              <div>{cvData.education.period}</div>
              <div>{cvData.education.location}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
