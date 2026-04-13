"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Github, Instagram, FileDown, FileText, Eye } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CVPreview from "@/components/cv-preview"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

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

  const handleDownloadCV = () => {
    window.open("https://drive.google.com/file/d/1AkywFwEI7V0WQwshUHyGuJmnydpFcXNW/view?usp=drivesdk", "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero Section */}
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
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
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
              {portfolioData.description}
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

            <motion.div className="mt-12 flex justify-center space-x-4" variants={socialVariants}>
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
                  className="rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                >
                  <a href={portfolioData.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>


      </main>
      <Footer />
    </div>
  )
}
