import { useEffect, useState } from 'react';

export function CursorGlow({ isDark }: { isDark: boolean }) {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices where cursor doesn't exist
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [visible]);

  const color = isDark ? '99, 102, 241' : '79, 70, 229';

  return (
    <div
      aria-hidden
      className="cursor-glow no-print pointer-events-none fixed inset-0 z-[5]"
      style={{
        background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, rgba(${color}, ${isDark ? 0.18 : 0.12}), transparent 45%)`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}
