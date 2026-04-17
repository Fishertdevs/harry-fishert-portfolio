"use client"

import { useEffect, useState, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ReviewsCarousel from "@/components/reviews-carousel"
import Languages from "@/components/languages"
import WhatsAppFloatingButton from "@/components/whatsapp-floating-button"
import CTASection from "@/components/cta-section"
import CookieBanner from "@/components/cookie-banner"

// Stack Carousel Component
function StackCarousel({ language }: { language: string }) {
  const [stackSlide, setStackSlide] = useState(0)
  const totalStackSlides = 3
  
  const stackData = [
    {
      name: "Python",
      percentage: 85,
      color: "#3776AB",
      focus: language === "es" ? "IA, Automatizacion de Testing y Backend" : "AI, Testing Automation and Backend",
      value: language === "es" ? "Manejo de datos, modelos de IA y servicios seguros" : "Data handling, AI models and secure services"
    },
    {
      name: "TypeScript",
      percentage: 90,
      color: "#3178C6",
      focus: language === "es" ? "Desarrollo escalable y tipado seguro" : "Scalable development and safe typing",
      value: language === "es" ? "Mantenibilidad y calidad en proyectos grandes" : "Maintainability and quality in large projects"
    },
    {
      name: "JavaScript",
      percentage: 90,
      color: "#F7DF1E",
      focus: language === "es" ? "Interactividad y ecosistemas modernos" : "Interactivity and modern ecosystems",
      value: language === "es" ? "Experiencias de usuario fluidas e interactivas" : "Smooth and interactive user experiences"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStackSlide((prev) => (prev + 1) % totalStackSlides)
    }, 6000) // 6 seconds for each slide
    return () => clearInterval(interval)
  }, [])

  const currentStack = stackData[stackSlide]
  const circumference = 52 * 2 * Math.PI

  return (
    <motion.div
      key="slide2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-white">
        {language === "es" ? "Mi Stack de Trabajo" : "My Work Stack"}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base mb-6 md:mb-8">
        {language === "es" 
          ? "Implementacion de arquitecturas modernas para el desarrollo de soluciones integrales, escalables y orientadas a resultados."
          : "Implementation of modern architectures for the development of comprehensive, scalable and results-oriented solutions."}
      </p>
      <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mb-6 md:mb-8"></div>
      
      {/* Stack Carousel */}
      <div className="max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={stackSlide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8"
          >
            {/* Text content - LEFT on desktop, bottom on mobile (static) */}
            <div className="text-center md:text-left order-2 md:order-1">
              {/* Focus - Static */}
              <div className="mb-3">
                <p className="text-xs text-primary font-semibold mb-1">
                  {language === "es" ? "Enfoque:" : "Focus:"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentStack.focus}
                </p>
              </div>

              {/* Value - Static */}
              <div>
                <p className="text-xs text-primary font-semibold mb-1">
                  {language === "es" ? "Valor:" : "Value:"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentStack.value}
                </p>
              </div>
            </div>

            {/* Circular Progress - RIGHT on desktop, top on mobile */}
            <div className="flex flex-col items-center gap-2 md:gap-3 order-1 md:order-2">
              {/* Mobile size */}
              <div className="block sm:hidden">
                <div className="relative" style={{ width: 100, height: 100 }}>
                  <svg width={100} height={100} className="transform -rotate-90">
                    <circle cx={50} cy={50} r={42} stroke="#e5e7eb" strokeWidth={6} fill="transparent" className="dark:stroke-gray-700" />
                    <motion.circle
                      cx={50}
                      cy={50}
                      r={42}
                      stroke={currentStack.color}
                      strokeWidth={6}
                      fill="transparent"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${42 * 2 * Math.PI}` }}
                      animate={{ strokeDasharray: `${(currentStack.percentage / 100) * 42 * 2 * Math.PI} ${42 * 2 * Math.PI}` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-xl font-bold"
                      style={{ color: currentStack.color, textShadow: currentStack.name === "JavaScript" ? "0 0 2px rgba(0,0,0,0.1)" : "none" }}
                    >
                      {currentStack.percentage}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Tablet size */}
              <div className="hidden sm:block md:hidden">
                <div className="relative" style={{ width: 120, height: 120 }}>
                  <svg width={120} height={120} className="transform -rotate-90">
                    <circle cx={60} cy={60} r={52} stroke="#e5e7eb" strokeWidth={6} fill="transparent" className="dark:stroke-gray-700" />
                    <motion.circle
                      cx={60}
                      cy={60}
                      r={52}
                      stroke={currentStack.color}
                      strokeWidth={6}
                      fill="transparent"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${circumference}` }}
                      animate={{ strokeDasharray: `${(currentStack.percentage / 100) * circumference} ${circumference}` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: currentStack.color, textShadow: currentStack.name === "JavaScript" ? "0 0 2px rgba(0,0,0,0.1)" : "none" }}
                    >
                      {currentStack.percentage}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Desktop size */}
              <div className="hidden md:block">
                <div className="relative" style={{ width: 140, height: 140 }}>
                  <svg width={140} height={140} className="transform -rotate-90">
                    <circle cx={70} cy={70} r={62} stroke="#e5e7eb" strokeWidth={8} fill="transparent" className="dark:stroke-gray-700" />
                    <motion.circle
                      cx={70}
                      cy={70}
                      r={62}
                      stroke={currentStack.color}
                      strokeWidth={8}
                      fill="transparent"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${62 * 2 * Math.PI}` }}
                      animate={{ strokeDasharray: `${(currentStack.percentage / 100) * 62 * 2 * Math.PI} ${62 * 2 * Math.PI}` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-3xl font-bold"
                      style={{ color: currentStack.color, textShadow: currentStack.name === "JavaScript" ? "0 0 2px rgba(0,0,0,0.1)" : "none" }}
                    >
                      {currentStack.percentage}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Name with animation effect */}
              <motion.h3 
                className="text-lg md:text-xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                {currentStack.name}
              </motion.h3>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stack Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {stackData.map((_, index) => (
            <button
              key={index}
              onClick={() => setStackSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === stackSlide
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

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

  const [showCVPreview, setShowCVPreview] = useState(false)
  
  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/cv/HARRY_FISHERT_DEV_2026.pdf'
    link.download = 'HARRY_FISHERT_DEV_2026.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                      {language === "es" ? "a mi portafolio" : "to my portfolio"}
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
                      {language === "es" 
                        ? "Arquitecturas Escalables | Testing Automatizado e IA | Rendimiento | SEO & UX"
                        : "Scalable Architectures | Automated Testing & AI | Performance | SEO & UX"}
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm"
                        onClick={() => setShowCVPreview(true)}
                      >
                        {language === "es" ? "Ver CV" : "View CV"}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm"
                        onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        {language === "es" ? "Ver proyectos" : "View projects"}
                      </Button>
                    </div>
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

              {/* Slide 2: Mi Stack de Trabajo - Carrusel */}
              {heroSlide === 1 && (
                <StackCarousel language={language} />
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

            {/* CV Preview Modal */}
            {showCVPreview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowCVPreview(false)}>
                <motion.div 
                  className="bg-white dark:bg-gray-900 rounded-lg p-3 md:p-4 max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                      {language === "es" ? "Curriculum Vitae" : "Resume"}
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" onClick={handleDownloadCV} className="h-7 text-xs px-3">
                        {language === "es" ? "Descargar" : "Download"}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setShowCVPreview(false)} className="h-7 w-7 p-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="w-full h-[60vh] md:h-[65vh] overflow-auto rounded-md bg-gray-50 dark:bg-gray-800">
                    <iframe 
                      src="/cv/HARRY_FISHERT_DEV_2026.pdf" 
                      className="w-full h-full border-0"
                      title="CV Preview"
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </section>

        {/* Languages Section */}
        <Languages />

        {/* Reviews Section */}
        <ReviewsCarousel />

        {/* CTA Section */}
        <CTASection />

      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <CookieBanner />
    </div>
  )
}
