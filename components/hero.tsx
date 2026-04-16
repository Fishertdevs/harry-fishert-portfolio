"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Github, Instagram, MessageCircle, FileDown, FileText, Eye } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CVPreview from "@/components/cv-preview"

const Hero = () => {
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

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, delay: 1.2 },
    },
  }

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 },
    },
  }

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, delay: 0.5 },
    },
  }

  const handleDownloadCV = () => {
    window.open("https://drive.google.com/file/d/1AkywFwEI7V0WQwshUHyGuJmnydpFcXNW/view?usp=drivesdk", "_blank")
  }

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left side - Text content */}
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-gray-900 leading-tight">
                {language === "es" ? "Bienvenido" : "Welcome"}
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-gray-900 leading-tight">
                {language === "es" ? "a mi portafolio" : "to my portfolio"}
              </h1>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 group">
                  <a href="#contact">
                    {t("contactMe")}
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="group bg-transparent">
                  <a href="#projects">
                    {t("viewProjects")}
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </Button>
              </motion.div>

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

            <motion.div className="flex justify-center lg:justify-start space-x-4" variants={socialVariants}>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-6 w-6" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <a href={portfolioData.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-6 w-6" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors bg-green-100 dark:bg-green-900"
                >
                  <a href={portfolioData.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Avatar image with same size as profile section */}
          <motion.div 
            className="flex-shrink-0"
            variants={imageVariants}
          >
            <motion.div 
              className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_fg8qd1fg8qd1fg8q-Photoroom-ujx6hQDY5lsfZDeUo0fk2OVZurdv7L.webp"
                alt={portfolioData.name}
                className="w-full h-full object-cover object-top"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
