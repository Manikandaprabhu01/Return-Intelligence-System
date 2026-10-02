import React, { useState } from 'react';
import { 
  RotateCcw, 
  Bot, 
  Sparkles, 
  FileText, 
  Layers, 
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  Bell,
  CheckCircle2,
  ShieldAlert,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface HeaderProps {
  activeTab: 'discovery' | 'dashboard' | 'agents' | 'vendors' | 'architecture';
  setActiveTab: (tab: 'discovery' | 'dashboard' | 'agents' | 'vendors' | 'architecture') => void;
  onQuickSimulate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onQuickSimulate }) => {
  const { unreadCount, history, markAllAsRead, clearAll, triggerHighPriorityReturnAlert, checkVendorThresholds } = useToast();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <RotateCcw className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">Dhaga &amp; Co.</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Return Intelligence Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Solving the 31% return rate &amp; ₹12.8 Cr bleed across 48,000 weekly orders
              </p>
            </div>
          </div>

          {/* Right Section: Stats Badges + Divider + Actions */}
          <div className="flex items-center space-x-3.5">
            {/* Quick Stats Badges */}
            <div className="hidden xl:flex items-center space-x-2.5 text-xs font-medium">
              <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>Baseline Return Rate:</span>
                <span className="text-rose-400 font-bold">31.0%</span>
              </div>
              <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Projected Target:</span>
                <span className="text-emerald-400 font-bold">24.5% (-6.5%)</span>
              </div>
              <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Annual Savings:</span>
                <span className="text-indigo-300 font-bold">₹3.18 Cr</span>
              </div>
            </div>

            {/* Visual Divider between Stats & Action Toolbar */}
            <div className="hidden xl:block h-6 w-px bg-slate-800 mx-1" aria-hidden="true" />

            {/* Right Action Toolbar: Alert Bell & Simulate Button */}
            <div className="flex items-center space-x-2.5 relative">
              {/* Notification Bell with Badge */}
              <div className="relative flex items-center">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (!showNotifications) markAllAsRead();
                  }}
                  className={`h-9 w-9 rounded-lg border transition-all relative cursor-pointer flex items-center justify-center shrink-0 ${
                    showNotifications 
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-600/20' 
                      : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-750 hover:border-slate-600'
                  }`}
                  title="System Alerts & Priority Return Notifications"
                  aria-label="View system alerts"
                >
                  <Bell className="w-4 h-4 transition-transform hover:rotate-12" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center shadow-md shadow-rose-600/50 animate-bounce">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification History Popover */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-84 sm:w-96 bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl z-50 p-4 space-y-3.5 animate-fadeIn text-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Intelligence Alert Feed
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={clearAll}
                          className="text-[11px] text-slate-400 hover:text-rose-400 px-2 py-1 rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Clear history"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick test alert triggers */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-[11px]">
                      <span className="text-slate-400 font-medium block">Simulate Real-Time Trigger:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => triggerHighPriorityReturnAlert('DH-89245', 'Chest tight -2.1" on Anarkali Kurti', 0.81)}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] font-semibold transition-colors cursor-pointer"
                        >
                          + Trigger High-Priority Return
                        </button>
                        <button
                          onClick={() => checkVendorThresholds(35.0)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-semibold transition-colors cursor-pointer"
                        >
                          + Trigger Vendor Breach
                        </button>
                      </div>
                    </div>

                    {/* List of past notifications */}
                    <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1 no-scrollbar text-xs">
                      {history.length === 0 ? (
                        <div className="text-center py-6 text-slate-500 text-xs">
                          No alerts in history. Trigger one above!
                        </div>
                      ) : (
                        history.slice(0, 8).map(item => (
                          <div
                            key={item.id}
                            className="p-3 rounded-xl bg-slate-800/60 border border-slate-750/70 space-y-1.5 hover:bg-slate-800 transition-colors"
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className={`font-bold uppercase px-2 py-0.5 rounded-md border ${
                                item.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                                item.severity === 'warning' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                                'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              }`}>
                                {item.category === 'high_priority_return' ? 'High Priority Return' : 'Vendor SLA'}
                              </span>
                              <span className="text-slate-400 font-mono">{item.timestamp}</span>
                            </div>
                            <p className="font-semibold text-slate-200 text-xs leading-snug">{item.title}</p>
                            <p className="text-[11px] text-slate-400 leading-tight">{item.message}</p>
                            {item.actionTargetTab && (
                              <button
                                onClick={() => {
                                  setActiveTab(item.actionTargetTab!);
                                  setShowNotifications(false);
                                }}
                                className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 pt-1 cursor-pointer"
                              >
                                <span>{item.actionLabel || 'Inspect'}</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Action Button */}
              <button
                onClick={onQuickSimulate}
                className="h-9 flex items-center space-x-2 px-3.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulate Hinglish Return</span>
                <span className="sm:hidden">Simulate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Modern Segmented Tab Bar */}
        <nav aria-label="Main Navigation" className="flex space-x-1.5 overflow-x-auto py-2.5 border-t border-slate-800/80 no-scrollbar">
          <button
            onClick={() => setActiveTab('discovery')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'discovery'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Discovery &amp; 31% Problem</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. ROI &amp; Executive Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('agents')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'agents'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-indigo-300" />
            <span>3. Agent Command Center</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab('vendors')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'vendors'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>4. Vendor Sizing Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-300" />
            <span>5. PRD &amp; Architecture Specs</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
