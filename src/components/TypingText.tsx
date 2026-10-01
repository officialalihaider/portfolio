import { useEffect, useState } from 'react';

const phrases = [
  'interactive web applications',
  'scalable backend systems',
  'cloud-native platforms',
  'real-time dashboards',
  'secure SaaS products',
  'user-centric experiences',
];

const TYPE_MS = 65;
const DELETE_MS = 32;
const HOLD_MS = 1700;
const NEXT_MS = 350;

/** Smooth typewriter: one timer chain, no state race, descenders never clipped. */
export function TypingText() {
  const [text, setText] = useState('');

  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const phrase = phrases[phraseIdx];

      if (!deleting) {
        charIdx += 1;
        setText(phrase.slice(0, charIdx));
        if (charIdx === phrase.length) {
          deleting = true;
          timer = window.setTimeout(tick, HOLD_MS);
          return;
        }
        timer = window.setTimeout(tick, TYPE_MS + Math.random() * 30);
      } else {
        charIdx -= 1;
        setText(phrase.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timer = window.setTimeout(tick, NEXT_MS);
          return;
        }
        timer = window.setTimeout(tick, DELETE_MS);
      }
    };

    timer = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className="inline-block align-baseline leading-[1.35] pb-[3px]">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500 dark:from-indigo-400 dark:via-sky-400 dark:to-cyan-300">
        {text}
      </span>
      <span
        aria-hidden
        className="animate-caret ml-1 inline-block w-[3px] h-[0.95em] align-[-0.12em] rounded-full bg-indigo-500 dark:bg-indigo-400"
      />
    </span>
  );
}
