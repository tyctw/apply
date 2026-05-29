import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Send, MailOpen, Compass, AlertCircle, Check } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  const steps = [
    {
      icon: Send,
      title: "1. 驗證與申請",
      desc: "輸入您的電子郵件地址並完成人機驗證，系統將即時為您處理申請並發送專屬邀請碼。",
      color: "text-blue-600",
      bg: "bg-blue-100/50",
      border: "border-blue-100",
      shadow: "shadow-blue-900/5",
    },
    {
      icon: MailOpen,
      title: "2. 收取邀請信",
      desc: "請至您的信箱收取系統信件（若未收到請同時檢查垃圾信件匣）。邀請碼保留期限為發送後 7 天。",
      color: "text-indigo-600",
      bg: "bg-indigo-100/50",
      border: "border-indigo-100",
      shadow: "shadow-indigo-900/5",
    },
    {
      icon: Compass,
      title: "3. 前往主站分析",
      desc: "複製信件中的邀請碼，點擊連結前往「落點分析主站」，即可登入系統並開始進行落點分析與志願評估。",
      color: "text-emerald-600",
      bg: "bg-emerald-100/50",
      border: "border-emerald-100",
      shadow: "shadow-emerald-900/5",
    }
  ];

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
              <div className="text-center mb-8 pb-8 border-b border-slate-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-800 mb-5">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">系統使用說明</h2>
                <p className="mt-3 text-slate-500 font-medium">請遵循以下步驟獲取並使用您的落點分析邀請碼</p>
              </div>

              <div className="space-y-4 mb-8">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`relative flex gap-5 p-5 sm:p-6 rounded-3xl border bg-white/60 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md ${step.border} ${step.shadow} group`}
                  >
                    <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${step.bg} ${step.color}`}>
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-900 mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50/80 border border-amber-200/50 rounded-3xl p-5 sm:p-6 flex items-start gap-4 mb-8">
                <div className="bg-amber-100/80 text-amber-600 p-2.5 rounded-xl shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 mb-1.5">申請限制提醒</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    為維護系統資源，每個電子郵件地址每次申請需間隔 <strong className="text-amber-700">8 小時</strong> 的冷卻時間。邀請碼僅供個人使用，請妥善保管。
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-display font-semibold shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                我已了解
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


