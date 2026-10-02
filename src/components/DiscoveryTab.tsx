import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  HelpCircle, 
  Cpu, 
  Quote, 
  TrendingDown, 
  FileText,
  Printer,
  Download
} from 'lucide-react';
import { RANKED_PROBLEMS } from '../data/mockData';
import { DiscoveryPdfModal } from './DiscoveryPdfModal';

export const DiscoveryTab: React.FC = () => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-8">
      {/* Editorial Header / Executive Problem Statement */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm">
        {/* Subtle ambient gradient mesh */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
              <span>Phase 1</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Discovery Memorandum</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Dhaga &amp; Co. Engagement</span>
            </div>

            {/* 1-Page PDF Export Trigger */}
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="h-9 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center space-x-2 shadow-md shadow-rose-600/25 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] self-start sm:self-auto font-mono"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>Download 1-Page PDF</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight max-w-4xl">
            The 31% Return Crisis: Unmasking the Sizing Discrepancy &amp; Autonomous Deflection
          </h1>

          {/* Problem in Client's Words */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border-l-2 border-rose-500 border-y border-r border-slate-800/80">
            <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
              Core Problem Statement (In Client's Vocabulary)
            </p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              &ldquo;Dhaga &amp; Co. is bleeding <span className="text-rose-400 font-semibold">₹12.76 Crore annually</span> because 31% of all shipments are returned. 44% of reasons are buried unread in a generic &lsquo;Other&rsquo; box caused by sizing discrepancies across Tiruppur and Jaipur manufacturing hubs. Meanwhile, 26% of Cash-on-Delivery orders bounce back as RTO, and 5,200 weekly WISMO inquiries overwhelm 34 support agents with 9-hour delays.&rdquo;
            </p>
          </div>

          {/* 4 Primary Operational Metric Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <span className="text-xs text-slate-400 block mb-1">Baseline Return Rate</span>
              <p className="text-2xl sm:text-3xl font-bold text-rose-400 font-mono tabular-nums">31.0%</p>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">14,880 returns / wk</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <span className="text-xs text-slate-400 block mb-1">COD Delivery Rejection (RTO)</span>
              <p className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono tabular-nums">26.0%</p>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">Across 61% of total volume</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <span className="text-xs text-slate-400 block mb-1">Unclassified "Other" Category</span>
              <p className="text-2xl sm:text-3xl font-bold text-purple-400 font-mono tabular-nums">44.0%</p>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">Zero root-cause attribution</span>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
              <span className="text-xs text-slate-400 block mb-1">Target Return Percentage</span>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">&lt; 2-3%</p>
              <span className="text-[11px] text-emerald-300 font-mono mt-0.5 block">Saves up to ₹12.08 Cr / yr</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders & Financial Unit Economics */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stakeholder Ownership Grid (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2 text-slate-100 font-semibold text-sm">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Internal Stakeholders &amp; Current Compensatory Behavior</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">4 Core Leaders</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-200">Neha</span>
                <span className="text-[11px] text-rose-400 font-medium">Category Head</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manually samples a few hundred free-text rows per week. Unable to correlate returns back to specific vendor cutting discrepancies between Tiruppur knits and Jaipur ethnicwear.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-200">Faizan</span>
                <span className="text-[11px] text-amber-400 font-medium">Head of Supply Chain</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Absorbs ₹120 reverse courier fee per parcel on 26% COD bounce rate. Watches delivery slots burn without pre-dispatch address verification or prepaid conversion incentives.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-200">Arpita</span>
                <span className="text-[11px] text-indigo-400 font-medium">Head of Customer Support</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manages 34 Freshdesk agents copy-pasting the same 4 canned tracking responses for 5,200 WISMO tickets/week. Average first response time lags at 9 hours.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-200">Ritu</span>
                <span className="text-[11px] text-emerald-400 font-medium">Co-founder &amp; CEO</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Repeat purchase rate plateaued at 22% for 6 consecutive quarters. Sizing friction turns first-time shoppers into churned customers, inflating CAC by 40%.
              </p>
            </div>
          </div>
        </div>

        {/* Financial Unit Economics & Cash Bleed Math (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center space-x-2 text-slate-100 font-semibold text-sm">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              <span>Unit Economics Verification Math</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">₹165 Unit Bleed</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Weekly Shipments:</span>
                <span className="text-slate-100 font-bold">48,000 orders</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Overall Return Rate:</span>
                <span className="text-rose-400 font-bold">31.0% (14,880 returns)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Reverse Cost per Parcel:</span>
                <span className="text-slate-100 font-bold">₹165 (₹120 + ₹45 handling)</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/80 pt-1.5">
                <span className="text-slate-400">Annual Return Cost Bleed:</span>
                <span className="text-rose-400 font-bold">₹12.76 Crore / yr</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Deflection Goal:</span>
                <span className="text-emerald-300 font-bold">&lt; 2-3% (2.5% Target)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Weekly Returns Prevented:</span>
                <span className="text-emerald-300 font-bold">13,680 parcels / wk (from 14,880)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Direct Reverse Freight Saved:</span>
                <span className="text-emerald-400 font-bold">₹8.54 Crore / yr</span>
              </div>
              <div className="flex justify-between border-t border-emerald-900/40 pt-1.5">
                <span className="text-slate-300 font-semibold">Total Projected Value Rescued:</span>
                <span className="text-emerald-400 font-bold text-sm">₹12.08 Crore / yr</span>
              </div>
              <div className="pt-1 text-[11px] text-slate-400">
                Phase 1 Milestone: 24.5% (-6.5% pts, ₹3.18 Cr saved) → Moonshot Target: &lt; 2-3% (₹12.08 Cr saved).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranked Shortlist of Four Problems */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <Target className="w-4 h-4 text-rose-400" />
            <span>Problem Architecture &amp; Prioritization</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Defensible Shortlist of Four Key Vulnerabilities
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ranked strictly by measurable financial bleed, SLA operational lag, and verified stakeholder accountability.
          </p>
        </div>

        <div className="space-y-4">
          {RANKED_PROBLEMS.map((prob) => (
            <div 
              key={prob.rank} 
              className={`p-5 rounded-xl border transition-all ${
                prob.rank === 1 
                  ? 'bg-slate-950/80 border-rose-500/40' 
                  : 'bg-slate-950/50 border-slate-800/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-bold text-slate-400">
                    0{prob.rank}
                  </span>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base tracking-tight">{prob.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">Owner:</span>
                  <span className="font-semibold text-rose-300">{prob.owner}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 font-medium block mb-1">Financial Impact Today</span>
                  <p className="font-semibold text-rose-300 font-mono tabular-nums">{prob.directCost}</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 font-medium block mb-1">Rank Justification</span>
                  <p className="text-slate-300 leading-snug">{prob.whyRank1 || prob.whyRank2 || prob.whyRank3 || prob.whyRank4}</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 font-medium block mb-1">Success Target</span>
                  <p className="font-semibold text-emerald-400 font-mono">{prob.metric}</p>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400 italic flex items-start gap-2">
                <Quote className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                <span>{prob.clientQuote}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assumptions, Validation & Architecture Boundaries */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Assumptions & Falsification */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 text-slate-100 font-semibold text-sm border-b border-slate-800/80 pb-3">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Falsification Criteria &amp; Core Hypothesis</span>
          </div>
          
          <div className="space-y-3 text-xs">
            <div>
              <span className="font-semibold text-purple-300 uppercase tracking-wider text-[11px] block mb-1 font-mono">
                Working Hypothesis
              </span>
              <p className="text-slate-300 leading-relaxed">
                The majority of the 44% "Other" returns result from standardizable vendor sizing discrepancies (e.g. Jaipur Loomcraft sizing runs 2.1" smaller at bust) and Tier-2/3 shoppers will accept a 1-click doorstep exchange (+ ₹100 instant wallet incentive) over a complete refund.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <span className="font-semibold text-rose-300 uppercase tracking-wider text-[11px] block mb-1 font-mono">
                Falsification Trigger
              </span>
              <p className="text-slate-300 leading-relaxed">
                If &gt;60% of extracted Hinglish queries cite subjective post-purchase regret or event cancellations rather than physical fit defects, or if COD buyers reject exchanges at a rate above 85% in favor of cash.
              </p>
            </div>
          </div>
        </div>

        {/* Deterministic Code vs. LLM Boundary */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 text-slate-100 font-semibold text-sm border-b border-slate-800/80 pb-3">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Deterministic Logic vs. Model Boundaries</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-semibold text-cyan-300 uppercase tracking-wider text-[11px] block mb-1 font-mono">
                Strict Deterministic Code (Zero Hallucinations)
              </span>
              <p className="text-slate-300 leading-relaxed">
                Carrier SLA lookups (Delhivery vs Ekart), AWB dispatch numbers, refund amount calculations, and vendor penalty formulas. No LLM touches numeric balance sheets or pin code routings.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <span className="font-semibold text-emerald-300 uppercase tracking-wider text-[11px] block mb-1 font-mono">
                Model Responsibilities (Gemini 3.8 Flash)
              </span>
              <p className="text-slate-300 leading-relaxed">
                Hinglish colloquial sentiment extraction, conversational WhatsApp size exchange resolution, and mapping chaotic customer reviews into structured defect categories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1-Page Executive PDF Modal */}
      <DiscoveryPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
};
