"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Github, Instagram, MessageCircle, FileDown, FileText, Eye, ArrowRight, Code, Briefcase, GraduationCap, Star, Mail, User } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CVPreview from "@/components/cv-preview"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

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

  const quickLinks = [
    { name: t("about"), href: "/about", icon: User, description: language === "es" ? "Conoce mas sobre mi" : "Learn more about me" },
    { name: t("skills"), href: "/skills", icon: Code, description: language === "es" ? "Mis habilidades tecnicas" : "My technical skills" },
    { name: t("experience"), href: "/experience", icon: Briefcase, description: language === "es" ? "Mi experiencia laboral" : "My work experience" },
    { name: t("projects"), href: "/projects", icon: Code, description: language === "es" ? "Proyectos destacados" : "Featured projects" },
    { name: t("education"), href: "/education", icon: GraduationCap, description: language === "es" ? "Mi formacion academica" : "My academic background" },
    { name: t("reviews"), href: "/reviews", icon: Star, description: language === "es" ? "Opiniones y resenas" : "Reviews and feedback" },
    { name: t("contact"), href: "/contact", icon: Mail, description: language === "es" ? "Ponte en contacto" : "Get in touch" },
  ]

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

            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 group">
                  <Link href="/contact">
                    {t("contactMe")}
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="group bg-transparent">
                  <Link href="/projects">
                    {t("viewProjects")}
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
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
                  className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors bg-green-100 dark:bg-green-900"
                >
                  <a href={portfolioData.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Quick Links Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                {language === "es" ? "Explora Mi Portfolio" : "Explore My Portfolio"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {language === "es" 
                  ? "Navega por las diferentes secciones para conocer mas sobre mi trabajo y experiencia" 
                  : "Browse through different sections to learn more about my work and experience"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={link.href}>
                    <div className="group p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <link.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                            {link.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {link.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
