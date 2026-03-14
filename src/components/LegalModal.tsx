import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Check } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | null;
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? '隱私權政策' : '使用條款';
  const Icon = isPrivacy ? Shield : FileText;

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
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${isPrivacy ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">{title}</h2>
              </div>

              <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed mb-10">
                {isPrivacy ? (
                  <>
                    <section>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">1. 資訊收集</h3>
                      <p>我們會收集您提供的電子郵件地址，僅用於發送會考落點分析系統的邀請碼，不會收集其他無關之個人資料。</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">2. 資訊使用</h3>
                      <p>您的電子郵件僅供系統自動發送邀請碼使用，絕對不會被用於其他商業行銷用途，也不會出售、交換或出租給任何第三方。</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">3. 資訊安全</h3>
                      <p>我們採取標準的技術與組織保護措施（如傳輸加密）來保護您的資料安全，防止未經授權的存取、竄改或洩漏。</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">4. Cookie 與追蹤技術</h3>
                      <p>本網站僅使用維持系統安全性所必需的 Cookie（如 hCaptcha 人機驗證），以確保系統正常運作並防範惡意機器人攻擊。</p>
                    </section>
                  </>
                ) : (
                  <>
                    <section>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">1. 服務說明</h3>
                      <p>本系統提供「全國會考落點分析」之邀請碼發送服務。使用者透過本系統取得之邀請碼，需於指定期限內至落點分析主站點使用。</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">2. 使用限制</h3>
                      <p>為維護系統資源與公平性，每個電子郵件地址設有 8 小時的申請冷卻時間。嚴禁使用任何自動化程式、腳本或機器人干擾系統運作。</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">3. 免責聲明</h3>
                      <p>本系統發送之邀請碼僅供個人使用。系統會盡力維持服務穩定，但不保證服務的絕對不中斷，亦不對因使用本服務（或無法使用）所產生的任何直接或間接損失負責。</p>
                    </section>
                    <section>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">4. 條款修改</h3>
                      <p>我們保留隨時修改本使用條款的權利。重大修改時將於網站上公告，繼續使用本服務即代表您同意接受修改後的條款約束。</p>
                    </section>
                  </>
                )}
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
