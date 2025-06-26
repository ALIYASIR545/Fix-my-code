import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fix My Code - AI-Powered Code Analysis",
  description:
    "Multi-language code debugging and optimization playground powered by AI. Analyze, fix, and improve your code instantly.",
  keywords: ["code analysis", "debugging", "AI", "code review", "programming", "bug fixes"],
  authors: [{ name: "Fix My Code Team" }],
  creator: "Fix My Code",
  publisher: "Fix My Code",
  robots: "index, follow",
  openGraph: {
    title: "Fix My Code - AI-Powered Code Analysis",
    description: "Multi-language code debugging and optimization playground powered by AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fix My Code - AI-Powered Code Analysis",
    description: "Multi-language code debugging and optimization playground powered by AI",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
