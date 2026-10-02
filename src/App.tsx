/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { DiscoveryTab } from './components/DiscoveryTab';
import { DashboardTab } from './components/DashboardTab';
import { AgentCommandCenter } from './components/AgentCommandCenter';
import { VendorMatrixTab } from './components/VendorMatrixTab';
import { ArchitectureAndPRDTab } from './components/ArchitectureAndPRDTab';
import { SimulateModal } from './components/SimulateModal';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discovery' | 'dashboard' | 'agents' | 'vendors' | 'architecture'>('discovery');
  const [isSimulateOpen, setIsSimulateOpen] = useState<boolean>(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200">
        {/* Top App Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onQuickSimulate={() => setIsSimulateOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-16">
          {activeTab === 'discovery' && <DiscoveryTab />}
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'agents' && <AgentCommandCenter />}
          {activeTab === 'vendors' && <VendorMatrixTab />}
          {activeTab === 'architecture' && <ArchitectureAndPRDTab />}
        </main>

        {/* Toast Notification Layer */}
        <ToastContainer onNavigateTab={setActiveTab} />

        {/* Quick Simulate Modal */}
        <SimulateModal
          isOpen={isSimulateOpen}
          onClose={() => setIsSimulateOpen(false)}
          onNavigateToAgents={() => {
            setIsSimulateOpen(false);
            setActiveTab('agents');
          }}
        />

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-slate-400">Dhaga &amp; Co.</span> • Mini Project 1: The Dhaga &amp; Co. Engagement
            </div>
            <div className="flex items-center space-x-4 text-[11px]">
              <span>48,000 orders/wk</span>
              <span>•</span>
              <span>Target: 24.5% Return Rate</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">₹3.18 Cr Saved</span>
            </div>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
