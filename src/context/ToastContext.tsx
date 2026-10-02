import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ToastNotification, ToastSeverity, ToastCategory } from '../types';
import { VENDOR_BENCHMARKS_DATA } from '../data/mockData';

interface ToastContextType {
  toasts: ToastNotification[];
  history: ToastNotification[];
  unreadCount: number;
  vendorThreshold: number;
  setVendorThreshold: (val: number) => void;
  addToast: (toast: Omit<ToastNotification, 'id' | 'timestamp'>) => void;
  dismissToast: (id: string) => void;
  clearAll: () => void;
  markAllAsRead: () => void;
  triggerHighPriorityReturnAlert: (orderId?: string, reason?: string, rtoScore?: number) => void;
  checkVendorThresholds: (thresholdVal?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [history, setHistory] = useState<ToastNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [vendorThreshold, setVendorThresholdState] = useState<number>(35.0);

  const addToast = useCallback((toastInput: Omit<ToastNotification, 'id' | 'timestamp'>) => {
    const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newToast: ToastNotification = {
      ...toastInput,
      id,
      timestamp
    };

    // Add to visible toasts (capped at 4 visible at once)
    setToasts(prev => [newToast, ...prev.slice(0, 3)]);
    // Add to history
    setHistory(prev => [newToast, ...prev]);
    setUnreadCount(prev => prev + 1);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
    setHistory([]);
    setUnreadCount(0);
  }, []);

  const markAllAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const triggerHighPriorityReturnAlert = useCallback((orderId = 'DH-89245', reason = 'Severe Chest Sizing Discrepancy (-2.1")', rtoScore = 0.81) => {
    addToast({
      title: '🚨 Agent Alert: High-Priority Return Flagged',
      message: `Order #${orderId} flagged with ${(rtoScore * 100).toFixed(0)}% RTO Risk. Reason: ${reason}. Automated doorstep exchange & COD hold initiated.`,
      severity: 'critical',
      category: 'high_priority_return',
      orderId,
      actionLabel: 'Inspect in Command Center',
      actionTargetTab: 'agents'
    });
  }, [addToast]);

  const checkVendorThresholds = useCallback((thresholdVal = vendorThreshold) => {
    const breachingVendors = VENDOR_BENCHMARKS_DATA.filter(v => v.overallReturnRate >= thresholdVal);
    
    if (breachingVendors.length > 0) {
      breachingVendors.forEach(vend => {
        addToast({
          title: `⚠️ Vendor Threshold Exceeded: ${vend.name}`,
          message: `Return rate reached ${vend.overallReturnRate}% (Threshold: ${thresholdVal}%). Primary defect: ${vend.primaryDefect}. Immediate QC audit recommended.`,
          severity: 'warning',
          category: 'vendor_threshold_exceeded',
          vendorId: vend.vendorId,
          vendorName: vend.name,
          returnRate: vend.overallReturnRate,
          threshold: thresholdVal,
          actionLabel: 'View Vendor Scorecard',
          actionTargetTab: 'vendors'
        });
      });
    }
  }, [vendorThreshold, addToast]);

  const setVendorThreshold = useCallback((val: number) => {
    setVendorThresholdState(val);
    checkVendorThresholds(val);
  }, [checkVendorThresholds]);

  // Initial trigger after mount for realistic real-time dashboard feel
  useEffect(() => {
    const timer1 = setTimeout(() => {
      addToast({
        title: '⚠️ Vendor Threshold Breach: Jaipur Loomcraft',
        message: 'Jaipur Loomcraft return rate is 38.4% (Threshold: 35.0%). 64.2% of returns are chest fitting discrepancies.',
        severity: 'warning',
        category: 'vendor_threshold_exceeded',
        vendorId: 'VEND-014',
        vendorName: 'Jaipur Loomcraft',
        returnRate: 38.4,
        threshold: 35.0,
        actionLabel: 'View Vendor Matrix',
        actionTargetTab: 'vendors'
      });
    }, 1200);

    const timer2 = setTimeout(() => {
      addToast({
        title: '🚨 Agent Flagged High-Risk COD Return',
        message: 'Order #DH-89245 (Darbhanga COD, ₹940) scored 81% RTO risk. Customer initiated cancellation via WhatsApp; pre-dispatch interceptor held parcel.',
        severity: 'critical',
        category: 'high_priority_return',
        orderId: 'DH-89245',
        actionLabel: 'Open Agent Trace',
        actionTargetTab: 'agents'
      });
    }, 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        history,
        unreadCount,
        vendorThreshold,
        setVendorThreshold,
        addToast,
        dismissToast,
        clearAll,
        markAllAsRead,
        triggerHighPriorityReturnAlert,
        checkVendorThresholds
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
