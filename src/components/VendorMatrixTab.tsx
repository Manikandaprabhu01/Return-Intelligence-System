import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  FileSpreadsheet, 
  Palette, 
  Ruler, 
  ChevronRight, 
  Send,
  Sparkles,
  Info,
  Bell,
  Sliders
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
      title: `⚡ CAPA Dispatched: ${selectedVendor.name}`,
      message: `Audit notice #AUD-9104 sent. Mandatory sizing tolerance check (+/- 0.5") enforced for next Bhiwandi delivery.`,
      severity: 'info',
      category: 'system'
    });
    setTimeout(() => setCapaDispatched(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Ruler className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-xl font-bold text-white">40-Vendor Fit &amp; Catalogue Sizing Matrix</h1>
                <p className="text-xs text-slate-400">
                  Resolving the Tiruppur vs. Jaipur measurement discrepancies that trigger 64% of Neha's returns.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
              <span>Active SKUs: </span>
              <strong className="text-white">14,000 Live</strong>
            </div>
            <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
              <span>Weekly Drop: </span>
              <strong className="text-white">400 New SKUs</strong>
            </div>
          </div>
        </div>

        {/* Vendor Threshold Alert Control Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-sm shadow-amber-500/20">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-slate-100 text-xs">Vendor Return Rate Alert Threshold:</span>
                <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px]">
                  {vendorThreshold.toFixed(1)}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Triggers real-time alerts when vendor return rates breach this limit</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-1 lg:max-w-md bg-slate-950/60 p-2 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-500 font-mono">20%</span>
            <input
              type="range"
              min="20.0"
              max="40.0"
              step="1.0"
              value={vendorThreshold}
              onChange={(e) => setVendorThreshold(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[11px] text-slate-500 font-mono">40%</span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-[11px] font-semibold text-slate-300">
              <strong className="text-amber-400">{VENDOR_BENCHMARKS_DATA.filter(v => v.overallReturnRate >= vendorThreshold).length}</strong> of 40 Vendors Breaching
            </span>
          </div>
        </div>
      </div>

      {/* Sizing Divergence Heatmap: Tiruppur vs Jaipur */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor List (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Vendor Partners (Top 5 Audited)</h2>
            <span className="text-[10px] text-slate-400">Total: 40 Vendors</span>
          </div>

          <div className="space-y-2">
            {VENDOR_BENCHMARKS_DATA.map((vend) => (
              <button
                key={vend.vendorId}
                onClick={() => setSelectedVendor(vend)}
                className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedVendor.vendorId === vend.vendorId
                    ? 'bg-rose-500/15 border-rose-500/50 text-white shadow-md'
                    : 'bg-slate-850/60 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">{vend.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    vend.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    vend.riskLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    vend.riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {vend.riskLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{vend.location}</span>
                  </span>
                  <span className="font-semibold text-rose-400">Return: {vend.overallReturnRate}%</span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/40 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block">Root Operational Context:</span>
            <p>
              Purchase orders are currently raised in uncoordinated Google Sheets and confirmed over WhatsApp threads. No centralized QA check exists before shipment to Bhiwandi/Gurugram FCs.
            </p>
          </div>
        </div>

        {/* Selected Vendor Detail & Discrepancy Breakdown (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-rose-400" />
                <h2 className="text-lg font-bold text-white">{selectedVendor.name}</h2>
                <span className="text-xs text-slate-400">({selectedVendor.vendorId})</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Location: {selectedVendor.location} • Active Catalogue: {selectedVendor.activeSkus} SKUs • Volume: {selectedVendor.monthlyVolume.toLocaleString()} units/mo
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDispatchCapa}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-rose-600/30 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Issue Sizing CAPA Notice</span>
              </button>
            </div>
          </div>

          {/* CAPA Notice Confirmation */}
          {capaDispatched && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-600/50 text-emerald-200 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automated Sizing Correction Notice (CAPA) sent via WhatsApp &amp; Email to {selectedVendor.name}!</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 px-2 py-0.5 rounded">Audit ID #AUD-9104</span>
            </div>
          )}

          {/* Physical Measurement Tolerance Variance */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-amber-400" />
              <span>Physical Measurement Variance vs Dhaga Standard Master Chart:</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block">Chest / Bust Circumference</span>
                <p className={`text-xl font-black mt-1 ${
                  selectedVendor.typicalDeviations.chestInches < -1.0 ? 'text-rose-400' :
                  selectedVendor.typicalDeviations.chestInches > 1.0 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedVendor.typicalDeviations.chestInches > 0 ? `+${selectedVendor.typicalDeviations.chestInches}"` : `${selectedVendor.typicalDeviations.chestInches}"`}
                </p>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {selectedVendor.typicalDeviations.chestInches < 0 ? 'Significantly tighter than chart' : 'True to master size'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block">Waist Ease Tolerance</span>
                <p className={`text-xl font-black mt-1 ${
                  selectedVendor.typicalDeviations.waistInches < -1.0 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {selectedVendor.typicalDeviations.waistInches > 0 ? `+${selectedVendor.typicalDeviations.waistInches}"` : `${selectedVendor.typicalDeviations.waistInches}"`}
                </p>
                <span className="text-[10px] text-slate-500 block mt-0.5">Tolerance limit: +/- 0.5"</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block">Hem Length Deviation</span>
                <p className="text-xl font-black text-amber-400 mt-1">
                  {selectedVendor.typicalDeviations.lengthInches > 0 ? `+${selectedVendor.typicalDeviations.lengthInches}"` : `${selectedVendor.typicalDeviations.lengthInches}"`}
                </p>
                <span className="text-[10px] text-slate-500 block mt-0.5">Floor dragging on Tier-2/3 buyers</span>
              </div>
            </div>
          </div>

          {/* Primary Defect Diagnostic & Remediation */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-rose-300 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Primary Root Defect Reported by Customers:</span>
            </div>
            <p className="text-slate-200 text-sm font-medium">
              "{selectedVendor.primaryDefect}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-slate-300">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block font-medium">Customer Sizing Advisory Trigger:</span>
                <span className="text-emerald-400 font-semibold mt-0.5 block">
                  Show "Runs 1 Size Small - Order Large for relaxed fit" on product page
                </span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block font-medium">Fulfilment Center Inbound Gate:</span>
                <span className="text-rose-300 font-semibold mt-0.5 block">
                  Reject lots exceeding +/- 0.75" chest variance at Bhiwandi receiving
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 90-Color Drift Normalization Resolver */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">The 90-Color Drift Problem &amp; Canonical Normalization</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              The case study revealed: <em>"Colour has been typed about ninety different ways. Fabric is free text."</em> The AI taxonomy engine maps vernacular spellings to standardized dye shades.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            90 Spellings → 18 Canonical Shades
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {COLOR_NORMALIZATION_MAP.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full border border-white/20 shrink-0 shadow-md"
                style={{ backgroundColor: item.hex }}
              />
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white block truncate">{item.canonical}</span>
                <span className="text-[10px] text-slate-400 block truncate">Typed as: "{item.rawInput}"</span>
                <span className="text-[10px] text-indigo-400 font-medium">{item.count} live listings mapped</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
