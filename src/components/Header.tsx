import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Menu, X, Home, AlertCircle, ExternalLink, ChevronRight } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: 'https://tyctw.github.io/spare', icon: Home, label: '首頁' },
    { href: 'https://tyctw.github.io/report_form', icon: AlertCircle, label: '異常回報系統' },
    { href: ' https://tyctw.github.io/invite/', icon: ExternalLink, label: '邀請碼備用系統' },
  ];

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <div className="bg-white/75 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl pointer-events-auto transition-all duration-300">
          <div className="flex items-center gap-2.5 text-slate-900 font-display font-bold text-xl tracking-tight">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="hidden sm:inline">TW全國會考</span>
            <span className="sm:hidden">TW全國</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all shadow-[0_2px_10px_rgb(0,0,0,0)] hover:shadow-[0_2px_10px_rgb(0,0,0,0.04)]"
              >
                <link.icon className="w-4 h-4 opacity-70" />
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 -mr-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-full transition-colors shadow-sm bg-slate-50/50 border border-slate-100"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-white/90 backdrop-blur-3xl border-l border-white/50 shadow-2xl z-[60] flex flex-col pt-8 px-6 pb-8 md:hidden overflow-hidden"
            >
              {/* Inner ambient glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex justify-between items-center mb-10 relative z-10">
                <div className="flex items-center gap-2.5 text-slate-900 font-display font-bold text-xl">
                  <div className="bg-indigo-50 text-indigo-600 p-1.5 rounded-lg border border-indigo-100">
                    <Menu className="w-5 h-5" />
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-900">
                    導覽選單
                  </span>
                </div>
                <button
                  className="p-2 -mr-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all bg-white shadow-sm border border-slate-100"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-col gap-4 relative z-10">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, type: 'spring', damping: 20, stiffness: 200 }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10 transition-all active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-50 group-hover:bg-indigo-50 text-slate-500 group-hover:text-indigo-600 p-3 rounded-xl transition-colors border border-slate-100 group-hover:border-indigo-100">
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="font-display font-bold text-slate-700 group-hover:text-slate-900 transition-colors text-lg">
                        {link.label}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto relative z-10 pt-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: 'spring', damping: 20 }}
                  className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-5 text-center"
                >
                  <div className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white shadow-sm mb-3">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h4 className="font-display font-bold justify-center flex items-center text-slate-900 text-sm mb-1.5">
                    全國會考落點分析系統
                  </h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed mb-4">
                    為學生提供最精確的落點預估與志願選填建議
                  </p>
                  <div className="w-full h-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-full" />
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}



