export interface OrderItem {
  sku: string;
  name: string;
  category: 'Womenswear' | 'Kidswear' | "Men's Basics";
  size: string;
  color: string;
  price: number;
  vendorId: string;
  vendorName: string;
  standardSizeChartDiscrepancy?: string;
}

export interface OrderRecord {
  orderId: string;
  customerId: string;
  customerName: string;
  phone: string;
  city: string;
  tier: 'Tier-1' | 'Tier-2' | 'Tier-3';
  isCod: boolean;
  orderTotal: number;
  items: OrderItem[];
  orderDate: string;
  status: 'Delivered' | 'In Transit' | 'Out for Delivery' | 'Return Requested' | 'RTO Refused' | 'Processing';
  carrier: 'Delhivery' | 'Shiprocket' | 'Ekart';
  trackingNumber: string;
  rtoRiskScore: number;
  deliveryDate?: string;
}

export interface VendorBenchmark {
  vendorId: string;
  name: string;
  location: string;
  activeSkus: number;
  monthlyVolume: number;
  overallReturnRate: number;
  fitIssuePercentage: number;
  primaryDefect: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'HEALTHY' | 'LOW';
  leadTimeDays: number;
  colorConsistencyScore: number;
  typicalDeviations: {
    chestInches: number;
    waistInches: number;
    lengthInches: number;
  };
}

export interface ReturnReasonAnalysis {
  canonicalCategory: string;
  rootCauseSummary: string;
  vendorFaultProbability: number;
  specificMeasurementDiscrepancy: string;
  suggestedCorrectiveAction: string;
  hinglishKeywordsIdentified: string[];
}

export interface AgentExecutionLog {
  id: string;
  timestamp: string;
  agentName: 'Dhaga Saathi (CX & WISMO)' | 'Reverse Logistics Orchestrator' | 'Return Reason Intelligence' | 'Pre-Dispatch COD Interceptor';
  inputQuery: string;
  orderId?: string;
  intentDetected: string;
  actionTaken: string;
  costInPaise: number;
  latencyMs: number;
  modelUsed: string;
  status: 'SUCCESS' | 'DEFLECTED' | 'ESCALATED' | 'FAILED_CONFIDENCE_LOW';
  confidenceScore: number;
}

export type ToastSeverity = 'critical' | 'warning' | 'success' | 'info';

export type ToastCategory = 'high_priority_return' | 'vendor_threshold_exceeded' | 'agent_deflection' | 'system';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  severity: ToastSeverity;
  category: ToastCategory;
  timestamp: string;
  orderId?: string;
  vendorId?: string;
  vendorName?: string;
  returnRate?: number;
  threshold?: number;
  actionLabel?: string;
  actionTargetTab?: 'discovery' | 'dashboard' | 'agents' | 'vendors' | 'architecture';
}

