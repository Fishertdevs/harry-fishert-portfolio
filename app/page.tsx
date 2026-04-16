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
import CTASection from "@/components/cta-section"
import CookieBanner from "@/components/cookie-banner"

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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
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

              {/* Slide 2: Experience with skills-style layout */}
              {heroSlide === 1 && (
                <motion.div
                  key="slide2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-white">
                    {language === "es" 
                      ? "Desarrollo de soluciones full stack"
                      : "Full stack solutions development"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base mb-6 md:mb-10">
                    {language === "es" 
                      ? "Experiencia disenando soluciones funcionales para proyectos en produccion, con enfasis en rendimiento, escalabilidad y experiencia de usuario."
                      : "Experience designing functional solutions for production projects, with emphasis on performance, scalability and user experience."}
                  </p>
                  <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mb-6 md:mb-10"></div>
                  
                  {/* Skills-style grid layout */}
                  <div className="max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 py-2 md:py-4">
                      {/* Text content - centered */}
                      <div className="text-center order-2 md:order-1">
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
                          {language === "es" ? "Experiencia" : "Experience"}{" "}
                          <span className="text-primary">{language === "es" ? "Full Stack" : "Full Stack"}</span>
                        </h3>

                        <ul className="space-y-1 md:space-y-2 mb-3 md:mb-6">
                          <motion.li
                            className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {language === "es" ? "+6 proyectos en produccion" : "+6 projects in production"}
                          </motion.li>
                          <motion.li
                            className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {language === "es" ? "JavaScript, TypeScript, Python" : "JavaScript, TypeScript, Python"}
                          </motion.li>
                          <motion.li
                            className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {language === "es" ? "Enfoque en rendimiento y escalabilidad" : "Focus on performance and scalability"}
                          </motion.li>
                        </ul>

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

                      {/* Circular progress - RIGHT on desktop, top on mobile */}
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
                                stroke="#3b82f6"
                                strokeWidth={6}
                                fill="transparent"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: "0 264" }}
                                animate={{ strokeDasharray: "237.6 264" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.span 
                                className="text-xl font-bold text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              >
                                90%
                              </motion.span>
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
                                stroke="#3b82f6"
                                strokeWidth={6}
                                fill="transparent"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: "0 327" }}
                                animate={{ strokeDasharray: "294.3 327" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.span 
                                className="text-2xl font-bold text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              >
                                90%
                              </motion.span>
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
                                stroke="#3b82f6"
                                strokeWidth={8}
                                fill="transparent"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: "0 390" }}
                                animate={{ strokeDasharray: "351 390" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.span 
                                className="text-3xl font-bold text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              >
                                90%
                              </motion.span>
                            </div>
                          </div>
                        </div>
                        <motion.p
                          className="text-[10px] sm:text-xs md:text-sm font-medium text-center max-w-[100px] sm:max-w-[140px] md:max-w-[160px] leading-relaxed text-primary"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
                        >
                          {language === "es" ? "Dominio en desarrollo de soluciones full stack" : "Mastery in full stack solution development"}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                  
                  {/* CV Preview Modal */}
                  {showCVPreview && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowCVPreview(false)}>
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {language === "es" ? "Vista previa del CV" : "CV Preview"}
                          </h3>
                          <div className="flex gap-2">
                            <Button variant="default" size="sm" onClick={handleDownloadCV}>
                              {language === "es" ? "Descargar" : "Download"}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setShowCVPreview(false)}>
                              {language === "es" ? "Cerrar" : "Close"}
                            </Button>
                          </div>
                        </div>
                        <div className="w-full h-[70vh] overflow-auto">
                          <iframe 
                            src="/cv/HARRY_FISHERT_DEV_2026.pdf" 
                            className="w-full h-full border-0 rounded-lg"
                            title="CV Preview"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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

        {/* CTA Section */}
        <CTASection />

      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <CookieBanner />
    </div>
  )
}
