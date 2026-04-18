"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence, useInView } from "framer-motion"

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

  // Memoize animation state to prevent re-renders
  const desktopAnimateState = useMemo(() => hasAnimatedOnce, [hasAnimatedOnce])

  const languages = language === "es"
    ? [
        { 
          title: "Español", 
          level: "Nativo", 
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
          level: "A2 - B1", 
          percentage: 45, 
          color: "#3b82f6",
          features: [
            "Nivel actual: A2",
            "Escalando a B1",
            "Comunicación técnica"
          ]
        },
        { 
          title: "Portugués", 
          level: "A2 - B1", 
          percentage: 40, 
          color: "#22c55e",
          features: [
            "Nivel actual: A2",
            "Escalando a B1",
            "Documentación técnica"
          ]
        }
      ]
    : [
        { 
          title: "Spanish", 
          level: "Native", 
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
          level: "A2 - B1", 
          percentage: 45, 
          color: "#3b82f6",
          features: [
            "Current level: A2",
            "Scaling to B1",
            "Technical communication"
          ]
        },
        { 
          title: "Portuguese", 
          level: "A2 - B1", 
          percentage: 40, 
          color: "#22c55e",
          features: [
            "Current level: A2",
            "Scaling to B1",
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

  // Circular progress component - uses controlled animation state
  const CircularProgress = ({ percentage, color, size = 140, animate }: { percentage: number, color: string, size?: number, animate: boolean }) => {
    const strokeWidth = size < 120 ? 6 : 8
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const targetDash = (percentage / 100) * circumference

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
            animate={animate ? { strokeDasharray: `${targetDash} ${circumference}` } : { strokeDasharray: `0 ${circumference}` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-xl sm:text-2xl md:text-3xl font-bold"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
    )
  }

  return (
    <section id="languages" className="relative flex flex-col justify-center py-12 md:py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
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
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {language === "es" ? "Comunicación técnica" : "Technical Communication"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
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
                key={index}
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

                {/* Circular chart */}
                <CircularProgress
                  percentage={lang.percentage}
                  color={lang.color}
                  size={130}
                  animate={desktopAnimateState}
                />

                {/* Features */}
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
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

              {/* Circular chart */}
              <CircularProgress
                percentage={languages[currentSlide].percentage}
                color={languages[currentSlide].color}
                size={110}
                animate={true}
              />

              {/* Features */}
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed px-4">
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
