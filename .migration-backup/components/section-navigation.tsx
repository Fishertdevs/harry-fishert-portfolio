"use client"

import { useState, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

const SectionNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const { t } = useLanguage()

  const sections = [
    { id: "home", label: t("home") },
    { id: "about", label: t("about") },
    { id: "skills", label: t("skills") },
    { id: "experience", label: t("experience") },
    { id: "projects", label: t("projects") },
    { id: "education", label: t("education") },
    { id: "reviews", label: t("reviews") },
    { id: "contact", label: t("contact") },
    { id: "settings", label: "Ajustes" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      // Encontrar la sección actual basada en la posición de scroll
      let currentIndex = 0
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element && element.offsetTop <= scrollPosition) {
          currentIndex = i
          break
        }
      }

      setCurrentSectionIndex(currentIndex)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Inicializar

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navigateToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      const targetSection = document.getElementById(sections[index].id)
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Ajustar para el navbar
          behavior: "smooth",
        })
      }
    }
  }

  const navigatePrev = () => {
    if (currentSectionIndex > 0) {
      navigateToSection(currentSectionIndex - 1)
    }
  }

  const navigateNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      navigateToSection(currentSectionIndex + 1)
    }
  }

  return (
    <div className="fixed right-8 bottom-8 z-40 flex flex-col gap-2 md:hidden">
      <AnimatePresence>
        {currentSectionIndex > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            <Button
              onClick={navigatePrev}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 shadow-lg"
              aria-label={`Ir a ${sections[currentSectionIndex - 1].label}`}
            >
              <ChevronUp className="h-5 w-5 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentSectionIndex < sections.length - 1 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Button
              onClick={navigateNext}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 shadow-lg"
              aria-label={`Ir a ${sections[currentSectionIndex + 1].label}`}
            >
              <ChevronDown className="h-5 w-5 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SectionNavigation
