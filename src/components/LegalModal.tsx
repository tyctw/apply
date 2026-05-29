import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Shield, FileText, Check, Database, Settings, 
  Lock, Eye, Info, Clock, AlertTriangle, FileEdit 
} from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? '隱私權政策' : '使用條款';
  const HeaderIcon = isPrivacy ? Shield : FileText;

  const privacySections = [
    {
      icon: Database,
      title: "資訊收集",
      content: "我們會收集您提供的電子郵件地址，僅用於發送會考落點分析系統的邀請碼，不會收集其他無關之個人資料。",
    },
    {
      icon: Settings,
      title: "資訊使用",
      content: "您的電子郵件僅供系統自動發送邀請碼使用，絕對不會被用於其他商業行銷用途，也不會出售、交換或出租給任何第三方。",
    },
    {
      icon: Lock,
      title: "資訊安全",
      content: "我們採取標準的技術與組織保護措施（如傳輸加密）來保護您的資料安全，防止未經授權的存取、竄改或洩漏。",
    },
    {
      icon: Eye,
      title: "Cookie 與追蹤",
      content: "本網站僅使用維持系統安全性所必需的技術（如 hCaptcha 人機驗證），以確保系統正常運作並防範惡意機器人攻擊。",
    }
  ];

  const termsSections = [
    {
      icon: Info,
      title: "服務說明",
      content: "本系統提供「全國會考落點分析」之邀請碼發送服務。邀請碼具時效性，將於申請當小時的 59 分 59 秒過期失效。",
    },
    {
      icon: Clock,
      title: "使用限制",
      content: "為維護系統資源與公平性，每個電子郵件地址每次申請設有 3 小時之冷卻時間。嚴禁使用任何自動化程式、腳本或機器人干擾運作。",
    },
    {
      icon: AlertTriangle,
      title: "免責聲明",
      content: "本系統發送之邀請碼僅供個人使用。系統會盡力維持服務穩定，但不保證服務的絕對不中斷，亦不對因使用本服務所產生的任何損失負責。",
    },
    {
      icon: FileEdit,
      title: "條款修改",
      content: "我們保留隨時修改本使用條款的權利。重大修改時將於網站上公告，繼續使用本服務即代表您同意接受修改後的條款約束。",
    }
  ];

  const activeSections = isPrivacy ? privacySections : termsSections;

  return (
    <AnimatePresence>
      {isOpen && type && (
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
            className="relative w-full max-w-3xl bg-slate-50/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200/50 rounded-full transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 sm:p-10 overflow-y-auto relative">
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-10 pb-8 border-b border-slate-200">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-sm border border-white/50 ${isPrivacy ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  <HeaderIcon className="w-10 h-10" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">{title}</h2>
                <p className="mt-3 text-slate-500 font-medium">保障您的權益，打造安全可靠的使用環境</p>
              </div>

              {/* Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
                {activeSections.map((section, index) => (
                  <div 
                    key={index} 
                    className="group relative p-6 bg-white border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-3xl overflow-hidden hover:border-slate-200 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Subtle numbering background */}
                    <div className={`absolute -bottom-6 -right-2 text-[120px] font-display font-black leading-none pointer-events-none select-none z-0 transition-colors duration-500 ${isPrivacy ? 'text-indigo-50/40 group-hover:text-indigo-100/50' : 'text-emerald-50/40 group-hover:text-emerald-100/50'}`}>
                      {index + 1}
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:-translate-y-1 ${isPrivacy ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        <section.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                          {section.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-center">
                <button
                  onClick={onClose}
                  className="w-full max-w-sm py-4 px-4 bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-900/10 text-white rounded-2xl font-display font-semibold shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  我已詳細閱讀並了解
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
