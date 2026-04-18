"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

const Languages = () => {
  const { language } = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null)
  const [isChartVisible, setIsChartVisible] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)

  const languages = language === "es"
    ? [
        {
          title: "Español",
          level: "Nativo",
          percentage: 55,
          color: "#ef4444",
          features: [
            "Lengua materna",
            "Comunicación profesional fluida",
            "Redacción técnica y creativa"
          ]
        },
        {
          title: "Inglés",
          level: "A2 - B1",
          percentage: 25,
          color: "#3b82f6",
          features: [
            "Nivel actual: A2",
            "Escalando activamente a B1",
            "Enfoque en comunicación técnica"
          ]
        },
        {
          title: "Portugués",
          level: "A2 - B1",
          percentage: 20,
          color: "#22c55e",
          features: [
            "Nivel actual: A2",
            "Escalando activamente a B1",
            "Comprensión de documentación"
          ]
        }
      ]
    : [
        {
          title: "Spanish",
          level: "Native",
          percentage: 55,
          color: "#ef4444",
          features: [
            "Mother tongue",
            "Fluent professional communication",
            "Technical and creative writing"
          ]
        },
        {
          title: "English",
          level: "A2 - B1",
          percentage: 25,
          color: "#3b82f6",
          features: [
            "Current level: A2",
            "Actively scaling to B1",
            "Focus on technical communication"
          ]
        },
        {
          title: "Portuguese",
          level: "A2 - B1",
          percentage: 20,
          color: "#22c55e",
          features: [
            "Current level: A2",
            "Actively scaling to B1",
            "Documentation comprehension"
          ]
        }
      ]

  // Animation effect for pie chart - trigger when in view
  useEffect(() => {
    if (isChartVisible && animationProgress < 100) {
      const timer = setTimeout(() => {
        setAnimationProgress(prev => Math.min(prev + 2, 100))
      }, 20)
      return () => clearTimeout(timer)
    }
  }, [isChartVisible, animationProgress])

  // Calculate pie chart paths with animation
  const createPieSlice = (startAngle: number, endAngle: number, color: string, index: number) => {
    const cx = 100
    const cy = 100
    const r = 80
    const innerR = 45

    // Apply animation progress to angles
    const animatedEndAngle = startAngle + ((endAngle - startAngle) * animationProgress / 100)

    const startRad = (startAngle - 90) * Math.PI / 180
    const endRad = (animatedEndAngle - 90) * Math.PI / 180

    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)

    const x3 = cx + innerR * Math.cos(endRad)
    const y3 = cy + innerR * Math.sin(endRad)
    const x4 = cx + innerR * Math.cos(startRad)
    const y4 = cy + innerR * Math.sin(startRad)

    const largeArc = animatedEndAngle - startAngle > 180 ? 1 : 0

    const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`

    return (
      <motion.path
        key={index}
        d={d}
        fill={color}
        stroke="white"
        strokeWidth="2"
        className="cursor-pointer transition-all duration-300 dark:stroke-gray-900"
        style={{
          filter: selectedLanguage === index ? "brightness(1.1)" : "brightness(1)",
          transform: selectedLanguage === index ? "scale(1.03)" : "scale(1)",
          transformOrigin: "100px 100px"
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setSelectedLanguage(selectedLanguage === index ? null : index)}
      />
    )
  }

  // Calculate angles for each slice
  let currentAngle = 0
  const slices = languages.map((lang, index) => {
    const startAngle = currentAngle
    const endAngle = currentAngle + (lang.percentage / 100) * 360
    currentAngle = endAngle
    return { ...lang, startAngle, endAngle, index }
  })

  // Calculate label positions
  const getLabelPosition = (startAngle: number, endAngle: number, isOutside: boolean) => {
    const midAngle = (startAngle + endAngle) / 2
    const rad = (midAngle - 90) * Math.PI / 180
    const r = isOutside ? 130 : 65
    return {
      x: 100 + r * Math.cos(rad),
      y: 100 + r * Math.sin(rad),
      midAngle
    }
  }

  return (
    <section id="languages" className="relative flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 5% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 95% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
                           radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 40%)`
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {language === "es" ? "Comunicación técnica" : "Technical Communication"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {language === "es"
              ? "Comunicación efectiva aplicada al desarrollo de proyectos técnicos con equipos y clientes en múltiples idiomas."
              : "Effective communication applied to technical project development with teams and clients in multiple languages."}
          </p>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-3 md:mt-4"></div>
        </motion.div>

        {/* Pie Chart and Details */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Pie Chart */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onViewportEnter={() => setIsChartVisible(true)}
            >
              <div className="relative">
                <svg width="200" height="200" viewBox="0 0 200 200" className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
                  {slices.map((slice) => createPieSlice(slice.startAngle, slice.endAngle, slice.color, slice.index))}
                  {/* Center circle */}
                  <circle cx="100" cy="100" r="35" fill="white" className="dark:fill-gray-900" />
                  <text x="100" y="105" textAnchor="middle" className="text-xs font-medium fill-gray-600 dark:fill-gray-400">
                    {language === "es" ? "Idiomas" : "Languages"}
                  </text>
                </svg>

                {/* Labels outside the chart - Desktop only */}
                <div className="hidden md:block">
                  {slices.map((slice) => {
                    const pos = getLabelPosition(slice.startAngle, slice.endAngle, true)
                    const isLeft = pos.x < 100
                    return (
                      <motion.div
                        key={slice.index}
                        className={`absolute whitespace-nowrap text-xs font-medium cursor-pointer transition-all duration-300 ${
                          selectedLanguage === slice.index ? "scale-110" : ""
                        }`}
                        style={{
                          left: `${(pos.x / 200) * 100}%`,
                          top: `${(pos.y / 200) * 100}%`,
                          transform: `translate(${isLeft ? "-100%" : "0"}, -50%)`,
                          color: slice.color
                        }}
                        onClick={() => setSelectedLanguage(selectedLanguage === slice.index ? null : slice.index)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + slice.index * 0.2 }}
                      >
                        <span className="font-bold">{slice.title}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">({slice.level})</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Legend and Details */}
            <div className="space-y-3">
              {/* Legend items - always visible */}
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedLanguage === index 
                      ? "bg-gray-100 dark:bg-gray-800 shadow-md" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => setSelectedLanguage(selectedLanguage === index ? null : index)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: lang.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">{lang.title}</span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${lang.color}20`, color: lang.color }}>
                        {lang.level}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Details panel - shown when clicked */}
              <AnimatePresence>
                {selectedLanguage !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="p-4 rounded-lg border-l-4 bg-gray-50 dark:bg-gray-800"
                      style={{ borderColor: languages[selectedLanguage].color }}
                    >
                      <h4 className="font-bold text-sm mb-2" style={{ color: languages[selectedLanguage].color }}>
                        {languages[selectedLanguage].title}
                      </h4>
                      <ul className="space-y-1">
                        {languages[selectedLanguage].features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span style={{ color: languages[selectedLanguage].color }}>•</span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}

export default Languages
