"use client"

import { Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion } from "framer-motion"

// WhatsApp SVG Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const Contact = () => {
  const { t } = useLanguage()
  const { portfolioData } = usePortfolio()

  return (
    <section id="contact" className="relative flex flex-col justify-center py-8 md:py-12 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)`
        }} />
        {/* Network nodes */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-dots" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="10" cy="10" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="70" cy="70" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-dots)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {t("contactTitle")}
          </h2>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-2 md:mt-4"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base mt-2 md:mt-4">
            {t("contactDescription")}
          </p>
        </motion.div>

        {/* Info badges */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm md:text-sm">{t("responseTime")}</span>
          </div>
          <div className="h-3 sm:h-4 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full"></span>
            <span className="text-xs sm:text-sm md:text-sm">{t("freeConsultation")}</span>
          </div>
          <div className="h-3 sm:h-4 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm md:text-sm">{t("availability")}</span>
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          className="flex flex-col items-center gap-2 mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
            {t("socialNetworks")}
          </h3>
          <div className="flex justify-center gap-4">
            <a 
              href={portfolioData.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:bg-[#181717] dark:hover:bg-[#f0f6fc] hover:scale-110"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-white dark:group-hover:text-[#181717]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href={portfolioData.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:scale-110"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href={portfolioData.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:bg-[#25D366] hover:scale-110"
            >
              <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-white" />
            </a>
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-blue-400 p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl">
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 text-center">
              <div className="text-white">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  {t("ctaTitle")}
                </h3>
              </div>
              
              <Button 
                asChild
                size="sm"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base"
              >
                <a href={portfolioData.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" />
                  <span>{t("ctaButton")}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </a>
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
