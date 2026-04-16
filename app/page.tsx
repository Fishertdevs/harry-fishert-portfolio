"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ReviewsCarousel from "@/components/reviews-carousel"
import Languages from "@/components/languages"
import WhatsAppFloatingButton from "@/components/whatsapp-floating-button"

export default function Home() {
  const { t, language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const [text, setText] = useState("")
  const fullText = t("heroSubtitle")
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroSlide, setHeroSlide] = useState(0)
  const totalHeroSlides = 2

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % totalHeroSlides)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 100)

    return () => clearInterval(typingEffect)
  }, [fullText])

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 },
    },
  }

  const handleDownloadCV = () => {
    window.open("https://drive.google.com/file/d/1AkywFwEI7V0WQwshUHyGuJmnydpFcXNW/view?usp=drivesdk", "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" ref={heroRef} className="relative flex items-center justify-center py-16 md:py-20 overflow-hidden">
          <motion.div className="absolute inset-0 z-0" variants={backgroundVariants} initial="hidden" animate="visible">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>

            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>

          <motion.div
            className="relative z-10 px-4 max-w-6xl mx-auto w-full"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              {/* Slide 1: Bienvenido + Image */}
              {heroSlide === 0 && (
                <motion.div
                  key="slide1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  <div className="flex flex-col justify-center text-center order-2 md:order-1">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                      {language === "es" ? "Bienvenido" : "Welcome"}
                    </h1>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-600 leading-tight">
                      {language === "es" ? "a mi portafolio" : "to my portfolio"}
                    </h1>
                  </div>
                  <div className="flex justify-center items-center order-1 md:order-2">
                    <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_fg8qd1fg8qd1fg8q-Photoroom-ujx6hQDY5lsfZDeUo0fk2OVZurdv7L.webp"
                        alt={portfolioData.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Slide 2: Experience with circular charts */}
              {heroSlide === 1 && (
                <motion.div
                  key="slide2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
                    {language === "es" 
                      ? "Desarrollo de soluciones full stack"
                      : "Full stack solutions development"}
                  </h2>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-red-600">
                    {language === "es" 
                      ? "en entornos de produccion"
                      : "in production environments"}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-8 max-w-3xl">
                    {language === "es" 
                      ? "Experiencia disenando soluciones funcionales para proyectos en produccion, con enfasis en rendimiento, escalabilidad y experiencia de usuario."
                      : "Experience designing functional solutions for production projects, with emphasis on performance, scalability and user experience."}
                  </p>
                  
                  {/* Circular Charts Section */}
                  <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
                    {/* Projects Chart */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 md:w-28 md:h-28">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" className="dark:stroke-gray-700" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="0" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg md:text-xl font-bold text-red-600">+6</span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2 text-center max-w-[100px]">
                        {language === "es" ? "Proyectos en produccion" : "Projects in production"}
                      </p>
                    </div>
                    
                    {/* JavaScript Chart */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 md:w-28 md:h-28">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" className="dark:stroke-gray-700" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="25.12" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-base md:text-lg font-bold text-amber-500">JS</span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">JavaScript</p>
                    </div>
                    
                    {/* TypeScript Chart */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 md:w-28 md:h-28">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" className="dark:stroke-gray-700" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="50.24" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-base md:text-lg font-bold text-blue-500">TS</span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">TypeScript</p>
                    </div>
                    
                    {/* Python Chart */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 md:w-28 md:h-28">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" className="dark:stroke-gray-700" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="37.68" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-base md:text-lg font-bold text-emerald-500">Py</span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">Python</p>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={handleDownloadCV}
                    >
                      {language === "es" ? "Ver CV" : "View CV"}
                    </Button>
                    <Button 
                      variant="default"
                      size="lg"
                      onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      {language === "es" ? "Ver proyectos" : "View projects"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  onClick={() => setHeroSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === heroSlide
                      ? "w-8 bg-primary"
                      : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Languages Section */}
        <Languages />

        {/* Reviews Section */}
        <ReviewsCarousel />

      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  )
}
