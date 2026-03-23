import { motion, AnimatePresence } from 'motion/react';
import { X, Info, MailOpen, Clock, ShieldAlert, Headset, Check, Mail } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 sm:p-10 overflow-y-auto">
              <div className="text-center mb-10 pb-8 border-b border-slate-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mb-5">
                  <Info className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">全國會考落點分析說明</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors group">
                  <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <MailOpen className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">邀請碼使用方式</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    請在收到邀請碼後，於7天內前往落點分析網站進行分析。系統會自動發送邀請碼至您的電子郵件信箱。
                  </p>
                </div>

                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-colors group">
                  <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">申請限制說明</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    為確保系統穩定性，每個電子郵件地址需間隔8小時才能再次申請新的邀請碼。請妥善保管您的邀請碼。
                  </p>
                </div>

                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-amber-100 hover:bg-amber-50/30 transition-colors group">
                  <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">安全性提醒</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    邀請碼僅供個人使用，請勿分享給他人。如發現異常使用情況，系統會自動封鎖相關帳號。
                  </p>
                </div>

                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors group">
                  <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Headset className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">聯絡客服</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    如有任何問題或需要協助，請聯繫我們的客服團隊。
                  </p>
                  <a href="mailto:tyctw.analyze@gmail.com" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                    <Mail className="w-4 h-4" /> 寄送郵件
                  </a>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-display font-semibold shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                我知道了
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

