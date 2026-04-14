"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

const Education = () => {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Datos del carrusel de educación con la nueva estructura
  const educationSlides = language === "es"
    ? [
        {
          title: "Ingeniería de",
          highlight: "Sistemas",
          percentage: 80,
          features: [
            "Universidad Central – Bogotá D.C. 2022-actual",
            "8° semestre en curso",
            "Enfoque en desarrollo de software"
          ],
          color: "#3b82f6",
          progressContext: "Progreso del programa"
        },
        {
          title: "Bachiller",
          highlight: "Académico",
          percentage: 100,
          features: [
            "I.E. La Merced – Mosquera",
            "Formación con énfasis en pensamiento lógico y matemático.",
            "Base sólida para el desarrollo en áreas tecnológicas."
          ],
          color: "#10b981",
          progressContext: "Programa finalizado"
        },
        {
          title: "Desarrollo de",
          highlight: "Software",
          percentage: 90,
          features: [
            "SENA (2023)",
            "Formación en metodologías ágiles y desarrollo de aplicaciones.",
            "Enfoque en construcción de soluciones funcionales."
          ],
          color: "#ef4444",
          progressContext: "Dominio de competencias clave"
        },
        {
          title: "Habilidades",
          highlight: "Profesionales",
          percentage: 85,
          features: [
            "Universidad Central (2022)",
            "Desarrollo de comunicación efectiva y trabajo en equipo.",
            "Fortalecimiento de habilidades colaborativas en entornos técnicos."
          ],
          color: "#8b5cf6",
          progressContext: "Nivel de aplicación en entornos reales"
        },
        {
          title: "Seguridad de la",
          highlight: "Información",
          percentage: 75,
          features: [
            "Itzys Colombia (2023)",
            "Fundamentos de ciberseguridad y análisis de riesgos.",
            "Enfoque en protección de sistemas y datos."
          ],
          color: "#f59e0b",
          progressContext: "Conocimientos en desarrollo"
        }
      ]
    : [
        {
          title: "Systems",
          highlight: "Engineering",
          percentage: 80,
          features: [
            "Universidad Central – Bogotá D.C. 2022-present",
            "8th semester in progress",
            "Focus on software development"
          ],
          color: "#3b82f6",
          progressContext: "Program progress"
        },
        {
          title: "Academic",
          highlight: "High School",
          percentage: 100,
          features: [
            "I.E. La Merced – Mosquera",
            "Training with emphasis on logical and mathematical thinking.",
            "Solid foundation for development in technological areas."
          ],
          color: "#10b981",
          progressContext: "Program completed"
        },
        {
          title: "Software",
          highlight: "Development",
          percentage: 90,
          features: [
            "SENA (2023)",
            "Training in agile methodologies and application development.",
            "Focus on building functional solutions."
          ],
          color: "#ef4444",
          progressContext: "Key competencies mastery"
        },
        {
          title: "Professional",
          highlight: "Skills",
          percentage: 85,
          features: [
            "Universidad Central (2022)",
            "Development of effective communication and teamwork.",
            "Strengthening collaborative skills in technical environments."
          ],
          color: "#8b5cf6",
          progressContext: "Level of application in real environments"
        },
        {
          title: "Information",
          highlight: "Security",
          percentage: 75,
          features: [
            "Itzys Colombia (2023)",
            "Cybersecurity fundamentals and risk analysis.",
            "Focus on system and data protection."
          ],
          color: "#f59e0b",
          progressContext: "Knowledge in development"
        }
      ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % educationSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [educationSlides.length])

  // Circular progress component with context text
  const CircularProgress = ({ percentage, color, context, size = 160 }: { percentage: number, color: string, context: string, size?: number }) => {
    const strokeWidth = 8
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI

    return (
      <div className="flex flex-col items-center">
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
        {/* Context text below the chart */}
        <motion.p 
          className="mt-3 text-sm font-medium text-center max-w-[180px]"
          style={{ color }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {context}
        </motion.p>
      </div>
    )
  }

  const sectionTitle = language === "es" ? "Trayectoria Académica" : "Academic Path"
  const sectionSubtitle = language === "es" 
    ? "Formación orientada al desarrollo de software, con enfoque en soluciones prácticas y escalables."
    : "Training focused on software development, with emphasis on practical and scalable solutions."

  return (
    <section id="education" className="relative flex flex-col justify-center min-h-[calc(100vh-4rem)] py-10 bg-white dark:bg-gray-900 overflow-hidden">
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
            {sectionTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            {sectionSubtitle}
          </p>
          <div className="h-1 w-16 bg-primary mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Carousel */}
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
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {educationSlides[currentSlide].title}{" "}
                  <span style={{ color: educationSlides[currentSlide].color }}>{educationSlides[currentSlide].highlight}</span>
                </h3>

                {/* Features */}
                <ul className="space-y-2">
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
              </div>

              {/* Circular progress with context - RIGHT on desktop, top on mobile */}
              <div className="flex justify-center order-1 md:order-2">
                <CircularProgress
                  percentage={educationSlides[currentSlide].percentage}
                  color={educationSlides[currentSlide].color}
                  context={educationSlides[currentSlide].progressContext}
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
