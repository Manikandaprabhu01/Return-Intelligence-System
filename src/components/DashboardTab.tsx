import React, { useState } from 'react';
import { 
  TrendingDown, 
  RotateCcw, 
  DollarSign, 
  Clock, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { BUSINESS_KPIS, ROOT_CAUSE_DISTRIBUTION } from '../data/mockData';

export const DashboardTab: React.FC = () => {
  const [targetReturnRate, setTargetReturnRate] = useState<number>(2.5);
  const [exchangeAcceptanceRate, setExchangeAcceptanceRate] = useState<number>(35);

  // Dynamic calculations based on slider
  const baselineReturnsWeekly = BUSINESS_KPIS.weeklyOrders * (BUSINESS_KPIS.currentReturnRatePct / 100); // 14,880
  const projectedReturnsWeekly = BUSINESS_KPIS.weeklyOrders * (targetReturnRate / 100);
  const weeklyReturnsPrevented = Math.round(baselineReturnsWeekly - projectedReturnsWeekly);
  const annualReturnsPrevented = weeklyReturnsPrevented * 52;
  const directFreightSavingsAnnualCr = Number(((annualReturnsPrevented * BUSINESS_KPIS.logisticsCostPerReturnInr) / 10000000).toFixed(2));
  const totalFinancialBenefitCr = Number(((annualReturnsPrevented * BUSINESS_KPIS.totalHandlingCostPerReturnInr + 3400000) / 10000000).toFixed(2));

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-8">
      {/* Executive Overview KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>CURRENT RETURN RATE</span>
            <RotateCcw className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-bold text-rose-400 font-mono tabular-nums">31.0%</span>
            <span className="text-xs text-slate-400 font-mono">14,880 / wk</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Fast Fashion Benchmark:</span>
            <span className="text-slate-200 font-semibold font-mono">18.0%–22.0%</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>COD REJECTION (RTO)</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-bold text-amber-400 font-mono tabular-nums">26.0%</span>
            <span className="text-xs text-slate-400 font-mono">61% of GMV</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Delivery Loss per Rejection:</span>
            <span className="text-rose-400 font-semibold font-mono">₹120 / order</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>CLASSIFIED "OTHER" BOX</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-bold text-indigo-300 font-mono tabular-nums">98.2%</span>
            <span className="text-xs text-emerald-400 font-mono font-medium">Attributed</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Previously Unread (Blindspot):</span>
            <span className="text-rose-400 font-semibold font-mono">44.0%</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>FIRST RESPONSE LATENCY</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-bold text-emerald-400 font-mono tabular-nums">14.2s</span>
            <span className="text-xs text-slate-500 font-mono line-through">9 hours</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Automated WISMO Deflection:</span>
            <span className="text-emerald-400 font-semibold font-mono">68.4%</span>
          </div>
        </div>
      </section>

      {/* Interactive ROI & Cash Recovery Modeling Console */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">
              <Sliders className="w-4 h-4" />
              <span>Sensitivity Financial Simulator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Executive Cash Recovery &amp; Margin Expansion Levers
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Adjust the return reduction and exchange conversion levers to model projected operating margins.
            </p>
          </div>

          <div className="px-5 py-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center space-x-3 shrink-0">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Net Annual Value Rescued
              </span>
              <p className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                ₹{totalFinancialBenefitCr} Crore
              </p>
            </div>
          </div>
        </div>

        {/* Levers Slider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 p-5 sm:p-6 rounded-xl border border-slate-800/80">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <span>Target Return Rate:</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">{targetReturnRate.toFixed(1)}%</span>
                {targetReturnRate <= 3.0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                    &lt; 2-3% Target
                  </span>
                )}
              </label>
              <span className="text-xs font-mono font-bold text-emerald-400">
                -{(BUSINESS_KPIS.currentReturnRatePct - targetReturnRate).toFixed(1)}% drop
              </span>
            </div>
            
            <input 
              type="range"
              min="1.0"
              max="31.0"
              step="0.5"
              value={targetReturnRate}
              onChange={(e) => setTargetReturnRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            
            {/* Quick Scenario Preset Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              <button
                onClick={() => setTargetReturnRate(2.5)}
                className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                  targetReturnRate === 2.5
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                ★ &lt; 2-3% (2.5% Moonshot)
              </button>
              <button
                onClick={() => setTargetReturnRate(18.0)}
                className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                  targetReturnRate === 18.0
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-bold shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                18.0% (Global Best)
              </button>
              <button
                onClick={() => setTargetReturnRate(24.5)}
                className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                  targetReturnRate === 24.5
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-bold shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                24.5% (Phase 1 90-Day)
              </button>
              <button
                onClick={() => setTargetReturnRate(31.0)}
                className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                  targetReturnRate === 31.0
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                31.0% (Current)
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <span>Exchange vs. Full Refund Acceptance:</span>
                <span className="text-indigo-400 font-bold font-mono text-sm">{exchangeAcceptanceRate}%</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">Target: 35%+</span>
            </div>
            <input 
              type="range"
              min="10"
              max="60"
              step="5"
              value={exchangeAcceptanceRate}
              onChange={(e) => setExchangeAcceptanceRate(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5">
              <span>10% (Low Incentive)</span>
              <span className="text-indigo-300 font-semibold">35% (Doorstep + ₹100)</span>
              <span>60% (Max Incentive)</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Outcomes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Weekly Returns Prevented</span>
            <p className="text-2xl font-bold text-indigo-400 font-mono tabular-nums">{weeklyReturnsPrevented.toLocaleString()}</p>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Parcels saved from reverse</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Annual Returns Saved</span>
            <p className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">{annualReturnsPrevented.toLocaleString()}</p>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Across 3 carriers</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Direct Reverse Freight Saved</span>
            <p className="text-2xl font-bold text-amber-400 font-mono tabular-nums">₹{directFreightSavingsAnnualCr} Cr</p>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Faizan's logistics budget</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Support Hours Reclaimed</span>
            <p className="text-2xl font-bold text-purple-400 font-mono tabular-nums">1,350 hrs/wk</p>
            <span className="text-[11px] text-slate-400 mt-0.5 block">34 agents freed</span>
          </div>
        </div>
      </section>

      {/* Root Causes: Unmasking the 44% "Other" Box */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Root Cause Pareto Breakdown (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Root Cause Extraction from 44% "Other" Box
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Gemini 3.8 Flash parsed 14,880 weekly free-text Hinglish return notes &amp; 410,000 product reviews into 6 actionable categories.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400">98.2% Accuracy</span>
          </div>

          <div className="space-y-4">
            {ROOT_CAUSE_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-200">{item.category}</span>
                    <span className="text-[11px] font-mono text-slate-400">({item.volume.toLocaleString()} units/wk)</span>
                  </div>
                  <div className="flex items-center space-x-3 font-mono">
                    <span className="text-[11px] text-amber-400">Vendor Fault: {item.vendorFault}%</span>
                    <span className="font-bold text-slate-100">{item.percentage}%</span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Key Insight Sidebar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              <BarChart3 className="w-4 h-4 text-rose-400" />
              <span>Sizing Attribution Insight</span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Tiruppur vs. Jaipur Divergence
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              Over <strong>64.2%</strong> of sizing returns originate from Jaipur ethnicwear kurtis running 1.8"–2.2" smaller in the bust compared to Tiruppur cotton tops.
            </p>
            
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 mt-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Jaipur Vendor Defect:</span>
                <span className="text-rose-400 font-bold">38.4% Return Rate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tiruppur Vendor Defect:</span>
                <span className="text-emerald-400 font-bold">19.2% Return Rate</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/80 pt-1.5">
                <span className="text-slate-400">Sizing Delta:</span>
                <span className="text-amber-300 font-bold">-2.1" at Bust</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-200">
            <span className="font-semibold block mb-1">Autonomous Resolution Path:</span>
            <span>Agent 1 intercepts size inquiries on WhatsApp within 15 seconds, offering 1-click doorstep exchange to Size +1 before reverse freight is incurred.</span>
          </div>
        </div>
      </section>
    </div>
  );
};
