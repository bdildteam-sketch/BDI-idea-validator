import { ValidationReport } from "../types/validation";

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "How does the idea validation work?",
    answer: "We analyze real customer search data, examine direct competitors, and calculate financial projections so you can test your idea in under 60 seconds before writing code.",
    category: "General"
  },
  {
    question: "Can I download the report as a PDF?",
    answer: "Yes! Click the 'Download PDF' button to immediately save a complete vector PDF report to your computer or phone.",
    category: "Features"
  },
  {
    question: "Is my idea kept private?",
    answer: "Yes. All validation requests are private, encrypted, and never shared or used to train public models.",
    category: "Security"
  }
];

export const SAMPLE_REPORTS: ValidationReport[] = [
  {
    id: "doc-builder",
    title: "DocuCraft AI",
    tagline: "Turns Computer Code into Clear, Easy-to-Read Instruction Manuals in 60 Seconds",
    industry: "Software & Developer Tools",
    stage: "Idea Validation",
    viabilityScore: 78,
    verdict: "CONDITIONAL GO",
    summary: "In simple words: Programmers spend hours writing confusing manual instructions for other software developers, and it gets outdated quickly. DocuCraft reads their code automatically and writes clean, easy manuals with interactive test buttons. Software teams waste thousands of dollars doing this manually, so they are very happy to pay a monthly subscription to save time.",
    greenFlags: [
      "Huge Time Saver: Software teams lose 18+ hours every single month writing boring instruction manuals by hand.",
      "Proven Willingness to Pay: Tech companies already pay $200 to $1,500 every month for tools that help their developers.",
      "Free Word-of-Mouth Advertising: Every instruction manual created has a small badge saying 'Powered by DocuCraft', giving you free viral marketing.",
      "Fast Setup: A new customer pastes one link and gets their finished manual in 60 seconds."
    ],
    riskFlags: [
      "Existing Competitors: Big companies like GitBook and Mintlify exist, so you must focus on being faster and 5x easier to use.",
      "Security Concerns: Big corporations may hesitate to connect private code, so offer a secure private mode."
    ],
    metrics: [
      {
        name: "Do people actually want this? (Customer Demand)",
        score: 86,
        weight: 25,
        description: "Software companies complain that outdated manuals are their #1 headache when training new hires.",
        benchmark: "High Demand",
        status: "positive"
      },
      {
        name: "Will customers pay you? (Making Money)",
        score: 80,
        weight: 20,
        description: "Charging $99 to $299 every month per software team is very affordable for tech businesses.",
        benchmark: "Strong Profit",
        status: "positive"
      },
      {
        name: "Can rivals easily copy you? (Protection)",
        score: 68,
        weight: 20,
        description: "Your secret sauce is keeping manuals in sync automatically every time developers update their code.",
        benchmark: "Good Moat",
        status: "neutral"
      },
      {
        name: "How hard is it to build? (Simplicity)",
        score: 72,
        weight: 15,
        description: "A skilled programmer can build the first working version in about 3 to 4 weeks using modern AI tools.",
        benchmark: "Realistic to Build",
        status: "positive"
      },
      {
        name: "Why Now? (Market Timing)",
        score: 82,
        weight: 10,
        description: "Companies are building more software tools than ever before in history, making manuals essential.",
        benchmark: "Great Timing",
        status: "positive"
      },
      {
        name: "How easily can you reach buyers? (Finding Customers)",
        score: 74,
        weight: 10,
        description: "Developers hang out in public groups on GitHub, Twitter, and Reddit where you can show live demos.",
        benchmark: "Direct Outreach",
        status: "positive"
      }
    ],
    marketSize: {
      tam: { 
        value: "$14.2 Billion", 
        label: "Total Worldwide Spending", 
        details: "Total money companies worldwide spend on developer software and documentation tools each year." 
      },
      sam: { 
        value: "$2.8 Billion", 
        label: "Buyers You Can Actually Reach", 
        details: "Mid-sized software teams (20 to 500 programmers) who need easy documentation today." 
      },
      som: { 
        value: "$180 Million", 
        label: "Realistic 3-Year Goal", 
        details: "What you can realistically capture if just 1% to 2% of reachable software teams pick DocuCraft." 
      },
      cagr: "+21.4% Every Year",
      targetDemographic: "Engineering Team Leads, Chief Technology Officers (CTOs), Product Managers"
    },
    competitors: [
      {
        name: "Mintlify",
        type: "Direct",
        pricing: "$120 - $400/mo",
        strengths: ["Looks clean", "Well funded by venture investors"],
        weaknesses: ["Still requires manual typing", "Expensive for small teams"],
        marketShare: "22% of startups"
      },
      {
        name: "ReadMe.com",
        type: "Incumbent",
        pricing: "$99 - $2,000/mo",
        strengths: ["Big corporate customer base", "Been around for 10 years"],
        weaknesses: ["Clunky older design", "Slow customer support", "Very high pricing"],
        marketShare: "38% of mid-market"
      },
      {
        name: "Free Manual Notes (Markdown)",
        type: "Indirect",
        pricing: "Free ($0)",
        strengths: ["Free to write in text files"],
        weaknesses: ["Always gets out of date", "Nobody enjoys writing it", "Looks ugly to customers"],
        marketShare: "40% of small teams"
      }
    ],
    risks: [
      {
        category: "Execution",
        severity: "Medium",
        description: "Teams might just put off writing manuals because they are busy.",
        mitigation: "Show them that connecting their code takes only 60 seconds and builds the entire manual for them automatically."
      },
      {
        category: "Market",
        severity: "Medium",
        description: "Well-funded competitors can add similar AI features over time.",
        mitigation: "Focus on smaller teams and solo developers who want a quick 1-click solution without weeks of setup."
      }
    ],
    financials: [
      { year: "Year 1 (Launch)", revenue: "$240,000", customers: "120 software teams", cac: "$380 per team", ltv: "$2,400", burnRate: "$14,000/mo" },
      { year: "Year 2 (Growth)", revenue: "$1,150,000", customers: "480 software teams", cac: "$420 per team", ltv: "$3,600", burnRate: "$38,000/mo" },
      { year: "Year 3 (Scale)", revenue: "$3,800,000", customers: "1,250 software teams", cac: "$510 per team", ltv: "$4,800", burnRate: "Profitable & Cash-flow positive" }
    ],
    sources: [
      {
        id: "src-1-1",
        name: "Gartner Software Engineering Survey",
        publisher: "Gartner Research",
        domain: "gartner.com",
        url: "https://www.gartner.com",
        category: "Market Intelligence",
        sourceType: "Tier-1 Institutional Research",
        supports: "Supports TAM estimation ($14.2B) and onboarding time waste findings",
        keyFinding: "68% of tech managers report outdated software documentation is the #1 reason new engineering hires take over 4 months to reach full velocity.",
        confidence: 96,
        crawledDate: "Live Verified • Today"
      },
      {
        id: "src-1-2",
        name: "Stack Overflow Annual Developer Survey",
        publisher: "Stack Overflow",
        domain: "stackoverflow.blog",
        url: "https://stackoverflow.blog",
        category: "Customer Sentiment",
        sourceType: "Global Developer Benchmark",
        supports: "Supports 73% customer pain point regarding manual documentation fatigue",
        keyFinding: "73% of programmers find writing documentation tedious and manually intensive, with 81% expressing strong intent to adopt automated doc generation tools.",
        confidence: 95,
        crawledDate: "Live Verified • Today"
      },
      {
        id: "src-1-3",
        name: "GitHub State of the Octoverse Report",
        publisher: "GitHub / Microsoft",
        domain: "github.blog",
        url: "https://github.blog",
        category: "Search Volume & Demand",
        sourceType: "Industry Macro Trend",
        supports: "Supports 21.4% annual market growth rate and growing codebase volume",
        keyFinding: "Over 500 million new repositories and open-source packages created this year, expanding total documentation maintenance surface area by +32% YoY.",
        confidence: 97,
        crawledDate: "Live Verified • Today"
      },
      {
        id: "src-1-4",
        name: "Forrester Total Economic Impact of Developer Tools",
        publisher: "Forrester Research",
        domain: "forrester.com",
        url: "https://www.forrester.com",
        category: "Pricing Benchmark",
        sourceType: "Independent ROI Audit",
        supports: "Validates $99–$299/mo willingness to pay and 18+ hrs saved per month",
        keyFinding: "Automated developer documentation yields an average savings of 18 hours per engineer monthly, easily justifying $99–$400/month team software licenses.",
        confidence: 94,
        crawledDate: "Live Verified • Today"
      }
    ],
    brandStrategy: {
      archetype: "The Helpful Assistant",
      mission: "Free software teams from boring documentation forever.",
      voice: "Fast, friendly, clear, and reliable.",
      keyKeywords: ["Automatic", "60-Second Setup", "Always Up-To-Date", "Simple for Anyone"]
    }
  },
  {
    id: "clip-studio",
    title: "ClipForge AI",
    tagline: "Turns 1-Hour Long Podcasts into 10 Viral TikTok and YouTube Clips in 2 Minutes",
    industry: "Content Creator Tools & Media",
    stage: "Idea Validation",
    viabilityScore: 84,
    verdict: "STRONG GO",
    summary: "In simple words: Video creators, podcasters, and businesses record 1-hour conversations, but younger audiences only watch 30-second clips on TikTok and Instagram. Editing these short clips manually takes 4 to 6 hours and costs $500 per video. ClipForge listens to the audio, automatically finds the funniest and most exciting moments, crops the video vertically, and adds colored animated subtitles in under 2 minutes.",
    greenFlags: [
      "Huge Time & Money Saver: Saves podcasters 20+ hours of tedious editing work every single week.",
      "Surging Demand: TikTok, YouTube Shorts, and Instagram Reels generate over 140 billion views every day.",
      "Instant Wow Factor: A customer uploads one YouTube link and immediately sees 10 viral clips with animated captions.",
      "Clear Pricing: Creators happily pay $29 to $99 every month because it replaces a $1,500/mo human video editor."
    ],
    riskFlags: [
      "Server Costs: Processing high-definition video takes cloud server power, so keep video limits fair.",
      "Crowded Market: Apps like Opus Clip exist, so you must stand out with better subtitles and humor detection."
    ],
    metrics: [
      {
        name: "Do people actually want this? (Customer Demand)",
        score: 94,
        weight: 25,
        description: "Every creator and podcaster is desperate for short-form clips to grow their audience on social media.",
        benchmark: "Off the Charts Demand",
        status: "positive"
      },
      {
        name: "Will customers pay you? (Making Money)",
        score: 86,
        weight: 20,
        description: "Charging $29/mo for creators and $99/mo for agencies is an easy purchase compared to hiring human editors.",
        benchmark: "High Profitability",
        status: "positive"
      },
      {
        name: "Can rivals easily copy you? (Protection)",
        score: 72,
        weight: 20,
        description: "Win customer loyalty by letting them save custom brand templates, company logos, and signature fonts.",
        benchmark: "Good Stickiness",
        status: "positive"
      },
      {
        name: "How hard is it to build? (Simplicity)",
        score: 78,
        weight: 15,
        description: "Modern speech recognition APIs (like Whisper) make finding viral moments faster and cheaper than ever.",
        benchmark: "Manageable Build",
        status: "positive"
      },
      {
        name: "Why Now? (Market Timing)",
        score: 92,
        weight: 10,
        description: "Vertical short-form video is the dominant media format in the world today across every age group.",
        benchmark: "Unbeatable Timing",
        status: "positive"
      },
      {
        name: "How easily can you reach buyers? (Finding Customers)",
        score: 88,
        weight: 10,
        description: "Show 30-second before-and-after clips on TikTok. The product literally advertises itself through short clips!",
        benchmark: "Viral Organic Pull",
        status: "positive"
      }
    ],
    marketSize: {
      tam: { 
        value: "$21.5 Billion", 
        label: "Total Worldwide Spending", 
        details: "Total global spending on video editing tools, content creation software, and media marketing." 
      },
      sam: { 
        value: "$4.1 Billion", 
        label: "Buyers You Can Actually Reach", 
        details: "Over 50 million active podcasters, YouTubers, and business brands publishing videos weekly." 
      },
      som: { 
        value: "$240 Million", 
        label: "Realistic 3-Year Goal", 
        details: "Capturing just 50,000 paying creators worldwide creates an immense, highly profitable business." 
      },
      cagr: "+28.2% Every Year",
      targetDemographic: "Podcasters, Video Creators, Marketing Agencies, Brand Managers"
    },
    competitors: [
      {
        name: "Opus Clip",
        type: "Direct",
        pricing: "$19 - $49/mo",
        strengths: ["Popular brand", "Fast video processing"],
        weaknesses: ["Captions can be inaccurate", "Limited customization options"],
        marketShare: "35% of AI clips"
      },
      {
        name: "Human Video Freelancers",
        type: "Indirect",
        pricing: "$400 - $1,500/mo",
        strengths: ["Custom human touch"],
        weaknesses: ["Takes 3 to 5 days per video", "Very expensive for small creators"],
        marketShare: "45% of creators"
      },
      {
        name: "CapCut (Manual)",
        type: "Indirect",
        pricing: "Free to $10/mo",
        strengths: ["Free phone editor"],
        weaknesses: ["Takes 2 hours of manual slicing and subtitle fixing for every single video"],
        marketShare: "20%"
      }
    ],
    risks: [
      {
        category: "Financial",
        severity: "Low",
        description: "Processing 4K video uses cloud computers that cost a few cents per minute.",
        mitigation: "Include 120 minutes of video in the basic plan, and charge a small fee for extra video hours."
      }
    ],
    financials: [
      { year: "Year 1 (Launch)", revenue: "$420,000", customers: "850 creators", cac: "$65 per creator", ltv: "$720", burnRate: "$18,000/mo" },
      { year: "Year 2 (Growth)", revenue: "$1,850,000", customers: "3,200 creators", cac: "$75 per creator", ltv: "$1,100", burnRate: "$42,000/mo" },
      { year: "Year 3 (Scale)", revenue: "$6,200,000", customers: "9,800 creators", cac: "$90 per creator", ltv: "$1,450", burnRate: "Highly Profitable & Cash-flow Positive" }
    ],
    sources: [
      {
        id: "src-2-1",
        name: "HubSpot State of Video Marketing Report",
        publisher: "HubSpot Research",
        domain: "hubspot.com",
        url: "https://www.hubspot.com",
        category: "Market Intelligence",
        sourceType: "Tier-1 Industry Benchmark",
        supports: "Supports 91% business adoption and highest ROI for vertical short-form video",
        keyFinding: "91% of businesses actively use video as a marketing driver, and short-form vertical video (under 60s) delivers 2.5x higher engagement and ROI than long-form content.",
        confidence: 97,
        crawledDate: "Live Verified • Today"
      },
      {
        id: "src-2-2",
        name: "eMarketer Creator Economy & Social Video Outlook",
        publisher: "Insider Intelligence / eMarketer",
        domain: "emarketer.com",
        url: "https://www.emarketer.com",
        category: "Search Volume & Demand",
        sourceType: "Global Market Forecast",
        supports: "Supports $18.6B market TAM and +27.8% annual creator tools growth",
        keyFinding: "Creator economy tooling and automated content syndication reached an $18.6B valuation, with video clipping and captioning representing the fastest expanding sub-sector (+28% CAGR).",
        confidence: 96,
        crawledDate: "Live Verified • Today"
      },
      {
        id: "src-2-3",
        name: "Pew Research Social Media & Video Consumption Index",
        publisher: "Pew Research Center",
        domain: "pewresearch.org",
        url: "https://www.pewresearch.org",
        category: "Customer Sentiment",
        sourceType: "Authoritative Demographic Study",
        supports: "Validates audience attention shift to TikTok, Instagram Reels, and YouTube Shorts",
        keyFinding: "Over 78% of mobile consumers under 35 consume short-form video daily, making multi-platform vertical video distribution mandatory for audio podcasters.",
        confidence: 98,
        crawledDate: "Live Verified • Today"
      },
      {
        id: "src-2-4",
        name: "VidIQ Creator Monetization & Workflow Benchmark",
        publisher: "VidIQ Intelligence",
        domain: "vidiq.com",
        url: "https://www.vidiq.com",
        category: "Pricing Benchmark",
        sourceType: "Creator Community Audit",
        supports: "Validates 20+ hrs/wk saved and $29–$79/month pricing sweet spot",
        keyFinding: "Solo podcasters spend an average of 14 to 22 hours weekly manually editing clips, and 84% actively subscribe to AI tools priced between $29 and $79/mo to automate this pipeline.",
        confidence: 95,
        crawledDate: "Live Verified • Today"
      }
    ],
    brandStrategy: {
      archetype: "The Creative Multiplier",
      mission: "Give every creator the power of a 5-person Hollywood video editing team.",
      voice: "Energetic, fun, fast, and simple.",
      keyKeywords: ["Viral Clips", "Instant Captions", "No Editing Skills Needed", "Done in 2 Minutes"]
    }
  },
  {
    id: "legal-audit",
    title: "LexiGuard AI",
    tagline: "Reviews Business Contracts and Warns You About Hidden Traps in 30 Seconds",
    industry: "Legal Tech for Small Businesses",
    stage: "Idea Validation",
    viabilityScore: 88,
    verdict: "STRONG GO",
    summary: "In simple words: Small business owners, freelancers, and startups sign contracts every month (leases, client agreements, vendor terms). Hiring a lawyer costs $400 an hour and takes a week. Most people just sign without reading and get trapped in unfair cancellation penalties. LexiGuard reads 20-page legal contracts in 30 seconds and highlights dangerous clauses in simple, plain English with friendly tips on what to change.",
    greenFlags: [
      "Critical Pain Point: Every business owner dreads signing contracts they don't fully understand.",
      "Massive Cost Difference: A lawyer charges $500 to review 1 contract. LexiGuard charges $49/month for unlimited reviews.",
      "High Trust & Value: Saving a business owner from one unfair penalty pays for the entire year of software.",
      "Huge Market: Over 33 million small businesses in the US alone sign contracts every single month."
    ],
    riskFlags: [
      "Disclaimer Requirement: You must clearly state 'This is educational analysis, not formal legal advice' to protect yourself.",
      "Accuracy Must Be 100%: The AI must never miss an auto-renewal trap or unfair liability clause."
    ],
    metrics: [
      {
        name: "Do people actually want this? (Customer Demand)",
        score: 92,
        weight: 25,
        description: "Small business owners hate paying $400/hour to lawyers for routine contract reviews.",
        benchmark: "Huge Unmet Need",
        status: "positive"
      },
      {
        name: "Will customers pay you? (Making Money)",
        score: 90,
        weight: 20,
        description: "Charging $49/mo is a total no-brainer when a single lawyer bill is ten times more expensive.",
        benchmark: "Exceptional Value",
        status: "positive"
      },
      {
        name: "Can rivals easily copy you? (Protection)",
        score: 82,
        weight: 20,
        description: "Build pre-trained templates for specific industries (dental clinics, coffee shops, contractors) that rivals lack.",
        benchmark: "Strong Moat",
        status: "positive"
      },
      {
        name: "How hard is it to build? (Simplicity)",
        score: 80,
        weight: 15,
        description: "Modern AI models excel at analyzing text and explaining legal terms in 5th-grade plain English.",
        benchmark: "Feasible Build",
        status: "positive"
      },
      {
        name: "Why Now? (Market Timing)",
        score: 94,
        weight: 10,
        description: "Legal AI has advanced more in the last 18 months than in the entire previous 20 years.",
        benchmark: "Breakthrough Timing",
        status: "positive"
      },
      {
        name: "How easily can you reach buyers? (Finding Customers)",
        score: 84,
        weight: 10,
        description: "Partner with small business associations, accountant networks, and freelance communities.",
        benchmark: "High Trust Channels",
        status: "positive"
      }
    ],
    marketSize: {
      tam: { 
        value: "$32.4 Billion", 
        label: "Total Worldwide Spending", 
        details: "Total money businesses worldwide spend every year on legal fees and contract review services." 
      },
      sam: { 
        value: "$5.8 Billion", 
        label: "Buyers You Can Actually Reach", 
        details: "Small and medium businesses that cannot afford full-time in-house corporate lawyers." 
      },
      som: { 
        value: "$310 Million", 
        label: "Realistic 3-Year Goal", 
        details: "Capturing just 0.5% of English-speaking small businesses creates a $300M+ revenue opportunity." 
      },
      cagr: "+24.6% Every Year",
      targetDemographic: "Small Business Owners, Startup Founders, Freelancers, Franchisees"
    },
    competitors: [
      {
        name: "Traditional Law Firms",
        type: "Incumbent",
        pricing: "$350 - $650/hour",
        strengths: ["Formal legal protection", "Can represent in court"],
        weaknesses: ["Absurdly expensive", "Takes 5 to 10 days to respond", "Full of confusing jargon"],
        marketShare: "65% of contract reviews"
      },
      {
        name: "Ironclad / ContractPodAI",
        type: "Direct",
        pricing: "$1,500+/mo",
        strengths: ["Used by Fortune 500 companies"],
        weaknesses: ["Far too expensive and complex for small businesses"],
        marketShare: "20%"
      },
      {
        name: "Blindly Signing Without Reading",
        type: "Indirect",
        pricing: "Free ($0 upfront)",
        strengths: ["Instant"],
        weaknesses: ["Dangerous: leads to surprise lawsuits, penalties, and lost money"],
        marketShare: "15% of business owners"
      }
    ],
    risks: [
      {
        category: "Regulatory",
        severity: "Medium",
        description: "Users must know this is an AI tool and not their licensed attorney.",
        mitigation: "Include a prominent, clear 1-sentence disclaimer on every review: 'For educational review; consult an attorney for formal representation.'"
      }
    ],
    financials: [
      { year: "Year 1 (Launch)", revenue: "$360,000", customers: "600 businesses", cac: "$140 per business", ltv: "$1,800", burnRate: "$15,000/mo" },
      { year: "Year 2 (Growth)", revenue: "$1,600,000", customers: "2,400 businesses", cac: "$180 per business", ltv: "$2,400", burnRate: "$38,000/mo" },
      { year: "Year 3 (Scale)", revenue: "$5,400,000", customers: "7,500 businesses", cac: "$220 per business", ltv: "$3,200", burnRate: "Highly Profitable & Cash-flow Positive" }
    ],
    sources: [
      {
        id: "src-3-1",
        name: "American Bar Association Small Business Legal Needs Survey",
        publisher: "American Bar Association",
        domain: "americanbar.org",
        url: "https://www.americanbar.org",
        category: "Market Intelligence",
        sourceType: "Tier-1 Legal Authority",
        supports: "Supports 60%+ legal disputes originating from unreviewed contract clauses",
        keyFinding: "Over 60% of small business legal disputes originate from contract clauses the owner signed without fully understanding or consulting an attorney.",
        confidence: 98,
        crawledDate: "Live Verified • Today"
      },
      {
        id: "src-3-2",
        name: "Clio Legal Trends & Small Firm Economics Report",
        publisher: "Clio Research",
        domain: "clio.com",
        url: "https://www.clio.com",
        category: "Pricing Benchmark",
        sourceType: "Industry Billing Index",
        supports: "Supports $350+/hr lawyer barrier driving SMBs to affordable automated reviews",
        keyFinding: "Average hourly legal rates reached $384/hr, creating an insurmountable barrier for small businesses and driving 82% of owners to search for automated contract review solutions.",
        confidence: 97,
        crawledDate: "Live Verified • Today"
      },
      {
        id: "src-3-3",
        name: "National Small Business Association (NSBA) Regulatory & Legal Survey",
        publisher: "NSBA",
        domain: "nsba.biz",
        url: "https://www.nsba.biz",
        category: "Customer Sentiment",
        sourceType: "National Business Census",
        supports: "Supports $9.8B TAM and 78% founder hesitation to execute supplier contracts",
        keyFinding: "78% of small business owners admit to signing supplier or client agreements with apprehension because standard attorney review cycles take 5 to 10 days.",
        confidence: 96,
        crawledDate: "Live Verified • Today"
      },
      {
        id: "src-3-4",
        name: "Thomson Reuters Institute Contract Automation Index",
        publisher: "Thomson Reuters",
        domain: "thomsonreuters.com",
        url: "https://www.thomsonreuters.com",
        category: "Competitor Intelligence",
        sourceType: "LegalTech Market Study",
        supports: "Validates 30-second AI contract triage and $49–$199/mo SaaS model feasibility",
        keyFinding: "Automated clause classification flags high-risk indemnification and automatic renewal traps with 94.8% accuracy compared to senior paralegal reviews.",
        confidence: 95,
        crawledDate: "Live Verified • Today"
      }
    ],
    brandStrategy: {
      archetype: "The Guardian Protector",
      mission: "Protect small business owners from unfair contracts and expensive lawyer bills.",
      voice: "Reassuring, crystal-clear, protective, and straightforward.",
      keyKeywords: ["No Hidden Traps", "Reviewed in 30 Seconds", "Plain English Explanations", "Affordable Monthly Protection"]
    }
  }
];
