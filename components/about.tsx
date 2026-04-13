"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface Slide {
  role: string
  name: string
  description: string
}

const About = () => {
  const { t, language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides: Slide[] = [
    {
      role: language === "es" ? "DESARROLLADOR FULL STACK" : "FULL STACK DEVELOPER",
      name: portfolioData.name.split(" ").slice(0, 2).join(" "),
      description: portfolioData.aboutParagraph1,
    },
    {
      role: language === "es" ? "ESTUDIANTE DE INGENIERIA" : "ENGINEERING STUDENT",
      name: portfolioData.name.split(" ").slice(0, 2).join(" "),
      description: portfolioData.aboutParagraph2,
    },
    {
      role: language === "es" ? "LIDER DE PROYECTOS" : "PROJECT LEADER",
      name: portfolioData.name.split(" ").slice(0, 2).join(" "),
      description: language === "es" 
        ? `Lider tecnico con ${portfolioData.experience} de experiencia en desarrollo. Especializado en ${portfolioData.specialization} con mas de ${portfolioData.projectsCompleted} completados.`
        : `Technical leader with ${portfolioData.experience} of development experience. Specialized in ${portfolioData.specialization} with over ${portfolioData.projectsCompleted} completed.`,
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const textVariants = {
    enter: {
      opacity: 0,
      y: 20
    },
    center: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  }

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t("aboutTitle")}</h2>
          <div className="h-1 w-20 bg-emerald-500 mx-auto"></div>
        </motion.div>

        {/* Carousel Container - Image LEFT (static), Text RIGHT (rotating) */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center min-h-[400px]">
            
            {/* Image - Static on LEFT */}
            <motion.div
              className="flex justify-center md:justify-start order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-2xl">
                  <img 
                    src="/images/avatar.png" 
                    alt={portfolioData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element behind image */}
                <div className="absolute -z-10 top-4 left-4 w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-emerald-500/20"></div>
              </div>
            </motion.div>

            {/* Text Content - Rotating on RIGHT */}
            <div className="order-2 relative min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-center md:text-left"
                >
                  <motion.span 
                    className="inline-block text-sm font-bold tracking-wider text-orange-500 mb-4"
                  >
                    {slides[currentSlide].role}
                  </motion.span>
                  
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-white mb-6"
                  >
                    {slides[currentSlide].name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-300 leading-relaxed text-base md:text-lg"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index 
                    ? "w-8 h-3 bg-emerald-500" 
                    : "w-3 h-3 bg-gray-500 hover:bg-gray-400"
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

export default About
