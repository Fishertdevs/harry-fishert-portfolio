"use client"

import { useState, useEffect, useRef, memo } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence, useInView } from "framer-motion"

// Language flag icon - MOVED OUTSIDE to prevent recreation on each render
const FLAG_SVGS: Record<"es" | "en" | "pt", JSX.Element> = {
  es: (
    <svg viewBox="0 0 24 16" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 24 16" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="24" height="16" fill="#00247D" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="3" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#CF142B" strokeWidth="1.4" />
      <path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="5" />
      <path d="M12 0 V16 M0 8 H24" stroke="#CF142B" strokeWidth="2.4" />
    </svg>
  ),
  pt: (
    <svg viewBox="0 0 24 16" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="24" height="16" fill="#009739" />
      <polygon points="12,2 22,8 12,14 2,8" fill="#FEDD00" />
      <circle cx="12" cy="8" r="3" fill="#012169" />
    </svg>
  ),
}

const LanguageIcon = memo(({
  flag,
  percentage,
  color,
  size = 110,
  animate,
}: {
  flag: "es" | "en" | "pt"
  percentage: number
  color: string
  size?: number
  animate: boolean
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-full overflow-hidden shadow-lg ring-4"
        style={{ width: size, height: size, borderColor: `${color}33` } as React.CSSProperties}
      >
        {FLAG_SVGS[flag]}
      </div>
      <motion.span
        className="text-xl sm:text-2xl font-bold"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {percentage}%
      </motion.span>
    </div>
  )
})

LanguageIcon.displayName = "LanguageIcon"

const Languages = () => {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false)
  const desktopChartsRef = useRef<HTMLDivElement>(null)
  const isDesktopInView = useInView(desktopChartsRef, { once: true, amount: 0.3 })
  
  // Trigger animation only once when desktop charts come into view
  useEffect(() => {
    if (isDesktopInView && !hasAnimatedOnce) {
      setHasAnimatedOnce(true)
    }
  }, [isDesktopInView, hasAnimatedOnce])

  const languages = language === "es"
    ? [
        { 
          title: "Español", 
          flag: "es" as const,
          percentage: 100, 
          color: "#ef4444",
          features: [
            "Lengua materna",
            "Comunicación profesional",
            "Redacción técnica"
          ]
        },
        { 
          title: "Inglés", 
          flag: "en" as const,
          percentage: 45, 
          color: "#3b82f6",
          features: [
            "Comprensión técnica",
            "Lectura de documentación",
            "Comunicación técnica"
          ]
        },
        { 
          title: "Portugués", 
          flag: "pt" as const,
          percentage: 40, 
          color: "#22c55e",
          features: [
            "Comprensión técnica",
            "Lectura de documentación",
            "Documentación técnica"
          ]
        }
      ]
    : [
        { 
          title: "Spanish", 
          flag: "es" as const,
          percentage: 100, 
          color: "#ef4444",
          features: [
            "Mother tongue",
            "Professional communication",
            "Technical writing"
          ]
        },
        { 
          title: "English", 
          flag: "en" as const,
          percentage: 45, 
          color: "#3b82f6",
          features: [
            "Technical comprehension",
            "Documentation reading",
            "Technical communication"
          ]
        },
        { 
          title: "Portuguese", 
          flag: "pt" as const,
          percentage: 40, 
          color: "#22c55e",
          features: [
            "Technical comprehension",
            "Documentation reading",
            "Technical documentation"
          ]
        }
      ]

  // Auto-play carousel for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % languages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [languages.length])

  return (
    <section id="languages" className="relative flex flex-col justify-center py-20 md:py-28 bg-gray-950 overflow-hidden">
      {/* Top wave divider */}
      <div className="absolute top-0 inset-x-0 leading-none pointer-events-none z-10 rotate-180">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-10 sm:h-14 md:h-20 block">
          <path d="M0,32 C240,72 480,0 720,30 C960,60 1200,8 1440,40 L1440,80 L0,80 Z" className="fill-white dark:fill-gray-900" />
        </svg>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 inset-x-0 leading-none pointer-events-none z-10">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-10 sm:h-14 md:h-20 block">
          <path d="M0,32 C240,72 480,0 720,30 C960,60 1200,8 1440,40 L1440,80 L0,80 Z" className="fill-white dark:fill-gray-900" />
        </svg>
      </div>

      {/* Background pattern - same style as skills */}
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
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
            {language === "es" ? "Comunicación técnica" : "Technical Communication"}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {language === "es"
              ? "Comunicación efectiva aplicada al desarrollo de proyectos técnicos con equipos y clientes en múltiples idiomas."
              : "Effective communication applied to technical project development with teams and clients in multiple languages."}
          </p>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-3 md:mt-4"></div>
        </motion.div>

        {/* Desktop View - 3 charts side by side */}
        <div className="hidden md:block" ref={desktopChartsRef}>
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {languages.map((lang, index) => (
              <motion.div
                key={`desktop-${lang.title}-${index}`}
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Title */}
                <h3 
                  className="text-lg lg:text-xl font-bold"
                  style={{ color: lang.color }}
                >
                  {lang.title}
                </h3>

                {/* Flag icon */}
                <LanguageIcon
                  flag={lang.flag}
                  percentage={lang.percentage}
                  color={lang.color}
                  size={110}
                  animate={hasAnimatedOnce}
                />

                {/* Features */}
                <p className="text-xs lg:text-sm text-gray-400 text-center leading-relaxed">
                  {lang.features.join(" | ")}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View - Carousel like skills */}
        <div className="md:hidden max-w-xs mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4 py-4"
            >
              {/* Title */}
              <h3 
                className="text-lg font-bold"
                style={{ color: languages[currentSlide].color }}
              >
                {languages[currentSlide].title}
              </h3>

              {/* Flag icon */}
              <LanguageIcon
                flag={languages[currentSlide].flag}
                percentage={languages[currentSlide].percentage}
                color={languages[currentSlide].color}
                size={96}
                animate={true}
              />

              {/* Features */}
              <p className="text-xs text-gray-400 text-center leading-relaxed px-4">
                {languages[currentSlide].features.join(" | ")}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {languages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Languages
