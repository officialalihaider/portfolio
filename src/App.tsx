import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { PortfolioView } from './components/PortfolioView';
import { CVDocumentView } from './components/CVDocumentView';
import { AutoGemzInspectionInteractive } from './components/AutoGemzInspectionInteractive';
import { NetworkBackground } from './components/NetworkBackground';
import { ScrollProgress, BackToTop } from './components/ScrollExtras';
import { CursorGlow } from './components/CursorGlow';
import { CommandPalette, type PaletteAction } from './components/CommandPalette';
import {
  Mail, Phone, X, Briefcase, Car, Copy, ExternalLink, FileText, FolderGit2, Home, MessageCircle,
  Moon, Printer, Send, Sparkles, Sun, Zap,
} from 'lucide-react';
import { cvData } from './data/cvData';
import { useTheme, useScrollReveal } from './hooks/useTheme';
import { printCvDocument } from './hooks/usePrint';
import { openWhatsApp } from './utils/contact';

const LinkedInIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function App() {
  const [activeView, setActiveView] = useState<'portfolio' | 'cv'>('portfolio');
  const [showAutoGemzModal, setShowAutoGemzModal] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  useScrollReveal();

  // Print CSS makes the CV light without changing the live website theme.
  const handlePrint = useCallback(printCvDocument, []);

  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Ctrl/Cmd + K opens the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goToSection = useCallback(
    (id: string) => {
      const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (activeView !== 'portfolio') {
        setActiveView('portfolio');
        setTimeout(scroll, 650);
      } else {
        scroll();
      }
    },
    [activeView]
  );

  const paletteActions: PaletteAction[] = [
    { id: 's-home', label: 'Go to Home', group: 'Navigate', icon: <Home className="w-4 h-4" />, keywords: 'top hero', run: () => goToSection('home') },
    { id: 's-skills', label: 'Go to Skills', group: 'Navigate', icon: <Zap className="w-4 h-4" />, keywords: 'tech stack icons react node', run: () => goToSection('skills') },
    { id: 's-flagship', label: 'Go to AutoGemz Flagship', group: 'Navigate', icon: <Sparkles className="w-4 h-4" />, keywords: 'inspection mern aws', run: () => goToSection('flagship') },
    { id: 's-projects', label: 'Go to Projects', group: 'Navigate', icon: <FolderGit2 className="w-4 h-4" />, keywords: 'work portfolio 32', run: () => goToSection('projects') },
    { id: 's-exp', label: 'Go to Experience', group: 'Navigate', icon: <Briefcase className="w-4 h-4" />, keywords: 'work history organix waywe 3 years', run: () => goToSection('experience') },
    { id: 's-contact', label: 'Go to Contact', group: 'Navigate', icon: <Send className="w-4 h-4" />, keywords: 'hire message form', run: () => goToSection('contact') },
    { id: 'a-demo', label: 'Launch AutoGemz Interactive Demo', group: 'Action', icon: <Car className="w-4 h-4" />, keywords: 'simulator car diagram pdf', run: () => setShowAutoGemzModal(true) },
    { id: 'a-cv', label: activeView === 'cv' ? 'Back to Portfolio' : 'Open Executive CV', group: 'Action', icon: <FileText className="w-4 h-4" />, keywords: 'resume', run: () => setActiveView(activeView === 'cv' ? 'portfolio' : 'cv') },
    {
      id: 'a-print',
      label: 'Print / Save CV as PDF',
      group: 'Action',
      icon: <Printer className="w-4 h-4" />,
      keywords: 'download resume',
      run: () => {
        if (activeView !== 'cv') {
          setActiveView('cv');
          setTimeout(handlePrint, 700);
        } else handlePrint();
      },
    },
    { id: 'a-theme', label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode', group: 'Action', icon: isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />, keywords: 'theme dark light', run: toggleTheme },
    { id: 'c-copy', label: 'Copy email address', group: 'Contact', icon: <Copy className="w-4 h-4" />, keywords: cvData.personal.email, run: () => navigator.clipboard?.writeText(cvData.personal.email) },
    { id: 'c-mail', label: 'Send an email', group: 'Contact', icon: <Mail className="w-4 h-4" />, keywords: cvData.personal.email, run: () => { window.location.href = `mailto:${cvData.personal.email}`; } },
    { id: 'c-wa', label: 'Chat on WhatsApp', group: 'Contact', icon: <MessageCircle className="w-4 h-4" />, keywords: 'phone message', run: () => openWhatsApp("Hi Ali, I found your portfolio and I'd like to talk.") },
    { id: 'c-call', label: 'Call Ali', group: 'Contact', icon: <Phone className="w-4 h-4" />, keywords: cvData.personal.phone, run: () => { window.location.href = `tel:${cvData.personal.phone}`; } },
    { id: 'c-in', label: 'Open LinkedIn profile', group: 'Contact', icon: <ExternalLink className="w-4 h-4" />, keywords: 'social', run: () => window.open(cvData.personal.linkedinUrl, '_blank', 'noopener') },
  ];

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showAutoGemzModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAutoGemzModal]);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#070b16] text-slate-800 dark:text-slate-200 flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-500">
      {/* Interactive network dots background */}
      <NetworkBackground />
      {/* Premium cursor glow effect */}
      <CursorGlow isDark={isDark} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenAutoGemz={() => setShowAutoGemzModal(true)}
          isDark={isDark}
          toggleTheme={toggleTheme}
          onPrint={handlePrint}
          onOpenPalette={() => setPaletteOpen(true)}
        />

        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={paletteActions} />

        <ScrollProgress />
        <BackToTop />

        <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8">
          {activeView === 'portfolio' ? (
            <PortfolioView
              onOpenAutoGemzDemo={() => setShowAutoGemzModal(true)}
              onSwitchToCV={() => setActiveView('cv')}
            />
          ) : (
            <CVDocumentView
              onOpenAutoGemzDemo={() => setShowAutoGemzModal(true)}
              onPrint={handlePrint}
            />
          )}
        </main>

        {/* AutoGemz modal — full-screen sheet on mobile, centered dialog on desktop */}
        {showAutoGemzModal && (
          <div
            className="no-print fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm overflow-y-auto p-0 sm:p-4 animate-fade-in"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAutoGemzModal(false);
            }}
          >
            <div className="min-h-full sm:min-h-0 sm:flex sm:items-center sm:justify-center">
              <div className="relative w-full sm:max-w-5xl animate-pop-in">
                <button
                  onClick={() => setShowAutoGemzModal(false)}
                  aria-label="Close"
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <AutoGemzInspectionInteractive isModal />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="no-print mt-auto bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 py-8 sm:py-10 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
            <div>
              <div className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center justify-center md:justify-start gap-2">
                {cvData.personal.name}
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">• Full Stack Developer</span>
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                React.js, Node.js, Express, MongoDB, Cloudinary &amp; AWS EC2 cloud deployments with Nginx and PM2.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium">
              <a href={`mailto:${cvData.personal.email}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors break-all">
                <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                {cvData.personal.email}
              </a>
              <a href={`tel:${cvData.personal.phone}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors">
                <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                {cvData.personal.phone}
              </a>
              <a
                href={cvData.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                LinkedIn
              </a>
            </div>

            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} {cvData.personal.name}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
