import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  RefreshCw, 
  Cpu, 
  Terminal, 
  Zap, 
  ShieldAlert, 
  Truck,
  RotateCcw,
  Tag,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { SAMPLE_ORDERS_DATA, INITIAL_EXECUTION_LOGS } from '../data/mockData';
import { AgentExecutionLog, OrderRecord } from '../types';
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

  // Execution states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [logs, setLogs] = useState<AgentExecutionLog[]>(INITIAL_EXECUTION_LOGS);

  // Pre-configured Hinglish test prompts
  const HINGLISH_PRESETS = [
    {
      label: 'Fit Issue (Chest Tightness)',
      text: 'Bhaiya Indigo kurti size M mangaayi thi par chest pe bohot tight hai, kya exchange mil sakta hai?',
      type: 'SIZE_EXCHANGE'
    },
    {
      label: 'WISMO (Where is my order?)',
      text: 'Order DH-89241 Gorakhpur kab tak aayega? Kal meri behen ki mehendi hai urgent chahiye.',
      type: 'WISMO'
    },
    {
      label: 'Fabric & Color Discrepancy',
      text: 'Photo mein rani pink dikh raha tha, physical product faded tamatar red jaisa hai aur kapda transparent hai.',
      type: 'RETURN_REQUEST'
    },
    {
      label: 'COD Buyer Remorse',
      text: 'Maine COD pe book kiya tha par abhi mere paas cash nahi hai, delivery cancel kar do.',
      type: 'CANCELLATION'
    },
    {
      label: 'Edge Case / Low Confidence (Fails Visibly)',
      text: 'Maine pichle saal ek kurti li thi kisi aur dukaan se, kya aap uska coupon de sakte ho 1000 rupaye ka?',
      type: 'FAILURE_MODE'
    }
  ];

  const handleRunAgent = async (overrideText?: string, isFailDemo?: boolean) => {
    setIsLoading(true);
    setExecutionResult(null);

    const queryToUse = overrideText || customQuery;
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
            title: '⚠️ Visible Guardrail: Escalated to Human',
            message: `Confidence score 0.38 < 0.65 threshold. Escalated to Tier-2 CX supervisor to prevent hallucination.`,
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

      // Contextual Toast Alerts
      if (data.rtoRiskScore && data.rtoRiskScore >= 0.70) {
        addToast({
          title: `🚨 High-Risk COD Return Intercepted`,
          message: `Order #${selectedOrder.orderId} scored ${(data.rtoRiskScore * 100).toFixed(0)}% RTO risk. WhatsApp verification + ₹40 UPI discount sent.`,
          severity: 'critical',
          category: 'high_priority_return',
          orderId: selectedOrder.orderId
        });
      } else if (resPayload?.vendorFaultProbability && resPayload.vendorFaultProbability >= 80) {
        addToast({
          title: `🚨 Critical Return: Vendor Sizing Flaw`,
          message: `Order #${selectedOrder.orderId}: ${resPayload.specificMeasurementDiscrepancy}. Vendor fault: ${resPayload.vendorFaultProbability}%.`,
          severity: 'critical',
          category: 'high_priority_return',
          orderId: selectedOrder.orderId,
          actionLabel: 'Inspect Vendor Matrix',
          actionTargetTab: 'vendors'
        });
      } else if (resPayload?.exchangeOfferDetails?.eligible) {
        addToast({
          title: `✨ Return Deflected: Doorstep Exchange Offered`,
          message: `Customer offered 1-click exchange to Size ${resPayload.exchangeOfferDetails.suggestedSize} + ₹100 credit. Saved ₹120 reverse courier fee!`,
          severity: 'success',
          category: 'agent_deflection',
          orderId: selectedOrder.orderId
        });
      } else if (resPayload?.detectedIntent === 'WISMO') {
        addToast({
          title: `⚡ WISMO Inquiry Deflected Instantly`,
          message: `Shared live ${selectedOrder.carrier} tracking details (${selectedOrder.trackingNumber}) in Hinglish. Ticket closed in 380ms.`,
          severity: 'info',
          category: 'agent_deflection',
          orderId: selectedOrder.orderId
        });
      }

      // Create log
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
      console.error('Agent execution failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6">
      {/* Agent Selector Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Bot className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-xl font-bold text-white">Autonomous Agent Command Center</h1>
                <p className="text-xs text-slate-400">
                  Four specialized AI agents operating on Dhaga &amp; Co.'s actual data flow, reducing 14,880 weekly returns &amp; 9,000 support tickets.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-400">Agents Online &amp; Connected</span>
          </div>
        </div>

        {/* 4 Agent Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => { setActiveAgent('cx'); setExecutionResult(null); }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeAgent === 'cx'
                ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-950/30'
                : 'bg-slate-850/60 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-indigo-300">Agent 1: Dhaga Saathi</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">58% WISMO</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">Hinglish CX &amp; Size Exchange Deflection</p>
            <span className="text-[10px] text-slate-400 block mt-1">Replaces 9-hour Freshdesk delay</span>
          </button>

          <button
            onClick={() => { setActiveAgent('logistics'); setExecutionResult(null); }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeAgent === 'logistics'
                ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-950/30'
                : 'bg-slate-850/60 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-indigo-300">Agent 2: Reverse Logistics</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">Carrier SLA</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">Multi-Carrier Reverse Pickup &amp; FC Routing</p>
            <span className="text-[10px] text-slate-400 block mt-1">Delhivery / Ekart allocation</span>
          </button>

          <button
            onClick={() => { setActiveAgent('intelligence'); setExecutionResult(null); }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeAgent === 'intelligence'
                ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-950/30'
                : 'bg-slate-850/60 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-indigo-300">Agent 3: Reason Intelligence</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">44% Other</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">Hinglish "Other" &amp; 410k Reviews Extractor</p>
            <span className="text-[10px] text-slate-400 block mt-1">Maps defects to vendor contracts</span>
          </button>

          <button
            onClick={() => { setActiveAgent('cod'); setExecutionResult(null); }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeAgent === 'cod'
                ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-950/30'
                : 'bg-slate-850/60 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-indigo-300">Agent 4: COD Interceptor</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">26% RTO</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">Pre-Dispatch COD Risk &amp; Prepaid Flip</p>
            <span className="text-[10px] text-slate-400 block mt-1">Saves Faizan's ₹120 per parcel</span>
          </button>
        </div>
      </div>

      {/* Interactive Simulator Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Context & Input Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Selection Pill */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Select Active Postgres Order Context:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_ORDERS_DATA.slice(0, 3).map((ord) => (
                <button
                  key={ord.orderId}
                  onClick={() => setSelectedOrderId(ord.orderId)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedOrderId === ord.orderId
                      ? 'bg-rose-500/15 border-rose-500/50 text-white'
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <span>{ord.orderId}</span>
                    <span className="text-[10px] px-1 rounded bg-slate-700 text-slate-300">{ord.tier}</span>
                  </div>
                  <p className="text-[11px] truncate mt-0.5 text-slate-300">{ord.customerName} ({ord.city})</p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{ord.items[0]?.name}</p>
                </button>
              ))}
            </div>

            {/* Selected Order Summary Bar */}
            <div className="mt-3 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-xs flex flex-wrap items-center justify-between gap-2">
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
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Test Real Hinglish / Vernacular Customer Prompts:</span>
              </label>

              {/* Fails Visibly Toggle */}
              <button
                onClick={() => {
                  setShowFailureMode(!showFailureMode);
                  if (!showFailureMode) {
                    setCustomQuery('Maine pichle saal kisi aur store se dress li thi, uska refund aap doge kya?');
                  }
                }}
                className={`text-[11px] px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showFailureMode 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold' 
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Simulate Ground Rule: Fails Visibly</span>
              </button>
            </div>

            {/* Presets List */}
            <div className="flex flex-wrap gap-1.5">
              {HINGLISH_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCustomQuery(p.text);
                    setShowFailureMode(p.type === 'FAILURE_MODE');
                    handleRunAgent(p.text, p.type === 'FAILURE_MODE');
                  }}
                  className="px-2.5 py-1 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700/60 hover:border-slate-600 transition-all cursor-pointer"
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
                className="w-full rounded-lg bg-slate-950 border border-slate-700/80 p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="Type customer message in Hinglish or English..."
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-[11px] text-slate-400">
                Pattern: <span className="text-indigo-400 font-mono">Routing → Prompt Chaining → Evaluator-Optimizer</span>
              </div>

              <button
                disabled={isLoading}
                onClick={() => handleRunAgent()}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Agent Pipeline...</span>
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
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg min-h-[460px] flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Live Agent Trace &amp; Output</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                    gemini-3.8-flash (T=0.1)
                  </span>
                </div>
              </div>

              {/* Result Area */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
                  <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-mono">Invoking Gemini 3.8 Flash structured pipeline...</span>
                </div>
              ) : executionResult ? (
                <div className="space-y-3.5 text-xs animate-fadeIn">
                  {/* Status Banner */}
                  {executionResult.failureModeTriggered ? (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-600/60 text-rose-200">
                      <div className="flex items-center space-x-2 font-bold text-rose-300 mb-1">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>Visible Failure Guardrail Triggered (Confidence &lt; 0.65)</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{executionResult.reasonForFailure}</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-600/40 text-emerald-200">
                      <div className="flex items-center justify-between font-bold text-emerald-300 mb-1">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Intent: {executionResult.detectedIntent || executionResult.canonicalCategory || 'ACTION_PROCESSED'}</span>
                        </span>
                        <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">
                          Confidence: {executionResult.confidenceScore ? `${(executionResult.confidenceScore * 100).toFixed(0)}%` : '96%'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">{executionResult.replyEnglish || executionResult.rootCauseSummary}</p>
                    </div>
                  )}

                  {/* Customer WhatsApp Screen View */}
                  {executionResult.replyHinglish && (
                    <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 space-y-2 relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-[10px] text-slate-400">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                            D
                          </div>
                          <div>
                            <span className="font-bold text-slate-200">Dhaga Saathi (Official)</span>
                            <span className="text-[9px] text-emerald-400 block leading-none">WhatsApp Verified Business</span>
                          </div>
                        </div>
                        <span className="font-mono">Just now</span>
                      </div>

                      <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-lg p-3 text-slate-100 text-xs leading-relaxed">
                        <p>"{executionResult.replyHinglish}"</p>
                      </div>

                      {/* Instant Action CTA inside WhatsApp */}
                      {executionResult.exchangeOfferDetails && (
                        <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/40 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-indigo-300 uppercase block">
                              Doorstep Free Exchange Available
                            </span>
                            <span className="text-xs font-semibold text-white">
                              Size {executionResult.exchangeOfferDetails.suggestedSize} + {executionResult.exchangeOfferDetails.instantIncentive}
                            </span>
                          </div>
                          <span className="px-2.5 py-1 rounded bg-indigo-600 text-white font-bold text-[10px] shadow">
                            1-Click Confirm
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Vendor CAPA Intelligence if parsed */}
                  {executionResult.specificMeasurementDiscrepancy && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        Vendor Discrepancy Attribution:
                      </span>
                      <p className="text-[11px] text-slate-200">
                        {executionResult.specificMeasurementDiscrepancy}
                      </p>
                      <p className="text-[10px] text-slate-400 italic">
                        Action: {executionResult.suggestedCorrectiveAction}
                      </p>
                    </div>
                  )}

                  {/* Pre-Dispatch COD Interception details */}
                  {executionResult.interceptionPlaybook && (
                    <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider">
                          COD RTO Risk Score: {(executionResult.rtoRiskScore * 100).toFixed(0)}% ({executionResult.riskClassification})
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold">
                          Saves ₹{executionResult.interceptionPlaybook.projectedCostSavedIfCancelledBeforeDispatch}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-200">
                        Playbook: <strong className="text-white">{executionResult.interceptionPlaybook.primaryAction}</strong>
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Incentive: {executionResult.interceptionPlaybook.incentive}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 space-y-2">
                  <Bot className="w-10 h-10 text-slate-600 stroke-[1.5]" />
                  <p className="text-xs text-slate-400 font-medium">Select a Hinglish preset or enter customer text and execute the agent.</p>
                  <p className="text-[11px] text-slate-600">Real-time structured JSON, telemetry, and action tracing will display here.</p>
                </div>
              )}
            </div>

            {/* Bottom Ground-Rule Telemetry Line */}
            <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <div>
                <span>Latency: </span>
                <span className="text-slate-200 font-semibold">{isLoading ? '...' : '380ms'}</span>
              </div>
              <div>
                <span>Tokens: </span>
                <span className="text-slate-200 font-semibold">460</span>
              </div>
              <div>
                <span>Cost / Run: </span>
                <span className="text-emerald-400 font-semibold">₹0.04 (Paise)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Agent Activity Audit Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">Live Agent Operational Audit Feed</h3>
          </div>
          <span className="text-[10px] text-slate-400">
            Streaming events across 48,000 orders/week pipeline
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
                <th className="pb-2">Time</th>
                <th className="pb-2">Agent</th>
                <th className="pb-2">Order / Query</th>
                <th className="pb-2">Intent</th>
                <th className="pb-2">Action Executed</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-2.5 text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 text-indigo-300 font-sans font-medium">{log.agentName}</td>
                  <td className="py-2.5 text-slate-300 font-sans max-w-[200px] truncate" title={log.inputQuery}>
                    {log.inputQuery}
                  </td>
                  <td className="py-2.5 text-amber-300">{log.intentDetected}</td>
                  <td className="py-2.5 text-slate-300 font-sans max-w-[260px] truncate" title={log.actionTaken}>
                    {log.actionTaken}
                  </td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                      log.status === 'FAILED_CONFIDENCE_LOW'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {log.status === 'FAILED_CONFIDENCE_LOW' ? 'VISIBLE_FALLBACK' : log.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-400">₹{log.costInPaise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
