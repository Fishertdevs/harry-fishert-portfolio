"use client"

import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"


const About = () => {
  const { t, language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [currentSlide, setCurrentSlide] = useState(0)

  const textSlides = language === "es"
    ? [
        "Desarrollador Full Stack con formación en Ingeniería de Sistemas, especializado en el desarrollo de soluciones tecnológicas end-to-end. Experiencia en la creación de aplicaciones web modernas, sistemas SaaS y plataformas escalables orientadas a resultados.",
        "Enfocado en construir sistemas que optimizan procesos, mejoran la eficiencia operativa y aportan valor real a los negocios, combinando desarrollo frontend y backend para transformar ideas en productos digitales funcionales y eficientes.",
        "Me caracterizo por la rápida adaptación a nuevas tecnologías, el pensamiento analítico y la capacidad de resolver problemas mediante soluciones prácticas, trabajando de manera colaborativa y con un enfoque constante en la mejora continua."
      ]
    : [
        "Full Stack Developer with a Systems Engineering background, specialized in developing end-to-end technological solutions. Experience in creating modern web applications, SaaS systems, and scalable platforms focused on results.",
        "Focused on building systems that optimize processes, improve operational efficiency, and bring real value to businesses, combining frontend and backend development to transform ideas into functional and efficient digital products.",
        "I am characterized by rapid adaptation to new technologies, analytical thinking, and the ability to solve problems through practical solutions, working collaboratively with a constant focus on continuous improvement."
      ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % textSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [textSlides.length])

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-white">{t("aboutTitle")}</h2>
          <div className="h-1 w-12 md:w-20 bg-primary mx-auto"></div>
        </motion.div>

        {/* Main content - Image LEFT, Text RIGHT */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center">
            
            {/* Image - LEFT side, vertically centered */}
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl">
                <img
                  src="/images/avatar.png"
                  alt={portfolioData.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Text Content - RIGHT side with Carousel */}
            <motion.div
              className="flex flex-col justify-center items-center text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Name */}
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 text-center">
                Harry Fishert
              </h3>

              {/* Subtitle - Student */}
              <p className="text-primary font-medium mb-1 md:mb-2 text-center text-xs sm:text-sm md:text-base">
                {language === "es" ? "Estudiante de Ingeniería de Sistemas" : "Systems Engineering Student"}
              </p>

              {/* Role badge - without icon */}
              <p className="text-[10px] sm:text-xs md:text-sm text-primary tracking-wider uppercase font-medium mb-3 md:mb-6 text-center">
                {language === "es"
                  ? "DESARROLLADOR FULL STACK · ARQUITECTO DE SOFTWARE"
                  : "FULL STACK DEVELOPER · SOFTWARE ARCHITECT"}
              </p>

              {/* Text Carousel - auto only, no controls */}
              <div className="relative min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base text-center"
                  >
                    {textSlides[currentSlide]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress bar indicator */}
              <div className="flex items-center gap-1.5 mt-3 md:mt-6 justify-center">
                {textSlides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === currentSlide
                        ? "w-6 md:w-8 bg-primary"
                        : "w-1.5 md:w-2 bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
