"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"


const Languages = () => {
  const { language } = useLanguage()
  const [isChartVisible, setIsChartVisible] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null)
  const [mobileSelectedLang, setMobileSelectedLang] = useState<number | null>(null)

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

  // Desktop chart dimensions - LARGER
  const cxDesktop = 200
  const cyDesktop = 160
  const outerRDesktop = 110
  const innerRDesktop = 80

  // Mobile chart dimensions
  const cxMobile = 150
  const cyMobile = 120
  const outerRMobile = 60
  const innerRMobile = 42

  // Calculate slice data for both desktop and mobile
  const createSlices = (cx: number, cy: number, outerR: number, innerR: number) => {
    let currentAngle = -90
    return languages.map((lang, index) => {
      const startAngle = currentAngle
      const sweepAngle = (lang.percentage / 100) * 360
      const endAngle = startAngle + sweepAngle
      currentAngle = endAngle
      
      const animatedSweep = sweepAngle * (animationProgress / 100)
      const animatedEnd = startAngle + animatedSweep
      
      const midAngle = startAngle + sweepAngle / 2
      const midRad = (midAngle * Math.PI) / 180
      
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
      const labelRadius = outerR + 8
      const labelLineEnd = outerR + 22
      
      const lineStartX = cx + labelRadius * Math.cos(midRad)
      const lineStartY = cy + labelRadius * Math.sin(midRad)
      const lineEndX = cx + labelLineEnd * Math.cos(midRad)
      const lineEndY = cy + labelLineEnd * Math.sin(midRad)
      
      const isRight = midAngle > -90 && midAngle < 90
      const horizontalEndX = isRight ? lineEndX + 35 : lineEndX - 35
      
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
  }

  const desktopSlices = createSlices(cxDesktop, cyDesktop, outerRDesktop, innerRDesktop)
  const mobileSlices = createSlices(cxMobile, cyMobile, outerRMobile, innerRMobile)

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

        {/* Desktop View - Larger Chart with Info Tooltips */}
        <motion.div 
          className="hidden md:flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onViewportEnter={() => setIsChartVisible(true)}
        >
          <div className="relative">
            <svg 
              viewBox="0 0 400 320" 
              className="w-full max-w-xl"
              style={{ minHeight: '320px', maxHeight: '400px' }}
            >
              {/* Donut slices */}
              {desktopSlices.map((slice) => (
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

              {/* Label lines and text with info icon */}
              {animationProgress >= 100 && desktopSlices.map((slice) => (
                <g key={`label-${slice.index}`}>
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
                  {/* Label text - Title on top, level below */}
                  <motion.text
                    x={slice.textX}
                    y={slice.textY - 6}
                    textAnchor={slice.textAnchor}
                    dominantBaseline="middle"
                    className="text-xs font-bold"
                    style={{ fill: slice.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + slice.index * 0.1 }}
                  >
                    {slice.title}
                  </motion.text>
                  <motion.text
                    x={slice.textX}
                    y={slice.textY + 8}
                    textAnchor={slice.textAnchor}
                    dominantBaseline="middle"
                    className="text-[10px] fill-gray-500 dark:fill-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.35 + slice.index * 0.1 }}
                  >
                    {slice.level}
                  </motion.text>
                </g>
              ))}
            </svg>

          </div>

          {/* Legend - Desktop only - Click on color dot to show tooltip */}
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {languages.map((lang, index) => (
              <div key={index} className="relative flex flex-col items-center gap-1">
                {/* Clickable color dot */}
                <button
                  onClick={() => setActiveTooltip(activeTooltip === index ? null : index)}
                  className="w-5 h-5 rounded-full cursor-pointer transition-all hover:scale-125 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ 
                    backgroundColor: lang.color,
                    boxShadow: activeTooltip === index ? `0 0 0 3px ${lang.color}40` : 'none'
                  }}
                  aria-label={`Ver información sobre ${lang.title}`}
                />
                
                {/* Title */}
                <span className="font-semibold text-sm text-gray-900 dark:text-white mt-1">{lang.title}</span>
                
                {/* Level below title */}
                <span 
                  className="text-xs font-medium px-2 py-0.5 rounded-full" 
                  style={{ backgroundColor: `${lang.color}20`, color: lang.color }}
                >
                  {lang.level}
                </span>

                {/* Tooltip - appears on color click */}
                <AnimatePresence>
                  {activeTooltip === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute z-50 w-56 p-4 rounded-xl shadow-2xl -top-2 left-1/2 -translate-x-1/2 -translate-y-full"
                      style={{ 
                        backgroundColor: '#1f2937',
                        border: `2px solid ${lang.color}50`
                      }}
                    >
                      {/* Arrow pointing down */}
                      <div 
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 transform rotate-45"
                        style={{ backgroundColor: '#1f2937', borderRight: `2px solid ${lang.color}50`, borderBottom: `2px solid ${lang.color}50` }}
                      />
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span className="text-white font-semibold text-sm">{lang.title}</span>
                      </div>
                      <ul className="text-white text-xs leading-relaxed relative z-10 space-y-1">
                        {lang.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span style={{ color: lang.color }}>•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile View - Smaller Chart + Simple Legend (no details table) */}
        <motion.div 
          className="md:hidden flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onViewportEnter={() => setIsChartVisible(true)}
        >
          <svg 
            viewBox="0 0 300 240" 
            className="w-full max-w-xs"
            style={{ minHeight: '180px', maxHeight: '220px' }}
          >
            {/* Donut slices */}
            {mobileSlices.map((slice) => (
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
            {animationProgress >= 100 && mobileSlices.map((slice) => (
              <g key={`label-mobile-${slice.index}`}>
                <motion.line
                  x1={slice.lineStartX}
                  y1={slice.lineStartY}
                  x2={slice.lineEndX}
                  y2={slice.lineEndY}
                  stroke={slice.color}
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + slice.index * 0.1 }}
                />
                <motion.line
                  x1={slice.lineEndX}
                  y1={slice.lineEndY}
                  x2={slice.horizontalEndX}
                  y2={slice.lineEndY}
                  stroke={slice.color}
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 + slice.index * 0.1 }}
                />
                {/* Label text - Title on top, level below */}
                <motion.text
                  x={slice.textX}
                  y={slice.textY - 5}
                  textAnchor={slice.textAnchor}
                  dominantBaseline="middle"
                  className="text-[9px] font-bold"
                  style={{ fill: slice.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + slice.index * 0.1 }}
                >
                  {slice.title}
                </motion.text>
                <motion.text
                  x={slice.textX}
                  y={slice.textY + 6}
                  textAnchor={slice.textAnchor}
                  dominantBaseline="middle"
                  className="text-[8px] fill-gray-500 dark:fill-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.35 + slice.index * 0.1 }}
                >
                  {slice.level}
                </motion.text>
              </g>
            ))}
          </svg>

        </motion.div>
      </div>
    </section>
  )
}

export default Languages
