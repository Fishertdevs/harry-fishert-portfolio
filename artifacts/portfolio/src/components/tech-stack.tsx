"use client"

import { useState, useEffect, useRef, memo } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence, useInView } from "framer-motion"
import SectionBlobs from "@/components/section-blobs"

const TECH_SVGS: Record<"python" | "typescript" | "javascript", JSX.Element> = {
  python: (
    <svg viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path fill="#3776AB" d="M63.4 0c-6 0-11.7.5-16.6 1.5C33.3 4 30.9 9 30.9 18v11.6h33v4.2h-45C6.4 33.8 0 41.4 0 63.5c0 22 5.6 30 16.9 30h9.1v-15c0-13 11.2-24 24.2-24h32.9c9.8 0 17.6-8 17.6-17.7V18c0-9.6-8.1-16.8-17.6-18C77.3.6 70 0 63.4 0zM47.3 12.2c3.2 0 5.9 2.6 5.9 5.9 0 3.2-2.6 5.9-5.9 5.9-3.3 0-5.9-2.6-5.9-5.9 0-3.3 2.7-5.9 5.9-5.9z"/>
      <path fill="#FFD43B" d="M64.6 128c6 0 11.7-.5 16.6-1.5 13.5-2.5 15.9-7.5 15.9-16.5V98.4h-33v-4.2h45c9.6 0 15.9-7.5 15.9-29.7 0-22-5.6-30-16.9-30h-9.1v15c0 13-11.2 24-24.2 24H41.9c-9.8 0-17.6 8-17.6 17.7v29.6c0 9.6 8.1 16.8 17.6 18 5.2 1.4 12.6 2 19.1 2zM80.7 115.8c-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.3 0 5.9 2.6 5.9 5.9 0 3.3-2.7 5.9-5.9 5.9z"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#3178C6"/>
      <path fill="#fff" d="M22 65.6h30v9.3h-9.5v34h-11v-34H22v-9.3zM56 82.4c0-8.9 6.4-14.7 16.9-14.7 5.7 0 10.1 1.5 13.6 4.4l-5 8.4c-2.6-2-5.5-3.2-8.6-3.2-3.1 0-4.8 1.2-4.8 3 0 1.6 1.5 2.6 4.6 3.5l4.7 1.4c8.4 2.4 12 6.1 12 12.7 0 8.9-6.9 14.6-17.7 14.6-6.3 0-11.5-1.9-15.2-5.3l5.5-8.3c2.8 2.4 6.1 3.9 9.7 3.9 3.3 0 5.2-1.2 5.2-3.3 0-1.7-1.4-2.7-4.9-3.7l-4.9-1.4C58.9 92.9 56 89 56 82.4z"/>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#F7DF1E"/>
      <path fill="#000" d="M67.3 92.6c1.9 3.1 4.4 5.4 8.8 5.4 3.7 0 6.1-1.9 6.1-4.4 0-3.1-2.5-4.2-6.6-6l-2.3-1c-6.6-2.8-11-6.3-11-13.7 0-6.8 5.2-12 13.3-12 5.8 0 9.9 2 12.9 7.4l-7.1 4.5c-1.5-2.8-3.2-3.9-5.8-3.9-2.6 0-4.3 1.7-4.3 3.9 0 2.7 1.7 3.8 5.5 5.5l2.3 1c7.7 3.3 12.1 6.7 12.1 14.3 0 8.1-6.4 12.6-15 12.6-8.4 0-13.8-4-16.5-9.3l7.6-4.3zm-31.4.6c1.4 2.5 2.7 4.6 5.9 4.6 3 0 4.9-1.2 4.9-5.7V64h9.2v27.8c0 9.5-5.6 13.9-13.7 13.9-7.4 0-11.6-3.8-13.8-8.4l7.5-4.1z"/>
    </svg>
  ),
}

// Related/derived technology icons shown in rotation for each core language
const RELATED_SVGS: Record<"python" | "typescript" | "javascript", JSX.Element[]> = {
  python: [
    // Django
    <svg key="django" viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#092E20" />
      <text x="64" y="80" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="46" fill="#44B78B">Dj</text>
    </svg>,
    // Flask
    <svg key="flask" viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#111111" />
      <text x="64" y="80" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="42" fill="#ffffff">Fl</text>
    </svg>,
    // FastAPI
    <svg key="fastapi" viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#05998B" />
      <text x="64" y="80" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="38" fill="#ffffff">Fa</text>
    </svg>,
  ],
  typescript: [
    // Angular
    <svg key="angular" viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#DD0031" />
      <text x="64" y="82" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="52" fill="#ffffff">A</text>
    </svg>,
    // NestJS
    <svg key="nestjs" viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#E0234E" />
      <text x="64" y="82" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="52" fill="#ffffff">N</text>
    </svg>,
    // Deno
    <svg key="deno" viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#111111" />
      <circle cx="64" cy="60" r="34" fill="#ffffff" />
      <circle cx="76" cy="52" r="4" fill="#111111" />
    </svg>,
  ],
  javascript: [
    // React
    <svg key="react" viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#111827" />
      <g transform="translate(64,64)">
        <circle r="9" fill="#61DAFB" />
        <ellipse rx="34" ry="13" fill="none" stroke="#61DAFB" strokeWidth="4.5" />
        <ellipse rx="34" ry="13" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(60)" />
        <ellipse rx="34" ry="13" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(120)" />
      </g>
    </svg>,
    // Node.js
    <svg key="nodejs" viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#333333" />
      <path d="M64 18 L104 40 V88 L64 110 L24 88 V40 Z" fill="#339933" />
      <text x="64" y="76" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="30" fill="#ffffff">JS</text>
    </svg>,
    // Vue
    <svg key="vue" viewBox="0 0 128 128" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="128" height="128" rx="18" fill="#ffffff" />
      <path d="M20 24 L64 100 L108 24 H86 L64 62 L42 24 Z" fill="#4FC08D" />
      <path d="M46 24 L64 55 L82 24 H68 L64 31 L60 24 Z" fill="#35495E" />
    </svg>,
  ],
}

const GRAPH_WIDTH = 220
const GRAPH_HEIGHT = 150
const MAIN_NODE = { x: 34, y: 75 }
const HUB_NODE = { x: 108, y: 75 }
const BRANCH_NODES = [
  { x: 186, y: 26 },
  { x: 186, y: 75 },
  { x: 186, y: 124 },
]

const TechIcon = memo(({
  tech,
  percentage,
  color,
  scale = 1,
  animate,
}: {
  tech: "python" | "typescript" | "javascript"
  percentage: number
  color: string
  scale?: number
  animate: boolean
}) => {
  const related = RELATED_SVGS[tech]
  const mainNodeSize = 62
  const hubNodeSize = 14
  const branchNodeSize = 42

  const linePaths = BRANCH_NODES.map(
    (node) =>
      `M${HUB_NODE.x},${HUB_NODE.y} C${(HUB_NODE.x + node.x) / 2},${HUB_NODE.y} ${(HUB_NODE.x + node.x) / 2},${node.y} ${node.x - branchNodeSize / 2 - 2},${node.y}`
  )

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative"
        style={{ width: GRAPH_WIDTH * scale, height: GRAPH_HEIGHT * scale }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: GRAPH_WIDTH, height: GRAPH_HEIGHT, transform: `scale(${scale})` }}
        >
          <svg
            viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
            className="absolute inset-0 w-full h-full"
            fill="none"
          >
            <motion.line
              x1={MAIN_NODE.x + mainNodeSize / 2}
              y1={MAIN_NODE.y}
              x2={HUB_NODE.x}
              y2={HUB_NODE.y}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {linePaths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.12, ease: "easeOut" }}
              />
            ))}
            <motion.circle
              cx={HUB_NODE.x}
              cy={HUB_NODE.y}
              r={hubNodeSize / 2}
              fill={color}
              initial={{ scale: 0 }}
              animate={animate ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ transformOrigin: `${HUB_NODE.x}px ${HUB_NODE.y}px` }}
            />
          </svg>

          {/* Main language node */}
          <motion.div
            className="absolute rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center overflow-hidden"
            style={{
              width: mainNodeSize,
              height: mainNodeSize,
              left: MAIN_NODE.x - mainNodeSize / 2,
              top: MAIN_NODE.y - mainNodeSize / 2,
              padding: mainNodeSize * 0.16,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden">{TECH_SVGS[tech]}</div>
          </motion.div>

          {/* Derived tech nodes */}
          {BRANCH_NODES.map((node, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center overflow-hidden"
              style={{
                width: branchNodeSize,
                height: branchNodeSize,
                left: node.x - branchNodeSize / 2,
                top: node.y - branchNodeSize / 2,
                padding: branchNodeSize * 0.16,
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.12 }}
            >
              <div className="w-full h-full rounded-full overflow-hidden">{related[i]}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.span
        className="text-lg sm:text-xl font-bold"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {percentage}%
      </motion.span>
    </div>
  )
})

TechIcon.displayName = "TechIcon"

const TechStack = () => {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false)
  const desktopRef = useRef<HTMLDivElement>(null)
  const isDesktopInView = useInView(desktopRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isDesktopInView && !hasAnimatedOnce) {
      setHasAnimatedOnce(true)
    }
  }, [isDesktopInView, hasAnimatedOnce])

  const stackData = [
    { name: "Python", tech: "python" as const, percentage: 85, color: "#F97316", tags: language === "es" ? ["IA", "Automatización", "Testing", "Backend"] : ["AI", "Automation", "Testing", "Backend"] },
    { name: "TypeScript", tech: "typescript" as const, percentage: 90, color: "#3178C6", tags: language === "es" ? ["Tipado", "Escalable", "Seguro", "Moderno"] : ["Typed", "Scalable", "Safe", "Modern"] },
    { name: "JavaScript", tech: "javascript" as const, percentage: 90, color: "#CA8A04", tags: language === "es" ? ["Frontend", "APIs", "Interactivo", "Dinámico"] : ["Frontend", "APIs", "Interactive", "Dynamic"] },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stackData.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [stackData.length])

  return (
    <section id="tech-stack" className="relative flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <SectionBlobs />
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {language === "es" ? "Mi Stack de Trabajo" : "My Work Stack"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {language === "es"
              ? "Implementación de arquitecturas modernas para el desarrollo de soluciones integrales, escalables y orientadas a resultados."
              : "Implementation of modern architectures for the development of comprehensive, scalable and results-oriented solutions."}
          </p>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-3 md:mt-4"></div>
        </motion.div>

        {/* Desktop View */}
        <div className="hidden md:block" ref={desktopRef}>
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stackData.map((stack, index) => (
              <motion.div
                key={`desktop-${stack.name}-${index}`}
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <h3 className="text-lg lg:text-xl font-bold" style={{ color: stack.color }}>
                  {stack.name}
                </h3>
                <TechIcon
                  tech={stack.tech}
                  percentage={stack.percentage}
                  color={stack.color}
                  scale={0.62}
                  animate={hasAnimatedOnce}
                />
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                  {stack.tags.join(" | ")}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden max-w-xs mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4 py-4"
            >
              <h3 className="text-lg font-bold" style={{ color: stackData[currentSlide].color }}>
                {stackData[currentSlide].name}
              </h3>
              <TechIcon
                tech={stackData[currentSlide].tech}
                percentage={stackData[currentSlide].percentage}
                color={stackData[currentSlide].color}
                scale={0.68}
                animate={true}
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed px-4">
                {stackData[currentSlide].tags.join(" | ")}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-1.5 mt-4">
            {stackData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack
