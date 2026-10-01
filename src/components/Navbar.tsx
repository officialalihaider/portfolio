import React, { useState } from 'react';
import { FileText, LayoutDashboard, Car, Printer, Menu, X, Sun, Moon, Search } from 'lucide-react';
import { cvData } from '../data/cvData';

interface NavbarProps {
  activeView: 'portfolio' | 'cv';
  setActiveView: (view: 'portfolio' | 'cv') => void;
  onOpenAutoGemz: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  onPrint: () => void;
  onOpenPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenAutoGemz,
  isDark,
  toggleTheme,
  onPrint,
  onOpenPalette,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (view: 'portfolio' | 'cv') => {
    setActiveView(view);
    setMobileOpen(false);
  };

  const handlePrint = () => {
    setMobileOpen(false);
    if (activeView !== 'cv') {
      setActiveView('cv');
      // Mount the CV first; print CSS handles light paper independently of site theme.
      setTimeout(onPrint, 500);
    } else {
      onPrint();
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <button onClick={() => go('portfolio')} className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer">
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center font-black text-sm sm:text-lg shadow-md shadow-indigo-500/25">
            AH
          </div>
          <div className="min-w-0 text-left">
            <div className="font-extrabold text-slate-900 dark:text-white tracking-tight text-[13px] sm:text-base flex items-center gap-1.5">
              <span className="truncate">{cvData.personal.name}</span>
              <span className="hidden md:inline-block text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-500/30 whitespace-nowrap">
                Full Stack MERN
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate hidden sm:block">
              {cvData.personal.email} • {cvData.personal.phone}
            </div>
          </div>
        </button>

        {/* Desktop controls */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              onClick={() => go('portfolio')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'portfolio'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Portfolio
            </button>
            <button
              onClick={() => go('cv')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'cv'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> CV (A4)
            </button>
          </div>

          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenAutoGemz();
            }}
            className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 hover:bg-indigo-100 dark:hover:bg-indigo-500/25 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Car className="w-3.5 h-3.5" /> AutoGemz Demo
          </button>

          {/* Command palette trigger */}
          <button
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="h-9 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="text-[10px] font-mono font-bold">Ctrl K</kbd>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="relative w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-amber-300 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <Sun className={`w-4 h-4 absolute transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
            <Moon className={`w-4 h-4 absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print CV
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-1.5">
          <button
            onClick={onOpenPalette}
            aria-label="Search"
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-amber-300 cursor-pointer"
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden animate-slide-down border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => go('portfolio')}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                activeView === 'portfolio'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Portfolio
            </button>
            <button
              onClick={() => go('cv')}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                activeView === 'cv'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> CV (A4)
            </button>
          </div>

          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenAutoGemz();
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Car className="w-3.5 h-3.5" /> Launch AutoGemz Demo
          </button>

          <button
            onClick={handlePrint}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save CV as PDF
          </button>
        </div>
      )}
    </header>
  );
};
