import { OrderRecord, VendorBenchmark, AgentExecutionLog } from '../types';

export const BUSINESS_KPIS = {
  gmvRunRateCr: 310,
  weeklyOrders: 48000,
  annualOrders: 2496000,
  aovInr: 840,
  currentReturnRatePct: 31.0,
  targetReturnRatePct: 24.5,
  codSharePct: 61.0,
  codRtoRatePct: 26.0,
  targetCodRtoRatePct: 16.5,
  weeklyReturnsCount: 14880,
  annualReturnsCount: 773760,
  logisticsCostPerReturnInr: 120,
  totalHandlingCostPerReturnInr: 165,
  currentAnnualLossCr: 12.76,
  projectedAnnualSavingsCr: 3.18,
  supportTicketsPerWeek: 9000,
  wismoSharePct: 58.0,
  currentResponseTimeHours: 9.0,
  agentResponseTimeSec: 14.2,
  agentDeflectionRatePct: 68.4,
  otherBoxBaselinePct: 44.0,
  otherBoxUnmaskedPct: 98.2,
  activeSkus: 14000,
  newSkusPerWeek: 400,
  vendorPartnersCount: 40,
  repeatPurchaseRatePct: 22.0
};

export const RANKED_PROBLEMS = [
  {
    rank: 1,
    title: 'The 31% Return Bleed & Sizing Chaos Across 40 Vendors',
    owner: 'Neha (Category Head) & Faizan (Head of Supply Chain)',
    clientQuote: '"Returns are 31% overall. When I read the Other box by hand, most of it is about fit, but I can only read a few hundred at a time." (Neha) / "RTO on COD is 26%. Each one costs us ~₹120 in logistics and burns a delivery slot." (Faizan)',
    directCost: '₹12.76 Crore / year in wasted reverse logistics and handling + burnt delivery slots.',
    rootCause: '40 vendors in Tiruppur/Jaipur cut garments according to their own subjective patterns; Dhaga has no unified measurement standard. 44% of returns dumped in unread "Other" box.',
    whyRank1: 'Solves the largest financial hemorrhaging in the business. Every 1% return rate drop saves ~₹41 Lakhs pure cash annually directly impacting EBIT.',
    metric: 'Overall Return Rate (31% -> 24.5%) & Unparsed "Other" Reason volume (44% -> <3%).'
  },
  {
    rank: 2,
    title: '58% WISMO Support Bottleneck & 9-Hour Response Latency',
    owner: 'Arpita (Head of CX)',
    clientQuote: '"Fifty-eight percent of tickets are some version of where is my order. My agents copy and paste the same four replies all day. Average first response is nine hours."',
    directCost: '₹1.1 Crore / year in 34 customer support agent salaries, plus high cancellation rate due to customer anxiety on delayed shipments.',
    rootCause: 'Patchy multi-carrier handoffs (Delhivery, Shiprocket, Ekart) with zero automated push notifications; customers in Tier-2/3 cities call or WhatsApp repeatedly.',
    whyRank2: '58% of 9,000 weekly tickets is 5,220 repetitive queries/week. Instant 10-second resolution prevents frustrated customers from refusing COD parcels at the door.',
    metric: 'WISMO Ticket Deflection Rate (>65%) & First Response Time (9 hrs -> <30 secs).'
  },
  {
    rank: 3,
    title: 'COD RTO Refusals (26% on 61% of All Orders)',
    owner: 'Faizan (Head of Supply Chain) & Sameer (Head of Growth)',
    clientQuote: '"Return to origin on cash on delivery is 26%. Each one costs us about ₹120 in logistics and burns a delivery slot we could have used."',
    directCost: '₹4.6 Crore / year on dead freight runs, refused packages, and blocked warehouse inventory.',
    rootCause: 'Zero pre-dispatch verification, buyer remorse during 4-7 day transit, duplicate ordering across apps, customer uncontactable at delivery.',
    whyRank3: 'Huge margin drain on ₹840 average order value, but ranked #3 because a large portion of COD refusal is downstream of late delivery (Problem #2) and sizing mistrust (Problem #1).',
    metric: 'COD RTO Rate (26% -> 17%) and Prepaid Conversion Rate (+15%).'
  },
  {
    rank: 4,
    title: 'Catalogue Sizing & Description Drift (Sample-to-Live Delay)',
    owner: 'Vivek (Listing Lead) & Dev (CTO)',
    clientQuote: '"Six to nine days from sample to live. The drop calendar slips most weeks, and when it slips we lose the Tuesday traffic spike entirely."',
    directCost: 'Missed Tuesday/Friday traffic drops (~₹80-90 Lakhs lost peak GMV per missed drop) + inconsistent sizing descriptions.',
    rootCause: 'Six-person listing team typing 60+ attributes by hand; 90 spellings of color ("rani pink", "gulabi"); no centralized taxonomy.',
    whyRank4: 'Crucial for operational velocity, but fixing catalogue without closing the returns loop will simply pour more high-return inventory into the funnel faster.',
    metric: 'Listing turnaround (6-9 days -> 2 days) & Tuesday Drop Adherence (100%).'
  }
];

export const VENDOR_BENCHMARKS_DATA: VendorBenchmark[] = [
  {
    vendorId: 'VEND-014',
    name: 'Jaipur Loomcraft',
    location: 'Jaipur, Rajasthan',
    activeSkus: 420,
    monthlyVolume: 8200,
    overallReturnRate: 38.4,
    fitIssuePercentage: 64.2,
    primaryDefect: 'Chest circumference running 2.1 inches tighter than standard Dhaga chart',
    riskLevel: 'CRITICAL',
    leadTimeDays: 14,
    colorConsistencyScore: 71,
    typicalDeviations: {
      chestInches: -2.1,
      waistInches: -0.8,
      lengthInches: +1.2
    }
  },
  {
    vendorId: 'VEND-022',
    name: 'Royal Jaipur Ethnic',
    location: 'Jaipur, Rajasthan',
    activeSkus: 310,
    monthlyVolume: 6100,
    overallReturnRate: 36.1,
    fitIssuePercentage: 58.7,
    primaryDefect: 'Armhole pitch too tight on Anarkalis; fabric opacity lower than studio photograph',
    riskLevel: 'HIGH',
    leadTimeDays: 12,
    colorConsistencyScore: 68,
    typicalDeviations: {
      chestInches: -1.8,
      waistInches: -1.2,
      lengthInches: -0.5
    }
  },
  {
    vendorId: 'VEND-031',
    name: 'Surat Print House',
    location: 'Surat, Gujarat',
    activeSkus: 520,
    monthlyVolume: 9800,
    overallReturnRate: 33.2,
    fitIssuePercentage: 42.1,
    primaryDefect: 'Polyester-rayon blend shrinkage on wash; sleeve length variation (+/- 1.8 in)',
    riskLevel: 'MEDIUM',
    leadTimeDays: 9,
    colorConsistencyScore: 79,
    typicalDeviations: {
      chestInches: +0.4,
      waistInches: +0.6,
      lengthInches: -1.5
    }
  },
  {
    vendorId: 'VEND-008',
    name: 'Tiruppur Knits Ltd',
    location: 'Tiruppur, Tamil Nadu',
    activeSkus: 680,
    monthlyVolume: 14200,
    overallReturnRate: 22.8,
    fitIssuePercentage: 28.5,
    primaryDefect: 'Minor neck ribbing stretch after wash on toddler tees',
    riskLevel: 'LOW',
    leadTimeDays: 7,
    colorConsistencyScore: 89,
    typicalDeviations: {
      chestInches: -0.3,
      waistInches: 0.0,
      lengthInches: +0.2
    }
  },
  {
    vendorId: 'VEND-003',
    name: 'Coimbatore SpunFab',
    location: 'Coimbatore, Tamil Nadu',
    activeSkus: 190,
    monthlyVolume: 4900,
    overallReturnRate: 16.4,
    fitIssuePercentage: 18.2,
    primaryDefect: 'Consistent measurements; minor color variation on grey melange',
    riskLevel: 'HEALTHY',
    leadTimeDays: 6,
    colorConsistencyScore: 94,
    typicalDeviations: {
      chestInches: 0.0,
      waistInches: +0.1,
      lengthInches: 0.0
    }
  }
];

export const SAMPLE_ORDERS_DATA: OrderRecord[] = [
  {
    orderId: 'DH-89241',
    customerId: 'CUST-39102',
    customerName: 'Priya Sharma',
    phone: '+91 98765 43210',
    city: 'Gorakhpur',
    tier: 'Tier-3',
    isCod: true,
    orderTotal: 840,
    orderDate: '2026-09-28',
    status: 'Delivered',
    carrier: 'Delhivery',
    trackingNumber: 'DEL-928174621',
    rtoRiskScore: 0.72,
    deliveryDate: '2026-10-01',
    items: [
      {
        sku: 'KURTI-ANARK-BL-M',
        name: 'Indigo Floral Anarkali Kurti',
        category: 'Womenswear',
        size: 'M',
        color: 'Indigo Blue',
        price: 840,
        vendorId: 'VEND-014',
        vendorName: 'Jaipur Loomcraft',
        standardSizeChartDiscrepancy: 'Runs 2.1" small on chest'
      }
    ]
  },
  {
    orderId: 'DH-89242',
    customerId: 'CUST-44129',
    customerName: 'Neha Verma',
    phone: '+91 98111 22334',
    city: 'Patna',
    tier: 'Tier-2',
    isCod: false,
    orderTotal: 1299,
    orderDate: '2026-09-29',
    status: 'In Transit',
    carrier: 'Shiprocket',
    trackingNumber: 'SR-77361829',
    rtoRiskScore: 0.18,
    items: [
      {
        sku: 'DRESS-EMB-RANI-L',
        name: 'Festive Embroidered Kurta Set',
        category: 'Womenswear',
        size: 'L',
        color: 'Rani Pink',
        price: 1299,
        vendorId: 'VEND-022',
        vendorName: 'Royal Jaipur Ethnic',
        standardSizeChartDiscrepancy: 'Runs 1.8" tight on armhole'
      }
    ]
  },
  {
    orderId: 'DH-89243',
    customerId: 'CUST-77291',
    customerName: 'Amina Khatun',
    phone: '+91 97480 91823',
    city: 'Malda',
    tier: 'Tier-3',
    isCod: true,
    orderTotal: 799,
    orderDate: '2026-09-30',
    status: 'Out for Delivery',
    carrier: 'Ekart',
    trackingNumber: 'EKT-55102948',
    rtoRiskScore: 0.65,
    items: [
      {
        sku: 'KIDS-COT-FROCK-4Y',
        name: 'Girls Cotton Flare Dress 4Y',
        category: 'Kidswear',
        size: '4-5Y',
        color: 'Pista Green',
        price: 799,
        vendorId: 'VEND-008',
        vendorName: 'Tiruppur Knits Ltd'
      }
    ]
  },
  {
    orderId: 'DH-89244',
    customerId: 'CUST-10924',
    customerName: 'Rohan Mehra',
    phone: '+91 99201 88271',
    city: 'Pune',
    tier: 'Tier-1',
    isCod: false,
    orderTotal: 699,
    orderDate: '2026-09-27',
    status: 'Delivered',
    carrier: 'Delhivery',
    trackingNumber: 'DEL-88273612',
    rtoRiskScore: 0.12,
    deliveryDate: '2026-09-30',
    items: [
      {
        sku: 'MEN-POLO-NAVY-XL',
        name: 'Pure Pique Cotton Polo Shirt',
        category: "Men's Basics",
        size: 'XL',
        color: 'Navy Blue',
        price: 699,
        vendorId: 'VEND-003',
        vendorName: 'Coimbatore SpunFab'
      }
    ]
  },
  {
    orderId: 'DH-89245',
    customerId: 'CUST-88192',
    customerName: 'Sunita Devi',
    phone: '+91 94310 77291',
    city: 'Darbhanga',
    tier: 'Tier-3',
    isCod: true,
    orderTotal: 940,
    orderDate: '2026-10-01',
    status: 'Processing',
    carrier: 'Delhivery',
    trackingNumber: 'DEL-PENDING',
    rtoRiskScore: 0.81,
    items: [
      {
        sku: 'KURTI-SLK-MAROON-XXL',
        name: 'Chanderi Straight Kurti Maroon',
        category: 'Womenswear',
        size: 'XXL',
        color: 'Deep Maroon',
        price: 940,
        vendorId: 'VEND-014',
        vendorName: 'Jaipur Loomcraft'
      }
    ]
  }
];

export const INITIAL_EXECUTION_LOGS: AgentExecutionLog[] = [
  {
    id: 'LOG-1092',
    timestamp: '11:42:08 AM',
    agentName: 'Dhaga Saathi (CX & WISMO)',
    inputQuery: 'Mera order Gorakhpur kab aayega, track nahi ho raha',
    orderId: 'DH-89241',
    intentDetected: 'WISMO',
    actionTaken: 'Shared live Delhivery milestone status via WhatsApp + SMS. Ticket deflected in 12s.',
    costInPaise: 0.04,
    latencyMs: 390,
    modelUsed: 'gemini-3.8-flash',
    status: 'DEFLECTED',
    confidenceScore: 0.98
  },
  {
    id: 'LOG-1091',
    timestamp: '11:40:15 AM',
    agentName: 'Return Reason Intelligence',
    inputQuery: 'Kurti fitting bahut bekar hai, chest pe zip band nahi ho rahi',
    orderId: 'DH-89239',
    intentDetected: 'FIT_CHEST_BUST_TIGHT',
    actionTaken: 'Extracted root cause: Chest 2.1" deficit. Attributed to Vendor-014. Triggered size exchange offer.',
    costInPaise: 0.05,
    latencyMs: 420,
    modelUsed: 'gemini-3.8-flash',
    status: 'SUCCESS',
    confidenceScore: 0.96
  },
  {
    id: 'LOG-1090',
    timestamp: '11:38:22 AM',
    agentName: 'Pre-Dispatch COD Interceptor',
    inputQuery: 'Order DH-89245 (Darbhanga COD, ₹940, 2 past RTOs)',
    orderId: 'DH-89245',
    intentDetected: 'HIGH_RISK_COD',
    actionTaken: 'Risk 0.81. Sent WhatsApp verification button + offered ₹40 discount for UPI switch.',
    costInPaise: 0.02,
    latencyMs: 85,
    modelUsed: 'deterministic-rules',
    status: 'SUCCESS',
    confidenceScore: 0.89
  },
  {
    id: 'LOG-1089',
    timestamp: '11:35:04 AM',
    agentName: 'Reverse Logistics Orchestrator',
    inputQuery: 'Doorstep exchange booked for CUST-39102 (Size M -> L)',
    orderId: 'DH-89241',
    intentDetected: 'SIZE_EXCHANGE_DISPATCH',
    actionTaken: 'Generated Delhivery Reverse AWB REV-DEL-9812401. Scheduled pickup window tomorrow 10am-2pm.',
    costInPaise: 0.0,
    latencyMs: 24,
    modelUsed: 'deterministic-rules',
    status: 'SUCCESS',
    confidenceScore: 1.0
  }
];

export const COLOR_NORMALIZATION_MAP = [
  { rawInput: 'rani pink', canonical: 'Magenta Fuchsia', count: 480, hex: '#E0115F' },
  { rawInput: 'gulabi', canonical: 'Rose Pink', count: 320, hex: '#FF66CC' },
  { rawInput: 'baby pink', canonical: 'Soft Blush Pink', count: 210, hex: '#F4C2C2' },
  { rawInput: 'dark maroon', canonical: 'Deep Burgundy Maroon', count: 540, hex: '#800000' },
  { rawInput: 'tamatar red', canonical: 'Crimson Scarlet', count: 180, hex: '#FF2400' },
  { rawInput: 'pista green', canonical: 'Pistachio Sage', count: 390, hex: '#93C572' },
  { rawInput: 'mehndi green', canonical: 'Olive Moss Green', count: 460, hex: '#556B2F' },
  { rawInput: 'peacock blue', canonical: 'Teal Peacock', count: 280, hex: '#005F73' }
];

export const ROOT_CAUSE_DISTRIBUTION = [
  { category: 'Fit - Chest & Bust Tightness', percentage: 38.5, volume: 5728, vendorFault: 88, primaryVendor: 'Jaipur Loomcraft' },
  { category: 'Length Too Long / Floor Dragging', percentage: 19.2, volume: 2856, vendorFault: 35, primaryVendor: 'Royal Jaipur Ethnic' },
  { category: 'Fabric Transparency / Thin GSM', percentage: 16.4, volume: 2440, vendorFault: 92, primaryVendor: 'Surat Print House' },
  { category: 'Color Mismatch (Studio vs Reality)', percentage: 11.8, volume: 1755, vendorFault: 65, primaryVendor: 'Catalog Studio Lighting' },
  { category: 'Late Delivery / Occasion Passed', percentage: 8.5, volume: 1264, vendorFault: 10, primaryVendor: 'Logistics SLA (Tier-3)' },
  { category: 'COD Buyer Remorse / Refusal', percentage: 5.6, volume: 837, vendorFault: 0, primaryVendor: 'Customer Intent' }
];
