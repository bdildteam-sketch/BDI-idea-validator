import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { FocusedLandingSection } from "./components/FocusedLandingSection";
import { Footer } from "./components/Footer";
import { LiveValidatorModal } from "./components/LiveValidatorModal";
import { AuthModal } from "./components/AuthModal";
import { ValidationReport } from "./types/validation";
import { SAMPLE_REPORTS } from "./data/sampleReports";
import { InvestorPdfModal } from "./components/pdf/InvestorPdfModal";
import { createInvestorReportFromValidation } from "./utils/investorReportAdapter";

export default function App() {
  const [validatorOpen, setValidatorOpen] = useState(false);
  const [validatorPrompt, setValidatorPrompt] = useState("");
  const [validatorIndustry, setValidatorIndustry] = useState("B2B SaaS");
  const [selectedReport, setSelectedReport] = useState<ValidationReport | null>(null);
  const [investorPdfReport, setInvestorPdfReport] = useState<ValidationReport | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleStartValidation = (prompt?: string, industry?: string) => {
    setSelectedReport(null);
    setValidatorPrompt(prompt || "AI automated contract reviewer for small businesses");
    setValidatorIndustry(industry || "B2B SaaS");
    setValidatorOpen(true);
  };

  const handleSelectSampleReport = (reportId: string) => {
    const found = SAMPLE_REPORTS.find((r) => r.id === reportId);
    if (found) {
      setSelectedReport(found);
      setValidatorPrompt(found.tagline);
      setValidatorIndustry(found.industry);
      setValidatorOpen(true);
    }
  };

  const handleOpenReportModal = (report: ValidationReport) => {
    setSelectedReport(report);
    setValidatorPrompt(report.tagline);
    setValidatorIndustry(report.industry);
    setValidatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      {/* Sticky Navigation */}
      <Navbar
        onStartValidation={handleStartValidation}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Single-Focused Landing Section */}
      <main className="flex-1">
        <FocusedLandingSection
          onValidateIdea={(prompt, industry) => handleStartValidation(prompt, industry)}
          onSelectSampleReport={handleSelectSampleReport}
        />
      </main>

      {/* Footer */}
      <Footer onStartValidation={() => handleStartValidation()} />

      {/* Live AI Validation Interactive Modal */}
      <LiveValidatorModal
        isOpen={validatorOpen}
        onClose={() => setValidatorOpen(false)}
        initialPrompt={validatorPrompt}
        initialIndustry={validatorIndustry}
        initialReport={selectedReport}
        onOpenPdfReport={(report) => setInvestorPdfReport(report)}
      />

      {/* Auth / Account Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(email) => {
          setUserEmail(email);
        }}
      />

      {/* Top-Level Investor PDF Report Modal */}
      {investorPdfReport && (
        <InvestorPdfModal
          isOpen={!!investorPdfReport}
          onClose={() => setInvestorPdfReport(null)}
          reportData={createInvestorReportFromValidation(investorPdfReport)}
        />
      )}
    </div>
  );
}
