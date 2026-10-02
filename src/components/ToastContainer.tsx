import React, { useEffect, useState } from 'react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  X, 
  ArrowRight,
  ShieldAlert,
  Flame,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { ToastNotification } from '../types';

interface ToastContainerProps {
  onNavigateTab: (tab: 'discovery' | 'dashboard' | 'agents' | 'vendors' | 'architecture') => void;
}

const ToastItem: React.FC<{
  toast: ToastNotification;
  onDismiss: (id: string) => void;
  onNavigateTab: (tab: 'discovery' | 'dashboard' | 'agents' | 'vendors' | 'architecture') => void;
}> = ({ toast, onDismiss, onNavigateTab }) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // update every 50ms
    const totalDuration = 7000; // 7 seconds
    const decrement = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev <= decrement) {
          clearInterval(timer);
          onDismiss(toast.id);
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, toast.id, onDismiss]);

  const getStyles = () => {
    switch (toast.severity) {
      case 'critical':
        return {
          border: 'border-rose-500/50',
          bg: 'bg-slate-900/95 shadow-2xl shadow-rose-950/50',
          indicator: 'bg-rose-500',
          icon: <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />,
          titleColor: 'text-rose-200',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
        };
      case 'warning':
        return {
          border: 'border-amber-500/50',
          bg: 'bg-slate-900/95 shadow-2xl shadow-amber-950/50',
          indicator: 'bg-amber-500',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
          titleColor: 'text-amber-200',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        };
      case 'success':
        return {
          border: 'border-emerald-500/50',
          bg: 'bg-slate-900/95 shadow-2xl shadow-emerald-950/50',
          indicator: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
          titleColor: 'text-emerald-200',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        };
      default:
        return {
          border: 'border-cyan-500/50',
          bg: 'bg-slate-900/95 shadow-2xl shadow-cyan-950/50',
          indicator: 'bg-cyan-500',
          icon: <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />,
          titleColor: 'text-cyan-200',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
        };
    }
  };

  const style = getStyles();

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`w-96 max-w-[92vw] rounded-xl border ${style.border} ${style.bg} p-4 text-white relative overflow-hidden backdrop-blur-md transition-all duration-300 transform hover:scale-[1.01]`}
      role="alert"
    >
      {/* Top auto-dismiss progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
        <div
          className={`h-full ${style.indicator} transition-all duration-75`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-start space-x-3.5">
        <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-750 shrink-0 mt-0.5 shadow-sm">
          {style.icon}
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${style.badgeBg}`}>
              {toast.category === 'high_priority_return' ? 'Agent Priority Alert' :
               toast.category === 'vendor_threshold_exceeded' ? 'Vendor SLA Breach' : 'System Event'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">{toast.timestamp}</span>
          </div>

          <h4 className={`text-xs font-bold leading-tight ${style.titleColor}`}>
            {toast.title}
          </h4>

          <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
            {toast.message}
          </p>

          {/* Action button if specified */}
          {toast.actionLabel && toast.actionTargetTab && (
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  onNavigateTab(toast.actionTargetTab!);
                  onDismiss(toast.id);
                }}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 transition-colors cursor-pointer group"
              >
                <span>{toast.actionLabel}</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-[10px] text-slate-500">Click to investigate</span>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onDismiss(toast.id)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer absolute top-3 right-3"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ onNavigateTab }) => {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <aside 
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 pointer-events-auto"
    >
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={dismissToast}
          onNavigateTab={onNavigateTab}
        />
      ))}
    </aside>
  );
};
