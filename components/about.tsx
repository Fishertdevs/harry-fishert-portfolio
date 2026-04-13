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
  image: string
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
      image: "/images/avatar.png"
    },
    {
      role: language === "es" ? "ESTUDIANTE DE INGENIERIA" : "ENGINEERING STUDENT",
      name: portfolioData.name.split(" ").slice(0, 2).join(" "),
      description: portfolioData.aboutParagraph2,
      image: "/images/avatar.png"
    },
    {
      role: language === "es" ? "LIDER DE PROYECTOS" : "PROJECT LEADER",
      name: portfolioData.name.split(" ").slice(0, 2).join(" "),
      description: language === "es" 
        ? `Lider tecnico con ${portfolioData.experience} de experiencia en desarrollo. Especializado en ${portfolioData.specialization} con mas de ${portfolioData.projectsCompleted} completados.`
        : `Technical leader with ${portfolioData.experience} of development experience. Specialized in ${portfolioData.specialization} with over ${portfolioData.projectsCompleted} completed.`,
      image: "/images/avatar.png"
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  }

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("aboutTitle")}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative min-h-[400px] md:min-h-[350px]">
            <AnimatePresence mode="wait" custom={currentSlide}>
              <motion.div
                key={currentSlide}
                custom={currentSlide}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {/* Text Content */}
                <div className="order-2 md:order-1 text-center md:text-left">
                  <motion.span 
                    className="inline-block text-sm font-bold tracking-wider text-orange-500 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {slides[currentSlide].role}
                  </motion.span>
                  
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {slides[currentSlide].name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                </div>

                {/* Image */}
                <div className="order-1 md:order-2 flex justify-center md:justify-end">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl">
                      <img 
                        src={slides[currentSlide].image} 
                        alt={slides[currentSlide].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -z-10 -top-4 -right-4 w-56 h-56 md:w-72 md:h-72 rounded-2xl bg-primary/10"></div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
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
                    : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
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
