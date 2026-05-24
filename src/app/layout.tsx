import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { FIRM_BIO } from "@/lib/constants";
// 1. Import the ThemeProvider
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    template: `%s | ${FIRM_BIO.name}`,
    default: `${FIRM_BIO.name} | Expert GST & Tax Litigation`,
  },
  description: "Comprehensive legal support in GST compliance, advisory, and litigation. Safeguarding client interests through effective legal strategies.",
  keywords: ["GST Lawyer", "Tax Litigation", "Input Tax Credit", "Tax Advisory", "SSM & Associates"],
  openGraph: {
    title: `${FIRM_BIO.name} | Expert GST & Tax Litigation`,
    description: "Providing technically sound and business-oriented legal solutions for modern taxation challenges.",
    url: FIRM_BIO.domain,
    siteName: FIRM_BIO.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // 2. Add suppressHydrationWarning to prevent next-themes hydration mismatch
      suppressHydrationWarning
      className={cn("h-full", "antialiased", inter.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* 3. Wrap the children in the ThemeProvider without touching your classes */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}