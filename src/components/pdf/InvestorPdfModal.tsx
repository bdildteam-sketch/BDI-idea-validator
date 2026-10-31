import React, { useState } from "react";
import { InvestorReportData } from "../../types/investorReport";
import { InvestorReportDocument } from "./InvestorReportDocument";
import { generateAndDownloadInvestorPdf, PdfGenerationProgress } from "../../utils/pdfGenerator";
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  Check, 
  FileText, 
  Loader2, 
  Sparkles,
  ChevronDown
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  reportData: InvestorReportData | null;
}

export const InvestorPdfModal: React.FC<Props> = ({ isOpen, onClose, reportData }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState<PdfGenerationProgress | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !reportData) return null;

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      setDownloadSuccess(false);
      const fileName = `${reportData.businessName.replace(/[^a-zA-Z0-9_-]/g, "_")}_BDI_Validation_Report.pdf`;

      await generateAndDownloadInvestorPdf(
        reportData,
        fileName,
        (p) => setProgress(p)
      );

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error("Failed to generate PDF", err);
      window.print();
    } finally {
      setIsDownloading(false);
      setProgress(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static print:overflow-visible">
      {/* Container Dialog */}
      <div className="relative w-full max-w-5xl bg-[#0B0F19] text-white border border-white/20 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col print:border-none print:shadow-none print:max-h-none print:w-full print:rounded-none">
        
        {/* Modal Top Bar (hidden on print) */}
        <div className="px-6 py-4 bg-[#131926] text-white border-b border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-500 text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-white">
                  Plain English Validation Report
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-extrabold">
                  8-Page Institutional PDF
                </span>
              </div>
              <p className="text-xs text-white/80">
                Independent Feasibility & Viability Document • {reportData.businessName}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-colors"
              title="Copy shareable link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-white" />}
              <span className="text-white">{copiedLink ? "Link Copied!" : "Share"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-colors"
              title="Print or Save via Browser Vector PDF"
            >
              <Printer className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline text-white">Print</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-xs font-extrabold text-white border border-yellow-300/40 shadow-sm transition-all disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="text-white font-extrabold">Generating PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span className="text-white font-extrabold">Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-white" />
                  <span className="text-white font-extrabold">Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Progress Alert if generating */}
        {isDownloading && progress && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-6 py-2.5 flex items-center justify-between text-xs text-white font-semibold print:hidden">
            <div className="flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-400" />
              <span className="text-white">{progress.status}</span>
            </div>
            <span className="font-mono text-white">
              Page {progress.currentPage} of {progress.totalPages}
            </span>
          </div>
        )}

        {/* Document Scrollable Canvas Preview */}
        <div className="flex-1 overflow-y-auto bg-[#070A11] p-4 sm:p-8 print:p-0 print:bg-white print:overflow-visible">
          <div className="mb-4 flex items-center justify-between text-xs text-white/70 font-medium px-2 print:hidden">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-white">Scroll to preview all 8 pages with plain-English metrics</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-white/60">
              <span className="text-white/60">Standard A4 Output • 210 × 297 mm</span>
            </div>
          </div>

          {/* Real rendered report component */}
          <InvestorReportDocument data={reportData} id="investor-report-container" />
        </div>

        {/* Modal Bottom Footer (hidden on print) */}
        <div className="px-6 py-3.5 bg-[#131926] border-t border-white/15 flex items-center justify-between text-xs text-white print:hidden shrink-0">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span className="text-white font-medium">Ready for review, customer validation, and planning.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              className="font-extrabold text-yellow-400 hover:text-yellow-300 flex items-center gap-1 underline text-xs"
            >
              <span className="text-white">Download PDF File (.pdf)</span>
              <ChevronDown className="w-3.5 h-3.5 text-white" />
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-bold text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
