import { Scale, FileText, ShieldAlert, FileCheck, Landmark } from "lucide-react";

export const FIRM_BIO = {
    name: "SSM & Associates.",
    founder: "Advocate Shiw Shankar Mandal",
    credentials: "B.Com., LL.B.",
    domain: "ssm-associates.vercel.app",
    description: "A highly qualified legal professional specializing in comprehensive Direct and Indirect taxation, with core expertise in Goods and Services Tax (GST) and Income Tax matters. Leveraging a strong foundation in both financial and legal disciplines, he provides end-to-end support in tax compliance, strategic advisory, and complex litigation. Known for his analytical approach and structured legal drafting, Advocate Mandal consistently delivers reliable, business-oriented solutions to safeguard client interests in an ever-evolving tax environment.",
};

export const PRACTICE_AREAS = [
    {
        id: "tax-litigation",
        title: "GST & Income Tax Litigation",
        description: "Expert representation before tax authorities and appeal authorities. Handling complex disputes including GST demand orders, Income Tax scrutiny assessments, and rectification proceedings.",
        icon: Scale,
    },
    {
        id: "advisory-planning",
        title: "Strategic Tax Advisory & Planning",
        description: "Comprehensive advisory on Input Tax Credit (ITC) eligibility and individual tax optimization to ensure technically sound outcomes.",
        icon: Landmark,
    },
    {
        id: "drafting-appeals",
        title: "Legal Drafting & Appeals",
        description: "Precise and analytical drafting of legal submissions, appeals, and comprehensive replies to statutory notices from both Direct and Indirect tax departments.",
        icon: FileText,
    },
    {
        id: "statutory-compliance",
        title: "End-to-End Tax Compliance",
        description: "Complete support for statutory obligations, including GST return filings, Income Tax Returns (ITR), TDS/TCS compliance, and seamless dispute resolution.",
        icon: FileCheck,
    },
];

export const LEADERSHIP = [
    {
        id: "shiw-shankar",
        name: "Shiw Shankar Mandal",
        role: "Founder & Principal Consultant",
        highlight: "40 Years of Practice.",
        description: "Bringing four decades of unparalleled expertise and foundational knowledge in taxation and legal consultancy to the firm. A cornerstone of trust and reliability, having successfully navigated decades of evolving tax laws and complex financial landscapes.",
        icon: "Award"
    },
    {
        id: "pushkar",
        name: "Pushkar Mandal",
        role: "Advocate & Consultant",
        highlight: "B.Com, LL.B, Masters.",
        description: "Practicing under the firm's legacy for the past 5 years, bringing sharp, modern legal strategies to complex cases and seamlessly integrating contemporary legal education with established consultancy frameworks.",
        icon: "GraduationCap"
    }
];