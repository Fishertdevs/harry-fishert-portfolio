"use client"

import { Clock, Calendar, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion } from "framer-motion"

const Contact = () => {
  const { t } = useLanguage()
  const { portfolioData } = usePortfolio()

  return (
    <section id="contact" className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Estamos aqui para ayudarte
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Nos encantaria escuchar tus ideas. Contactanos y juntos disenaremos tu idea de negocio con soluciones a medida.
          </p>
        </motion.div>

        {/* Info badges */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm md:text-base">Respuesta en menos de 24h</span>
          </div>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm md:text-base">Lun - Sab</span>
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
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500 p-8 md:p-10 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Listo para disenar tu idea?
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  Agenda tu asesoria y descubre como podemos ayudarte
                </p>
              </div>
              
              <Button 
                asChild
                size="lg"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-full px-6 py-3 flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105"
              >
                <a href={portfolioData.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span>Cotizar</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
