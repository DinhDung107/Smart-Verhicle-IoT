import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#3A1212]/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content - Retro/Organic Style */}
      <div className="relative bg-[#F0EAE1] w-full max-w-lg border border-[#3A1212] shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#3A1212]/10 bg-white/30">
          <h2 className="font-display text-2xl uppercase tracking-wide text-[#3A1212]">{title}</h2>
          <button 
            onClick={onClose}
            className="text-[#3A1212]/60 hover:text-[#C84B31] transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-[#3A1212]">
          {children}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
