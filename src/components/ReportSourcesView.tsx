import React, { useState } from "react";
import { 
  Globe, ExternalLink, CheckCircle2, Copy, Check, ShieldCheck, 
  Database, Search, Filter, BookOpen, Layers, Sparkles, ArrowUpRight 
} from "lucide-react";
import { ResearchSource } from "../types/validation";

interface ReportSourcesViewProps {
  sources: ResearchSource[];
  reportTitle?: string;
  isCompact?: boolean;
}

export const ReportSourcesView: React.FC<ReportSourcesViewProps> = ({
  sources,
  reportTitle,
  isCompact = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedBibliography, setCopiedBibliography] = useState(false);

  const categories = ["all", ...Array.from(new Set(sources.map((s) => s.category)))];

  const filteredSources = selectedCategory === "all" 
    ? sources 
    : sources.filter((s) => s.category === selectedCategory);

  const handleCopyBibliography = () => {
    const bibText = sources
      .map((s, idx) => `[${idx + 1}] ${s.name} (${s.domain})\nURL: ${s.url}\nCategory: ${s.category} | Confidence: ${s.confidence}%\nKey Evidence: "${s.keyFinding}"\nVerified: ${s.crawledDate}`)
      .join("\n\n");
    
    navigator.clipboard.writeText(
      `RESEARCH SOURCES & LIVE GROUNDING - ${reportTitle || "Startup Validation Report"}\n` +
      `Synthesized by BDI Validator Multi-Model Engine\n` +
      `====================================================\n\n` +
      bibText
    );
    setCopiedBibliography(true);
    setTimeout(() => setCopiedBibliography(false), 2200);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Market Intelligence":
        return "bg-blue-500/20 text-white border-blue-400/40";
      case "Competitor Intelligence":
        return "bg-purple-500/20 text-white border-purple-400/40";
      case "Search Volume & Demand":
        return "bg-emerald-500/20 text-white border-emerald-400/40";
      case "Customer Sentiment":
        return "bg-amber-500/20 text-white border-amber-400/40";
      case "Pricing Benchmark":
        return "bg-rose-500/20 text-white border-rose-400/40";
      default:
        return "bg-indigo-500/20 text-white border-indigo-400/40";
    }
  };

  return (
    <div className="space-y-5 text-white">
      {/* Header with stats & actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/40 border border-white/20 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
            <Globe className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display font-bold text-white text-base">
                Verified Research Sources & Citations
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 border border-emerald-500/30 text-white">
                {sources.length} Grounded Sources
              </span>
            </div>
            <p className="text-xs text-white">
              Live web telemetry, market indices, competitor registries, and qualitative customer reviews.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyBibliography}
          className="self-start sm:self-center px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-2 shrink-0 border border-white/20"
          title="Copy formatted citations for pitch deck or investor memo"
        >
          {copiedBibliography ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
              <span className="text-emerald-300 font-bold">Citations Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-white" />
              <span className="text-white">Copy Bibliography</span>
            </>
          )}
        </button>
      </div>

      {/* Filter Tabs if not compact */}
      {!isCompact && categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <div className="flex items-center gap-1.5 text-white font-bold mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-white" />
            <span className="text-white">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap capitalize text-white ${
                selectedCategory === cat
                  ? "bg-yellow-500 text-white border-yellow-400 font-black shadow-sm"
                  : "bg-white/5 border-white/15 text-white hover:bg-white/10"
              }`}
            >
              {cat === "all" ? `All Sources (${sources.length})` : cat}
            </button>
          ))}
        </div>
      )}

      {/* Sources Grid */}
      <div className="grid grid-cols-1 gap-3.5 text-white">
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className="p-4 rounded-xl bg-white/[0.04] border border-white/15 hover:border-white/30 transition-all space-y-3 group text-white"
          >
            {/* Top row: Category, Domain, Confidence, External Link */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border text-white ${getCategoryColor(source.category)}`}>
                  {source.category}
                </span>
                <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                  <Database className="w-3 h-3 text-yellow-400" />
                  <span className="text-white">{source.domain}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="text-white">{source.confidence}% Confidence</span>
                </div>
                <span className="text-[11px] text-white hidden sm:inline font-medium">
                  {source.crawledDate}
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-yellow-500 hover:text-white text-white transition-colors flex items-center gap-1 text-xs font-bold"
                  title={`Open source on ${source.domain}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px]">Visit</span>
                </a>
              </div>
            </div>

            {/* Source Title & Link */}
            <div className="space-y-1">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-bold text-sm sm:text-base text-white hover:text-yellow-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span className="text-white">{source.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-yellow-400 group-hover:text-yellow-300 transition-colors shrink-0" />
              </a>
              {source.publisher && (
                <div className="text-xs text-white/70">
                  Published by <strong className="text-white font-semibold">{source.publisher}</strong>
                  {source.sourceType && <span> • {source.sourceType}</span>}
                </div>
              )}
            </div>

            {/* What this source supports */}
            {source.supports && (
              <div className="px-3 py-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/25 text-xs text-yellow-300 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span><strong>Directly Supports:</strong> {source.supports}</span>
              </div>
            )}

            {/* Key Evidence Callout Box */}
            <div className="p-3.5 rounded-lg bg-black/60 border border-white/10 text-xs sm:text-sm space-y-1.5 text-white">
              <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Extracted Proof & Key Finding</span>
              </div>
              <p className="text-white leading-relaxed font-medium">
                "{source.keyFinding}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Grounding Transparency Card */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white flex items-start gap-3">
        <BookOpen className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-white">
          <span className="font-bold text-white">BDI Validator Multi-Model Grounding Protocol:</span>
          <p className="leading-relaxed text-white">
            All reports cross-verify statistics against primary data providers (Statista, Gartner, SEC EDGAR, Google Trends, ProductHunt, and GitHub API). Confidence ratings reflect the semantic concordance across models and statistical variance in live public pricing datasets.
          </p>
        </div>
      </div>
    </div>
  );
};
