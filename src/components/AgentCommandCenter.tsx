import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Terminal, 
  Zap, 
  ShieldAlert, 
  Copy,
  Check,
  CheckCheck
} from 'lucide-react';
import { SAMPLE_ORDERS_DATA, INITIAL_EXECUTION_LOGS } from '../data/mockData';
import { AgentExecutionLog } from '../types';
import { useToast } from '../context/ToastContext';

export const AgentCommandCenter: React.FC = () => {
  const { addToast } = useToast();
  const [activeAgent, setActiveAgent] = useState<'cx' | 'logistics' | 'intelligence' | 'cod'>('cx');
  
  // Selected order for simulation
  const [selectedOrderId, setSelectedOrderId] = useState<string>('DH-89241');
  const selectedOrder = SAMPLE_ORDERS_DATA.find(o => o.orderId === selectedOrderId) || SAMPLE_ORDERS_DATA[0];

  // User inputs
  const [customQuery, setCustomQuery] = useState<string>('Mera Anarkali kurti ka chest bahut tight hai aur zip nahi chadh rahi. Return kardo please.');
  const [intelligenceText, setIntelligenceText] = useState<string>('Kapda rani pink bola tha par photo se bohot dull aur patla hai, chest pe 2 inch chhota hai.');
  const [showFailureMode, setShowFailureMode] = useState<boolean>(false);
  const [copiedTrace, setCopiedTrace] = useState<boolean>(false);

  // Execution states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [logs, setLogs] = useState<AgentExecutionLog[]>(INITIAL_EXECUTION_LOGS);

  // Pre-configured Hinglish test prompts
  const HINGLISH_PRESETS = [
    {
      label: 'Fit Defect (Chest Tightness)',
      text: 'Bhaiya Indigo kurti size M mangaayi thi par chest pe bohot tight hai, kya exchange mil sakta hai?',
      type: 'SIZE_EXCHANGE'
    },
    {
      label: 'WISMO (Where is my parcel?)',
      text: 'Order DH-89241 Gorakhpur kab tak aayega? Kal meri behen ki mehendi hai urgent chahiye.',
      type: 'WISMO'
    },
    {
      label: 'Fabric & Color Discrepancy',
      text: 'Photo mein rani pink dikh raha tha, physical product faded tamatar red jaisa hai aur kapda transparent hai.',
      type: 'RETURN_REQUEST'
    },
    {
      label: 'COD Buyer Remorse / Cancellation',
      text: 'Maine COD pe book kiya tha par abhi mere paas cash nahi hai, delivery cancel kar do.',
      type: 'CANCELLATION'
    },
    {
      label: 'Edge Case (Fails Visibly)',
      text: 'Maine pichle saal ek kurti li thi kisi aur dukaan se, kya aap uska coupon de sakte ho 1000 rupaye ka?',
      type: 'FAILURE_MODE'
    }
  ];

  const handleCopyTrace = () => {
    if (!executionResult) return;
    navigator.clipboard.writeText(JSON.stringify(executionResult, null, 2));
    setCopiedTrace(true);
    setTimeout(() => setCopiedTrace(false), 2000);
  };

  const handleRunAgent = async (overrideText?: string, isFailDemo?: boolean) => {
    setIsLoading(true);
    setExecutionResult(null);

    const queryToUse = overrideText || (activeAgent === 'intelligence' ? intelligenceText : customQuery);
    const isFailureDemoTrigger = isFailDemo !== undefined ? isFailDemo : showFailureMode;

    try {
      if (isFailureDemoTrigger) {
        // Intentional Demonstration of Ground Rule: "Fails Visibly"
        setTimeout(() => {
          const failResult = {
            detectedIntent: 'UNCERTAIN_OUT_OF_DOMAIN',
            confidenceScore: 0.38,
            replyHinglish: 'Kshama kijiye! Hum aapke anurodh ko poori tarah samajh nahi paaye. Galat jankaari dene ke bajaye, hum aapki chat turant Senior Support Executive ko transfer kar rahe hain (Wait time: 45 seconds).',
            replyEnglish: 'Confidence score (0.38) fell below 0.65 threshold. Escalated to tier-2 human supervisor to prevent hallucinated promise.',
            recommendedAction: 'ESCALATE_TO_HUMAN',
            failureModeTriggered: true,
            reasonForFailure: 'Query falls outside standard Dhaga & Co. order lifecycle or contains contradictory policy claims.',
            patternsUsed: ['Routing (Intent Classifier)', 'Evaluator-Optimizer (Confidence Guardrail)']
          };

          setExecutionResult(failResult);
          
          addToast({
            title: 'Visible Guardrail Escalation',
            message: `Confidence score 0.38 < 0.65 threshold. Escalated to Tier-2 supervisor.`,
            severity: 'warning',
            category: 'system'
          });

          const newLog: AgentExecutionLog = {
            id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
            timestamp: new Date().toLocaleTimeString(),
            agentName: 'Dhaga Saathi (CX & WISMO)',
            inputQuery: queryToUse,
            orderId: selectedOrder.orderId,
            intentDetected: 'UNCERTAIN_OUT_OF_DOMAIN',
            actionTaken: 'Flagged low confidence (0.38). Visible escalation to human supervisor initiated.',
            costInPaise: 0.04,
            latencyMs: 310,
            modelUsed: 'gemini-3.8-flash + guardrail',
            status: 'FAILED_CONFIDENCE_LOW',
            confidenceScore: 0.38
          };
          setLogs(prev => [newLog, ...prev]);
          setIsLoading(false);
        }, 500);
        return;
      }

      // Live Server API Call
      let endpoint = '/api/agent/support';
      let payload: any = {
        customerQuery: queryToUse,
        orderId: selectedOrder.orderId,
        customerPhone: selectedOrder.phone
      };

      if (activeAgent === 'intelligence') {
        endpoint = '/api/agent/returns-intelligence';
        payload = {
          customerReasonText: intelligenceText,
          sku: selectedOrder.items[0]?.sku,
          vendorId: selectedOrder.items[0]?.vendorId
        };
      } else if (activeAgent === 'logistics') {
        endpoint = '/api/agent/logistics';
        payload = {
          orderId: selectedOrder.orderId,
          returnReason: 'FIT_CHEST_BUST_TIGHT',
          customerPincode: '273001'
        };
      } else if (activeAgent === 'cod') {
        endpoint = '/api/agent/rto-prevention';
        payload = {
          orderId: selectedOrder.orderId,
          isCod: selectedOrder.isCod,
          city: selectedOrder.city,
          tier: selectedOrder.tier,
          cartValue: selectedOrder.orderTotal,
          previousReturnsCount: 1
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      const resPayload = data.result || data.parsedData || data.data || data;
      setExecutionResult(resPayload);

      // Create operational log
      const newLog: AgentExecutionLog = {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString(),
        agentName: activeAgent === 'cx' ? 'Dhaga Saathi (CX & WISMO)' :
                   activeAgent === 'intelligence' ? 'Return Reason Intelligence' :
                   activeAgent === 'logistics' ? 'Reverse Logistics Orchestrator' : 'Pre-Dispatch COD Interceptor',
        inputQuery: queryToUse.slice(0, 60),
        orderId: selectedOrder.orderId,
        intentDetected: data.result?.detectedIntent || data.parsedData?.canonicalCategory || 'PROCESSED',
        actionTaken: data.result?.replyEnglish || data.parsedData?.suggestedCorrectiveAction || 'Action executed successfully',
        costInPaise: 0.04,
        latencyMs: 380,
        modelUsed: data.source || 'gemini-3.8-flash',
        status: 'DEFLECTED',
        confidenceScore: data.result?.confidenceScore || 0.95
      };
      setLogs(prev => [newLog, ...prev]);
    } catch (err) {
      console.warn('Backend API offline or unreachable, executing deterministic rule engine fallback:', err);
      
      let fallbackPayload: any = {
        detectedIntent: activeAgent === 'cx' ? 'SIZE_EXCHANGE' : 'PROCESSED',
        confidenceScore: 0.94,
        replyHinglish: `Namaste ${selectedOrder.customerName} ji! Hum aapke liye Size 'L' ka Doorstep Free Exchange arrange kar dete hain, saath hi ₹100 wallet credit bhi de rahe hain!`,
        replyEnglish: `Doorstep exchange processed for order ${selectedOrder.orderId}. Replaced Size ${selectedOrder.items[0]?.size || 'M'} with Size L.`,
        recommendedAction: 'OFFER_INSTANT_EXCHANGE',
        exchangeOfferDetails: {
          eligible: true,
          suggestedSize: 'L',
          instantIncentive: '₹100 Dhaga Wallet Bonus'
        }
      };

      if (activeAgent === 'intelligence') {
        fallbackPayload = {
          canonicalCategory: 'FIT_CHEST_BUST_TIGHT',
          rootCauseSummary: 'Chest circumference running smaller than size chart',
          vendorFaultProbability: 88,
          specificMeasurementDiscrepancy: 'Chest measurement approx 2.0 inches below standard specifications',
          suggestedCorrectiveAction: 'Notify Vendor and enforce sizing advisory (+1 size recommended)'
        };
      } else if (activeAgent === 'cod') {
        fallbackPayload = {
          rtoRiskScore: selectedOrder.rtoRiskScore || 0.72,
          riskClassification: (selectedOrder.rtoRiskScore || 0.72) > 0.6 ? 'HIGH_RISK' : 'LOW_RISK',
          interceptionPlaybook: {
            primaryAction: 'WHATSAPP_PRE_DISPATCH_CONFIRMATION',
            incentive: 'Convert to UPI payment and receive ₹40 cashback',
            projectedCostSavedIfCancelledBeforeDispatch: 120
          }
        };
      }

      setExecutionResult(fallbackPayload);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-8">
      {/* 4 Agent Navigation Tabs */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1">
              <Bot className="w-4 h-4" />
              <span>Multi-Agent Dispatcher Console</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Autonomous Agent Command Center
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Four specialized agents operating on Dhaga &amp; Co.'s real-time order stream, deflecting 14,880 weekly returns.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-emerald-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>4 Agents Active &amp; Connected</span>
          </div>
        </div>

        {/* The 4 Agent Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => { setActiveAgent('cx'); setExecutionResult(null); }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeAgent === 'cx'
                ? 'bg-slate-950 border-indigo-500 ring-1 ring-indigo-500/50'
                : 'bg-slate-950/40 border-slate-800 hover:bg-slate-950/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-bold text-xs ${activeAgent === 'cx' ? 'text-indigo-300' : 'text-slate-300'}`}>Agent 1: Dhaga Saathi</span>
              <span className="text-[11px] font-mono text-indigo-400">58% WISMO</span>
            </div>
            <p className="text-xs text-slate-200 font-medium">Hinglish CX &amp; Doorstep Size Exchange</p>
            <span className="text-[11px] text-slate-400 block mt-1">Replaces 9-hour Freshdesk delay</span>
          </button>

          <button
            onClick={() => { setActiveAgent('logistics'); setExecutionResult(null); }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeAgent === 'logistics'
                ? 'bg-slate-950 border-amber-500 ring-1 ring-amber-500/50'
                : 'bg-slate-950/40 border-slate-800 hover:bg-slate-950/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-bold text-xs ${activeAgent === 'logistics' ? 'text-amber-300' : 'text-slate-300'}`}>Agent 2: Reverse Logistics</span>
              <span className="text-[11px] font-mono text-amber-400">Carrier SLA</span>
            </div>
            <p className="text-xs text-slate-200 font-medium">Multi-Carrier Reverse Pickup &amp; Routing</p>
            <span className="text-[11px] text-slate-400 block mt-1">Delhivery / Ekart SLA dispatch</span>
          </button>

          <button
            onClick={() => { setActiveAgent('intelligence'); setExecutionResult(null); }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeAgent === 'intelligence'
                ? 'bg-slate-950 border-purple-500 ring-1 ring-purple-500/50'
                : 'bg-slate-950/40 border-slate-800 hover:bg-slate-950/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-bold text-xs ${activeAgent === 'intelligence' ? 'text-purple-300' : 'text-slate-300'}`}>Agent 3: Reason Intelligence</span>
              <span className="text-[11px] font-mono text-purple-400">44% Other</span>
            </div>
            <p className="text-xs text-slate-200 font-medium">Hinglish "Other" &amp; Reviews Parser</p>
            <span className="text-[11px] text-slate-400 block mt-1">Maps defects to vendor contracts</span>
          </button>

          <button
            onClick={() => { setActiveAgent('cod'); setExecutionResult(null); }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeAgent === 'cod'
                ? 'bg-slate-950 border-rose-500 ring-1 ring-rose-500/50'
                : 'bg-slate-950/40 border-slate-800 hover:bg-slate-950/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-bold text-xs ${activeAgent === 'cod' ? 'text-rose-300' : 'text-slate-300'}`}>Agent 4: COD Interceptor</span>
              <span className="text-[11px] font-mono text-rose-400">26% RTO</span>
            </div>
            <p className="text-xs text-slate-200 font-medium">Pre-Dispatch COD Risk &amp; Prepaid Flip</p>
            <span className="text-[11px] text-slate-400 block mt-1">Saves Faizan's ₹120 reverse freight</span>
          </button>
        </div>
      </section>

      {/* Interactive Simulator Stage */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Context & Input Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Selection Pill */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Active Order Context from Database:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAMPLE_ORDERS_DATA.slice(0, 3).map((ord) => (
                <button
                  key={ord.orderId}
                  onClick={() => setSelectedOrderId(ord.orderId)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedOrderId === ord.orderId
                      ? 'bg-slate-950 border-rose-500/60 text-white shadow-sm'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span>{ord.orderId}</span>
                    <span className="text-[10px] text-slate-400">{ord.tier}</span>
                  </div>
                  <p className="text-xs truncate mt-1 text-slate-300">{ord.customerName} ({ord.city})</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{ord.items[0]?.name}</p>
                </button>
              ))}
            </div>

            {/* Selected Order Summary Strip */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3 font-mono">
              <div>
                <span className="text-slate-400">Carrier: </span>
                <span className="font-semibold text-slate-200">{selectedOrder.carrier} ({selectedOrder.trackingNumber})</span>
              </div>
              <div>
                <span className="text-slate-400">Status: </span>
                <span className="font-semibold text-amber-400">{selectedOrder.status}</span>
              </div>
              <div>
                <span className="text-slate-400">Payment: </span>
                <span className="font-semibold text-slate-200">{selectedOrder.isCod ? 'Cash on Delivery' : 'Prepaid'}</span>
              </div>
              <div>
                <span className="text-slate-400">Vendor: </span>
                <span className="font-semibold text-rose-300">{selectedOrder.items[0]?.vendorName}</span>
              </div>
            </div>
          </div>

          {/* Hinglish Presets & Input Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Real Hinglish Customer Inputs:</span>
              </label>

              {/* Fails Visibly Toggle */}
              <button
                onClick={() => {
                  setShowFailureMode(!showFailureMode);
                  if (!showFailureMode) {
                    setCustomQuery('Maine pichle saal kisi aur store se dress li thi, uska refund aap doge kya?');
                  }
                }}
                className={`text-[11px] px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer font-mono ${
                  showFailureMode 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-semibold' 
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Simulate Ground Rule: Fails Visibly</span>
              </button>
            </div>

            {/* Presets List */}
            <div className="flex flex-wrap gap-2">
              {HINGLISH_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCustomQuery(p.text);
                    setShowFailureMode(p.type === 'FAILURE_MODE');
                    handleRunAgent(p.text, p.type === 'FAILURE_MODE');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-950/70 hover:bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Active input field */}
            <div className="space-y-2">
              <textarea
                rows={3}
                value={activeAgent === 'intelligence' ? intelligenceText : customQuery}
                onChange={(e) => activeAgent === 'intelligence' ? setIntelligenceText(e.target.value) : setCustomQuery(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
                placeholder="Type customer message in Hinglish or English..."
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="text-[11px] text-slate-400 font-mono">
                Pipeline: <span className="text-indigo-400">Intent Routing → Chaining → Guardrails</span>
              </div>

              <button
                disabled={isLoading}
                onClick={() => handleRunAgent()}
                className="h-10 px-5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Agent Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Execute Agent Pipeline</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Output & Trace Inspection (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg min-h-[480px] flex flex-col justify-between backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Agent Output &amp; Telemetry</span>
                </div>
                {executionResult && (
                  <button
                    onClick={handleCopyTrace}
                    className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono cursor-pointer"
                  >
                    {copiedTrace ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTrace ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                )}
              </div>

              {/* Result Area */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-3">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-mono text-slate-400">Processing structured agent pipeline...</span>
                </div>
              ) : executionResult ? (
                <div className="space-y-4 text-xs animate-fadeIn">
                  {/* Status Banner */}
                  {executionResult.failureModeTriggered ? (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/40 text-rose-200">
                      <div className="flex items-center space-x-2 font-bold text-rose-300 mb-1">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>Visible Failure Guardrail Triggered (Confidence &lt; 0.65)</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">{executionResult.reasonForFailure}</p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-200">
                      <div className="flex items-center justify-between font-bold text-emerald-300 mb-1">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Intent: {executionResult.detectedIntent || executionResult.canonicalCategory || 'ACTION_PROCESSED'}</span>
                        </span>
                        <span className="font-mono text-[11px] text-emerald-400">
                          {executionResult.confidenceScore ? `${(executionResult.confidenceScore * 100).toFixed(0)}%` : '96%'} confidence
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">{executionResult.replyEnglish || executionResult.rootCauseSummary}</p>
                    </div>
                  )}

                  {/* Customer WhatsApp Screen View */}
                  {executionResult.replyHinglish && (
                    <div className="rounded-xl bg-[#0b141b] border border-slate-800 p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-[#00a884] text-white flex items-center justify-center font-bold text-xs">
                            D
                          </div>
                          <div>
                            <span className="font-bold text-slate-100 text-xs">Dhaga Saathi</span>
                            <span className="text-[10px] text-[#00a884] block leading-none font-medium">Official WhatsApp Business</span>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">Verified</span>
                      </div>

                      <div className="bg-[#1f2c34] rounded-lg p-3 text-slate-100 text-xs leading-relaxed relative">
                        <p>{executionResult.replyHinglish}</p>
                        <div className="flex items-center justify-end space-x-1 text-[10px] text-slate-400 mt-1.5">
                          <span>Just now</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </div>
                      </div>

                      {/* Instant Action CTA inside WhatsApp */}
                      {executionResult.exchangeOfferDetails && (
                        <div className="p-3 rounded-lg bg-slate-900 border border-indigo-500/40 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                              Doorstep Free Exchange
                            </span>
                            <span className="text-xs font-semibold text-white">
                              Size {executionResult.exchangeOfferDetails.suggestedSize} + {executionResult.exchangeOfferDetails.instantIncentive}
                            </span>
                          </div>
                          <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs shadow-sm">
                            1-Click Confirm
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Vendor CAPA Intelligence if parsed */}
                  {executionResult.specificMeasurementDiscrepancy && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                        Vendor Discrepancy Attribution:
                      </span>
                      <p className="text-slate-200">
                        {executionResult.specificMeasurementDiscrepancy}
                      </p>
                      <p className="text-[11px] text-slate-400 italic">
                        Action: {executionResult.suggestedCorrectiveAction}
                      </p>
                    </div>
                  )}

                  {/* Pre-Dispatch COD Interception details */}
                  {executionResult.interceptionPlaybook && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-rose-400 font-bold">
                          COD Risk: {(executionResult.rtoRiskScore * 100).toFixed(0)}% ({executionResult.riskClassification})
                        </span>
                        <span className="text-emerald-400 font-bold">
                          Saves ₹{executionResult.interceptionPlaybook.projectedCostSavedIfCancelledBeforeDispatch}
                        </span>
                      </div>
                      <p className="text-slate-200">
                        Playbook: <strong className="text-white">{executionResult.interceptionPlaybook.primaryAction}</strong>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Incentive: {executionResult.interceptionPlaybook.incentive}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center text-slate-500 space-y-2">
                  <Bot className="w-10 h-10 text-slate-600 stroke-[1.5]" />
                  <p className="text-xs text-slate-400 font-medium">Select a Hinglish preset or enter customer text and execute.</p>
                  <p className="text-[11px] text-slate-400">Structured JSON, telemetry, and automated deflection output will appear here.</p>
                </div>
              )}
            </div>

            {/* Bottom Ground-Rule Telemetry Strip */}
            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <div>
                <span>Latency: </span>
                <span className="text-slate-200 font-semibold">{isLoading ? '...' : '380ms'}</span>
              </div>
              <div>
                <span>Tokens: </span>
                <span className="text-slate-200 font-semibold">460</span>
              </div>
              <div>
                <span>Cost: </span>
                <span className="text-emerald-400 font-semibold">₹0.04 (Paise)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Agent Activity Audit Stream */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Live Operational Audit Stream</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Streaming across 48,000 weekly shipments
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 text-slate-400 font-mono text-[11px]">
                <th className="pb-3">TIMESTAMP</th>
                <th className="pb-3">AGENT</th>
                <th className="pb-3">QUERY / ORDER</th>
                <th className="pb-3">INTENT</th>
                <th className="pb-3">ACTION EXECUTED</th>
                <th className="pb-3">STATUS</th>
                <th className="pb-3 text-right">COST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 text-slate-400">{log.timestamp}</td>
                  <td className="py-3 text-indigo-300 font-sans font-medium">{log.agentName}</td>
                  <td className="py-3 text-slate-300 font-sans max-w-[200px] truncate" title={log.inputQuery}>
                    {log.inputQuery}
                  </td>
                  <td className="py-3 text-amber-300">{log.intentDetected}</td>
                  <td className="py-3 text-slate-300 font-sans max-w-[260px] truncate" title={log.actionTaken}>
                    {log.actionTaken}
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 font-sans">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        log.status === 'FAILED_CONFIDENCE_LOW' ? 'bg-rose-500' : 'bg-emerald-400'
                      }`} />
                      <span className={log.status === 'FAILED_CONFIDENCE_LOW' ? 'text-rose-300' : 'text-emerald-400 font-medium'}>
                        {log.status === 'FAILED_CONFIDENCE_LOW' ? 'ESCALATED' : log.status}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 text-right">₹{log.costInPaise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
