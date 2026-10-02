import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Ruler, 
  Send, 
  Sliders,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { VENDOR_BENCHMARKS_DATA, COLOR_NORMALIZATION_MAP } from '../data/mockData';
import { VendorBenchmark } from '../types';
import { useToast } from '../context/ToastContext';

export const VendorMatrixTab: React.FC = () => {
  const { vendorThreshold, setVendorThreshold, addToast } = useToast();
  const [selectedVendor, setSelectedVendor] = useState<VendorBenchmark>(VENDOR_BENCHMARKS_DATA[0]);
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>('all');
  const [capaDispatched, setCapaDispatched] = useState<boolean>(false);

  const handleDispatchCapa = () => {
    setCapaDispatched(true);
    addToast({
      title: 'CAPA Notice Dispatched',
      message: `Audit notice #AUD-9104 dispatched to ${selectedVendor.name}. Mandatory sizing tolerance check (+/- 0.5") enforced.`,
      severity: 'info',
      category: 'system'
    });
    setTimeout(() => setCapaDispatched(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-8">
      {/* Header Banner */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
              <Ruler className="w-4 h-4" />
              <span>Supplier Quality &amp; Defect Audit</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              40-Vendor Sizing Divergence &amp; Catalogue Matrix
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Resolving the Tiruppur vs. Jaipur cutting discrepancies that trigger 64% of Neha's sizing returns.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800 text-slate-300">
              <span className="text-slate-400">Catalogue: </span>
              <strong className="text-white">14,000 Live SKUs</strong>
            </div>
            <div className="bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800 text-slate-300">
              <span className="text-slate-400">Weekly Drop: </span>
              <strong className="text-white">400 New Styles</strong>
            </div>
          </div>
        </div>

        {/* Vendor Tolerance Threshold Control Bar */}
        <div className="pt-5 border-t border-slate-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-slate-100 text-xs">Sizing Tolerance SLA Benchmark:</span>
                <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px]">
                  {vendorThreshold.toFixed(1)}%
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Highlights manufacturing partners with return rates exceeding contract baseline</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-1 lg:max-w-md bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono">20% Strict</span>
            <input
              type="range"
              min="20.0"
              max="40.0"
              step="1.0"
              value={vendorThreshold}
              onChange={(e) => setVendorThreshold(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[11px] text-slate-400 font-mono">40% Lenient</span>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-300">
              <strong className="text-amber-400">{VENDOR_BENCHMARKS_DATA.filter(v => v.overallReturnRate >= vendorThreshold).length}</strong> of 40 Vendors In Review
            </span>
          </div>
        </div>
      </section>

      {/* Sizing Divergence Heatmap: Tiruppur vs Jaipur */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor List (1 col) */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Audited Suppliers</h2>
            <span className="text-[11px] font-mono text-slate-400">Top 5 Analyzed</span>
          </div>

          <div className="space-y-2">
            {VENDOR_BENCHMARKS_DATA.map((vend) => (
              <button
                key={vend.vendorId}
                onClick={() => setSelectedVendor(vend)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedVendor.vendorId === vend.vendorId
                    ? 'bg-slate-950 border-rose-500/60 text-white shadow-sm ring-1 ring-rose-500/30'
                    : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-950/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">{vend.name}</span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {vend.riskLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{vend.location}</span>
                  </span>
                  <span className={vend.overallReturnRate >= vendorThreshold ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                    {vend.overallReturnRate}% returns
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1 leading-relaxed">
            <span className="font-semibold text-slate-300 block font-mono text-[11px]">SUPPLY CHAIN BLINDSPOT:</span>
            <p>
              Purchase orders were raised across unstandardized Google Sheets and confirmed over WhatsApp threads. No centralized pre-shipment tolerance gate existed before dispatch to Bhiwandi.
            </p>
          </div>
        </div>

        {/* Selected Vendor Detail & Discrepancy Breakdown (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-rose-400" />
                <h2 className="text-lg font-bold text-white tracking-tight">{selectedVendor.name}</h2>
                <span className="text-xs font-mono text-slate-400">({selectedVendor.vendorId})</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {selectedVendor.location} · {selectedVendor.activeSkus} Active SKUs · {selectedVendor.monthlyVolume.toLocaleString()} units / mo
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDispatchCapa}
                className="h-9 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-rose-600/20 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Issue Sizing CAPA Notice</span>
              </button>
            </div>
          </div>

          {/* CAPA Notice Confirmation */}
          {capaDispatched && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between font-mono animate-fadeIn">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automated Sizing Correction Notice (CAPA) sent to {selectedVendor.name}!</span>
              </div>
              <span className="text-[11px] text-slate-400">Audit #AUD-9104</span>
            </div>
          )}

          {/* Physical Measurement Tolerance Variance */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
              <Ruler className="w-4 h-4 text-amber-400" />
              <span>Physical Tolerance Deviation vs Master Tech Pack</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 block">Chest / Bust Circumference</span>
                <p className="text-xl font-bold font-mono text-rose-400">{selectedVendor.typicalDeviations.chestInches > 0 ? `+${selectedVendor.typicalDeviations.chestInches}` : selectedVendor.typicalDeviations.chestInches}"</p>
                <span className="text-[11px] text-slate-400 leading-tight block">
                  {selectedVendor.typicalDeviations.chestInches < 0 ? 'Cuts smaller than standard chart' : 'Cuts wider than standard chart'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 block">Garment Length Variance</span>
                <p className="text-xl font-bold font-mono text-amber-400">{selectedVendor.typicalDeviations.lengthInches > 0 ? `+${selectedVendor.typicalDeviations.lengthInches}` : selectedVendor.typicalDeviations.lengthInches}"</p>
                <span className="text-[11px] text-slate-400 leading-tight block">Shrinkage during post-print wash</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 block">Primary Customer Return Reason</span>
                <p className="text-xs font-semibold text-slate-200 mt-1">{selectedVendor.primaryDefect}</p>
                <span className="text-[11px] font-mono text-rose-400 block pt-0.5">{selectedVendor.fitIssuePercentage}% fit-related returns</span>
              </div>
            </div>
          </div>

          {/* Color Spelling Normalization Map */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                90-Spelling Color Normalization (410,000 Reviews)
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Canonical standard mapped</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {COLOR_NORMALIZATION_MAP.slice(0, 4).map((cm, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: cm.hex }} />
                      <span>{cm.canonical}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{cm.count} mentions</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Raw vernacular input: &ldquo;{cm.rawInput}&rdquo;
                  </p>
                  <p className="text-[11px] text-amber-300/90 font-mono">
                    Normalized to catalog hex {cm.hex}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
