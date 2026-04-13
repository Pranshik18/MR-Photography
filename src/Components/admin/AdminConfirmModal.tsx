import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';

interface AdminConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'primary';
}

export function AdminConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = 'danger'
}: AdminConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      confirmButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onCancel();
        
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as NodeListOf<HTMLElement>;
          
          if (!focusableElements || focusableElements.length === 0) return;
          
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"  
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface-container-lowest border border-white/10 p-6 md:p-8 relative z-10 w-full max-w-md shadow-2xl flex flex-col gap-6"
          >
            <div>
              <h3 id="modal-title" className="text-xl font-headline font-bold text-on-surface tracking-tight mb-2">{title}</h3>
              <p id="modal-description" className="text-outline text-sm leading-relaxed">{message}</p>
            </div>
            
            <div className="flex justify-end gap-3 mt-2">
              <button 
                type="button"
                onClick={onCancel}
                className="px-5 py-2 text-sm font-bold text-outline hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary"
              >
                {cancelText}
              </button>
              <button 
                type="button"
                ref={confirmButtonRef}
                onClick={onConfirm}
                className={`px-5 py-2 text-sm font-bold transition-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest ${
                  variant === 'danger' 
                    ? "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.15)] focus-visible:ring-red-400" 
                    : "bg-tertiary/10 text-tertiary hover:bg-tertiary hover:text-on-tertiary border border-tertiary/20 shadow-[0_0_20px_rgba(206,197,182,0.15)] focus-visible:ring-tertiary"
                }`}
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
