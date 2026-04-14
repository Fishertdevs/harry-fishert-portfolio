"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, BookOpen, Calendar, Clock, ArrowRight, Code, Database, Globe, Layers } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const Education = () => {
  const { t, language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Datos del carrusel de educación - similar a skills
  const educationSlides = language === "es"
    ? [
        {
          title: "Ingeniería de",
          highlight: "Sistemas",
          percentage: 80,
          icon: <GraduationCap className="h-8 w-8" />,
          features: [
            "Universidad Central - Bogotá D.C.",
            "8° Semestre en curso",
            "Enfoque en desarrollo de software"
          ],
          color: "#3b82f6",
          period: "2022 - Actual"
        },
        {
          title: "Bachiller",
          highlight: "Académico",
          percentage: 100,
          icon: <Award className="h-8 w-8" />,
          features: [
            "I.E. La Merced - Mosquera",
            "Énfasis en ciencias y matemáticas",
            "Formación académica completa"
          ],
          color: "#10b981",
          period: "2021"
        },
        {
          title: "Habilidades",
          highlight: "Blandas",
          percentage: 85,
          icon: <Layers className="h-8 w-8" />,
          features: [
            "Universidad Central (2022)",
            "Comunicación efectiva",
            "Trabajo en equipo"
          ],
          color: "#8b5cf6",
          period: "2022"
        },
        {
          title: "Seguridad de la",
          highlight: "Información",
          percentage: 75,
          icon: <Database className="h-8 w-8" />,
          features: [
            "Itzys Colombia (2023)",
            "Fundamentos de ciberseguridad",
            "Análisis de riesgos"
          ],
          color: "#f59e0b",
          period: "2023"
        },
        {
          title: "Desarrollo de",
          highlight: "Software",
          percentage: 90,
          icon: <Code className="h-8 w-8" />,
          features: [
            "SENA (2023)",
            "Metodologías ágiles",
            "Diseño de aplicaciones"
          ],
          color: "#ef4444",
          period: "2023"
        }
      ]
    : [
        {
          title: "Systems",
          highlight: "Engineering",
          percentage: 80,
          icon: <GraduationCap className="h-8 w-8" />,
          features: [
            "Universidad Central - Bogotá D.C.",
            "8th Semester in progress",
            "Focus on software development"
          ],
          color: "#3b82f6",
          period: "2022 - Present"
        },
        {
          title: "Academic",
          highlight: "High School",
          percentage: 100,
          icon: <Award className="h-8 w-8" />,
          features: [
            "I.E. La Merced - Mosquera",
            "Emphasis on science and mathematics",
            "Complete academic training"
          ],
          color: "#10b981",
          period: "2021"
        },
        {
          title: "Soft",
          highlight: "Skills",
          percentage: 85,
          icon: <Layers className="h-8 w-8" />,
          features: [
            "Universidad Central (2022)",
            "Effective communication",
            "Teamwork"
          ],
          color: "#8b5cf6",
          period: "2022"
        },
        {
          title: "Information",
          highlight: "Security",
          percentage: 75,
          icon: <Database className="h-8 w-8" />,
          features: [
            "Itzys Colombia (2023)",
            "Cybersecurity fundamentals",
            "Risk analysis"
          ],
          color: "#f59e0b",
          period: "2023"
        },
        {
          title: "Software",
          highlight: "Development",
          percentage: 90,
          icon: <Code className="h-8 w-8" />,
          features: [
            "SENA (2023)",
            "Agile methodologies",
            "Application design"
          ],
          color: "#ef4444",
          period: "2023"
        }
      ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % educationSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [educationSlides.length])

  // Circular progress component
  const CircularProgress = ({ percentage, color, size = 160 }: { percentage: number, color: string, size?: number }) => {
    const strokeWidth = 8
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="dark:stroke-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${(percentage / 100) * circumference} ${circumference}` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-3xl md:text-4xl font-bold"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
    )
  }

  // Stats data
  const stats = [
    { value: "8°", title: t("currentSemester"), subtitle: t("ofSemesters"), color: "#3b82f6", icon: <GraduationCap className="h-6 w-6" style={{ color: "#3b82f6" }} /> },
    { value: "3.5", title: t("yearsStudied"), subtitle: t("ofYears"), color: "#10b981", icon: <Clock className="h-6 w-6" style={{ color: "#10b981" }} /> },
    { value: "122", title: t("credits"), subtitle: t("totalCredits"), color: "#f59e0b", icon: <BookOpen className="h-6 w-6" style={{ color: "#f59e0b" }} /> },
    { value: "3", title: t("certifications"), subtitle: t("completed"), color: "#8b5cf6", icon: <Award className="h-6 w-6" style={{ color: "#8b5cf6" }} /> },
  ]

  return (
    <section id="education" className="relative py-16 md:py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Tech background pattern - same as skills */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 5% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 95% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
                           radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 40%)`
        }} />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="education-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="15" cy="15" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="85" cy="85" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#education-dots)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header - same style as skills */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("educationTitle")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            {t("educationDescription")}
          </p>
          <div className="h-1 w-16 bg-primary mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Stats cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.03, y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <div className="p-2 rounded-full" style={{ backgroundColor: `${stat.color}15` }}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel - same style as skills */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-4"
            >
              {/* Text content - centered */}
              <div className="text-center order-2 md:order-1">
                {/* Period badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm mb-4" 
                  style={{ backgroundColor: `${educationSlides[currentSlide].color}15`, color: educationSlides[currentSlide].color }}>
                  <Calendar className="h-4 w-4 mr-1" />
                  {educationSlides[currentSlide].period}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {educationSlides[currentSlide].title}{" "}
                  <span className="text-primary">{educationSlides[currentSlide].highlight}</span>
                </h3>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {educationSlides[currentSlide].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="text-gray-600 dark:text-gray-400 text-sm md:text-base"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Icon display */}
                <div className="flex justify-center">
                  <div 
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${educationSlides[currentSlide].color}15`, color: educationSlides[currentSlide].color }}
                  >
                    {educationSlides[currentSlide].icon}
                  </div>
                </div>
              </div>

              {/* Circular progress - RIGHT on desktop, top on mobile */}
              <div className="flex justify-center order-1 md:order-2">
                <CircularProgress
                  percentage={educationSlides[currentSlide].percentage}
                  color={educationSlides[currentSlide].color}
                  size={160}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar indicator */}
          <div className="flex justify-center gap-1.5 mt-8">
            {educationSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
