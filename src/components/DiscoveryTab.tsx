import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Target, 
  HelpCircle, 
  Cpu, 
  Sparkles,
  ArrowRight,
  TrendingDown,
  Quote
} from 'lucide-react';
import { RANKED_PROBLEMS, BUSINESS_KPIS } from '../data/mockData';

export const DiscoveryTab: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto py-6">
      {/* Hero Banner / Problem Statement */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-rose-950/40 rounded-2xl border border-rose-500/20 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Phase 1: Discovery Note
            </span>
            <span className="text-xs text-slate-400">
              Mini Project 1: The Dhaga &amp; Co. Engagement
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            The 31% Return Crisis: Unmasking the Sizing Black Box &amp; Autonomous Deflection
          </h1>

          <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
              The Problem in One Sentence (in Client's Language):
            </p>
            <p className="text-base sm:text-lg text-slate-100 font-medium italic">
              "Dhaga &amp; Co. is bleeding ₹12.8 Crore annually because 31% of all shipments are returned—with 44% of reasons lost in an unread 'Other' box driven by vendor sizing discrepancies across Tiruppur and Jaipur, while 26% of COD orders bounce back as RTO and 5,200 weekly WISMO inquiries overwhelm support agents with 9-hour delays."
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
              <span className="text-xs text-slate-400">Baseline Return Rate</span>
              <p className="text-2xl font-black text-rose-400">31.0%</p>
              <span className="text-[11px] text-slate-500">14,880 returns/week</span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
              <span className="text-xs text-slate-400">COD RTO Rate</span>
              <p className="text-2xl font-black text-amber-400">26.0%</p>
              <span className="text-[11px] text-slate-500">On 61% of total orders</span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
              <span className="text-xs text-slate-400">"Other" Free-Text Box</span>
              <p className="text-2xl font-black text-purple-400">44.0%</p>
              <span className="text-[11px] text-slate-500">Unanalyzed root causes</span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
              <span className="text-xs text-slate-400">Annual Deadweight Loss</span>
              <p className="text-2xl font-black text-rose-300">₹12.76 Cr</p>
              <span className="text-[11px] text-slate-500">₹120-165 per return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Discovery Checklist 7-Point Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Item 2: Who Owns It Today & What They Do Instead */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-rose-400">
            <Users className="w-5 h-5" />
            <h2 className="font-bold text-slate-100 text-base">Who Owns It Inside the Company Today</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-rose-300">Neha, Category Head</span>
                <span className="text-xs text-slate-400">Returns &amp; Sizing</span>
              </div>
              <p className="text-xs text-slate-300">
                <span className="font-medium text-slate-400">Currently does instead:</span> Manually reads a few hundred rows of the "Other" free-text box when time permits. Unable to keep pace with 14,880 returns/week. Cannot correlate returns back to specific vendor patterns.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-amber-300">Faizan, Head of Supply Chain</span>
                <span className="text-xs text-slate-400">Logistics &amp; RTO</span>
              </div>
              <p className="text-xs text-slate-300">
                <span className="font-medium text-slate-400">Currently does instead:</span> Pays ₹120 flat per reverse courier on 26% COD RTOs. Watches delivery slots burn without pre-dispatch address or intent verification.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-indigo-300">Arpita, Head of CX</span>
                <span className="text-xs text-slate-400">Customer Support</span>
              </div>
              <p className="text-xs text-slate-300">
                <span className="font-medium text-slate-400">Currently does instead:</span> Employs 34 agents on Freshdesk who manually copy-paste the same 4 canned replies for 58% WISMO queries, with a 9-hour average response time.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-emerald-300">Ritu, Co-founder &amp; CEO</span>
                <span className="text-xs text-slate-400">Repeat Retention</span>
              </div>
              <p className="text-xs text-slate-300">
                <span className="font-medium text-slate-400">The Strategic Dilemma:</span> Repeat purchase rate stuck at 22% for 6 quarters. High return friction turns new buyers into one-and-done churned customers, forcing Sameer (Growth) to spend 40% higher CAC.
              </p>
            </div>
          </div>
        </div>

        {/* Item 3 & 4: Evidence from Case Study & Exact Cost Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <DollarSign className="w-5 h-5" />
            <h2 className="font-bold text-slate-100 text-base">Case Study Evidence &amp; Financial Cost</h2>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/40">
              <p className="font-semibold text-slate-200 mb-1">Exact Case Evidence Cited:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-300">
                <li><strong>Volume:</strong> 48,000 orders/week (~2,496,000 orders/year), AOV = ₹840, GMV = ~₹310 Cr run-rate.</li>
                <li><strong>Returns:</strong> 31% overall return rate = 14,880 returns/week = 773,760 returns/year.</li>
                <li><strong>COD RTO:</strong> 61% COD orders with 26% RTO = ~7,610 rejected deliveries/week.</li>
                <li><strong>Cost per RTO:</strong> ₹120 freight + ~₹45 handling/damage/restocking = ₹165 per reverse unit.</li>
                <li><strong>Data Reality:</strong> 44% of returns dumped in "Other" box; 410,000 product reviews unanalyzed; 90 spellings of color; size charts differ across 40 vendors.</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40">
              <p className="font-semibold text-rose-300 mb-1">The Arithmetic Dev &amp; Faizan Will Ask About:</p>
              <div className="font-mono text-[11px] text-slate-200 space-y-1">
                <p>• Weekly Returns = 48,000 × 31% = 14,880 units</p>
                <p>• Weekly Direct Reverse Cost = 14,880 × ₹165 = ₹24,55,200/wk</p>
                <p>• Annual Return Loss = ₹24.55L × 52 weeks = <span className="text-rose-400 font-bold">₹12.76 Crore/year</span></p>
                <p>• Target: Reduce returns from 31% to 24.5% (-6.5%) = 3,120 returns saved/week</p>
                <p>• Direct Net Annual Savings = 3,120 × 52 × ₹165 = <span className="text-emerald-400 font-bold">₹2.67 Crore/yr cash saved</span> + ₹0.51 Cr support automation = <span className="text-emerald-300 font-bold">₹3.18 Cr Total ROI</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item 6: Ranked Shortlist of Four Problems */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-400" />
              <span>Ranked Shortlist of 4 Problems (Defensible Prioritization)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Ranked strictly by measurable financial bleed and client ownership, not technical hype.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {RANKED_PROBLEMS.map((prob) => (
            <div 
              key={prob.rank} 
              className={`p-4 rounded-xl border transition-all ${
                prob.rank === 1 
                  ? 'bg-rose-950/20 border-rose-500/40 shadow-md shadow-rose-950/20' 
                  : 'bg-slate-850 border-slate-700/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    prob.rank === 1 ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    #{prob.rank}
                  </span>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base">{prob.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Owner:</span>
                  <span className="font-semibold text-rose-300">{prob.owner}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 font-medium">Financial Cost Today:</span>
                  <p className="font-semibold text-rose-300 mt-0.5">{prob.directCost}</p>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 font-medium">Why It Sits At This Rank:</span>
                  <p className="text-slate-300 mt-0.5">{prob.whyRank1 || prob.whyRank2 || prob.whyRank3 || prob.whyRank4}</p>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 font-medium">Success Metric:</span>
                  <p className="font-semibold text-emerald-400 mt-0.5">{prob.metric}</p>
                </div>
              </div>

              <div className="mt-2 text-xs text-slate-400 italic flex items-start gap-1.5">
                <Quote className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>{prob.clientQuote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item 7 & Ground Rules: Assumptions, Code vs Model Line, & Cost Line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biggest Assumption & Falsification Criteria */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-purple-400">
            <HelpCircle className="w-5 h-5" />
            <h2 className="font-bold text-slate-100 text-base">Biggest Assumption &amp; Falsification</h2>
          </div>
          
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 text-xs space-y-2">
            <div>
              <span className="font-semibold text-purple-300">The Core Assumption:</span>
              <p className="text-slate-300 mt-0.5">
                We assume that the majority of the 44% "Other" return requests stem from <em>standardizable vendor sizing inconsistencies</em> (e.g. Jaipur Loomcraft cuts 2" smaller on chest) and that customers in Tier-2/3 cities will readily accept a 1-click doorstep size exchange (+ ₹100 instant wallet incentive) over a complete refund.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-700/60">
              <span className="font-semibold text-rose-300">What Evidence Would Prove It Wrong:</span>
              <p className="text-slate-300 mt-0.5">
                If, after extracting 5,000 "Other" responses, &gt;60% cite <em>subjective customer regret, wedding date cancellations, or fabric color preference shifts</em> rather than physical measurement defects, or if customer exchange acceptance is under 15% because COD buyers strictly prefer hard cash refunds.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-700/60">
              <span className="font-semibold text-emerald-300">Validation Built Into the MVP:</span>
              <p className="text-slate-300 mt-0.5">
                The Return Intelligence Agent continuously measures customer exchange conversion vs refund payout, displaying exact root causes across 8 distinct categories.
              </p>
            </div>
          </div>
        </div>

        {/* The Code vs Model Line & Cost Arithmetic (Dev CTO Requirements) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Cpu className="w-5 h-5" />
            <h2 className="font-bold text-slate-100 text-base">The Code vs. Model Line &amp; Cost Line</h2>
          </div>

          <div className="text-xs space-y-2">
            <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <span className="font-semibold text-cyan-300">The Two-Model / Rule Architecture:</span>
              <div className="mt-1 space-y-1 text-slate-300">
                <p>• <strong>Deterministic Code:</strong> Carrier selection (Delhivery/Ekart lookup), SLA countdown, refund arithmetic, and AWB generation. Zero LLM hallucinations on math or tracking IDs.</p>
                <p>• <strong>Gemini 3.8 Flash (Temp 0.1):</strong> Structured JSON extraction of messy Hinglish text ("chest tight hai", "kapda patla") into validated 8 root causes.</p>
                <p>• <strong>Gemini 3.8 Flash (Temp 0.4):</strong> Empathetic Hinglish CX dialogue generation ("Dhaga Saathi") for conversational WhatsApp deflection.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 font-mono text-[11px] text-slate-200">
              <span className="font-semibold text-emerald-300 block mb-1">Cost Arithmetic for Dev (CTO):</span>
              <p>• 9,000 tickets/wk × 58% WISMO = 5,220 agent calls</p>
              <p>• Avg Gemini tokens per call = 450 tokens ≈ ₹0.04 (0.05 cents)</p>
              <p>• Weekly Model Cost = 5,220 × ₹0.04 = <span className="text-emerald-400 font-bold">₹208.80 / week</span></p>
              <p>• Net Savings = Prevents ~3,120 returns @ ₹165 = <span className="text-emerald-400 font-bold">₹5,14,800 saved every week</span></p>
              <p className="text-[10px] text-slate-400 mt-1">ROI Ratio: Over 2,400:1 return on compute cost!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
