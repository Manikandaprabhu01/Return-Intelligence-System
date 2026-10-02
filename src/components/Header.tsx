import React from 'react';
import { 
  RotateCcw, 
  Bot, 
  Sparkles, 
  FileText, 
  Layers, 
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  Cpu
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'discovery' | 'dashboard' | 'agents' | 'vendors' | 'architecture';
  setActiveTab: (tab: 'discovery' | 'dashboard' | 'agents' | 'vendors' | 'architecture') => void;
  onQuickSimulate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onQuickSimulate }) => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-rose-600 to-indigo-600 flex items-center justify-center shadow-md shadow-rose-500/20">
              <RotateCcw className="w-4.5 h-4.5 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">Dhaga &amp; Co.</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  Return Intelligence Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Autonomous deflection &amp; sizing resolution across 48,000 weekly orders
              </p>
            </div>
          </div>

          {/* Right Section: Strategic KPIs & Primary Action */}
          <div className="flex items-center space-x-3">
            {/* Quick KPI Badges */}
            <div className="hidden lg:flex items-center space-x-2 text-xs font-medium">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="text-slate-400">Baseline:</span>
                <span className="text-rose-400 font-bold">31.0%</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400">Target:</span>
                <span className="text-emerald-400 font-bold">&lt; 2-3% (2.5%)</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-400">Max Savings:</span>
                <span className="text-indigo-300 font-bold">₹12.08 Cr</span>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="hidden lg:block h-5 w-px bg-slate-800 mx-1" aria-hidden="true" />

            {/* System Online Status Pill */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-semibold">4 Agents Live</span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onQuickSimulate}
              className="h-9 flex items-center space-x-2 px-3.5 sm:px-4 text-xs font-semibold rounded-lg bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-sm shadow-rose-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Simulate Hinglish Return</span>
              <span className="sm:hidden">Simulate</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Modern Segmented Tab Bar */}
        <nav aria-label="Main Navigation" className="flex space-x-1.5 overflow-x-auto py-2.5 border-t border-slate-800/70 no-scrollbar">
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
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
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
