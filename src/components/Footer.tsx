import { useState } from 'react';
import { Shield, FileText } from 'lucide-react';
import LegalModal from './LegalModal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="mt-auto py-8 bg-transparent text-sm text-slate-500 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-medium">
            &copy; {currentYear} 全國會考落點分析系統
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setModalType('privacy')}
              className="flex items-center gap-2 font-medium hover:text-slate-900 transition-colors"
            >
              <Shield className="w-4 h-4" /> 隱私政策
            </button>
            <button 
              onClick={() => setModalType('terms')}
              className="flex items-center gap-2 font-medium hover:text-slate-900 transition-colors"
            >
              <FileText className="w-4 h-4" /> 使用條款
            </button>
          </div>
        </div>
      </footer>

      <LegalModal 
        isOpen={modalType !== null} 
        type={modalType} 
        onClose={() => setModalType(null)} 
      />
    </>
  );
}


