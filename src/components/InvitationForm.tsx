import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Mail, Send, CheckCircle2, XCircle, AlertTriangle, Loader2, Clock } from 'lucide-react';
import { CONFIG } from '../config';

interface InvitationFormProps {
  onSuccess: () => void;
  setLoading: (loading: boolean) => void;
}

type ResultType = 'success' | 'error' | 'warning' | null;

export default function InvitationForm({ onSuccess, setLoading }: InvitationFormProps) {
  const [email, setEmail] = useState('');
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [result, setResult] = useState<{ type: ResultType; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  // Handle countdown timer
  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h} 小時 ${m} 分鐘 ${s} 秒`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hcaptchaToken) {
      setResult({ type: 'warning', message: '請完成人機驗證。' });
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    setResult(null);

    try {
      // API call
      const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}`,
      });

      const responseText = await response.text();

      if (responseText.includes("發送失敗") || responseText.includes("等待")) {
        setResult({ type: 'warning', message: responseText });
      } else if (responseText.includes("已發送") || responseText.includes("成功")) {
        setResult({ type: 'success', message: '邀請碼已發送到您的郵箱，請查收。' });
        onSuccess();
        setCountdown(CONFIG.cooldownTime);
        setEmail('');
        captchaRef.current?.resetCaptcha();
        setHcaptchaToken(null);
      } else {
        // Fallback or exact error message from backend
        if (responseText) {
          setResult({ type: 'warning', message: responseText });
        } else {
          setResult({ type: 'success', message: '邀請碼已發送到您的郵箱，請查收。' });
          onSuccess();
          setCountdown(CONFIG.cooldownTime);
          setEmail('');
          captchaRef.current?.resetCaptcha();
          setHcaptchaToken(null);
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      // Fallback in case of CORS error with older apps script setup
      setResult({ 
        type: 'warning', 
        message: '無法連線到伺服器。若您稍早有成功送出，請先至信箱檢查信件，或稍等片刻再試。' 
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="email" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 ml-1">
            電子郵件信箱
            <span className="text-indigo-500">*</span>
          </label>
          <div className="relative group">
            {/* Animated Glow Effect on Focus */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-2xl blur opacity-0 group-focus-within:opacity-15 transition duration-500"></div>
            
            <div className={`relative flex items-center w-full bg-white/70 backdrop-blur-xl border ${email ? 'border-indigo-200' : 'border-slate-200/80'} hover:border-indigo-300/80 focus-within:border-indigo-500 focus-within:bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] focus-within:shadow-[0_8px_30px_rgb(99,102,241,0.1)] transition-all duration-300 overflow-hidden`}>
              <div className={`pl-4 pr-3 flex items-center justify-center transition-colors duration-300 ${email ? 'text-indigo-500' : 'text-slate-400 group-focus-within:text-indigo-600'}`}>
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || (countdown !== null && countdown > 0)}
                className="w-full py-4 pr-4 bg-transparent outline-none text-slate-800 placeholder:text-slate-400/70 font-semibold text-[15px] disabled:text-slate-400 transition-all disabled:bg-slate-50/50"
              />
              {/* Optional Success Checkmark if email format looks roughly valid */}
              {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pr-4 text-emerald-500"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-white/40 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/60 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <HCaptcha
            sitekey={CONFIG.hcaptchaSiteKey}
            onVerify={(token) => {
              setHcaptchaToken(token);
              if (result?.type === 'warning') setResult(null);
            }}
            onExpire={() => setHcaptchaToken(null)}
            ref={captchaRef}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || (countdown !== null && countdown > 0)}
          className="relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl text-base font-display font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/10 shadow-xl shadow-slate-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              發送中...
            </>
          ) : countdown !== null && countdown > 0 ? (
            <>
              <Clock className="w-5 h-5" />
              冷卻中
            </>
          ) : (
            <>
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              發送邀請碼
            </>
          )}
        </button>
      </form>

      {/* Result Message */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-2xl flex items-start gap-3 border ${
            result.type === 'success'
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
              : result.type === 'error'
              ? 'bg-red-50/80 border-red-200 text-red-800'
              : 'bg-amber-50/80 border-amber-200 text-amber-800'
          }`}
        >
          {result.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />}
          {result.type === 'error' && <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
          {result.type === 'warning' && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
          <span className="text-sm font-medium">{result.message}</span>
        </motion.div>
      )}

      {/* Countdown Message */}
      {countdown !== null && countdown > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-slate-50/80 border border-slate-200 rounded-2xl text-center"
        >
          <p className="text-sm text-slate-600 font-medium">
            您可以在 <span className="text-indigo-600 font-bold font-mono bg-indigo-50 px-2 py-0.5 rounded-md">{formatTime(countdown)}</span> 後再次申請。
          </p>
        </motion.div>
      )}
    </div>
  );
}

