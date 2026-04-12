"use client"

import { Github, Instagram, Mail, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"

const Footer = () => {
  const { t } = useLanguage()
  const { portfolioData } = usePortfolio()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-primary">
              {portfolioData.name.split(" ")[0]} {portfolioData.name.split(" ")[1]}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{portfolioData.title}</p>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <a href={portfolioData.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <a href={`mailto:${portfolioData.email}`} aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors bg-green-100 dark:bg-green-900"
            >
              <a href={portfolioData.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </a>
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center">
            © {currentYear} {portfolioData.name}. {t("rights")}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2 flex items-center justify-center">
            {t("madeWith")} <Heart className="h-3 w-3 text-red-500 mx-1" /> {t("using")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
