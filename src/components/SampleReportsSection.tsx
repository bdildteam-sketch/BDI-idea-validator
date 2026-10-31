import React, { useState } from "react";
import { SAMPLE_REPORTS } from "../data/sampleReports";
import { ValidationReport } from "../types/validation";
import { FileText, CheckCircle2, AlertTriangle, ArrowRight, Eye, ShieldCheck, Target, Layers, Globe, ExternalLink, Download } from "lucide-react";
import { InvestorPdfModal } from "./pdf/InvestorPdfModal";
import { createInvestorReportFromValidation } from "../utils/investorReportAdapter";

interface SampleReportsSectionProps {
  onOpenReportModal: (report: ValidationReport) => void;
  onOpenPdfReport?: (report: ValidationReport) => void;
}

export const SampleReportsSection: React.FC<SampleReportsSectionProps> = ({ onOpenReportModal, onOpenPdfReport }) => {
  const [selectedReportId, setSelectedReportId] = useState<string>(SAMPLE_REPORTS[0].id);
  const [pdfReportModal, setPdfReportModal] = useState<ValidationReport | null>(null);

  const activeReport = SAMPLE_REPORTS.find((r) => r.id === selectedReportId) || SAMPLE_REPORTS[0];

  return (
    <section id="sample-reports" className="py-20 md:py-28 relative border-t border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 border border-yellow-400 text-xs font-bold text-black uppercase tracking-wider shadow-sm">
            <FileText className="w-3.5 h-3.5 text-black" />
            <span>Interactive Sample Reports</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-black tracking-tight">
            Explore Real AI Validation Reports
          </h2>
          <p className="text-base sm:text-lg text-neutral-700">
            See the exact depth, statistical rigor, and investor-ready insights BDI Validator delivers.
          </p>
        </div>

        {/* Report Selector Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {SAMPLE_REPORTS.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReportId(report.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border-2 ${
                selectedReportId === report.id
                  ? "bg-yellow-400 text-black border-black shadow-md shadow-yellow-400/25"
                  : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border-neutral-300"
              }`}
            >
              <span>{report.title}</span>
              <span className={`font-mono text-xs font-extrabold px-1.5 py-0.5 rounded ${
                selectedReportId === report.id ? "bg-black text-yellow-400" : "bg-neutral-200 text-black"
              }`}>
                {report.viabilityScore}/100
              </span>
            </button>
          ))}
        </div>

        {/* Active Report Preview Card */}
        <div className="mt-8 rounded-3xl bg-neutral-50 border-2 border-black p-6 sm:p-10 shadow-xl space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-yellow-100 text-black border border-yellow-400">
                  {activeReport.industry}
                </span>
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-yellow-400 text-black border border-black">
                  Verdict: {activeReport.verdict}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-black">
                {activeReport.title}
              </h3>
              <p className="text-sm text-neutral-700 max-w-2xl font-medium">
                {activeReport.tagline}
              </p>
            </div>

            {/* Score box & CTA */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white border-2 border-black text-center px-6 shadow-sm">
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Viability Score</span>
                <div className="text-3xl font-extrabold font-display text-black font-mono">
                  {activeReport.viabilityScore}<span className="text-sm text-neutral-500 font-normal">/100</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    if (onOpenPdfReport) {
                      onOpenPdfReport(activeReport);
                    } else {
                      setPdfReportModal(activeReport);
                    }
                  }}
                  className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-yellow-400 font-extrabold text-xs transition-all flex items-center gap-2 border-2 border-black shadow-md hover:scale-[1.01]"
                >
                  <Download className="w-4 h-4 text-yellow-400" />
                  <span>Download Investor PDF</span>
                </button>

                <button
                  onClick={() => onOpenReportModal(activeReport)}
                  className="px-5 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-extrabold text-xs transition-all flex items-center gap-2 border-2 border-black shadow-md shadow-yellow-400/25 hover:scale-[1.01]"
                >
                  <Eye className="w-4 h-4 text-black" />
                  <span>Open Full Report</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-5 rounded-2xl bg-white border-2 border-neutral-200 space-y-2 shadow-sm">
            <span className="text-xs font-bold uppercase text-neutral-600 tracking-wider">Executive Synthesis</span>
            <p className="text-sm text-neutral-800 leading-relaxed font-normal">
              {activeReport.summary}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border-2 border-neutral-300 space-y-1 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-black">
                <div className="p-1 rounded bg-yellow-400 text-black">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <span>Total Addressable Market (TAM)</span>
              </div>
              <div className="text-2xl font-extrabold font-display text-black">{activeReport.marketSize.tam.value}</div>
              <p className="text-[11px] text-neutral-600 font-medium">{activeReport.marketSize.tam.details}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border-2 border-neutral-300 space-y-1 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-black">
                <div className="p-1 rounded bg-yellow-400 text-black">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span>Primary Competitors Mapped</span>
              </div>
              <div className="text-2xl font-extrabold font-display text-black">{activeReport.competitors.length} Key Incumbents</div>
              <p className="text-[11px] text-neutral-600 font-medium">{activeReport.competitors.map(c => c.name).join(", ")}</p>
            </div>

            <div className="p-4 rounded-xl bg-white border-2 border-neutral-300 space-y-1 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-black">
                <div className="p-1 rounded bg-yellow-400 text-black">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Year 1 Revenue Potential</span>
              </div>
              <div className="text-2xl font-extrabold font-display text-black">{activeReport.financials[0]?.revenue || "$250,000"}</div>
              <p className="text-[11px] text-neutral-600 font-medium">Targeting {activeReport.financials[0]?.customers || "100+ customers"}</p>
            </div>
          </div>

          {/* Green Flags vs Risk Flags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-black fill-yellow-400" />
                <span>Top Validated Green Flags</span>
              </div>
              <ul className="space-y-2">
                {activeReport.greenFlags.map((flag, idx) => (
                  <li key={idx} className="p-3 rounded-lg bg-white border border-neutral-300 text-xs text-neutral-800 font-medium flex items-start gap-2 shadow-sm">
                    <span className="text-yellow-500 font-bold">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-black fill-yellow-400" />
                <span>Critical Risk Flags to Solve</span>
              </div>
              <ul className="space-y-2">
                {activeReport.riskFlags.map((risk, idx) => (
                  <li key={idx} className="p-3 rounded-lg bg-white border border-neutral-300 text-xs text-neutral-800 font-medium flex items-start gap-2 shadow-sm">
                    <span className="text-yellow-500 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grounding & Cited Sources Strip */}
          {activeReport.sources && activeReport.sources.length > 0 && (
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-black mr-1">
                  <Globe className="w-3.5 h-3.5 text-black" />
                  <span>Verified Sources & Telemetry:</span>
                </div>
                {activeReport.sources.slice(0, 4).map((src) => (
                  <span
                    key={src.id}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-yellow-100 border border-yellow-400 text-black shadow-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black" />
                    {src.domain}
                  </span>
                ))}
                {activeReport.sources.length > 4 && (
                  <span className="text-[11px] text-neutral-600 font-mono font-bold">
                    +{activeReport.sources.length - 4} more
                  </span>
                )}
              </div>

              <button
                onClick={() => onOpenReportModal(activeReport)}
                className="text-xs font-extrabold text-black hover:underline transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto"
              >
                <span>Inspect All Evidence & Findings</span>
                <ArrowRight className="w-3 h-3 text-black" />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Investor PDF Report Modal */}
      {pdfReportModal && (
        <InvestorPdfModal
          isOpen={!!pdfReportModal}
          onClose={() => setPdfReportModal(null)}
          reportData={createInvestorReportFromValidation(pdfReportModal)}
        />
      )}
    </section>
  );
};
