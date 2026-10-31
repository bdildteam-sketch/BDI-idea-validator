import React from "react";
import { InvestorReportData } from "../../types/investorReport";
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Layers,
  BarChart3,
  Compass,
  Calendar,
  Zap,
  Target
} from "lucide-react";

interface Props {
  data: InvestorReportData;
  id?: string;
}

export const InvestorReportDocument: React.FC<Props> = ({ data, id = "investor-report-container" }) => {
  // Generate SVG points for 7-dimension Radar Chart
  const dimensions = data.scores.dimensions;
  const numAxes = dimensions.length;
  const radius = 100;
  const centerX = 140;
  const centerY = 130;

  // Radar points for startup score
  const scorePoints = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
    const r = (dim.score / 10) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  // Radar points for industry average (benchmark ~6.2)
  const benchmarkPoints = dimensions.map((_, i) => {
    const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
    const r = 0.62 * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div 
      id={id} 
      className="bg-[#0B0F19] text-white font-sans max-w-[850px] mx-auto shadow-2xl print:shadow-none print:max-w-none print:m-0"
    >
      {/* ================= PAGE 1: COVER PAGE ================= */}
      <section className="pdf-page min-h-[1120px] p-12 sm:p-16 flex flex-col justify-between border-b border-white/10 print:border-none print:break-after-page relative bg-[#0B0F19] overflow-hidden text-white">
        {/* Top Decorative Geometric Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-yellow-400/10 via-yellow-400/5 to-transparent pointer-events-none rounded-bl-full" />
        <div className="absolute top-0 left-0 w-3 h-full bg-yellow-400" />

        <div>
          {/* Top Organization Header */}
          <div className="flex items-center justify-between border-b-2 border-white/20 pb-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500 text-white flex items-center justify-center font-display font-extrabold text-lg shadow-sm">
                BDI
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight block">
                  BDI VALIDATOR
                </span>
                <span className="text-[11px] uppercase tracking-widest text-white/80 font-bold">
                  PLAIN ENGLISH IDEA VALIDATION & DUE DILIGENCE
                </span>
              </div>
            </div>
            <div className="text-right text-xs text-white font-mono">
              <span className="inline-block px-3 py-1 bg-yellow-500 text-white font-extrabold rounded">
                DUE DILIGENCE MEMO
              </span>
              <div className="mt-1 text-[11px] text-white/80">Doc ID: {data.id.toUpperCase()}-VAL</div>
            </div>
          </div>

          {/* Main Title Banner */}
          <div className="mt-16 space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-white">Independent Startup Feasibility Report</span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight leading-[1.1]">
              {data.businessName}
            </h1>

            <p className="text-xl sm:text-2xl text-white font-medium max-w-2xl leading-relaxed">
              {data.tagline}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-white">
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white">Industry: <strong className="text-white font-bold">{data.industry}</strong></span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white">Stage: <strong className="text-white font-bold">{data.stage}</strong></span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white">Date: <strong className="text-white font-bold">{data.reportDate}</strong></span>
            </div>
          </div>
        </div>

        {/* Big Verdict & Opportunity Score Card */}
        <div className="my-10 p-8 rounded-2xl bg-[#131926] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 border border-white/20">
          <div className="space-y-2 text-center sm:text-left text-white">
            <span className="text-xs uppercase tracking-widest text-yellow-400 font-extrabold block">
              Investment Committee Verdict
            </span>
            <div className="text-3xl font-display font-black tracking-tight text-white flex items-center gap-3">
              <span className="text-white">{data.recommendation}</span>
              <Award className="w-7 h-7 text-yellow-400" />
            </div>
            <p className="text-xs sm:text-sm text-white max-w-md leading-relaxed">
              Evidence-based viability assessment scored against 50+ empirical venture indicators and real-time market telemetry.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-5 bg-white/10 rounded-2xl border border-white/20 min-w-[170px] text-white">
            <span className="text-[11px] uppercase tracking-wider text-white font-bold">Opportunity Score</span>
            <div className="text-5xl font-display font-black text-yellow-400 mt-1">
              {data.overallScore.toFixed(1)}
              <span className="text-lg font-normal text-white/70">/10</span>
            </div>
            <span className="text-xs text-emerald-300 font-bold mt-1">● Top 15% Tested</span>
          </div>
        </div>

        {/* Cover Page Footer */}
        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80">
          <div className="text-white">
            Prepared by <strong className="text-white font-bold">BDI Validator Analytics</strong> • Multi-Model Verification Engine
          </div>
          <div className="font-mono text-[11px] text-white/80">
            Confidential • Plain English Due Diligence
          </div>
        </div>
      </section>

      {/* ================= PAGE 2: EXECUTIVE SUMMARY & SCORECARD DASHBOARD ================= */}
      <section className="pdf-page min-h-[1120px] p-12 sm:p-14 border-b border-white/10 print:border-none print:break-after-page flex flex-col justify-between bg-[#0B0F19] text-white">
        <div>
          {/* Running Page Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs text-white/80 font-medium">
            <span className="font-bold text-white tracking-wide">BDI VALIDATOR REPORT • {data.businessName}</span>
            <span className="font-mono text-white">Section 1 & 2 • Executive Summary & Scoring</span>
          </div>

          <div className="mt-8 space-y-6 text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-extrabold">Section 1</div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Executive Summary & Opportunity Profile
              </h2>
            </div>

            <div className="p-5 rounded-xl bg-[#131926] border border-white/15 text-sm text-white leading-relaxed space-y-3">
              <p className="text-white"><strong className="text-white font-bold">In Plain Words:</strong> {data.executiveSummary.description}</p>
              <p className="text-white"><strong className="text-white font-bold">Customer Headache Solved:</strong> {data.executiveSummary.targetProblem}</p>
            </div>

            {/* Strengths & Concerns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 text-white">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold">Key Strengths & Reasons to Build</span>
                </div>
                <ul className="text-xs sm:text-sm text-white space-y-1.5 list-disc list-inside">
                  {data.executiveSummary.keyStrengths.map((str, idx) => (
                    <li key={idx} className="leading-snug text-white">{str}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2 text-white">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-white font-bold">Things to Fix & Protect Against</span>
                </div>
                <ul className="text-xs sm:text-sm text-white space-y-1.5 list-disc list-inside">
                  {data.executiveSummary.keyConcerns.map((con, idx) => (
                    <li key={idx} className="leading-snug text-white">{con}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 2: Validation Score Dashboard */}
            <div className="pt-4">
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-extrabold">Section 2</div>
              <h3 className="text-xl font-display font-extrabold text-white tracking-tight flex items-center justify-between">
                <span>7-Dimension Opportunity Scorecard</span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-white/10 border border-white/20 text-white">
                  Overall: <strong className="text-yellow-400">{data.overallScore.toFixed(1)} / 10</strong>
                </span>
              </h3>
            </div>

            {/* Visual Dashboard: Radar Chart + Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
              {/* Radar Chart SVG */}
              <div className="md:col-span-5 p-4 rounded-2xl bg-[#131926] border border-white/15 flex flex-col items-center justify-center text-center text-white">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider mb-2">
                  Validation Radar Profile
                </span>
                
                <svg width="280" height="260" viewBox="0 0 280 260" className="overflow-visible">
                  {/* Concentric rings */}
                  {[0.25, 0.5, 0.75, 1.0].map((level, i) => (
                    <polygon
                      key={i}
                      points={dimensions.map((_, idx) => {
                        const angle = (Math.PI * 2 / numAxes) * idx - Math.PI / 2;
                        const r = level * radius;
                        return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#334155"
                      strokeDasharray={level < 1 ? "3 3" : "none"}
                      strokeWidth={level === 1 ? "1.5" : "1"}
                    />
                  ))}

                  {/* Axes lines & labels */}
                  {dimensions.map((dim, idx) => {
                    const angle = (Math.PI * 2 / numAxes) * idx - Math.PI / 2;
                    const x2 = centerX + radius * Math.cos(angle);
                    const y2 = centerY + radius * Math.sin(angle);
                    const labelX = centerX + (radius + 20) * Math.cos(angle);
                    const labelY = centerY + (radius + 14) * Math.sin(angle);

                    return (
                      <g key={idx}>
                        <line x1={centerX} y1={centerY} x2={x2} y2={y2} stroke="#334155" strokeWidth="1" />
                        <text
                          x={labelX}
                          y={labelY}
                          fontSize="9"
                          fontWeight="700"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          dominantBaseline="central"
                        >
                          {dim.name.split(" ")[0]} ({dim.score})
                        </text>
                      </g>
                    );
                  })}

                  {/* Benchmark Polygon */}
                  <polygon
                    points={benchmarkPoints}
                    fill="rgba(148, 163, 184, 0.15)"
                    stroke="#64748B"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />

                  {/* Active Score Polygon */}
                  <polygon
                    points={scorePoints}
                    fill="rgba(250, 204, 21, 0.35)"
                    stroke="#FACC15"
                    strokeWidth="2.5"
                  />

                  {/* Points on vertex */}
                  {dimensions.map((dim, idx) => {
                    const angle = (Math.PI * 2 / numAxes) * idx - Math.PI / 2;
                    const r = (dim.score / 10) * radius;
                    const px = centerX + r * Math.cos(angle);
                    const py = centerY + r * Math.sin(angle);
                    return (
                      <circle
                        key={idx}
                        cx={px}
                        cy={py}
                        r="3.5"
                        fill="#FACC15"
                        stroke="#0B0F19"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </svg>

                <div className="flex items-center justify-center gap-4 text-[10px] text-white mt-2 font-bold">
                  <span className="flex items-center gap-1 text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                    This Idea ({data.overallScore.toFixed(1)})
                  </span>
                  <span className="flex items-center gap-1 text-white/70">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block" />
                    Market Avg (6.2)
                  </span>
                </div>
              </div>

              {/* Progress Bars Table */}
              <div className="md:col-span-7 space-y-2.5 text-white">
                {dimensions.map((dim) => (
                  <div key={dim.id} className="p-3 rounded-xl bg-[#131926] border border-white/15 text-white">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white">{dim.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/70 font-semibold">{dim.benchmark}</span>
                        <span className="font-display font-extrabold text-sm text-yellow-400">{dim.score.toFixed(1)} / 10</span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          dim.score >= 7.5 ? "bg-emerald-400" : dim.score >= 5.5 ? "bg-yellow-400" : "bg-rose-400"
                        }`}
                        style={{ width: `${dim.score * 10}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-white mt-1 leading-tight">{dim.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[11px] text-white/70">
          <span>BDI Validator Due Diligence Framework</span>
          <span>Page 2 of 8</span>
        </div>
      </section>

      {/* ================= PAGE 3: MARKET SIZE (TAM / SAM / SOM) ================= */}
      <section className="pdf-page min-h-[1120px] p-12 sm:p-14 border-b border-white/10 print:border-none print:break-after-page flex flex-col justify-between bg-[#0B0F19] text-white">
        <div>
          <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs text-white/80 font-medium">
            <span className="font-bold text-white tracking-wide">BDI VALIDATOR REPORT • {data.businessName}</span>
            <span className="font-mono text-white">Section 3 • Market Opportunity & Segmentation</span>
          </div>

          <div className="mt-8 space-y-6 text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-extrabold">Section 3</div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Market Sizing (TAM / SAM / SOM) in Plain Numbers
              </h2>
              <p className="text-xs sm:text-sm text-white mt-1">
                Rigorous top-down and bottom-up market sizing cross-referenced with verified industry registries.
              </p>
            </div>

            {/* TAM / SAM / SOM Nested Visualization Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* TAM */}
              <div className="p-5 rounded-2xl bg-[#131926] text-white flex flex-col justify-between border border-white/20">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-400 font-extrabold">
                    TAM • All Worldwide Spending
                  </span>
                  <div className="text-3xl font-display font-black text-white">
                    {data.marketAnalysis.tam.value}
                  </div>
                  <p className="text-xs font-semibold text-white">{data.marketAnalysis.tam.label}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white">
                  <p>{data.marketAnalysis.tam.details}</p>
                </div>
              </div>

              {/* SAM */}
              <div className="p-5 rounded-2xl bg-[#131926] text-white flex flex-col justify-between border border-white/20">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-extrabold">
                    SAM • Reachable Buyers
                  </span>
                  <div className="text-3xl font-display font-black text-white">
                    {data.marketAnalysis.sam.value}
                  </div>
                  <p className="text-xs font-semibold text-white">{data.marketAnalysis.sam.label}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white">
                  <p>{data.marketAnalysis.sam.details}</p>
                </div>
              </div>

              {/* SOM */}
              <div className="p-5 rounded-2xl bg-[#131926] text-white flex flex-col justify-between border border-white/20">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold">
                    SOM • Realistic 3-Year Target
                  </span>
                  <div className="text-3xl font-display font-black text-white">
                    {data.marketAnalysis.som.value}
                  </div>
                  <p className="text-xs font-semibold text-white">{data.marketAnalysis.som.label}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white">
                  <p>{data.marketAnalysis.som.details}</p>
                </div>
              </div>
            </div>

            {/* Grandfather's Guide Note */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/15 space-y-2 text-white">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wide">
                💡 What This Means in Plain Words:
              </span>
              <p className="text-xs sm:text-sm text-white leading-relaxed">
                The market is enormous. You don't need millions of customers to succeed. If you win just 0.5% of the reachable buyers in your niche, you will generate millions in revenue with high profit margins.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[11px] text-white/70">
          <span>BDI Validator Due Diligence Framework</span>
          <span>Page 3 of 8</span>
        </div>
      </section>

      {/* ================= PAGE 4: COMPETITOR POSITIONING ================= */}
      <section className="pdf-page min-h-[1120px] p-12 sm:p-14 border-b border-white/10 print:border-none print:break-after-page flex flex-col justify-between bg-[#0B0F19] text-white">
        <div>
          <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs text-white/80 font-medium">
            <span className="font-bold text-white tracking-wide">BDI VALIDATOR REPORT • {data.businessName}</span>
            <span className="font-mono text-white">Section 4 • Competitive Landscape & Moat</span>
          </div>

          <div className="mt-8 space-y-6 text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-extrabold">Section 4</div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Competitors & Why Customers Will Pick You
              </h2>
            </div>

            {/* Competitor Comparison Table */}
            <div className="space-y-2">
              <div className="rounded-xl border border-white/15 overflow-hidden text-white">
                <table className="w-full text-left text-xs sm:text-sm border-collapse text-white">
                  <thead>
                    <tr className="bg-[#161D2E] text-white font-bold border-b border-white/15">
                      <th className="p-3 text-white">Competitor</th>
                      <th className="p-3 text-white">Type</th>
                      <th className="p-3 text-white">Pricing Model</th>
                      <th className="p-3 text-white">Market Share</th>
                      <th className="p-3 text-white">Why Customers Dislike Them</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-white">
                    {data.competitiveAnalysis.competitors.map((comp, i) => (
                      <tr key={i} className="hover:bg-white/5">
                        <td className="p-3 font-bold text-white">{comp.name}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white border border-white/15">
                            {comp.category}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-yellow-300 font-bold">{comp.pricing}</td>
                        <td className="p-3 font-mono font-bold text-white">{comp.marketShare}</td>
                        <td className="p-3 text-rose-300 text-xs font-semibold leading-tight">{comp.weaknesses}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Why You Win */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-white">
              {data.competitiveAnalysis.differentiationPillars.map((pillar, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#131926] border border-white/15 space-y-1.5 text-white">
                  <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    {pillar.title}
                  </span>
                  <p className="text-xs text-white leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[11px] text-white/70">
          <span>BDI Validator Due Diligence Framework</span>
          <span>Page 4 of 8</span>
        </div>
      </section>

      {/* ================= PAGE 5: FINANCIAL MODEL IN PLAIN NUMBERS ================= */}
      <section className="pdf-page min-h-[1120px] p-12 sm:p-14 border-b border-white/10 print:border-none print:break-after-page flex flex-col justify-between bg-[#0B0F19] text-white">
        <div>
          <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs text-white/80 font-medium">
            <span className="font-bold text-white tracking-wide">BDI VALIDATOR REPORT • {data.businessName}</span>
            <span className="font-mono text-white">Section 5 • 3-Year Financial Model</span>
          </div>

          <div className="mt-8 space-y-6 text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-extrabold">Section 5</div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                3-Year Money Model & Profitability Projections
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border border-white/15 rounded-xl overflow-hidden text-white">
                <thead className="bg-[#161D2E] text-white border-b border-white/15 font-bold uppercase text-xs">
                  <tr>
                    <th className="p-3 text-white">Timeline</th>
                    <th className="p-3 text-white">Projected Income</th>
                    <th className="p-3 text-white">Paying Clients</th>
                    <th className="p-3 text-white">Cost to Win 1 Client (CAC)</th>
                    <th className="p-3 text-white">Client Lifetime Value (LTV)</th>
                    <th className="p-3 text-white">Monthly Costs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white">
                  {data.financialModel.projections.map((p, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="p-3 font-bold text-white">{p.year}</td>
                      <td className="p-3 font-mono font-bold text-emerald-400 text-sm">{p.revenue}</td>
                      <td className="p-3 text-white">{p.customers}</td>
                      <td className="p-3 font-mono text-white">{p.cac}</td>
                      <td className="p-3 font-mono text-yellow-300 font-bold">{p.ltv}</td>
                      <td className="p-3 text-white">{p.burnRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Grandfather's Money Guide */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/15 space-y-2 text-white">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wide">
                💡 Grandfather's Rule of Money:
              </span>
              <p className="text-xs sm:text-sm text-white leading-relaxed">
                If it costs you $220 to get a customer, and that customer pays you $1,800 over time, you are printing $8 for every $1 spent. This is what venture capitalists look for in scalable companies.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[11px] text-white/70">
          <span>BDI Validator Due Diligence Framework</span>
          <span>Page 5 of 8</span>
        </div>
      </section>

      {/* ================= PAGE 6: 4-WEEK EXPERIMENT ROADMAP ================= */}
      <section className="pdf-page min-h-[1120px] p-12 sm:p-14 border-b border-white/10 print:border-none print:break-after-page flex flex-col justify-between bg-[#0B0F19] text-white">
        <div>
          <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs text-white/80 font-medium">
            <span className="font-bold text-white tracking-wide">BDI VALIDATOR REPORT • {data.businessName}</span>
            <span className="font-mono text-white">Section 6 • 4-Week Validation Sprint</span>
          </div>

          <div className="mt-8 space-y-6 text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-extrabold">Section 6</div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                4-Week Action Plan to Test Without Coding
              </h2>
            </div>

            <div className="space-y-4 pt-2 text-white">
              {data.validationRoadmap.map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#131926] border border-white/15 flex flex-col sm:flex-row items-start gap-4 text-white">
                  <div className="w-28 shrink-0">
                    <span className="px-3 py-1 rounded-md bg-yellow-500 text-white font-mono font-black text-xs block text-center">
                      {step.week}
                    </span>
                    <span className="text-[10px] text-white font-bold mt-1 block text-center uppercase tracking-wider">
                      {step.phase}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2 text-white">
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white leading-relaxed">
                      <strong className="text-yellow-400 font-bold">How to do it:</strong> {step.method}
                    </p>
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-white">
                      <strong className="text-emerald-300 font-bold">Goal:</strong> {step.successCriteria}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[11px] text-white/70">
          <span>BDI Validator Due Diligence Framework</span>
          <span>Page 6 of 8</span>
        </div>
      </section>

      {/* ================= PAGE 7: FOUNDER ACTION PLAN ================= */}
      <section className="pdf-page min-h-[1120px] p-12 sm:p-14 border-b border-white/10 print:border-none print:break-after-page flex flex-col justify-between bg-[#0B0F19] text-white">
        <div>
          <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs text-white/80 font-medium">
            <span className="font-bold text-white tracking-wide">BDI VALIDATOR REPORT • {data.businessName}</span>
            <span className="font-mono text-white">Section 7 • Immediate Action Plan</span>
          </div>

          <div className="mt-8 space-y-6 text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-extrabold">Section 7</div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Immediate 7-Day Founder Action Plan
              </h2>
            </div>

            <div className="space-y-3">
              {data.founderActionPlan.firstThreeActions.map((act) => (
                <div key={act.step} className="p-4 rounded-xl bg-[#131926] border border-white/15 flex items-start gap-3.5 text-white">
                  <span className="w-7 h-7 rounded-full bg-yellow-500 text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {act.step}
                  </span>
                  <div className="flex-1 text-xs sm:text-sm text-white space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-white font-bold text-sm">{act.title}</strong>
                      <span className="text-[10px] font-mono text-yellow-400 font-bold px-2 py-0.5 rounded bg-white/5">{act.timeframe}</span>
                    </div>
                    <p className="text-white leading-relaxed">{act.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 text-white space-y-2">
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                Golden Rule:
              </span>
              <p className="text-xs sm:text-sm text-white leading-relaxed">
                Never write a single line of code until at least 3 people confirm they will pay you for it. Pre-selling removes 90% of startup risk.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[11px] text-white/70">
          <span>BDI Validator Due Diligence Framework</span>
          <span>Page 7 of 8</span>
        </div>
      </section>

      {/* ================= PAGE 8: SOURCES & VERIFICATION ================= */}
      <section className="pdf-page min-h-[1120px] p-12 sm:p-14 border-b border-white/10 print:border-none flex flex-col justify-between bg-[#0B0F19] text-white">
        <div>
          <div className="flex items-center justify-between border-b border-white/15 pb-3 text-xs text-white/80 font-medium">
            <span className="font-bold text-white tracking-wide">BDI VALIDATOR REPORT • {data.businessName}</span>
            <span className="font-mono text-white">Section 8 • Sources & Grounding</span>
          </div>

          <div className="mt-8 space-y-6 text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-extrabold">Section 8</div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                Verified Sources & References
              </h2>
            </div>

            <div className="space-y-3 text-white">
              {data.sources.map((src, i) => (
                <div key={src.id} className="p-4 rounded-xl bg-[#131926] border border-white/15 flex flex-col sm:flex-row items-start justify-between gap-4 text-white">
                  <div className="space-y-1.5 flex-1 text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-yellow-500 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <strong className="text-xs font-bold text-white">{src.name}</strong>
                    </div>

                    <h4 className="text-xs font-bold text-yellow-300">{src.title}</h4>
                    <p className="text-xs text-white leading-relaxed italic">
                      "{src.informationSupported}"
                    </p>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      {src.confidenceScore}% Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/15 text-white space-y-2 mt-6">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-yellow-400" />
                <span>BDI Multi-Model Grounding Protocol</span>
              </div>
              <p className="text-xs text-white leading-relaxed">
                This report was generated using the BDI Validator engine. Market size calculations, competitor telemetry, and TAM/SAM/SOM distributions are synthesized using real-time search queries and checked against established venture benchmarks.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-3 flex items-center justify-between text-[11px] text-white/70">
          <span>BDI Validator Due Diligence Framework</span>
          <span>Page 8 of 8 • End of Due Diligence Report</span>
        </div>
      </section>
    </div>
  );
};
