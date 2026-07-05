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
import TechStack from "@/components/tech-stack"

export default function Home() {
  const { t, language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const [text, setText] = useState("")
  const fullText = t("heroSubtitle")
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const [showCVPreview, setShowCVPreview] = useState(false)

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) { setText(fullText.substring(0, i + 1)); i++ } else { clearInterval(typingEffect) }
    }, 100)
    return () => clearInterval(typingEffect)
  }, [fullText])

  useEffect(() => {
    setIsVisible(true)
    const observer = new IntersectionObserver(([entry]) => { setIsVisible(entry.isIntersecting) }, { threshold: 0.1 })
    if (heroRef.current) observer.observe(heroRef.current)
    return () => { if (heroRef.current) observer.unobserve(heroRef.current) }
  }, [])

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } } }
  const backgroundVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.5 } } }

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/cv/HARRY_FISHERT_DEV_2026.pdf'
    link.download = 'HARRY_FISHERT_DEV_2026.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section id="home" ref={heroRef} className="relative flex items-center justify-center py-16 md:py-20 overflow-hidden">
          <motion.div className="absolute inset-0 z-0" variants={backgroundVariants} initial="hidden" animate="visible">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
            <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0], y: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }} />
            <motion.div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, -40, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }} />
          </motion.div>
          <motion.div className="relative z-10 px-4 max-w-6xl mx-auto w-full" variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex flex-col justify-center text-center order-2 md:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">{language === "es" ? "Bienvenido" : "Welcome"}</h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">{language === "es" ? "a mi portafolio" : "to my portfolio"}</h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">{language === "es" ? "Arquitecturas Escalables | Testing Automatizado e IA | Rendimiento | SEO & UX" : "Scalable Architectures | Automated Testing & AI | Performance | SEO & UX"}</p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm" className="rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm" onClick={() => setShowCVPreview(true)}>{language === "es" ? "Ver CV" : "View CV"}</Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm" asChild><a href="/experience">{language === "es" ? "Ver proyectos" : "View projects"}</a></Button>
                </div>
              </div>
              <div className="flex justify-center items-center order-1 md:order-2">
                <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl">
                  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_fg8qd1fg8qd1fg8q-Photoroom-ujx6hQDY5lsfZDeUo0fk2OVZurdv7L.webp" alt={portfolioData.name} className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </motion.div>
            {showCVPreview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowCVPreview(false)}>
                <motion.div className="bg-white dark:bg-gray-900 rounded-lg p-3 md:p-4 max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">{language === "es" ? "Curriculum Vitae" : "Resume"}</h3>
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" onClick={handleDownloadCV} className="h-7 text-xs px-3">{language === "es" ? "Descargar" : "Download"}</Button>
                      <Button variant="ghost" size="sm" onClick={() => setShowCVPreview(false)} className="h-7 w-7 p-0"><X className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <div className="w-full h-[60vh] md:h-[65vh] overflow-auto rounded-md bg-gray-50 dark:bg-gray-800">
                    <iframe src="/cv/HARRY_FISHERT_DEV_2026.pdf" className="w-full h-full" title="CV Preview" />
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </section>
        <TechStack />
        <Languages />
        <ReviewsCarousel />
        <CTASection />
      </main>
      <Footer waveClassName="fill-blue-700 dark:fill-blue-700" />
      <WhatsAppFloatingButton />
      <CookieBanner />
    </div>
  )
}
