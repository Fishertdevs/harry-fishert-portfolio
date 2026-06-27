"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"

const NavigationDots = () => {
  const [activeSection, setActiveSection] = useState("home")
  const { theme } = useTheme()
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
      const scrollPosition = window.scrollY + 100 // offset para mejor detección

      // Usar IntersectionObserver sería mejor, pero para simplificar usamos este enfoque
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i]
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 200) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Llamar inicialmente para establecer la sección activa

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleDotClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Ajustar para el navbar
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col items-center space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="group relative">
            <motion.button
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-primary scale-125"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/70 dark:hover:bg-primary/70"
              }`}
              onClick={() => handleDotClick(section.id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Navegar a ${section.label}`}
            />
            <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-2 py-1 rounded shadow-md text-sm whitespace-nowrap">
                {section.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NavigationDots
