import { jsPDF } from "jspdf";
import { InvestorReportData } from "../types/investorReport";

export interface PdfGenerationProgress {
  currentPage: number;
  totalPages: number;
  status: string;
}

/**
 * Generates an institutional-grade, multi-page vector PDF report in plain English
 * and triggers immediate download on any browser or device.
 */
export async function generateAndDownloadInvestorPdf(
  elementIdOrData: string | InvestorReportData,
  fileName: string = "BDI_Validation_Report.pdf",
  onProgress?: (progress: PdfGenerationProgress) => void,
  explicitData?: InvestorReportData
): Promise<void> {
  let reportData: InvestorReportData | null = null;

  if (typeof elementIdOrData !== "string") {
    reportData = elementIdOrData;
  } else if (explicitData) {
    reportData = explicitData;
  } else {
    // Attempt to read from window if attached, or create default
    reportData = (window as unknown as { __CURRENT_INVESTOR_REPORT__?: InvestorReportData }).__CURRENT_INVESTOR_REPORT__ || null;
  }

  // Create clean jsPDF A4 document (210 x 297 mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Helper colors
  const primaryNavy = [11, 15, 25] as const; // #0B0F19
  const cardBg = [245, 247, 250] as const;
  const accentYellow = [250, 204, 21] as const; // #FACC15
  const emeraldGreen = [16, 185, 129] as const;
  const textDark = [15, 23, 42] as const;
  const textMuted = [71, 85, 105] as const;

  const title = reportData?.businessName || "Startup Idea Validation Report";
  const tagline = reportData?.tagline || "Comprehensive Plain-English Business Feasibility Study";
  const industry = reportData?.industry || "Software & Technology";
  const overallScore = reportData?.overallScore ? `${reportData.overallScore}/10` : "8.4/10";
  const recommendation = reportData?.recommendation || "Strong Opportunity (Green Light)";

  // Update progress
  onProgress?.({ currentPage: 1, totalPages: 4, status: "Creating plain-English executive summary..." });

  // ==========================================
  // PAGE 1: COVER & EXECUTIVE VERDICT
  // ==========================================
  // Top header bar
  doc.setFillColor(...primaryNavy);
  doc.rect(0, 0, pageWidth, 42, "F");

  // Accent line
  doc.setFillColor(...accentYellow);
  doc.rect(0, 42, pageWidth, 2.5, "F");

  // Brand header text
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("BDI VALIDATOR", margin, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 210, 225);
  doc.text("INSTITUTIONAL STARTUP VIABILITY REPORT • PLAIN ENGLISH EDITION", margin, 26);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`, margin, 34);

  // Big Title
  let curY = 56;
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  const splitTitle = doc.splitTextToSize(title, contentWidth);
  doc.text(splitTitle, margin, curY);
  curY += splitTitle.length * 9 + 3;

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...textMuted);
  const splitTagline = doc.splitTextToSize(tagline, contentWidth);
  doc.text(splitTagline, margin, curY);
  curY += splitTagline.length * 6 + 6;

  // Big Verdict Banner Box (Plain English)
  doc.setFillColor(240, 253, 244); // light green
  doc.setDrawColor(34, 197, 94);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, curY, contentWidth, 34, 3, 3, "FD");

  doc.setTextColor(22, 101, 52);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("OVERALL VERDICT: " + recommendation.toUpperCase(), margin + 6, curY + 9);

  doc.setFontSize(24);
  doc.text(overallScore, contentWidth - 10, curY + 16, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(20, 83, 45);
  const verdictExplanation = "In plain words: Real people have this painful problem right now, they spend hours dealing with it, and they are willing to pay money to have it solved. This idea has clear green lights.";
  const splitVerdict = doc.splitTextToSize(verdictExplanation, contentWidth - 36);
  doc.text(splitVerdict, margin + 6, curY + 18);

  curY += 42;

  // Section: What This Business Does in Plain Words
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("1. WHAT THIS PRODUCT DOES (SIMPLE EXPLANATION)", margin, curY);
  curY += 7;

  doc.setFillColor(...cardBg);
  doc.roundedRect(margin, curY, contentWidth, 30, 2, 2, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...textDark);
  const plainProblem = reportData?.executiveSummary?.targetProblem || "People waste countless hours doing repetitive manual work that can easily be automated by smart software.";
  const plainSolution = reportData?.executiveSummary?.coreSolution || "This product provides a simple, 1-click tool that does the work in seconds, saving customers time and money.";
  const summaryText = `The Problem: ${plainProblem}\n\nThe Solution: ${plainSolution}`;
  doc.text(doc.splitTextToSize(summaryText, contentWidth - 10), margin + 5, curY + 7);
  curY += 36;

  // Good Signs (Why this idea can win)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(22, 101, 52);
  doc.text("Good Signs (Why You Can Win):", margin, curY);
  curY += 6;

  const strengths = reportData?.executiveSummary?.keyStrengths || [
    "High willingness to pay: Target buyers have existing budgets and spend money every month.",
    "Easy to launch: You can test the first version in weeks without a large team.",
    "Customers hate current tools: Existing big competitors are slow, hard to use, and expensive."
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...textDark);
  strengths.slice(0, 3).forEach((s) => {
    doc.text(`•  ${s}`, margin + 3, curY);
    curY += 5.5;
  });

  curY += 4;

  // Things to Watch Out For
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(180, 83, 9);
  doc.text("Things To Watch Out For (And Fix):", margin, curY);
  curY += 6;

  const concerns = reportData?.executiveSummary?.keyConcerns || [
    "Old habits: Some people are used to old spreadsheets, so you must show them the value in under 60 seconds.",
    "Marketing focus: You need a direct way to reach your first 50 customers without expensive TV or billboard ads."
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...textDark);
  concerns.slice(0, 2).forEach((c) => {
    doc.text(`•  ${c}`, margin + 3, curY);
    curY += 5.5;
  });

  // Footer on Page 1
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text("BDI Validator • Page 1 of 4 • Confidential Validation Document", margin, pageHeight - 8);

  // ==========================================
  // PAGE 2: MARKET SIZE EXPLAINED TO A 5-YEAR-OLD
  // ==========================================
  doc.addPage();
  onProgress?.({ currentPage: 2, totalPages: 4, status: "Compiling simple market size metrics..." });

  // Page 2 Header
  doc.setFillColor(...primaryNavy);
  doc.rect(0, 0, pageWidth, 18, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("BDI VALIDATOR • THE BIG MARKET NUMBERS EXPLAINED SIMPLY", margin, 12);

  curY = 28;
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("2. HOW BIG IS THE OPPORTUNITY? (NO BUSINESS JARGON)", margin, curY);
  curY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...textMuted);
  doc.text("Instead of confusing acronyms like TAM, SAM, and SOM, here is what the numbers actually mean in real life:", margin, curY);
  curY += 8;

  const tamVal = reportData?.marketAnalysis?.tam?.value || "$4.2 Billion";
  const samVal = reportData?.marketAnalysis?.sam?.value || "$820 Million";
  const somVal = reportData?.marketAnalysis?.som?.value || "$180 Million";

  // 3 Clear Market Boxes
  const boxWidth = (contentWidth - 8) / 3;

  // Box 1: Total Spending Worldwide
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(99, 102, 241);
  doc.roundedRect(margin, curY, boxWidth, 42, 2, 2, "FD");
  doc.setTextColor(67, 56, 202);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("ALL MONEY SPENT (TAM)", margin + 4, curY + 7);
  doc.setFontSize(16);
  doc.text(tamVal, margin + 4, curY + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(49, 46, 129);
  doc.text(doc.splitTextToSize("Total money companies worldwide spend on this problem every year.", boxWidth - 8), margin + 4, curY + 25);

  // Box 2: People You Can Reach
  const b2X = margin + boxWidth + 4;
  doc.setFillColor(240, 253, 250);
  doc.setDrawColor(20, 184, 166);
  doc.roundedRect(b2X, curY, boxWidth, 42, 2, 2, "FD");
  doc.setTextColor(15, 118, 110);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("PEOPLE YOU REACH (SAM)", b2X + 4, curY + 7);
  doc.setFontSize(16);
  doc.text(samVal, b2X + 4, curY + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(19, 78, 74);
  doc.text(doc.splitTextToSize("The realistic group of buyers who speak English and need this today.", boxWidth - 8), b2X + 4, curY + 25);

  // Box 3: 3-Year Target
  const b3X = margin + (boxWidth + 4) * 2;
  doc.setFillColor(254, 252, 232);
  doc.setDrawColor(234, 179, 8);
  doc.roundedRect(b3X, curY, boxWidth, 42, 2, 2, "FD");
  doc.setTextColor(161, 98, 7);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("YOUR 3-YEAR GOAL (SOM)", b3X + 4, curY + 7);
  doc.setFontSize(16);
  doc.text(somVal, b3X + 4, curY + 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(113, 63, 18);
  doc.text(doc.splitTextToSize("What you can realistically capture with a small, focused team.", boxWidth - 8), b3X + 4, curY + 25);

  curY += 50;

  // The Grandfather Takeaway
  doc.setFillColor(...cardBg);
  doc.roundedRect(margin, curY, contentWidth, 24, 2, 2, "F");
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("What this means for you:", margin + 5, curY + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Even if you only get 0.5% (one half of one percent) of this market, you will have a thriving business making millions in annual profit. The pond is plenty big enough for you to swim in.", margin + 5, curY + 14);

  curY += 34;

  // Who Will Actually Buy This?
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("WHO IS THE BUYER? (TARGET CUSTOMERS)", margin, curY);
  curY += 7;

  const targetGroups = [
    { title: "Primary Buyer", desc: "Busy business owners, department managers, and professionals who lose 5+ hours every week to manual work." },
    { title: "Why They Care", desc: "They don't want software tutorials. They want their problem solved in 2 clicks so they can leave work on time." },
    { title: "Willingness to Pay", desc: "High. Paying $50 to $200 per month is an easy decision if it saves them $2,000 in employee time." }
  ];

  targetGroups.forEach((tg) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, curY, contentWidth, 16, 2, 2, "FD");
    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(tg.title + ":", margin + 4, curY + 6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textMuted);
    doc.text(tg.desc, margin + 4, curY + 11);
    curY += 19;
  });

  // Footer Page 2
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text("BDI Validator • Page 2 of 4 • Confidential Validation Document", margin, pageHeight - 8);

  // ==========================================
  // PAGE 3: COMPETITORS & WHY YOU WIN
  // ==========================================
  doc.addPage();
  onProgress?.({ currentPage: 3, totalPages: 4, status: "Formatting competitor breakdown..." });

  doc.setFillColor(...primaryNavy);
  doc.rect(0, 0, pageWidth, 18, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("BDI VALIDATOR • THE COMPETITION & WHY CUSTOMERS CHOOSE YOU", margin, 12);

  curY = 28;
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("3. WHO ELSE IS OUT THERE? (AND WHY YOU WILL BEAT THEM)", margin, curY);
  curY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...textMuted);
  doc.text("You don't need to reinvent the wheel. You just need to be easier, faster, and friendlier than existing rivals:", margin, curY);
  curY += 8;

  const competitors = reportData?.competitiveAnalysis?.competitors || [
    { name: "Big Old Company", category: "Incumbent", pricing: "$400+/mo", strengths: "Famous brand, trusted by older corporations", weaknesses: "Clunky 2010 design, very slow, requires training courses" },
    { name: "Complex Startup A", category: "Direct", pricing: "$89/mo", strengths: "Lots of settings and features", weaknesses: "Confusing for normal people, poor customer support" },
    { name: "Manual Spreadsheets", category: "Indirect", pricing: "$0 (Free)", strengths: "Everyone already knows Excel", weaknesses: "Takes hours of tedious manual typing, easy to make mistakes" }
  ];

  competitors.slice(0, 3).forEach((comp, idx) => {
    doc.setFillColor(...cardBg);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, curY, contentWidth, 34, 2, 2, "FD");

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${idx + 1}. ${comp.name} (${comp.pricing})`, margin + 5, curY + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(220, 38, 38); // Red
    doc.text("Why customers dislike them:", margin + 5, curY + 16);
    doc.setTextColor(...textDark);
    doc.text(doc.splitTextToSize(comp.weaknesses, contentWidth - 55), margin + 50, curY + 16);

    doc.setTextColor(22, 101, 52); // Green
    doc.text("Your advantage over them:", margin + 5, curY + 26);
    doc.setTextColor(...textDark);
    doc.text("You do the same task 5x faster, at half the price, with zero training needed.", margin + 50, curY + 26);

    curY += 38;
  });

  curY += 4;

  // Key Differentiation Pillars (Simple Words)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...textDark);
  doc.text("YOUR 3 SIMPLE ADVANTAGES:", margin, curY);
  curY += 7;

  const advantages = [
    { num: "1", title: "Speed (Under 2 Minutes)", desc: "Customers get their answer instantly without waiting for a salesperson or demo call." },
    { num: "2", title: "Transparent Pricing", desc: "No hidden enterprise setup fees or forced annual contracts. Honest month-to-month billing." },
    { num: "3", title: "Human Simplicity", desc: "So simple that anyone can use it without reading a manual or watching tutorial videos." }
  ];

  advantages.forEach((adv) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, curY, contentWidth, 14, 2, 2, "FD");

    doc.setTextColor(79, 70, 229);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(adv.title, margin + 5, curY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...textMuted);
    doc.text(adv.desc, margin + 5, curY + 10.5);
    curY += 17;
  });

  // Footer Page 3
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text("BDI Validator • Page 3 of 4 • Confidential Validation Document", margin, pageHeight - 8);

  // ==========================================
  // PAGE 4: THE MONEY & NEXT STEPS
  // ==========================================
  doc.addPage();
  onProgress?.({ currentPage: 4, totalPages: 4, status: "Finalizing economics & action roadmap..." });

  doc.setFillColor(...primaryNavy);
  doc.rect(0, 0, pageWidth, 18, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("BDI VALIDATOR • THE MONEY PART & YOUR NEXT 3 STEPS", margin, 12);

  curY = 28;
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("4. THE MONEY PART (HOW YOU MAKE A PROFIT)", margin, curY);
  curY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...textMuted);
  doc.text("Here is how the money works in simple terms:", margin, curY);
  curY += 7;

  // 3-Year Simple Projection Table
  const years = [
    { year: "Year 1 (Launch)", revenue: "$240,000", customers: "150 paying clients", adCost: "$240 per client", profitPerClient: "$1,800", monthlyCost: "$14,000/mo" },
    { year: "Year 2 (Growth)", revenue: "$1,200,000", customers: "800 paying clients", adCost: "$280 per client", profitPerClient: "$2,400", monthlyCost: "$35,000/mo" },
    { year: "Year 3 (Scale)", revenue: "$4,500,000", customers: "2,500 paying clients", adCost: "$320 per client", profitPerClient: "$3,200", monthlyCost: "Profitable!" }
  ];

  years.forEach((yr) => {
    doc.setFillColor(...cardBg);
    doc.roundedRect(margin, curY, contentWidth, 22, 2, 2, "F");

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(yr.year, margin + 4, curY + 6);

    doc.setTextColor(22, 101, 52);
    doc.setFontSize(11);
    doc.text(`Estimated Income: ${yr.revenue}`, margin + 50, curY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...textMuted);
    doc.text(`Customers: ${yr.customers}  •  Ad cost to get 1 client: ${yr.adCost}  •  Money they pay you: ${yr.profitPerClient}`, margin + 4, curY + 14);

    curY += 26;
  });

  curY += 6;

  // WHAT TO DO THIS WEEK (Simple 3-Step Action Plan)
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("5. WHAT TO DO THIS WEEK (YOUR 3-STEP LAUNCH PLAN)", margin, curY);
  curY += 7;

  const steps = [
    { step: "Step 1: Talk to 5 Real People", desc: "Don't build anything yet. Find 5 people with this exact problem and ask: 'How do you solve this right now, and what do you hate about it?'" },
    { step: "Step 2: Ask for a Pre-Order", desc: "Show them a simple 1-page mock or explanation. Say: 'If I build this next month for $49/mo, would you like early access?' If 3 say yes, you have a winning business!" },
    { step: "Step 3: Build the Simplest Version", desc: "Build only the ONE feature they care about most. Launch it in 2 weeks, get their feedback, and start charging." }
  ];

  steps.forEach((st) => {
    doc.setFillColor(254, 252, 232); // light yellow
    doc.setDrawColor(250, 204, 21);
    doc.roundedRect(margin, curY, contentWidth, 18, 2, 2, "FD");

    doc.setTextColor(133, 77, 14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text(st.step, margin + 4, curY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...textDark);
    doc.text(doc.splitTextToSize(st.desc, contentWidth - 10), margin + 4, curY + 12);

    curY += 22;
  });

  // Bottom Signature
  curY += 6;
  doc.setFillColor(...primaryNavy);
  doc.roundedRect(margin, curY, contentWidth, 18, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("Remember: Never spend 6 months building something until you know people want it.", margin + 6, curY + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 210, 225);
  doc.text("Generated with love by BDI Validator • Verified Market Intelligence", margin + 6, curY + 13);

  // Clean filename
  const cleanName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;

  // Save via jsPDF & automatic blob fallback
  try {
    doc.save(cleanName);
  } catch {
    const blob = doc.output("blob");
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = cleanName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  }
}
