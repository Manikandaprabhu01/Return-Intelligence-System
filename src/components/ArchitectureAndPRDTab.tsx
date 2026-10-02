import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  Code2, 
  Calendar, 
  Cpu, 
  Database, 
  GitBranch, 
  CheckCircle2, 
  ChevronRight, 
  Copy, 
  Check, 
  ShieldCheck, 
  Server,
  Zap,
  Globe
} from 'lucide-react';

export const ArchitectureAndPRDTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'prd' | 'architecture' | 'api' | 'roadmap' | 'dev_handoff'>('prd');
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-xl font-bold text-white">PRD, System Design &amp; API Specifications</h1>
                <p className="text-xs text-slate-400">
                  Comprehensive engineering blueprints, OpenAPI contracts, and operational handoff architecture for Dhaga &amp; Co.
                </p>
              </div>
            </div>
          </div>

          {/* Sub Navigation & Export */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs">
              <button
                onClick={() => setActiveSubTab('prd')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeSubTab === 'prd' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                1. PRD Document
              </button>
              <button
                onClick={() => setActiveSubTab('architecture')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeSubTab === 'architecture' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                2. System Architecture
              </button>
              <button
                onClick={() => setActiveSubTab('api')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeSubTab === 'api' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                3. API &amp; Schema Specs
              </button>
              <button
                onClick={() => setActiveSubTab('roadmap')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeSubTab === 'roadmap' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                4. Phased Roadmap
              </button>
              <button
                onClick={() => setActiveSubTab('dev_handoff')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeSubTab === 'dev_handoff' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                5. Dev CTO Handoff
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
              title="Print or Save as PDF"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* SubTab 1: PRD Document */}
      {activeSubTab === 'prd' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-slate-200">
          <div className="border-b border-slate-800 pb-4 flex flex-wrap justify-between items-center gap-2">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">Product Requirements Document</span>
              <h2 className="text-2xl font-bold text-white mt-1">Project Dhaga-RetIntel: Enterprise Return Intelligence &amp; Agent Mesh</h2>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Status: <span className="text-emerald-400 font-bold">APPROVED FOR BUILD</span> • Version: 1.2
            </div>
          </div>

          {/* PRD Section 1: Executive Summary */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>1. Executive Summary &amp; Business Context</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dhaga &amp; Co. generates ~₹310 Crore GMV run-rate across 48,000 orders weekly. However, the business is constrained by a <strong>31% return rate (14,880 returned packages/week)</strong> and a <strong>26% Return to Origin (RTO) rate on Cash-On-Delivery orders (which constitute 61% of all revenue)</strong>. Reverse logistics directly consumes ₹12.76 Crore annually in pure courier freight and handling fees, while customer support handles 9,000 tickets weekly with 58% consumed by "Where is my order?" (WISMO) queries taking an average of 9 hours to answer.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              This system introduces an autonomous Return Intelligence mesh that unmasks the 44% "Other" return reasons into actionable sizing root causes, deploys real-time Hinglish conversational agents to deflect WISMO and replace refunds with doorstep size exchanges, and intercepts high-risk COD orders prior to dispatch.
            </p>
          </div>

          {/* PRD Section 2: OKRs */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>2. Core Objectives &amp; Key Results (OKRs)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60">
                <span className="text-cyan-400 font-bold block mb-1">OKR 1: Slash Return Rate</span>
                <p className="text-slate-300 font-medium">Reduce company-wide return rate from 31.0% to 24.5% (-6.5% pts) within 90 days of rollout, saving 3,120 reverse parcels weekly.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60">
                <span className="text-cyan-400 font-bold block mb-1">OKR 2: Deflect Support Overhead</span>
                <p className="text-slate-300 font-medium">Automate &gt;65% of the 5,220 weekly WISMO tickets with instantaneous carrier milestone lookup in natural Hinglish, dropping first response time from 9 hours to under 15 seconds.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60">
                <span className="text-cyan-400 font-bold block mb-1">OKR 3: Unmask Sizing Discrepancies</span>
                <p className="text-slate-300 font-medium">Categorize 100% of the 44% "Other" return reason text, attributing physical measurement flaws to specific vendors (Tiruppur vs Jaipur) with automated CAPA notices.</p>
              </div>
            </div>
          </div>

          {/* PRD Section 3: Target Personas */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>3. Target Personas &amp; Stakeholder Alignment</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-white block">Priya (Tier-3 Consumer, 24)</strong>
                <span className="text-slate-400 block mt-0.5">Buys kurtis on low-end Android handset. Speaks Hinglish. Wants fast exchange if chest is tight, without waiting 9 hours.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-white block">Neha (Category Head)</strong>
                <span className="text-slate-400 block mt-0.5">Wants automatic aggregation of 14,880 weekly return notes to know which vendor's patterns run small before Tuesday drops.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-white block">Faizan (Head of Supply Chain)</strong>
                <span className="text-slate-400 block mt-0.5">Wants pre-dispatch verification on COD orders to stop losing ₹120 on fake/refused parcels across Delhivery &amp; Ekart.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-white block">Dev (CTO)</strong>
                <span className="text-slate-400 block mt-0.5">Has 16 non-ML engineers. Requires zero ML maintenance, reliable fallback rules, transparent cost per run (&lt; ₹0.05), and Docker-ready code.</span>
              </div>
            </div>
          </div>

          {/* PRD Section 4: Functional Requirements */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>4. Functional Requirements (FRs)</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-850 border border-slate-700/60">
                <strong className="text-white">FR-1: Hinglish Autonomous CX Agent (Dhaga Saathi)</strong>
                <p className="mt-1">Must accept free-text queries via Gupshup WhatsApp &amp; Freshdesk API. Must classify intent (WISMO, Return, Exchange, Defect) with &gt;90% accuracy. Must provide exact multi-carrier status (Delhivery, Ekart, Shiprocket) and offer 1-click doorstep size exchange with ₹100 wallet credit prior to return authorization.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-850 border border-slate-700/60">
                <strong className="text-white">FR-2: Reverse Logistics Orchestrator</strong>
                <p className="mt-1">Must dynamically allocate the optimal reverse carrier based on pincode tier (Ekart for Tier-3, Delhivery/Shiprocket for Tier-1/2), route packages to nearest FC (Bhiwandi, Gurugram, Hyderabad), and generate reverse AWBs instantly.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-850 border border-slate-700/60">
                <strong className="text-white">FR-3: Return Reason Intelligence &amp; Review Extractor</strong>
                <p className="mt-1">Must parse unstructured return comments and 410,000 product reviews into 8 standardized defect taxonomies (Chest Tightness, Hip Ease, Fabric GSM, Color Variation, etc.) and calculate vendor fault probability.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-850 border border-slate-700/60">
                <strong className="text-white">FR-4: Pre-Dispatch COD Risk Interceptor</strong>
                <p className="mt-1">Must score COD orders at checkout. Orders scoring &gt;0.60 trigger automated WhatsApp confirmation and a ₹40 instant discount incentive to flip from COD to UPI/prepaid.</p>
              </div>
            </div>
          </div>

          {/* PRD Section 5: Non-Functional Requirements */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>5. Non-Functional Requirements (NFRs)</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
              <li><strong>P95 Latency:</strong> Sub-600ms for agent intent detection; sub-15ms for deterministic courier lookup.</li>
              <li><strong>Model Cost Efficiency:</strong> Average cost per execution must remain under ₹0.05 (Paise) using Gemini 3.8 Flash, yielding &gt;2,000:1 ROI against courier reverse costs.</li>
              <li><strong>Ground Rule Compliance:</strong> Fails visibly when intent confidence &lt; 0.65. Zero arithmetic or tracking ID generation done via LLMs (delegated strictly to deterministic code).</li>
              <li><strong>Scalability:</strong> Designed to process 48,000 orders/week with burst capacity for Tuesday/Friday collection drop spikes.</li>
            </ul>
          </div>
        </div>
      )}

      {/* SubTab 2: System Architecture */}
      {activeSubTab === 'architecture' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">System Architecture</span>
            <h2 className="text-2xl font-bold text-white mt-1">High-Level Event-Driven Agent Mesh</h2>
            <p className="text-xs text-slate-400 mt-1">
              End-to-end architecture bridging Dhaga's Postgres database, Unicommerce WMS, Gupshup WhatsApp, and Carrier APIs.
            </p>
          </div>

          {/* ASCII / Visual Flow Diagram */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed text-slate-300 shadow-inner">
            <div className="text-cyan-400 font-bold mb-3">// HIGH-LEVEL ARCHITECTURE FLOW</div>
            <pre>{`
  [ Customer / WhatsApp (Gupshup) / Android App (Mixpanel) / Freshdesk ]
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │   API Gateway Proxy   │ (Express / Cloud Run)
                     │  Rate Limiting & Auth │
                     └───────────┬───────────┘
                                 │
                                 ▼
            ┌─────────────────────────────────────────┐
            │       AGENT ORCHESTRATOR & ROUTER       │
            └────┬───────────────┬───────────────┬────┘
                 │               │               │
      [WISMO / Support]   [Return Reason]   [COD RTO Guard]
                 │               │               │
                 ▼               ▼               ▼
        ┌────────────────┐┌──────────────┐┌───────────────┐
        │  Agent 1 (CX)  ││ Agent 3 (NLP)││ Agent 4 (RTO) │
        │  Dhaga Saathi  ││ Reason Intel ││ COD Verifier │
        └────────┬───────┘└──────┬───────┘└───────┬───────┘
                 │               │                │
                 └───────────────┼────────────────┘
                                 │
                                 ▼
                ┌─────────────────────────────────┐
                │        TWO-MODEL GATEWAY        │
                │  - Gemini 3.8 Flash (Structured)│
                │  - Deterministic Rule Engine    │
                │  - Confidence Guardrail (<0.65) │
                └────────────────┬────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
    ┌───────────────────────────┐  ┌───────────────────────────┐
    │     DATA & STATE STORE    │  │    LOGISTICS & CARRIERS   │
    │ - Postgres (Orders/SKUs)  │  │ - Delhivery Carrier API   │
    │ - Metabase Read-Replica   │  │ - Shiprocket / Ekart API  │
    │ - Unicommerce WMS Sync    │  │ - Bhiwandi / Gurugram FC  │
    └───────────────────────────┘  └───────────────────────────┘
`}</pre>
          </div>

          {/* Detailed Component Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-850 p-5 rounded-xl border border-slate-700/60 space-y-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                <Server className="w-4 h-4" />
                <span>Deterministic Code vs. Model Line</span>
              </div>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="pb-2">Function</th>
                    <th className="pb-2">Execution Engine</th>
                    <th className="pb-2">Justification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-[11px]">
                  <tr>
                    <td className="py-2 text-white font-medium">Tracking Status Lookup</td>
                    <td className="py-2 text-emerald-400 font-mono">Deterministic API</td>
                    <td className="py-2 text-slate-400">Exact carrier milestones, zero hallucinations.</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white font-medium">Hinglish Intent Extraction</td>
                    <td className="py-2 text-indigo-400 font-mono">Gemini 3.8 Flash</td>
                    <td className="py-2 text-slate-400">Handles vernacular slang, typos, mixed Hindi-English.</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white font-medium">Reverse Courier Allocation</td>
                    <td className="py-2 text-emerald-400 font-mono">Deterministic Matrix</td>
                    <td className="py-2 text-slate-400">Tier-3 pin code routing rules are fixed SLAs.</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white font-medium">Review &amp; 'Other' NLP</td>
                    <td className="py-2 text-indigo-400 font-mono">Gemini 3.8 Flash</td>
                    <td className="py-2 text-slate-400">Maps free-text into 8 canonical root causes.</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-white font-medium">Refund / Incentive Math</td>
                    <td className="py-2 text-emerald-400 font-mono">Deterministic Math</td>
                    <td className="py-2 text-slate-400">Never let an LLM do financial arithmetic.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-850 p-5 rounded-xl border border-slate-700/60 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Architectural Guardrails &amp; Failure Modes</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-rose-300 block">Evaluator-Optimizer Confidence Filter:</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    If intent confidence score drops below 0.65 or if the query contains contradictory policy statements, the request is flagged with <code className="text-rose-400">status: ESCALATED</code> and routed to a human Freshdesk supervisor within 45 seconds.
                  </p>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-amber-300 block">Carrier API Timeout Fallback:</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    If Delhivery or Ekart webhook times out (&gt;1.5s), the agent serves cached Unicommerce status and triggers an asynchronous background sync rather than stalling the user.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: API & Schema Specs */}
      {activeSubTab === 'api' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">API Specifications</span>
            <h2 className="text-2xl font-bold text-white mt-1">OpenAPI 3.0 Production Endpoints</h2>
            <p className="text-xs text-slate-400 mt-1">
              Fully typed JSON contracts for integration with Gupshup, Freshdesk, and internal microservices.
            </p>
          </div>

          <div className="space-y-4">
            {/* Endpoint 1 */}
            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">POST</span>
                  <code className="text-xs font-mono font-bold text-white">/api/agent/support</code>
                  <span className="text-xs text-slate-400">— Customer Service &amp; WISMO Deflection</span>
                </div>
                <button
                  onClick={() => handleCopy(`curl -X POST https://api.dhaga.co/api/agent/support -H "Content-Type: application/json" -d '{"customerQuery": "Mera order kahan hai?", "orderId": "DH-89241"}'`, 'ep1')}
                  className="text-[11px] flex items-center space-x-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  {copiedEndpoint === 'ep1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEndpoint === 'ep1' ? 'Copied cURL' : 'Copy cURL'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px] font-mono">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">// Request Body Schema</span>
                  <pre className="text-cyan-300 overflow-x-auto">{`{
  "customerQuery": "string (Hinglish/English)",
  "orderId": "DH-89241",
  "customerPhone": "+91 98765 43210"
}`}</pre>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">// Validated Structured Response</span>
                  <pre className="text-emerald-300 overflow-x-auto">{`{
  "detectedIntent": "WISMO" | "SIZE_EXCHANGE",
  "replyHinglish": "Namaste Priya ji...",
  "recommendedAction": "OFFER_INSTANT_EXCHANGE",
  "confidenceScore": 0.96,
  "exchangeOfferDetails": {
    "eligible": true,
    "suggestedSize": "L",
    "instantIncentive": "₹100 Wallet Bonus"
  }
}`}</pre>
                </div>
              </div>
            </div>

            {/* Endpoint 2 */}
            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">POST</span>
                  <code className="text-xs font-mono font-bold text-white">/api/agent/returns-intelligence</code>
                  <span className="text-xs text-slate-400">— "Other" Box NLP Extractor</span>
                </div>
                <button
                  onClick={() => handleCopy(`curl -X POST https://api.dhaga.co/api/agent/returns-intelligence -H "Content-Type: application/json" -d '{"customerReasonText": "chest pe tight hai", "sku": "KURTI-ANARK-BL-M"}'`, 'ep2')}
                  className="text-[11px] flex items-center space-x-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  {copiedEndpoint === 'ep2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEndpoint === 'ep2' ? 'Copied cURL' : 'Copy cURL'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px] font-mono">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">// Request Body Schema</span>
                  <pre className="text-cyan-300 overflow-x-auto">{`{
  "customerReasonText": "string",
  "sku": "KURTI-ANARK-BL-M",
  "vendorId": "VEND-014"
}`}</pre>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-1">// Structured Output Schema</span>
                  <pre className="text-emerald-300 overflow-x-auto">{`{
  "canonicalCategory": "FIT_CHEST_BUST_TIGHT",
  "rootCauseSummary": "Upper bodice tight",
  "vendorFaultProbability": 90,
  "specificMeasurementDiscrepancy": "-2.1 inches",
  "suggestedCorrectiveAction": "Audit Vendor 14"
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: Phased Roadmap */}
      {activeSubTab === 'roadmap' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">Execution Plan</span>
            <h2 className="text-2xl font-bold text-white mt-1">14-Week Phased Implementation Roadmap</h2>
            <p className="text-xs text-slate-400 mt-1">
              Pragmatic deployment plan structured around Dhaga &amp; Co.'s 16-person engineering capacity.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-850 border border-cyan-500/40 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-cyan-300 uppercase tracking-wider">Phase 1: Weeks 1-2 • Immediate Support &amp; WISMO Relief</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">Sprint 1</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Deploy Dhaga Saathi agent onto Freshdesk &amp; Gupshup WhatsApp line for 58% WISMO inquiries.</li>
                <li>Connect read-only live webhooks for Delhivery, Shiprocket, and Ekart tracking status.</li>
                <li><strong>Deliverable:</strong> First response time drops from 9 hours to 15 seconds; deflecting ~3,500 tickets/week.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-indigo-300 uppercase tracking-wider">Phase 2: Weeks 3-6 • Doorstep Exchange &amp; Return Intelligence</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">Sprint 2-3</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Launch 1-click doorstep size exchange in-app + ₹100 instant wallet incentive before initiating refund.</li>
                <li>Ingest the 44% "Other" return comments + 410k historical reviews into Gemini 3.8 Flash pipeline.</li>
                <li><strong>Deliverable:</strong> First 2.5% reduction in return rate; saves ₹1 Crore in annualized courier cost.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-300 uppercase tracking-wider">Phase 3: Weeks 7-10 • Vendor Inbound QC &amp; Sizing Harmonization</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">Sprint 4-5</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Audit 40 vendors; establish +/- 0.5" measurement tolerances at Bhiwandi &amp; Gurugram receiving.</li>
                <li>Auto-generate Sizing Advisory badges on product listings ("Runs 1 size small").</li>
                <li><strong>Deliverable:</strong> Elimination of Jaipur vs Tiruppur sizing chaos; catalog drop turnaround drops to 3 days.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-300 uppercase tracking-wider">Phase 4: Weeks 11-14 • COD RTO Interceptor &amp; Scale</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Sprint 6-7</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Activate pre-dispatch COD WhatsApp verification; offer ₹40 cashback for switching to UPI.</li>
                <li>Achieve steady-state 24.5% overall return rate (-6.5% pts) and 16.5% COD RTO rate.</li>
                <li><strong>Deliverable:</strong> ₹3.18 Crore annual cash savings unlocked; repeat rate scales toward 30%.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 5: Dev CTO Handoff */}
      {activeSubTab === 'dev_handoff' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs uppercase font-mono tracking-wider text-rose-400 font-bold">Operations Guide</span>
            <h2 className="text-2xl font-bold text-white mt-1">Dev CTO's "Monday Morning" Runbook</h2>
            <p className="text-xs text-slate-400 mt-1">
              "Sixteen engineers, none of them an ML engineer. Whatever you build, somebody here has to run it on the Monday after you leave." — Dev, CTO
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <span className="font-bold text-white block">1. Zero ML Engineering Maintenance:</span>
              <p className="leading-relaxed">
                The entire intelligence system runs as a standard Node.js/TypeScript microservice using Gemini 3.8 Flash SDK via standard REST calls. There are no PyTorch models to train, no GPU servers to provision, and no vector database indexing pipelines to babysit. Any full-stack or backend engineer on Dev's team can debug or deploy it.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <span className="font-bold text-white block">2. Standard Docker / Cloud Run Deployment:</span>
              <p className="leading-relaxed">
                Containerized in a single lightweight Docker container. Scales to zero when traffic is low, and scales horizontally automatically during Tuesday &amp; Friday collection drop traffic spikes. Configured via simple environment variables in <code className="text-cyan-300">.env</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <span className="font-bold text-white block">3. When the Agent Fails or Confidence &lt; 0.65:</span>
              <p className="leading-relaxed">
                The system fails visibly and cleanly. A Freshdesk ticket is automatically created with the full JSON context and assigned to the Tier-2 Support queue. The agent never makes up a fake tracking number or promises an out-of-stock exchange size.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/60 space-y-2">
              <span className="font-bold text-white block">4. Financial Monitoring Alert:</span>
              <p className="leading-relaxed">
                A weekly Slack webhook alerts Dev if total API compute cost exceeds ₹500/week (standard expectation is ~₹210/week for 5,200 WISMO runs), ensuring 100% predictability for Dhaga &amp; Co.'s unit economics.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
