"use client"

import { Facebook, Instagram, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"

const Footer = () => {
  const { t } = useLanguage()
  const { portfolioData } = usePortfolio()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 40%)`
        }} />
        {/* Network nodes */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="rgba(59, 130, 246, 0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-dots)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center">
          {/* Name/Brand */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {portfolioData.name}
          </h3>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <a href={portfolioData.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300"
            >
              <a href={portfolioData.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a>
            </Button>
          </div>

          {/* Tagline */}
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            Soluciones tecnologicas para impulsar tu crecimiento digital
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <a href="#" className="hover:text-primary transition-colors">
              Terminos y Condiciones
            </a>
            <span className="text-gray-400">•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Politica de Cookies
            </a>
            <span className="text-gray-400">•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Politica de Privacidad
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            © {currentYear} {portfolioData.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
