"use client"

import { useState, useEffect } from "react"
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

const Skills = () => {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const services = [
    {
      title: "Diseno de",
      highlight: "Software",
      percentage: 90,
      features: [
        "Arquitectura escalable y mantenible",
        "Patrones de diseno modernos",
        "Documentacion tecnica completa"
      ],
      color: "#0ea5e9"
    },
    {
      title: "Desarrollo",
      highlight: "Frontend",
      percentage: 85,
      features: [
        "Interfaces responsivas y modernas",
        "Experiencia de usuario optimizada",
        "Tecnologias como React y Next.js"
      ],
      color: "#0ea5e9"
    },
    {
      title: "Desarrollo",
      highlight: "Backend",
      percentage: 80,
      features: [
        "APIs REST y GraphQL",
        "Bases de datos relacionales y NoSQL",
        "Integracion de servicios externos"
      ],
      color: "#0ea5e9"
    },
    {
      title: "Desarrollo",
      highlight: "Full Stack",
      percentage: 75,
      features: [
        "Soluciones end-to-end completas",
        "Arquitecturas monoliticas y microservicios",
        "DevOps y despliegue continuo"
      ],
      color: "#0ea5e9"
    },
    {
      title: "Aplicaciones",
      highlight: "Moviles",
      percentage: 60,
      features: [
        "Desarrollo con React Native",
        "Apps hibridas multiplataforma",
        "Integracion con APIs nativas"
      ],
      color: "#0ea5e9"
    },
    {
      title: "Automatizacion",
      highlight: "y Scripts",
      percentage: 70,
      features: [
        "Scripts en Python y JavaScript",
        "Automatizacion de procesos",
        "Analisis y procesamiento de datos"
      ],
      color: "#0ea5e9"
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, services.length])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Circular progress component
  const CircularProgress = ({ percentage, color, size = 180 }: { percentage: number, color: string, size?: number }) => {
    const strokeWidth = 8
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="dark:stroke-gray-700"
          />
          {/* Progress circle */}
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
            className="text-4xl font-bold"
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
    <section id="skills" className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 5% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 95% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
                           radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 40%)`
        }} />
        {/* Network nodes */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skills-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="15" cy="15" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="85" cy="85" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="85" cy="15" r="1" fill="rgba(59, 130, 246, 0.15)" />
              <circle cx="15" cy="85" r="1" fill="rgba(59, 130, 246, 0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skills-dots)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            NUESTROS SERVICIOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            {t("skillsTitle")}
          </h2>
          <div className="h-1 w-16 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Navigation arrows */}
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Slide content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-8"
              >
                {/* Left side - Text content */}
                <div className="text-center md:text-left order-2 md:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {services[currentSlide].title}
                    <br />
                    <span className="text-primary">{services[currentSlide].highlight}</span>
                  </h3>
                  
                  <ul className="space-y-3 mt-6 mb-8">
                    {services[currentSlide].features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <Check className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-2 flex items-center gap-2 mx-auto md:mx-0"
                  >
                    Conoce mas
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Right side - Circular progress */}
                <div className="flex justify-center order-1 md:order-2">
                  <CircularProgress 
                    percentage={services[currentSlide].percentage} 
                    color={services[currentSlide].color}
                    size={200}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index 
                    ? "w-8 h-3 bg-primary" 
                    : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
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

export default Skills
