import { TechIcon, type TechKey } from './TechIcon';
import { cvData } from '../data/cvData';

const INNER: TechKey[] = ['react', 'nodejs', 'mongodb', 'javascript'];
const OUTER: TechKey[] = ['aws', 'express', 'mysql', 'nginx', 'cloudinary', 'git'];

const initials = cvData.personal.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .slice(0, 2);

function Ring({ techs, ring, duration, reverse }: { techs: TechKey[]; ring: 1 | 2; duration: number; reverse?: boolean }) {
  return (
    <>
      {techs.map((t, i) => {
        const angle = (360 / techs.length) * i;
        return (
          <div
            key={t}
            className="orbit-item"
            style={
              {
                '--r': `var(--r${ring})`,
                '--angle': `${angle}deg`,
                animationDuration: `${duration}s`,
                animationDelay: `-${(duration * i) / techs.length}s`,
                animationDirection: reverse ? 'reverse' : 'normal',
              } as React.CSSProperties
            }
          >
            <span className="orbit-chip">
              <TechIcon tech={t} size={18} animate={false} />
            </span>
          </div>
        );
      })}
    </>
  );
}

/** Profile avatar with two rings of tech icons orbiting around it. */
export function OrbitAvatar() {
  return (
    <div className="orbit-stage mx-auto" aria-hidden>
      <span className="orbit-ring orbit-ring-1" />
      <span className="orbit-ring orbit-ring-2" />

      {/* soft glow */}
      <span className="absolute inset-0 m-auto h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-indigo-500/30 blur-2xl animate-float-slow" />

      {/* avatar with rotating gradient ring */}
      <div className="orbit-avatar">
        <span className="orbit-avatar-ring animate-spin-slow" />
        <span className="orbit-avatar-core">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-sky-500 dark:from-indigo-300 dark:to-sky-300 font-black tracking-tight text-3xl sm:text-4xl">
            {initials}
          </span>
        </span>
        <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 h-4 w-4 rounded-full bg-emerald-500 ring-[3px] ring-white dark:ring-slate-900 pulse-indicator" />
      </div>

      <Ring techs={INNER} ring={1} duration={22} />
      <Ring techs={OUTER} ring={2} duration={34} reverse />
    </div>
  );
}
