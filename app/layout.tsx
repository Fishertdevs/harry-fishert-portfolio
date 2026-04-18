import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { PortfolioProvider } from "@/lib/portfolio-context"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Harry Fishert | Desarrollador Full Stack | Arquitecto de Software",
  description: "Desarrollador Full Stack y Arquitecto de Software con experiencia en Python, React, Next.js y Node.js. Especializado en diseño de soluciones web escalables, arquitecturas modernas, automatización con IA y sistemas de alto rendimiento en producción.",
  keywords: ["Desarrollador Full Stack", "React", "Next.js", "Node.js", "Python", "Arquitecto de Software", "Desarrollo Web", "Sistemas SaaS", "E-commerce", "Colombia"],
  authors: [{ name: "Harry Fishert Lasso Hernandez" }],
  creator: "Harry Fishert Lasso Hernandez",
  publisher: "Harry Fishert Lasso Hernandez",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://harryfishert.dev",
    siteName: "Harry Fishert | Desarrollador Full Stack | Arquitecto de Software",
    title: "Harry Fishert | Desarrollador Full Stack | Arquitecto de Software",
    description: "Desarrollador Full Stack y Arquitecto de Software con experiencia en Python, React, Next.js y Node.js. Especializado en diseño de soluciones web escalables, arquitecturas modernas, automatización con IA y sistemas de alto rendimiento en producción.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Harry Fishert - Desarrollador Full Stack y Arquitecto de Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harry Fishert | Desarrollador Full Stack | Arquitecto de Software",
    description: "Desarrollador Full Stack y Arquitecto de Software con experiencia en Python, React, Next.js y Node.js. Soluciones escalables y de alto rendimiento.",
    images: ["/icon.png"],
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://harryfishert.dev",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <LanguageProvider>
            <PortfolioProvider>{children}</PortfolioProvider>
          </LanguageProvider>
        </ThemeProvider>
</body>
    </html>
  )
}
