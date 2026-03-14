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
      await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}`,
      });

      // Since no-cors doesn't return a readable response, we assume success if no network error
      setResult({ type: 'success', message: '邀請碼已發送到您的郵箱，請查收。' });
      onSuccess();
      setCountdown(CONFIG.cooldownTime);
      setEmail('');
      captchaRef.current?.resetCaptcha();
      setHcaptchaToken(null);
    } catch (error: any) {
      console.error('Error:', error);
      setResult({ type: 'error', message: `發送失敗: ${error.message || '網路錯誤'}` });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700 text-left ml-1">
            電子郵件地址
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500 text-slate-400">
              <Mail className="h-5 w-5" />
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
              className="block w-full pl-11 pr-4 py-4 border border-slate-200/60 rounded-2xl bg-white/60 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)] disabled:bg-slate-50 disabled:text-slate-500 text-slate-800 placeholder:text-slate-400 font-medium text-base"
            />
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

