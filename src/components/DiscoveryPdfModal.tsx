import React, { useRef } from 'react';
import { X, Printer, Download, FileText, CheckCircle2, ShieldAlert, ArrowDown } from 'lucide-react';
import { RANKED_PROBLEMS, BUSINESS_KPIS } from '../data/mockData';

interface DiscoveryPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoveryPdfModal: React.FC<DiscoveryPdfModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl relative my-auto text-slate-100 flex flex-col max-h-[95vh]">
        {/* Action Bar (Not Printed) */}
        <div className="no-print p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 rounded-t-2xl">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="font-bold text-white uppercase tracking-wider">
              Executive Discovery Memo · 1-Page A4 PDF Specification
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="h-8 px-3.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Preview Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-950/40 flex justify-center">
          {/* Printable 1-Page Document Container */}
          <div 
            id="discovery-pdf-document"
            className="w-full max-w-[210mm] bg-white text-slate-900 shadow-xl rounded-lg p-6 sm:p-8 font-sans text-xs leading-tight print:p-0 print:shadow-none print:rounded-none print:w-full"
            style={{ minHeight: '297mm' }}
          >
            {/* Document Masthead */}
            <div className="border-b-2 border-slate-900 pb-3 mb-3 flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-black tracking-tight text-slate-950 font-serif">DHAGA &amp; CO.</span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                    · Executive Discovery Memo
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 tracking-tight">
                  The 31% Return Crisis: Root-Cause Attribution &amp; Autonomous Deflection
                </h1>
              </div>
              <div className="text-right font-mono text-[9px] text-slate-600 leading-tight">
                <div>DATE: OCTOBER 2026</div>
                <div>CLASSIFICATION: CONFIDENTIAL</div>
                <div>ENGAGEMENT: MINI PROJECT 1</div>
              </div>
            </div>

            {/* Core Problem Statement */}
            <div className="bg-slate-100 border-l-4 border-rose-600 p-2.5 mb-3 rounded-r">
              <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-rose-700 block mb-0.5">
                The Problem in One Sentence (in Client's Vocabulary):
              </span>
              <p className="text-[11px] text-slate-900 leading-snug font-serif italic">
                &ldquo;Dhaga &amp; Co. is bleeding ₹12.76 Crore annually because 31% of all shipments are returned—with 44% of reasons lost in an unread &lsquo;Other&rsquo; box driven by vendor sizing discrepancies across Tiruppur and Jaipur, while 26% of COD orders bounce back as RTO and 5,200 weekly WISMO inquiries overwhelm support agents with 9-hour delays.&rdquo;
              </p>
            </div>

            {/* 4 Core Financial & Volume KPI Tiles */}
            <div className="grid grid-cols-4 gap-2 mb-3 font-mono">
              <div className="border border-slate-300 rounded p-2 bg-slate-50">
                <span className="text-[9px] text-slate-500 uppercase block">Baseline Returns</span>
                <span className="text-base font-black text-rose-700 block">31.0%</span>
                <span className="text-[8px] text-slate-600">14,880 pkgs / wk</span>
              </div>
              <div className="border border-slate-300 rounded p-2 bg-slate-50">
                <span className="text-[9px] text-slate-500 uppercase block">COD RTO Rate</span>
                <span className="text-base font-black text-amber-700 block">26.0%</span>
                <span className="text-[8px] text-slate-600">On 61% COD GMV</span>
              </div>
              <div className="border border-slate-300 rounded p-2 bg-slate-50">
                <span className="text-[9px] text-slate-500 uppercase block">Unread "Other" Box</span>
                <span className="text-base font-black text-purple-700 block">44.0%</span>
                <span className="text-[8px] text-slate-600">Unanalyzed text</span>
              </div>
              <div className="border border-slate-300 rounded p-2 bg-slate-50">
                <span className="text-[9px] text-slate-500 uppercase block">Target Return Rate</span>
                <span className="text-base font-black text-emerald-700 block">&lt; 2-3%</span>
                <span className="text-[8px] text-emerald-700 font-bold">₹12.08 Cr max recovery</span>
              </div>
            </div>

            {/* Middle Section: Stakeholders & Arithmetic in 2 Columns */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Left Column: Stakeholder Ownership Today */}
              <div className="border border-slate-300 rounded p-2.5 bg-white">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 block border-b border-slate-200 pb-1 mb-1.5">
                  1. Internal Ownership &amp; Current Manual Workarounds
                </span>
                <div className="space-y-1.5 text-[10px] leading-tight">
                  <div>
                    <strong className="text-slate-900">Neha (Category Head):</strong>
                    <span className="text-slate-600"> Manually samples a few hundred free-text rows/wk. Cannot correlate returns to specific vendor cutting discrepancies between Tiruppur knits and Jaipur ethnicwear.</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Faizan (Head of Supply Chain):</strong>
                    <span className="text-slate-600"> Pays ₹120 flat reverse freight on 26% COD RTOs. Watches delivery slots burn without pre-dispatch address or buyer intent verification.</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Arpita (Head of Customer Support):</strong>
                    <span className="text-slate-600"> Employs 34 Freshdesk agents copy-pasting canned replies for 5,200 WISMO tickets/wk. 9-hour average response time.</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Dev (CTO) &amp; Ritu (CEO):</strong>
                    <span className="text-slate-600"> Repeat rate stuck at 22%. Dev's 16 engineers require deterministic rules, zero ML maintenance, and &lt;₹0.05/run cost.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Financial Arithmetic Verification */}
              <div className="border border-slate-300 rounded p-2.5 bg-white">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 block border-b border-slate-200 pb-1 mb-1.5">
                  2. Financial Unit Economics (Dev &amp; Faizan Math)
                </span>
                <div className="font-mono text-[9.5px] space-y-1 text-slate-800">
                  <div className="flex justify-between">
                    <span>Weekly Order Volume:</span>
                    <strong>48,000 orders/wk (~₹310 Cr GMV)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekly Return Volume:</span>
                    <strong className="text-rose-700">48,000 × 31% = 14,880 pkgs/wk</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Reverse Cost per Unit:</span>
                    <strong>₹120 freight + ₹45 handling = ₹165</strong>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1">
                    <span>Weekly Reverse Cost:</span>
                    <strong>14,880 × ₹165 = ₹24,55,200 / wk</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Return Loss:</span>
                    <strong className="text-rose-700">₹24.55L × 52 = ₹12.76 Crore / yr</strong>
                  </div>
                  <div className="flex justify-between bg-emerald-50 p-1 rounded border border-emerald-200 text-emerald-900 font-bold">
                    <span>Target ROI (&lt; 2-3%):</span>
                    <span>13,680 pkgs/wk saved = ₹12.08 Cr / yr Net</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ranked Problem Shortlist Table */}
            <div className="border border-slate-300 rounded mb-3 overflow-hidden">
              <div className="bg-slate-100 p-1.5 border-b border-slate-300 font-mono text-[10px] font-bold text-slate-900">
                3. Ranked Shortlist of Four Key Vulnerabilities (Defensible Prioritization)
              </div>
              <table className="w-full text-left text-[9.5px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono">
                  <tr>
                    <th className="py-1 px-2">#</th>
                    <th className="py-1 px-2">Problem Statement</th>
                    <th className="py-1 px-2">Owner</th>
                    <th className="py-1 px-2">Financial Cost</th>
                    <th className="py-1 px-2">Target Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {RANKED_PROBLEMS.map((prob) => (
                    <tr key={prob.rank} className={prob.rank === 1 ? 'bg-rose-50/50 font-medium' : ''}>
                      <td className="py-1 px-2 font-mono font-bold text-slate-900">0{prob.rank}</td>
                      <td className="py-1 px-2">{prob.title}</td>
                      <td className="py-1 px-2 font-mono">{prob.owner}</td>
                      <td className="py-1 px-2 font-mono text-rose-700 font-semibold">{prob.directCost}</td>
                      <td className="py-1 px-2 font-mono text-emerald-700 font-semibold">{prob.metric}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom 2 Columns: Falsification & Deterministic Code Boundary */}
            <div className="grid grid-cols-2 gap-3 text-[9.5px]">
              <div className="border border-slate-300 rounded p-2 bg-slate-50">
                <span className="font-mono font-bold text-[9px] uppercase tracking-wider text-purple-800 block mb-0.5">
                  Core Hypothesis &amp; Falsification Trigger
                </span>
                <p className="text-slate-700 leading-snug">
                  <strong>Hypothesis:</strong> Majority of 44% "Other" returns result from vendor sizing discrepancies (Jaipur bust cuts 2.1" smaller). Customers in Tier-2/3 accept 1-click doorstep exchange (+ ₹100 credit) over refund.<br />
                  <strong>Falsification:</strong> If &gt;60% cite subjective event regret or COD buyers reject exchange at &gt;85%.
                </p>
              </div>

              <div className="border border-slate-300 rounded p-2 bg-slate-50">
                <span className="font-mono font-bold text-[9px] uppercase tracking-wider text-cyan-800 block mb-0.5">
                  Code vs Model Line &amp; Compute Budget (Dev CTO)
                </span>
                <p className="text-slate-700 leading-snug">
                  <strong>Deterministic Code:</strong> Carrier selection (Delhivery/Ekart), SLA clocks, AWB dispatch, refund arithmetic (0 hallucinations).<br />
                  <strong>Gemini 3.8 Flash:</strong> Hinglish sentiment &amp; WhatsApp conversational exchange.<br />
                  <strong>Compute Budget:</strong> 5,220 calls/wk @ ₹0.04 = ₹208.80/wk. <strong>ROI Ratio: 2,400:1</strong>.
                </p>
              </div>
            </div>

            {/* Sign-off Strip */}
            <div className="mt-3 pt-2 border-t border-slate-300 flex justify-between items-center text-[8px] font-mono text-slate-500">
              <span>DHAGA &amp; CO. INTERNAL OPERATIONAL BLUEPRINT</span>
              <span>VERIFIED AGAINST 48,000 WEEKLY TRANSACTIONS</span>
              <span>PAGE 1 OF 1 (EXECUTIVE CONDENSED)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
