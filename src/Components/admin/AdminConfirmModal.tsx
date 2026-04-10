import { motion, AnimatePresence } from 'motion/react';

interface AdminConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AdminConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}: AdminConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface-container-lowest border border-white/10 p-6 md:p-8 relative z-10 w-full max-w-md shadow-2xl flex flex-col gap-6"
          >
            <div>
              <h3 className="text-xl font-headline font-bold text-on-surface tracking-tight mb-2">{title}</h3>
              <p className="text-outline text-sm leading-relaxed">{message}</p>
            </div>
            
            <div className="flex justify-end gap-3 mt-2">
              <button 
                onClick={onCancel}
                className="px-5 py-2 text-sm font-bold text-outline hover:text-white transition-colors"
              >
                {cancelText}
              </button>
              <button 
                onClick={onConfirm}
                className="px-5 py-2 text-sm font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all shadow-[0_0_20px_rgba(239,68,68,0.15)] rounded"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
