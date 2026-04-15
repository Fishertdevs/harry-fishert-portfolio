"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

const Languages = () => {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const languages = language === "es"
    ? [
        {
          title: "Español",
          highlight: "Nativo",
          percentage: 100,
          features: [
            "Lengua materna",
            "Comunicación profesional fluida",
            "Redacción técnica y creativa"
          ],
          color: "#ef4444",
          context: "Dominio completo del idioma"
        },
        {
          title: "Inglés",
          highlight: "A2 → B1",
          percentage: 45,
          features: [
            "Nivel actual: A2",
            "Escalando activamente a B1",
            "Enfoque en comunicación técnica"
          ],
          color: "#3b82f6",
          context: "En proceso de mejora continua"
        },
        {
          title: "Portugués",
          highlight: "A2 → B1",
          percentage: 40,
          features: [
            "Nivel actual: A2",
            "Escalando activamente a B1",
            "Comprensión de documentación"
          ],
          color: "#22c55e",
          context: "En proceso de mejora continua"
        }
      ]
    : [
        {
          title: "Spanish",
          highlight: "Native",
          percentage: 100,
          features: [
            "Mother tongue",
            "Fluent professional communication",
            "Technical and creative writing"
          ],
          color: "#ef4444",
          context: "Complete language mastery"
        },
        {
          title: "English",
          highlight: "A2 → B1",
          percentage: 45,
          features: [
            "Current level: A2",
            "Actively scaling to B1",
            "Focus on technical communication"
          ],
          color: "#3b82f6",
          context: "Continuous improvement process"
        },
        {
          title: "Portuguese",
          highlight: "A2 → B1",
          percentage: 40,
          features: [
            "Current level: A2",
            "Actively scaling to B1",
            "Documentation comprehension"
          ],
          color: "#22c55e",
          context: "Continuous improvement process"
        }
      ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % languages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [languages.length])

  // Circular progress component
  const CircularProgress = ({ percentage, color, size = 140 }: { percentage: number, color: string, size?: number }) => {
    const strokeWidth = size < 120 ? 6 : 8
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="dark:stroke-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${(percentage / 100) * circumference} ${circumference}` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-xl sm:text-2xl md:text-3xl font-bold"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
    )
  }

  return (
    <section id="languages" className="relative flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 5% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 95% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
                           radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 40%)`
        }} />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="languages-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="15" cy="15" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="85" cy="85" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#languages-dots)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {language === "es" ? "Idiomas" : "Languages"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {language === "es"
              ? "Capacidad de comunicación en múltiples idiomas para proyectos internacionales."
              : "Communication ability in multiple languages for international projects."}
          </p>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-3 md:mt-4"></div>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 py-2 md:py-4"
            >
              {/* Text content */}
              <div className="text-center order-2 md:order-1">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
                  {languages[currentSlide].title}{" "}
                  <span style={{ color: languages[currentSlide].color }}>{languages[currentSlide].highlight}</span>
                </h3>

                <ul className="space-y-1 md:space-y-2 mb-3 md:mb-6">
                  {languages[currentSlide].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Circular progress */}
              <div className="flex flex-col items-center gap-2 md:gap-3 order-1 md:order-2">
                <div className="block sm:hidden">
                  <CircularProgress
                    percentage={languages[currentSlide].percentage}
                    color={languages[currentSlide].color}
                    size={100}
                  />
                </div>
                <div className="hidden sm:block md:hidden">
                  <CircularProgress
                    percentage={languages[currentSlide].percentage}
                    color={languages[currentSlide].color}
                    size={120}
                  />
                </div>
                <div className="hidden md:block">
                  <CircularProgress
                    percentage={languages[currentSlide].percentage}
                    color={languages[currentSlide].color}
                    size={140}
                  />
                </div>
                <motion.p
                  className="text-[10px] sm:text-xs md:text-sm font-medium text-center max-w-[100px] sm:max-w-[140px] md:max-w-[160px] leading-relaxed"
                  style={{ color: languages[currentSlide].color }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
                >
                  {languages[currentSlide].context}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar indicator */}
          <div className="flex justify-center gap-1.5 mt-4 md:mt-8">
            {languages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Languages
