"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

const Languages = () => {
  const { language } = useLanguage()
  const [isChartVisible, setIsChartVisible] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null)

  const languages = language === "es"
    ? [
        { 
          title: "Español", 
          level: "Nativo", 
          percentage: 55, 
          color: "#ef4444",
          description: [
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
          description: [
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
          description: [
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
          description: [
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
          description: [
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
          description: [
            "Current level: A2",
            "Actively scaling to B1",
            "Documentation comprehension"
          ]
        }
      ]

  // Animation effect for chart
  useEffect(() => {
    if (isChartVisible && animationProgress < 100) {
      const timer = setTimeout(() => {
        setAnimationProgress(prev => Math.min(prev + 2, 100))
      }, 15)
      return () => clearTimeout(timer)
    }
  }, [isChartVisible, animationProgress])

  // Chart dimensions - smaller and thinner donut
  const cx = 200
  const cy = 150
  const outerR = 70
  const innerR = 50 // Thinner donut (smaller difference between outer and inner)

  // Calculate slice data
  let currentAngle = -90 // Start from top
  const slices = languages.map((lang, index) => {
    const startAngle = currentAngle
    const sweepAngle = (lang.percentage / 100) * 360
    const endAngle = startAngle + sweepAngle
    currentAngle = endAngle
    
    // Animated end angle
    const animatedSweep = sweepAngle * (animationProgress / 100)
    const animatedEnd = startAngle + animatedSweep
    
    // Mid angle for label positioning
    const midAngle = startAngle + sweepAngle / 2
    const midRad = (midAngle * Math.PI) / 180
    
    // Points for the donut slice
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (animatedEnd * Math.PI) / 180
    
    const x1 = cx + outerR * Math.cos(startRad)
    const y1 = cy + outerR * Math.sin(startRad)
    const x2 = cx + outerR * Math.cos(endRad)
    const y2 = cy + outerR * Math.sin(endRad)
    const x3 = cx + innerR * Math.cos(endRad)
    const y3 = cy + innerR * Math.sin(endRad)
    const x4 = cx + innerR * Math.cos(startRad)
    const y4 = cy + innerR * Math.sin(startRad)
    
    const largeArc = animatedSweep > 180 ? 1 : 0
    
    const path = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`
    
    // Label line points
    const labelRadius = outerR + 10
    const labelLineEnd = outerR + 25
    
    const lineStartX = cx + labelRadius * Math.cos(midRad)
    const lineStartY = cy + labelRadius * Math.sin(midRad)
    const lineEndX = cx + labelLineEnd * Math.cos(midRad)
    const lineEndY = cy + labelLineEnd * Math.sin(midRad)
    
    // Horizontal line extension
    const isRight = midAngle > -90 && midAngle < 90
    const horizontalEndX = isRight ? lineEndX + 30 : lineEndX - 30
    
    // Text position
    const textX = isRight ? horizontalEndX + 5 : horizontalEndX - 5
    const textY = lineEndY
    const textAnchor = isRight ? "start" : "end"
    
    return {
      ...lang,
      index,
      path,
      midAngle,
      lineStartX,
      lineStartY,
      lineEndX,
      lineEndY,
      horizontalEndX,
      textX,
      textY,
      textAnchor,
      isRight
    }
  })

  const handleLabelClick = (index: number) => {
    setSelectedLanguage(selectedLanguage === index ? null : index)
  }

  return (
    <section id="languages" className="relative flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 5% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 95% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%)`
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

        {/* Donut Chart with Labels - Centered */}
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onViewportEnter={() => setIsChartVisible(true)}
        >
          <svg 
            viewBox="0 0 400 300" 
            className="w-full max-w-sm md:max-w-md"
            style={{ minHeight: '200px', maxHeight: '280px' }}
          >
            {/* Donut slices */}
            {slices.map((slice) => (
              <motion.path
                key={slice.index}
                d={slice.path}
                fill={slice.color}
                stroke="white"
                strokeWidth="2"
                className="dark:stroke-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: slice.index * 0.1 }}
              />
            ))}

            {/* Label lines and text */}
            {animationProgress >= 100 && slices.map((slice) => (
              <g key={`label-${slice.index}`}>
                {/* Line from slice to label */}
                <motion.line
                  x1={slice.lineStartX}
                  y1={slice.lineStartY}
                  x2={slice.lineEndX}
                  y2={slice.lineEndY}
                  stroke={slice.color}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + slice.index * 0.1 }}
                />
                {/* Horizontal line */}
                <motion.line
                  x1={slice.lineEndX}
                  y1={slice.lineEndY}
                  x2={slice.horizontalEndX}
                  y2={slice.lineEndY}
                  stroke={slice.color}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 + slice.index * 0.1 }}
                />
                {/* Label text - clickable */}
                <motion.text
                  x={slice.textX}
                  y={slice.textY}
                  textAnchor={slice.textAnchor}
                  dominantBaseline="middle"
                  className="text-[10px] md:text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleLabelClick(slice.index)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + slice.index * 0.1 }}
                >
                  <tspan style={{ fill: slice.color }} className="font-bold">{slice.title}</tspan>
                  <tspan className="fill-gray-500 dark:fill-gray-400"> {slice.level}</tspan>
                </motion.text>
              </g>
            ))}
          </svg>

          {/* Description popup when clicking on label */}
          <AnimatePresence>
            {selectedLanguage !== null && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-4 p-4 rounded-xl shadow-lg border max-w-xs mx-auto"
                style={{ 
                  borderColor: languages[selectedLanguage].color,
                  borderLeftWidth: '4px',
                  backgroundColor: 'var(--background, white)'
                }}
              >
                <h4 
                  className="font-bold text-sm mb-2"
                  style={{ color: languages[selectedLanguage].color }}
                >
                  {languages[selectedLanguage].title}
                </h4>
                <ul className="space-y-1">
                  {languages[selectedLanguage].description.map((item, idx) => (
                    <li 
                      key={idx}
                      className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2"
                    >
                      <span style={{ color: languages[selectedLanguage].color }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className="mt-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {language === "es" ? "Cerrar" : "Close"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Legend - only show if no popup */}
        {selectedLanguage === null && (
          <div className="md:hidden mt-6 space-y-2 max-w-xs mx-auto">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 cursor-pointer"
                onClick={() => handleLabelClick(index)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="font-medium text-sm text-gray-900 dark:text-white">{lang.title}</span>
                <span 
                  className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full" 
                  style={{ backgroundColor: `${lang.color}20`, color: lang.color }}
                >
                  {lang.level}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Languages
