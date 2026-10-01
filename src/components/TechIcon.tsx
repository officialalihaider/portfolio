import React from 'react';

export type TechKey =
  | 'react' | 'javascript' | 'typescript' | 'vue' | 'html5' | 'css3' | 'bootstrap' | 'tailwind'
  | 'nodejs' | 'express' | 'jwt' | 'mongodb' | 'mysql' | 'ejs' | 'passport'
  | 'aws' | 'nginx' | 'pm2' | 'cloudinary' | 'vercel' | 'netlify'
  | 'git' | 'github' | 'postman' | 'figma' | 'rest' | 'docker';

const C = {
  react: '#61DAFB',
  js: '#F7DF1E',
  ts: '#3178C6',
  vue: '#42B883',
  html: '#E34F26',
  css: '#1572B6',
  bootstrap: '#7952B3',
  tailwind: '#38BDF8',
  node: '#5FA04E',
  express: '#94a3b8',
  jwt: '#d63aff',
  mongo: '#47A248',
  mysql: '#4479A1',
  aws: '#FF9900',
  nginx: '#009639',
  pm2: '#2B2338',
  cloudinary: '#3448C5',
  vercel: '#111827',
  netlify: '#00C7B7',
  git: '#F05032',
  github: '#181717',
  postman: '#FF6C37',
  figma: '#F24E1E',
  ejs: '#B7178C',
  passport: '#34E27A',
};

function Box({ color, label, textColor = '#fff' }: { color: string; label: string; textColor?: string }) {
  return (
    <>
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill={color} />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="800"
        fill={textColor}
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        {label}
      </text>
    </>
  );
}

const ICONS: Record<TechKey, React.ReactNode> = {
  react: (
    <>
      <circle cx="12" cy="12" r="2.2" fill={C.react} />
      <g stroke={C.react} strokeWidth="1.1" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    </>
  ),
  javascript: <Box color={C.js} label="JS" textColor="#1e293b" />,
  typescript: <Box color={C.ts} label="TS" />,
  vue: (
    <>
      <path d="M2 4h4.2L12 16.2 17.8 4H22L12 21.5 2 4z" fill={C.vue} />
      <path d="M6.9 4H12l0 5.6L9.4 4H6.9z" fill="#35495E" opacity="0.9" />
    </>
  ),
  html5: (
    <>
      <path d="M3 2h18l-1.7 18L12 22l-7.3-2L3 2z" fill={C.html} />
      <path d="M12 4v16l5.9-1.7L19.4 4H12z" fill="#000" opacity="0.12" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">5</text>
    </>
  ),
  css3: (
    <>
      <path d="M3 2h18l-1.7 18L12 22l-7.3-2L3 2z" fill={C.css} />
      <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">3</text>
    </>
  ),
  bootstrap: <Box color={C.bootstrap} label="B" />,
  tailwind: (
    <path
      d="M12 6c-2.7 0-4.4 1.35-5.1 4.05.9-1.2 1.95-1.65 3.15-1.35.69.17 1.18.67 1.73 1.22.9.9 1.94 1.93 4.22 1.93 2.7 0 4.4-1.35 5.1-4.05-.9 1.2-1.95 1.65-3.15 1.35-.69-.17-1.18-.67-1.73-1.22C15.32 7.03 14.28 6 12 6zM6.9 12.15C4.2 12.15 2.5 13.5 1.8 16.2c.9-1.2 1.95-1.65 3.15-1.35.69.17 1.18.67 1.73 1.22.9.9 1.94 1.93 4.22 1.93 2.7 0 4.4-1.35 5.1-4.05-.9 1.2-1.95 1.65-3.15 1.35-.69-.17-1.18-.67-1.73-1.22-.9-.9-1.94-1.93-4.22-1.93z"
      fill={C.tailwind}
    />
  ),
  nodejs: (
    <>
      <path d="M12 1.8 3.2 6.9v10.2L12 22.2l8.8-5.1V6.9L12 1.8z" fill={C.node} />
      <text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#fff">JS</text>
    </>
  ),
  express: (
    <>
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="#1e293b" className="dark:fill-slate-500" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#fff">ex</text>
    </>
  ),
  jwt: (
    <>
      <circle cx="12" cy="12" r="10" fill={C.jwt} opacity="0.14" />
      <text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="800" fill="#a21caf">JWT</text>
    </>
  ),
  mongodb: (
    <>
      <path d="M11.1 2.2c.5-.4 1.2-.4 1.7 0 1.9 1.7 3.2 4.2 3.2 7.4 0 3.6-1.7 6.1-3.4 7.4-.3.2-.7.2-1 0-1.8-1.4-3.5-3.9-3.5-7.4 0-3.2 1.3-5.7 3-7.4z" fill={C.mongo} />
      <path d="M12 4.5v13.2" stroke="#116149" strokeWidth="0.9" />
      <path d="M9.4 19.6c.9.5 2.3.8 2.6.8s1.7-.3 2.6-.8c-.5 1-1.6 2-2.6 2.4-1-.4-2.1-1.4-2.6-2.4z" fill={C.mongo} />
    </>
  ),
  mysql: <Box color={C.mysql} label="SQL" />,
  ejs: <Box color={C.ejs} label="EJS" />,
  passport: (
    <>
      <rect x="3.5" y="1.8" width="17" height="20.4" rx="2.4" fill="#0f172a" />
      <circle cx="12" cy="9" r="3.1" fill={C.passport} />
      <path d="M6.6 18.5c.9-2.4 3-3.6 5.4-3.6s4.5 1.2 5.4 3.6" stroke={C.passport} strokeWidth="1.4" fill="none" />
    </>
  ),
  aws: (
    <>
      <text x="12" y="12.5" textAnchor="middle" fontSize="10" fontWeight="800" fill={C.aws}>aws</text>
      <path d="M3.5 17.2c4.9 3.2 12.2 3.3 17-.3" stroke={C.aws} strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M18.6 15.6l2.4.6-1.3 2.1" stroke={C.aws} strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  nginx: <Box color={C.nginx} label="NG" />,
  pm2: (
    <>
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="#312e81" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff">PM2</text>
    </>
  ),
  cloudinary: (
    <>
      <path d="M7.4 17.5a4.4 4.4 0 0 1-.5-8.8 5.6 5.6 0 0 1 10.6 1.2 3.8 3.8 0 0 1-.3 7.6H7.4z" fill={C.cloudinary} />
      <path d="M9.6 15.2c.9-1.6 2-2.4 3.3-2.4" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </>
  ),
  vercel: (
    <>
      <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill={C.vercel} className="dark:fill-slate-100" />
      <path d="M12 6.5l5.6 10H6.4L12 6.5z" fill="#fff" className="dark:fill-slate-900" />
    </>
  ),
  netlify: (
    <>
      <path d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2z" fill={C.netlify} opacity="0.16" />
      <path d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2z" stroke={C.netlify} strokeWidth="1.4" fill="none" />
      <circle cx="12" cy="12" r="2.4" fill={C.netlify} />
    </>
  ),
  git: (
    <>
      <path d="M12 1.6 22.4 12 12 22.4 1.6 12 12 1.6z" fill={C.git} />
      <g stroke="#fff" strokeWidth="1.5" fill="none">
        <path d="M8.4 15.6V9.9c0-1 .7-1.6 1.7-1.6h3.2" />
      </g>
      <circle cx="8.4" cy="16.9" r="1.8" fill="#fff" />
      <circle cx="15" cy="8" r="1.8" fill="#fff" />
    </>
  ),
  github: (
    <>
      <circle cx="12" cy="12" r="10" fill={C.github} className="dark:fill-slate-100" />
      <path
        d="M12 4.6a7.4 7.4 0 0 0-2.3 14.4c.4.1.5-.2.5-.4v-1.5c-2 .4-2.5-.9-2.5-.9-.3-.9-.8-1.1-.8-1.1-.7-.5.1-.5.1-.5.7.1 1.1.8 1.1.8.7 1.2 1.8.9 2.2.7.1-.5.3-.9.5-1.1-1.7-.2-3.4-.9-3.4-3.8 0-.8.3-1.5.8-2.1-.1-.2-.4-1 .1-2 0 0 .7-.2 2.2.8a7.4 7.4 0 0 1 3.9 0c1.5-1 2.2-.8 2.2-.8.5 1 .2 1.8.1 2 .5.6.8 1.3.8 2.1 0 2.9-1.8 3.6-3.4 3.8.3.3.6.8.6 1.5v2.2c0 .2.1.5.5.4A7.4 7.4 0 0 0 12 4.6z"
        fill="#fff"
        className="dark:fill-slate-900"
      />
    </>
  ),
  postman: (
    <>
      <circle cx="12" cy="12" r="10" fill={C.postman} />
      <path d="M8.3 13.9l5.3-5.3a1.7 1.7 0 0 1 2.4 2.4l-5.3 5.3-3 .6.6-3z" fill="#fff" />
    </>
  ),
  figma: (
    <>
      <path d="M9 2.5h3v5H9a2.5 2.5 0 0 1 0-5z" fill="#F24E1E" />
      <path d="M12 2.5h3a2.5 2.5 0 0 1 0 5h-3v-5z" fill="#FF7262" />
      <path d="M12 8.5h3a2.5 2.5 0 0 1 0 5h-3v-5z" fill="#1ABCFE" />
      <path d="M9 8.5h3v5H9a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
      <path d="M9 14.5h3v2.5A2.5 2.5 0 1 1 9 14.5z" fill="#0ACF83" />
    </>
  ),
  rest: (
    <>
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="#6366f1" strokeWidth="1.6" />
      <path d="M3.6 9.5h16.8M3.6 14.5h16.8" stroke="#6366f1" strokeWidth="1.4" />
      <path d="M12 2.5c2.6 2.6 3.9 6 3.9 9.5s-1.3 6.9-3.9 9.5c-2.6-2.6-3.9-6-3.9-9.5S9.4 5.1 12 2.5z" fill="none" stroke="#6366f1" strokeWidth="1.3" />
    </>
  ),
  docker: (
    <>
      <rect x="2" y="11" width="3.4" height="3.4" fill="#2496ED" />
      <rect x="6" y="11" width="3.4" height="3.4" fill="#2496ED" />
      <rect x="10" y="11" width="3.4" height="3.4" fill="#2496ED" />
      <rect x="6" y="7" width="3.4" height="3.4" fill="#2496ED" />
      <path d="M2 16h18.5c-.6 3-3.4 5.2-7.6 5.2-5 0-8.9-2-10.9-5.2z" fill="#2496ED" />
    </>
  ),
};

export const TECH_LABELS: Record<TechKey, string> = {
  react: 'React.js', javascript: 'JavaScript', typescript: 'TypeScript', vue: 'Vue.js',
  html5: 'HTML5', css3: 'CSS3', bootstrap: 'Bootstrap', tailwind: 'Tailwind CSS',
  nodejs: 'Node.js', express: 'Express.js', jwt: 'JWT Auth', mongodb: 'MongoDB',
  mysql: 'MySQL', ejs: 'EJS', passport: 'Passport.js', aws: 'AWS EC2',
  nginx: 'Nginx', pm2: 'PM2', cloudinary: 'Cloudinary', vercel: 'Vercel',
  netlify: 'Netlify', git: 'Git', github: 'GitHub', postman: 'Postman',
  figma: 'Figma', rest: 'REST APIs', docker: 'Docker',
};

export const TECH_COLORS: Record<TechKey, string> = {
  react: C.react, javascript: C.js, typescript: C.ts, vue: C.vue,
  html5: C.html, css3: C.css, bootstrap: C.bootstrap, tailwind: C.tailwind,
  nodejs: C.node, express: '#94a3b8', jwt: '#d63aff', mongodb: C.mongo,
  mysql: C.mysql, ejs: C.ejs, passport: C.passport, aws: C.aws,
  nginx: C.nginx, pm2: '#6366f1', cloudinary: C.cloudinary, vercel: '#64748b',
  netlify: C.netlify, git: C.git, github: '#64748b', postman: C.postman,
  figma: C.figma, rest: '#6366f1', docker: '#2496ED',
};

interface TechIconProps {
  tech: TechKey;
  size?: number;
  className?: string;
  animate?: boolean;
  delay?: number;
  showLabel?: boolean;
}

export const TechIcon: React.FC<TechIconProps> = ({
  tech,
  size = 26,
  className = '',
  animate = true,
  delay = 0,
  showLabel = false,
}) => {
  const icon = ICONS[tech] ?? ICONS.rest;

  if (showLabel) {
    return (
      <div
        className={`group flex flex-col items-center gap-1.5 ${className}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div
          className={`rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-2 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg group-hover:border-indigo-300 dark:group-hover:border-indigo-500 ${animate ? 'tech-icon-animate' : ''}`}
          style={{ animationDelay: `${delay}ms` }}
        >
          <svg width={size} height={size} viewBox="0 0 24 24" className="block">
            {icon}
          </svg>
        </div>
        <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 text-center leading-tight max-w-[68px]">
          {TECH_LABELS[tech]}
        </span>
      </div>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`block ${className}`}
      aria-label={TECH_LABELS[tech]}
      role="img"
    >
      {icon}
    </svg>
  );
};

/** Marquee strip of animated tech icons */
export const TechMarquee: React.FC<{ techs: TechKey[] }> = ({ techs }) => {
  const doubled = [...techs, ...techs];
  return (
    <div className="marquee-wrap marquee-mask overflow-hidden py-1">
      <div className="animate-marquee flex items-center gap-3 sm:gap-4">
        {doubled.map((t, i) => (
          <div
            key={`${t}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 px-3 py-2 shadow-xs"
          >
            <TechIcon tech={t} size={20} animate={false} />
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
              {TECH_LABELS[t]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
