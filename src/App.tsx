import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { UserPlus } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import InfoModal from './components/InfoModal';
import InvitationForm from './components/InvitationForm';
import LoadingOverlay from './components/LoadingOverlay';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Anti-tampering (optional, based on original code)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || e.key === 'x' || e.key === 'X')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans text-slate-900 selection:bg-indigo-200 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }} 
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-[100px]" 
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }} 
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-blue-200/40 to-emerald-200/40 blur-[100px]" 
        />
      </div>

      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg"
        >
          <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/80 p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Inner subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-900/20 mb-8 relative z-10"
            >
              <UserPlus className="w-10 h-10" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight mb-3 relative z-10">
              會考落點邀請碼
            </h2>
            <p className="text-slate-500 mb-10 text-sm sm:text-base font-medium relative z-10">
              請輸入您的電子郵件以獲取專屬邀請碼
            </p>

            <div className="relative z-10">
              <InvitationForm 
                onSuccess={() => setIsModalOpen(true)} 
                setLoading={setIsLoading} 
              />
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
      
      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}

