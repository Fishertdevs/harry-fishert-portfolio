"use client"

import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { User } from "lucide-react"

const About = () => {
  const { t, language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t("aboutTitle")}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        {/* Main content - Image LEFT, Text RIGHT */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Image - LEFT side */}
            <motion.div
              className="flex justify-center md:justify-start"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl">
                  <img 
                    src="/images/avatar.png" 
                    alt={portfolioData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Content - RIGHT side */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Role badge */}
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                  {language === "es" ? "MIEMBRO DEL EQUIPO" : "TEAM MEMBER"}
                </span>
              </div>
              
              {/* Name */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {portfolioData.name.split(" ").slice(0, 2).join(" ")}
              </h3>
              
              {/* Title */}
              <p className="text-primary font-medium mb-6">
                {portfolioData.title}
              </p>
              
              {/* Description */}
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  {portfolioData.aboutParagraph1}
                </p>
                <p>
                  {portfolioData.aboutParagraph2}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
