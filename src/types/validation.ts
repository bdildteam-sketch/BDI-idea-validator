export interface ViabilityMetric {
  name: string;
  score: number; // 0 to 100
  weight: number;
  description: string;
  benchmark: string;
  status?: 'positive' | 'neutral' | 'warning';
}

export interface CompetitorSWOT {
  name: string;
  type: 'Direct' | 'Indirect' | 'Incumbent' | string;
  pricing: string;
  strengths: string[];
  weaknesses: string[];
  marketShare: string;
}

export interface MarketSize {
  tam: { value: string; label?: string; details: string };
  sam: { value: string; label?: string; details: string };
  som: { value: string; label?: string; details: string };
  cagr: string;
  targetDemographic: string;
}

export interface RiskAnalysis {
  category: 'Technical' | 'Market' | 'Financial' | 'Regulatory' | 'Execution' | string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  mitigation: string;
}

export interface FinancialProjection {
  year: string;
  revenue: string;
  customers: string;
  cac: string;
  ltv: string;
  burnRate: string;
}

export interface ResearchSource {
  id: string;
  name: string;
  domain: string;
  url: string;
  category: 'Market Intelligence' | 'Competitor Intelligence' | 'Search Volume & Demand' | 'Customer Sentiment' | 'Pricing Benchmark';
  keyFinding: string;
  confidence: number; // e.g. 94 to 99%
  crawledDate: string;
  publisher?: string;
  supports?: string;
  sourceType?: string;
}

export interface ValidationReport {
  id: string;
  title: string;
  tagline: string;
  industry: string;
  stage: string;
  viabilityScore: number; // 0 to 100
  verdict: 'GO' | 'STRONG GO' | 'CONDITIONAL GO' | 'PIVOT' | 'NO-GO';
  summary: string;
  greenFlags: string[];
  riskFlags: string[];
  metrics: ViabilityMetric[];
  marketSize: MarketSize;
  competitors: CompetitorSWOT[];
  risks: RiskAnalysis[];
  financials: FinancialProjection[];
  sources?: ResearchSource[];
  brandStrategy: {
    archetype: string;
    mission: string;
    voice: string;
    keyKeywords: string[];
  };
}
