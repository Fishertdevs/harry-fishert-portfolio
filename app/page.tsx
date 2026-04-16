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
              {/* Slide 1: About + Skills */}
              {heroSlide === 0 && (
                <motion.div
                  key="slide2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1">
                    <p className="text-sm md:text-base text-primary/80 uppercase tracking-widest mb-2">
                      {language === "es" ? "Desarrollador Full Stack" : "Full Stack Developer"}
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                      {language === "es" 
                        ? "Transformo ideas en soluciones digitales"
                        : "I transform ideas into digital solutions"}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6">
                      {language === "es" 
                        ? "Especializado en React, Next.js, Node.js y arquitecturas escalables. Creo aplicaciones web modernas y eficientes."
                        : "Specialized in React, Next.js, Node.js and scalable architectures. I create modern and efficient web applications."}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {["React", "Next.js", "TypeScript", "Node.js", "Supabase"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center items-center order-1 md:order-2">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-2xl">
                      <img
                        src="/images/avatar.png"
                        alt={portfolioData.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Slide 2: Experience + CTA */}
              {heroSlide === 1 && (
                <motion.div
                  key="slide3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1">
                    <p className="text-sm md:text-base text-primary/80 uppercase tracking-widest mb-2">
                      {language === "es" ? "Experiencia comprobada" : "Proven experience"}
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                      {language === "es" 
                        ? "Proyectos que generan resultados"
                        : "Projects that generate results"}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6">
                      {language === "es" 
                        ? "Desde plataformas de renta hasta sistemas de e-commerce con WhatsApp integrado. Cada proyecto diseñado para impulsar tu negocio."
                        : "From rental platforms to e-commerce systems with integrated WhatsApp. Each project designed to boost your business."}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                      <Button 
                        variant="default"
                        size="lg"
                        onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        {language === "es" ? "Ver proyectos" : "View projects"}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center order-1 md:order-2">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-2xl">
                      <img
                        src="/images/avatar.png"
                        alt={portfolioData.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
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
