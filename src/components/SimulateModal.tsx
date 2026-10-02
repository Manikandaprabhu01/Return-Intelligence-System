import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { SAMPLE_ORDERS_DATA } from '../data/mockData';

interface SimulateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToAgents: () => void;
}

export const SimulateModal: React.FC<SimulateModalProps> = ({ isOpen, onClose, onNavigateToAgents }) => {
  const [selectedOrder, setSelectedOrder] = useState(SAMPLE_ORDERS_DATA[0]);
  const [prompt, setPrompt] = useState('Mera Anarkali kurti ka chest bohot tight hai, size L exchange milega kya?');
  const [isSimulating, setIsSimulating] = useState(false);
  const [response, setResponse] = useState<any>(null);

  if (!isOpen) return null;

  const handleSimulate = async () => {
    setIsSimulating(true);
    setResponse(null);

    try {
      const res = await fetch('/api/agent/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerQuery: prompt,
          orderId: selectedOrder.orderId,
          customerPhone: selectedOrder.phone
        })
      });
      const data = await res.json();
      setResponse(data.result || data);
    } catch (e) {
      console.warn('Backend unavailable, using simulated response:', e);
      setResponse({
        detectedIntent: 'SIZE_EXCHANGE',
        confidenceScore: 0.96,
        recommendedAction: 'DOORSTEP_EXCHANGE_INITIATED',
        replyHinglish: `Namaste ${selectedOrder.customerName} ji! Hum aapke liye Size 'L' ka Doorstep Free Exchange arrange kar rahe hain, saath hi ₹100 wallet credit bhi de rahe hain!`,
        replyEnglish: `Doorstep exchange processed for order ${selectedOrder.orderId}. Replaced Size ${selectedOrder.items[0]?.size || 'M'} with Size L.`,
        exchangeOfferDetails: {
          eligible: true,
          suggestedSize: 'L',
          instantIncentive: '₹100 Dhaga Wallet Bonus'
        }
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 sm:p-7 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-5">
          <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Deflection Sandbox</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Hinglish Return Simulator</h2>
          <p className="text-xs text-slate-400">
            Experience how Dhaga Saathi intercepts return requests on WhatsApp in under 15 seconds.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
              Active Order Context
            </label>
            <select
              value={selectedOrder.orderId}
              onChange={(e) => {
                const found = SAMPLE_ORDERS_DATA.find(o => o.orderId === e.target.value);
                if (found) setSelectedOrder(found);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            >
              {SAMPLE_ORDERS_DATA.map(o => (
                <option key={o.orderId} value={o.orderId}>
                  {o.orderId} · {o.customerName} ({o.city}, {o.items[0]?.name} - Size {o.items[0]?.size})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
              Customer Message (Hinglish / Vernacular)
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
              placeholder="e.g. Sizing issue, where is my order, etc."
            />
          </div>

          <div className="flex justify-end items-center space-x-3 pt-1">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={isSimulating}
              onClick={handleSimulate}
              className="h-10 px-5 rounded-xl text-xs font-semibold bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-50 text-white flex items-center space-x-2 shadow-md shadow-rose-600/20 cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Analyzing...' : 'Run Simulation'}</span>
            </button>
          </div>

          {response && (
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs animate-fadeIn">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Action: {response.recommendedAction || 'Doorstep Exchange Processed'}</span>
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  {response.detectedIntent || 'SIZE_EXCHANGE'}
                </span>
              </div>
              <div className="bg-[#1f2c34] p-3.5 rounded-xl text-slate-100 leading-relaxed text-xs">
                <p>&ldquo;{response.replyHinglish}&rdquo;</p>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Outcome: {response.replyEnglish}
              </p>
              <div className="pt-2 flex justify-between items-center border-t border-slate-800/80 text-xs font-mono">
                <span className="text-emerald-400 font-semibold">Rescued ₹120 reverse courier cost</span>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToAgents();
                  }}
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <span>Open Full Command Center</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
