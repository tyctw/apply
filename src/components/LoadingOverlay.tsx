import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white/60 backdrop-blur-sm"
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-50 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <span className="text-indigo-900 font-medium">處理中，請稍候...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
