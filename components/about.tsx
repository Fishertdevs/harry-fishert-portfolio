"use client"

import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { User, ChevronLeft, ChevronRight } from "lucide-react"

const About = () => {
  const { t, language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [currentSlide, setCurrentSlide] = useState(0)

  const textSlides = language === "es" 
    ? [
        {
          title: "Desarrollador Full Stack",
          content: "Desarrollador Full Stack con formación en Ingeniería de Sistemas, especializado en el desarrollo de soluciones tecnológicas end-to-end. Experiencia en la creación de aplicaciones web modernas, sistemas SaaS y plataformas escalables orientadas a resultados."
        },
        {
          title: "Enfoque en Resultados",
          content: "Enfocado en construir sistemas que optimizan procesos, mejoran la eficiencia operativa y aportan valor real a los negocios, combinando desarrollo frontend y backend para transformar ideas en productos digitales funcionales y eficientes."
        },
        {
          title: "Adaptabilidad y Mejora Continua",
          content: "Me caracterizo por la rápida adaptación a nuevas tecnologías, el pensamiento analítico y la capacidad de resolver problemas mediante soluciones prácticas, trabajando de manera colaborativa y con un enfoque constante en la mejora continua."
        }
      ]
    : [
        {
          title: "Full Stack Developer",
          content: "Full Stack Developer with a Systems Engineering background, specialized in developing end-to-end technological solutions. Experience in creating modern web applications, SaaS systems, and scalable platforms focused on results."
        },
        {
          title: "Results-Oriented Focus",
          content: "Focused on building systems that optimize processes, improve operational efficiency, and bring real value to businesses, combining frontend and backend development to transform ideas into functional and efficient digital products."
        },
        {
          title: "Adaptability and Continuous Improvement",
          content: "I am characterized by rapid adaptation to new technologies, analytical thinking, and the ability to solve problems through practical solutions, working collaboratively with a constant focus on continuous improvement."
        }
      ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % textSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [textSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % textSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + textSlides.length) % textSlides.length)
  }

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

            {/* Text Content - RIGHT side with Carousel */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Role badge */}
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary tracking-wider uppercase font-medium">
                  {language === "es" ? "PERFIL PROFESIONAL" : "PROFESSIONAL PROFILE"}
                </span>
              </div>
              
              {/* Name */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Harry Fishert
              </h3>
              
              {/* Title */}
              <p className="text-primary font-medium mb-6">
                {language === "es" ? "Estudiante de Ingeniería de Sistemas" : "Systems Engineering Student"}
              </p>
              
              {/* Text Carousel */}
              <div className="relative min-h-[200px] md:min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-3"
                  >
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {textSlides[currentSlide].title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                      {textSlides[currentSlide].content}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>

                {/* Dots Indicator */}
                <div className="flex items-center gap-2">
                  {textSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide 
                          ? "w-6 h-2 bg-primary" 
                          : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Slide Counter */}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center md:text-left">
                {currentSlide + 1} / {textSlides.length}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
