export interface ScoreDimension {
  id: string;
  name: string;
  score: number; // 1 to 10
  weight: number;
  benchmark: string;
  rationale: string;
  status: 'strong' | 'moderate' | 'weak';
}

export interface MarketBreakdown {
  tam: { value: string; label: string; details: string; methodology: string };
  sam: { value: string; label: string; details: string; methodology: string };
  som: { value: string; label: string; details: string; methodology: string };
  cagr: string;
  forecastPeriod: string;
  growthDrivers: string[];
  adoptionBarriers: string[];
  segments: {
    name: string;
    description: string;
    sharePercent: number;
    willingnessToPay: 'High' | 'Medium' | 'Low';
    estimatedACV: string;
  }[];
}

export interface CompetitorItem {
  name: string;
  category: 'Direct' | 'Indirect' | 'Incumbent';
  pricing: string;
  marketShare: string;
  strengths: string;
  weaknesses: string;
  xPosition: number; // 0 to 100 on 2x2 map (Market Focus: Niche -> Broad)
  yPosition: number; // 0 to 100 on 2x2 map (Innovation: Incremental -> Disruptive)
}

export interface RiskMatrixItem {
  id: string;
  title: string;
  category: 'Market' | 'Customer Adoption' | 'Technology' | 'Competitive' | 'Regulatory' | 'Operational';
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  level: 'High Risk' | 'Medium Risk' | 'Low Risk';
  mitigation: string;
}

export interface CriticalAssumption {
  id: string;
  assumption: string;
  importance: 'Critical' | 'High' | 'Medium';
  riskLevel: 'High' | 'Medium' | 'Low';
  validationMethod: string;
  metricThreshold: string;
}

export interface ValidationRoadmapStep {
  week: string;
  phase: string;
  title: string;
  objective: string;
  method: string;
  targetParticipants: string;
  successCriteria: string;
  expectedLearning: string;
}

export interface ReportSource {
  id: string;
  name: string;
  title: string;
  date: string;
  url: string;
  informationSupported: string;
  confidenceScore: number;
}

export interface InvestorReportData {
  id: string;
  businessName: string;
  tagline: string;
  industry: string;
  stage: string;
  reportDate: string;
  overallScore: number; // 1 to 10
  recommendation: 'Strong Opportunity' | 'Promising but Needs Validation' | 'Needs Significant Refinement' | 'Weak Opportunity';
  
  executiveSummary: {
    description: string;
    targetProblem: string;
    coreSolution: string;
    keyStrengths: string[];
    keyConcerns: string[];
  };

  scores: {
    problemStrength: number; // /10
    marketDemand: number;
    customerClarity: number;
    competitiveAdvantage: number;
    monetizationPotential: number;
    scalability: number;
    executionDifficulty: number;
    dimensions: ScoreDimension[];
  };

  marketAnalysis: MarketBreakdown;

  competitiveAnalysis: {
    narrative: string;
    competitors: CompetitorItem[];
    ourPosition: {
      name: string;
      xPosition: number;
      yPosition: number;
      moatSummary: string;
    };
    differentiationPillars: {
      title: string;
      description: string;
    }[];
  };

  riskAnalysis: {
    summary: string;
    risks: RiskMatrixItem[];
  };

  assumptions: CriticalAssumption[];

  validationRoadmap: ValidationRoadmapStep[];

  decisionSummary: {
    whySucceed: string[];
    whyFail: string[];
    biggestGaps: string[];
    nextStrategicStep: string;
  };

  founderActionPlan: {
    firstThreeActions: {
      step: number;
      title: string;
      details: string;
      timeframe: string;
    }[];
    metricsToTrack: {
      name: string;
      target: string;
      rationale: string;
    }[];
    milestones: {
      timeframe: string;
      goal: string;
      deliverable: string;
    }[];
  };

  sources: ReportSource[];
}
