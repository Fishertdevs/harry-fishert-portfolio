"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, FileText, Eye } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CVPreview from "@/components/cv-preview"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ReviewsCarousel from "@/components/reviews-carousel"
import Languages from "@/components/languages"

export default function Home() {
  const { t, language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const [text, setText] = useState("")
  const fullText = t("heroSubtitle")
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

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
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.p 
              className="text-sm md:text-base text-primary/80 uppercase tracking-widest mb-2"
              variants={itemVariants}
            >
              {language === "es" ? "Bienvenido a mi portafolio" : "Welcome to my portfolio"}
            </motion.p>

            <motion.h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text" variants={itemVariants}>
              {portfolioData.name}
            </motion.h1>

            <motion.div className="h-8 mb-6" variants={itemVariants}>
              <p className="text-xl md:text-2xl text-primary">
                {portfolioData.title}
                <span className="animate-pulse">|</span>
              </p>
            </motion.div>

            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {language === "es" 
                ? "Transformo ideas en soluciones digitales. Explora mis proyectos, habilidades y experiencia en desarrollo de software."
                : "I transform ideas into digital solutions. Explore my projects, skills and experience in software development."}
            </motion.p>

            <motion.div className="flex items-center justify-center" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="lg" className="group">
                      <FileDown className="mr-2 h-4 w-4" />
                      Ver CV
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver Preview</span>
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[80vh] p-0">
                        <DialogHeader className="p-4 border-b">
                          <DialogTitle>Curriculum Vitae - {portfolioData.name}</DialogTitle>
                          <DialogClose className="absolute right-4 top-4" />
                        </DialogHeader>
                        <div className="h-full overflow-auto p-0">
                          <CVPreview onDownload={handleDownloadCV} />
                        </div>
                      </DialogContent>
                    </Dialog>

                    <DropdownMenuItem
                      onClick={() =>
                        window.open(
                          "https://drive.google.com/file/d/1AkywFwEI7V0WQwshUHyGuJmnydpFcXNW/view?usp=drivesdk",
                          "_blank",
                        )
                      }
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Ver CV completo</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </motion.div>


          </motion.div>
        </section>

        {/* Languages Section */}
        <Languages />

        {/* Reviews Section */}
        <ReviewsCarousel />

      </main>
      <Footer />
    </div>
  )
}
