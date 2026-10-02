import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, RotateCcw, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
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
        replyHinglish: `Namaste ${selectedOrder.customerName} ji! Hum aapke liye Size 'L' ka Doorstep Free Exchange arrange kar rahe hain, saath hi ₹100 wallet credit bhi de rahe hain!`,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-rose-400 mb-2">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Live Hinglish Return &amp; Exchange Simulator</h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Experience how Dhaga Saathi intercepts a return in real-time, offering a doorstep size exchange and deflecting reverse courier fees.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Select Order Context:</label>
            <select
              value={selectedOrder.orderId}
              onChange={(e) => {
                const found = SAMPLE_ORDERS_DATA.find(o => o.orderId === e.target.value);
                if (found) setSelectedOrder(found);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200"
            >
              {SAMPLE_ORDERS_DATA.map(o => (
                <option key={o.orderId} value={o.orderId}>
                  {o.orderId} - {o.customerName} ({o.city}, {o.items[0]?.name} - Size {o.items[0]?.size})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Customer Message (Hinglish):</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200"
              placeholder="e.g. Sizing issue, where is my order, etc."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              disabled={isSimulating}
              onClick={handleSimulate}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white flex items-center space-x-2 shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Analyzing...' : 'Run Simulation'}</span>
            </button>
          </div>

          {response && (
            <div className="p-4 rounded-xl bg-slate-850 border border-emerald-500/40 space-y-2 text-xs animate-fadeIn">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Action: {response.recommendedAction}</span>
                </span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded font-mono">
                  {response.detectedIntent}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-200">
                <p className="italic">"{response.replyHinglish}"</p>
              </div>
              <p className="text-[11px] text-slate-400">
                Summary: {response.replyEnglish}
              </p>
              <div className="pt-2 flex justify-between items-center border-t border-slate-800 text-[11px]">
                <span className="text-emerald-400 font-semibold">Saved ₹120 reverse courier cost!</span>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToAgents();
                  }}
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
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
