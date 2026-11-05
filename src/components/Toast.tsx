import React from 'react';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <div className="bg-zinc-950/95 border border-zinc-800 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-sm pointer-events-auto orange-glow">
        {toast.type === 'success' && (
          <CheckCircle className="w-5 h-5 text-orange-500 shrink-0" />
        )}
        {toast.type === 'info' && (
          <Info className="w-5 h-5 text-sky-400 shrink-0" />
        )}
        {toast.type === 'error' && (
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
        )}
        <span className="text-xs font-medium text-zinc-200">{toast.message}</span>
      </div>
    </div>
  );
};
