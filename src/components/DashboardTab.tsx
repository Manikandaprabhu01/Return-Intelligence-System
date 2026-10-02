import React, { useState } from 'react';
import { 
  TrendingDown, 
  RotateCcw, 
  DollarSign, 
  Package, 
  Clock, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Sliders,
  Sparkles
} from 'lucide-react';
import { BUSINESS_KPIS, ROOT_CAUSE_DISTRIBUTION } from '../data/mockData';

export const DashboardTab: React.FC = () => {
  const [targetReturnRate, setTargetReturnRate] = useState<number>(24.5);
  const [exchangeAcceptanceRate, setExchangeAcceptanceRate] = useState<number>(35);

  // Dynamic calculations based on slider
  const baselineReturnsWeekly = BUSINESS_KPIS.weeklyOrders * (BUSINESS_KPIS.currentReturnRatePct / 100); // 14,880
  const projectedReturnsWeekly = BUSINESS_KPIS.weeklyOrders * (targetReturnRate / 100);
  const weeklyReturnsPrevented = Math.round(baselineReturnsWeekly - projectedReturnsWeekly);
  const annualReturnsPrevented = weeklyReturnsPrevented * 52;
  const directFreightSavingsAnnualCr = Number(((annualReturnsPrevented * BUSINESS_KPIS.logisticsCostPerReturnInr) / 10000000).toFixed(2));
  const totalFinancialBenefitCr = Number(((annualReturnsPrevented * BUSINESS_KPIS.totalHandlingCostPerReturnInr + 3400000) / 10000000).toFixed(2));

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6">
      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Return Rate</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-rose-400">31.0%</span>
            <span className="text-xs text-rose-500 font-medium">14,880 orders/wk</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
            <span>Benchmark in Fast Fashion:</span>
            <span className="text-slate-300 font-medium">18-22%</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">COD RTO Rate</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-amber-400">26.0%</span>
            <span className="text-xs text-amber-500 font-medium">61% of total GMV</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
            <span>Faizan's Delivery Loss:</span>
            <span className="text-rose-400 font-medium">₹120/package</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unmasked "Other" Box</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-purple-400">98.2%</span>
            <span className="text-xs text-emerald-400 font-medium">AI Categorized</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
            <span>Before (Neha's Blindspot):</span>
            <span className="text-rose-400 font-medium">44% unread</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg First Response</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emerald-400">14.2 sec</span>
            <span className="text-xs text-slate-400 font-medium line-through">9 hours</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
            <span>WISMO Deflection:</span>
            <span className="text-emerald-400 font-medium">68.4% automated</span>
          </div>
        </div>
      </div>

      {/* Interactive ROI & Impact Simulator */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950/40 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Executive ROI &amp; Cash Recovery Simulator</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Model how reducing return rate from 31% directly scales Dhaga &amp; Co.'s operating margin and rescues delivery slots.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Net Cash Rescued (Annual)</span>
              <p className="text-xl font-black text-emerald-300">₹{totalFinancialBenefitCr} Crore</p>
            </div>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/80 p-5 rounded-xl border border-slate-700/60 mb-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span>Target Return Rate:</span>
                <span className="text-indigo-400 font-bold">{targetReturnRate}%</span>
                <span className="text-[10px] text-slate-500">(Down from 31.0%)</span>
              </label>
              <span className="text-xs font-bold text-emerald-400">
                -{(BUSINESS_KPIS.currentReturnRatePct - targetReturnRate).toFixed(1)}% pts
              </span>
            </div>
            <input 
              type="range"
              min="18.0"
              max="31.0"
              step="0.5"
              value={targetReturnRate}
              onChange={(e) => setTargetReturnRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>18.0% (Best in Class)</span>
              <span>24.5% (MVP 90-day Target)</span>
              <span>31.0% (Current)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span>Exchange vs. Refund Acceptance Rate:</span>
                <span className="text-indigo-400 font-bold">{exchangeAcceptanceRate}%</span>
              </label>
              <span className="text-xs text-slate-400">Target: 35%+</span>
            </div>
            <input 
              type="range"
              min="10"
              max="60"
              step="5"
              value={exchangeAcceptanceRate}
              onChange={(e) => setExchangeAcceptanceRate(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>10% (Low retention)</span>
              <span>35% (Doorstep exchange)</span>
              <span>60% (High incentive)</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Weekly Returns Prevented</span>
            <p className="text-2xl font-bold text-indigo-400 mt-1">{weeklyReturnsPrevented.toLocaleString()}</p>
            <span className="text-[11px] text-slate-500">Parcels saved from reverse transit</span>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Annual Return Volume Saved</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{annualReturnsPrevented.toLocaleString()}</p>
            <span className="text-[11px] text-slate-500">Across Delhivery/Ekart/Shiprocket</span>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Direct Reverse Freight Saved</span>
            <p className="text-2xl font-bold text-amber-400 mt-1">₹{directFreightSavingsAnnualCr} Cr</p>
            <span className="text-[11px] text-slate-500">Faizan's logistics budget</span>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Support Hours Reclaimed</span>
            <p className="text-2xl font-bold text-purple-400 mt-1">1,350 hrs/wk</p>
            <span className="text-[11px] text-slate-500">Arpita's 34 agents freed</span>
          </div>
        </div>
      </div>

      {/* Root Causes: Unmasking the 44% "Other" Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Root Cause Pareto Breakdown */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Root Causes Extracted from the 44% "Other" Box</span>
              </h3>
              <p className="text-xs text-slate-400">
                Gemini 3.8 Flash parsed 14,880 weekly free-text Hinglish return notes &amp; 410,000 product reviews into 6 actionable categories.
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live AI Pipeline
            </span>
          </div>

          <div className="space-y-4">
            {ROOT_CAUSE_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-200">{item.category}</span>
                    <span className="text-[10px] text-slate-400">({item.volume.toLocaleString()} units/wk)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[11px] text-amber-400 font-medium">Vendor Fault: {item.vendorFault}%</span>
                    <span className="font-bold text-slate-100">{item.percentage}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      idx === 0 
                        ? 'bg-rose-500' 
                        : idx === 1 
                        ? 'bg-amber-500' 
                        : idx === 2 
                        ? 'bg-purple-500' 
                        : idx === 3 
                        ? 'bg-blue-500' 
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Primary Culprit: <strong className="text-slate-400">{item.primaryVendor}</strong></span>
                  <span>{item.vendorFault > 50 ? 'Directly Remediable via Specs' : 'Customer Behavioral'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Operational Anatomy of Dhaga & Co. */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-rose-400" />
            <span>Category &amp; Channel Anatomy</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block font-medium mb-1">Product Mix (GMV Share):</span>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-rose-300 font-medium">Womenswear (Kurtis &amp; Sets)</span>
                  <span className="text-slate-200 font-bold">60% (Return: 34.2%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-300 font-medium">Kidswear (Boys/Girls)</span>
                  <span className="text-slate-200 font-bold">30% (Return: 22.1%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300 font-medium">Men's Basics</span>
                  <span className="text-slate-200 font-bold">10% (Return: 16.4%)</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block font-medium mb-1">Customer Demographics:</span>
              <ul className="space-y-1 text-slate-300">
                <li>• <strong>64% Tier-2 &amp; Tier-3 Cities:</strong> Patchy connectivity, Hinglish vernacular search ("mehndi function dress").</li>
                <li>• <strong>92% Android App Orders:</strong> Low-cost handsets, lightweight interfaces necessary.</li>
                <li>• <strong>61% Cash On Delivery:</strong> High risk of impulse refusal upon delayed delivery.</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40">
              <span className="text-indigo-300 block font-bold mb-1">The Repeat Rate Dilemma:</span>
              <p className="text-slate-300 text-[11px]">
                Ritu noted: <em>"Repeat purchase rate stuck at 22% for six quarters."</em> When a first-time customer experiences a 9-hour wait for a return pickup or gets a kurti that pinches at the bust, they never buy again. Fixing returns unlocks repeat LTV!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
