"use client"

import { useState, useEffect } from "react"
import { Github, ExternalLink, ArrowRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"

// Colores para cada proyecto
const projectColors = [
  "#ef0000", // Rojo puro - Picapastos
  "#722f37", // Vinotinto - AlterEgo
  "#7c3aed", // Morado semioscuro - Mi Kaza
  "#1e3a5f", // Azul oscuro - Tender Go
  "#3b82f6", // Azul - MC-Arquitectos
  "#991b1b", // Rojo oscuro - Club Sacrifice Powerlifting
]

// Circular progress component - same style as Skills section
const CircularProgress = ({ percentage, color, size = 140 }: { percentage: number, color: string, size?: number }) => {
  const strokeWidth = size < 120 ? 6 : 8
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
          className="text-xl sm:text-2xl md:text-3xl font-bold"
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

const Experience = () => {
  const { language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0)

  const projects = language === "es"
    ? [
        {
          title: "Picapastos",
          highlight: "y Molinos Vilar",
          role: "Web Developer",
          period: "Dic 2025 – Feb 2026",
          duration: "3 meses",
          description: "Desarrollo de sitio web corporativo con catálogo de productos y sistema administrativo interno, logrando un mayor posicionamiento de la marca y la optimización de la gestión de su catálogo.",
          metrics: [
            { label: "Posicionamiento de marca", value: 95 },
            { label: "Optimización de catálogo", value: 90 },
            { label: "Usabilidad del sistema", value: 100 },
          ],
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          scope: "Sitio web corporativo con catálogo de productos dinámico y panel administrativo para gestión de contenido.",
          hasGithub: false,
          demo: "https://www.picapastosymolinosvilar.com.co",
          featured: true,
          color: projectColors[0],
        },
        {
          title: "AlterEgo",
          highlight: "Store",
          role: "Web Developer & UX/UI",
          period: "Sep 2025 – Nov 2025",
          duration: "2 meses",
          description: "Desarrollo de e-commerce con panel de administración y flujo de ventas integrado a WhatsApp, mejorando la gestión de pedidos y la experiencia de usuario.",
          metrics: [
            { label: "Conversión de ventas", value: 85 },
            { label: "Experiencia de usuario", value: 92 },
            { label: "Satisfacción cliente", value: 95 },
          ],
          technologies: ["Next.js", "React", "Supabase", "WhatsApp API"],
          scope: "E-commerce completo con carrito de compras, panel admin y flujo de ventas automatizado via WhatsApp.",
          hasGithub: false,
          demo: "https://www.alterego-store.com.co",
          featured: true,
          color: projectColors[1],
        },
        {
          title: "Mi Kaza",
          highlight: "Rental",
          role: "Full Stack Developer",
          period: "May 2025 – Jun 2025",
          duration: "2 meses",
          description: "Implementación de plataforma de alojamiento universitario utilizando Next.js, React y Supabase, con gestión de datos en tiempo real y una base sólida para futuras versiones del producto.",
          metrics: [
            { label: "Datos en tiempo real", value: 100 },
            { label: "Escalabilidad", value: 88 },
            { label: "Performance", value: 90 },
          ],
          technologies: ["Next.js", "React", "Supabase", "PostgreSQL"],
          scope: "Plataforma de alojamiento con búsqueda avanzada, sistema de reservas y gestión de propiedades en tiempo real.",
          hasGithub: false,
          demo: "https://mi-kaza-rental.vercel.app",
          featured: false,
          color: projectColors[2],
        },
        {
          title: "Tender",
          highlight: "Go",
          role: "Desarrollador SaaS",
          period: "Mar 2025 – May 2025",
          duration: "3 meses",
          description: "Diseño e implementación de sistema SaaS para la gestión de ingresos de caja, adaptable a múltiples tipos de negocio, facilitando el control financiero y la toma de decisiones.",
          metrics: [
            { label: "Eficiencia operativa", value: 92 },
            { label: "Adaptabilidad", value: 95 },
            { label: "Control financiero", value: 88 },
          ],
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          scope: "Sistema SaaS multi-tenant para gestión financiera con reportes automáticos y dashboard analítico.",
          hasGithub: false,
          demo: "https://tender-go.vercel.app",
          featured: false,
          color: projectColors[3],
        },
        {
          title: "MC",
          highlight: "Arquitectos",
          role: "Arquitecto de Software & Backend",
          period: "Sep 2024 – Dic 2024",
          duration: "4 meses",
          description: "Definición de arquitectura backend con FastAPI e implementación de sistema de geolocalización por coordenadas para predios en Bogotá, integrando bases de datos relacionales y preparando la estructura para modelos de machine learning.",
          metrics: [
            { label: "Arquitectura robusta", value: 95 },
            { label: "Geolocalización", value: 90 },
            { label: "Preparación ML", value: 85 },
          ],
          technologies: ["FastAPI", "Python", "PostgreSQL", "GIS"],
          scope: "Backend escalable con sistema de geolocalización, API REST y preparación para integración de modelos ML.",
          hasGithub: true,
          demo: "#",
          featured: false,
          color: projectColors[4],
        },
        {
          title: "Club Sacrifice",
          highlight: "Powerlifting",
          role: "Frontend Developer",
          period: "Ene 2024",
          duration: "1 mes",
          description: "Desarrollo de interfaz web optimizada para el fortalecimiento de la presencia digital de la marca y mejora de la interacción con la comunidad.",
          metrics: [
            { label: "Engagement", value: 88 },
            { label: "Diseño visual", value: 92 },
            { label: "Velocidad de carga", value: 95 },
          ],
          technologies: ["React", "Tailwind CSS", "Framer Motion"],
          scope: "Landing page interactiva con diseño moderno y optimización para redes sociales.",
          hasGithub: false,
          demo: "#",
          featured: false,
          color: projectColors[5],
        },
      ]
    : [
        {
          title: "Picapastos",
          highlight: "y Molinos Vilar",
          role: "Web Developer",
          period: "Dec 2025 – Feb 2026",
          duration: "3 months",
          description: "Development of corporate website with product catalog and internal administrative system, achieving greater brand positioning and optimization of catalog management.",
          metrics: [
            { label: "Brand positioning", value: 95 },
            { label: "Catalog optimization", value: 90 },
            { label: "System usability", value: 100 },
          ],
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          scope: "Corporate website with dynamic product catalog and admin panel for content management.",
          hasGithub: false,
          demo: "https://www.picapastosymolinosvilar.com.co",
          featured: true,
          color: projectColors[0],
        },
        {
          title: "AlterEgo",
          highlight: "Store",
          role: "Web Developer & UX/UI",
          period: "Sep 2025 – Nov 2025",
          duration: "2 months",
          description: "E-commerce development with admin panel and sales flow integrated with WhatsApp, improving order management and user experience.",
          metrics: [
            { label: "Sales conversion", value: 85 },
            { label: "User experience", value: 92 },
            { label: "Client satisfaction", value: 95 },
          ],
          technologies: ["Next.js", "React", "Supabase", "WhatsApp API"],
          scope: "Complete e-commerce with shopping cart, admin panel and automated sales flow via WhatsApp.",
          hasGithub: false,
          demo: "https://www.alterego-store.com.co",
          featured: true,
          color: projectColors[1],
        },
        {
          title: "Mi Kaza",
          highlight: "Rental",
          role: "Full Stack Developer",
          period: "May 2025 – Jun 2025",
          duration: "2 months",
          description: "Implementation of university housing platform using Next.js, React and Supabase, with real-time data management and a solid foundation for future product versions.",
          metrics: [
            { label: "Real-time data", value: 100 },
            { label: "Scalability", value: 88 },
            { label: "Performance", value: 90 },
          ],
          technologies: ["Next.js", "React", "Supabase", "PostgreSQL"],
          scope: "Housing platform with advanced search, booking system and real-time property management.",
          hasGithub: false,
          demo: "https://mi-kaza-rental.vercel.app",
          featured: false,
          color: projectColors[2],
        },
        {
          title: "Tender",
          highlight: "Go",
          role: "SaaS Developer",
          period: "Mar 2025 – May 2025",
          duration: "3 months",
          description: "Design and implementation of SaaS system for cash income management, adaptable to multiple types of business, facilitating financial control and decision making.",
          metrics: [
            { label: "Operational efficiency", value: 92 },
            { label: "Adaptability", value: 95 },
            { label: "Financial control", value: 88 },
          ],
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          scope: "Multi-tenant SaaS system for financial management with automatic reports and analytical dashboard.",
          hasGithub: false,
          demo: "https://tender-go.vercel.app",
          featured: false,
          color: projectColors[3],
        },
        {
          title: "MC",
          highlight: "Arquitectos",
          role: "Software Architect & Backend",
          period: "Sep 2024 – Dec 2024",
          duration: "4 months",
          description: "Backend architecture definition with FastAPI and implementation of geolocation system by coordinates for properties in Bogota, integrating relational databases and preparing the structure for machine learning models.",
          metrics: [
            { label: "Robust architecture", value: 95 },
            { label: "Geolocation", value: 90 },
            { label: "ML preparation", value: 85 },
          ],
          technologies: ["FastAPI", "Python", "PostgreSQL", "GIS"],
          scope: "Scalable backend with geolocation system, REST API and preparation for ML model integration.",
          hasGithub: true,
          demo: "#",
          featured: false,
          color: projectColors[4],
        },
        {
          title: "Club Sacrifice",
          highlight: "Powerlifting",
          role: "Frontend Developer",
          period: "Jan 2024",
          duration: "1 month",
          description: "Development of optimized web interface for strengthening the brand's digital presence and improving interaction with the community.",
          metrics: [
            { label: "Engagement", value: 88 },
            { label: "Visual design", value: 92 },
            { label: "Load speed", value: 95 },
          ],
          technologies: ["React", "Tailwind CSS", "Framer Motion"],
          scope: "Interactive landing page with modern design and optimization for social networks.",
          hasGithub: false,
          demo: "#",
          featured: false,
          color: projectColors[5],
        },
      ]

  // Auto-play carousel for projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length)
      setCurrentMetricIndex(0) // Reset metric index when project changes
    }, 7000)
    return () => clearInterval(interval)
  }, [projects.length])

  // Auto-play carousel for metrics (one at a time) - slower for better visualization
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetricIndex((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentProject = projects[currentSlide]
  const currentMetric = currentProject.metrics[currentMetricIndex]

  return (
    <section id="experience" className="relative flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 5% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 95% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
                           radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.2) 0%, transparent 40%)`
        }} />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="experience-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="15" cy="15" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="85" cy="85" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#experience-dots)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {language === "es"
              ? "Experiencia Laboral"
              : "Work Experience"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {language === "es"
              ? "Desarrollo de soluciones full stack basadas en problemas reales y enfocadas en entornos de producción."
              : "Development of full stack solutions based on real problems and focused on production environments."}
          </p>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-3 md:mt-4"></div>
        </motion.div>

        {/* Carousel - same layout as Skills */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 py-2 md:py-4"
            >
              {/* Text content - centered */}
              <div className="text-center order-2 md:order-1">
                {/* Title with star for featured */}
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2 flex items-center justify-center gap-2">
                  <span>
                    {currentProject.title}{" "}
                    <span style={{ color: currentProject.color }}>{currentProject.highlight}</span>
                  </span>
                  {currentProject.featured && (
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500 flex-shrink-0" />
                  )}
                </h3>

                {/* Role and period */}
                <div className="flex flex-wrap justify-center items-center gap-2 mb-2 md:mb-3">
                  <span 
                    className="text-xs sm:text-sm font-semibold"
                    style={{ color: currentProject.color }}
                  >
                    {currentProject.role}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {currentProject.period} ({currentProject.duration})
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base mb-2 md:mb-4 leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                  {currentProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full"
                      style={{ 
                        backgroundColor: `${currentProject.color}15`,
                        color: currentProject.color
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Circular progress - ONE at a time with carousel effect */}
              <div className="flex flex-col items-center gap-2 md:gap-3 order-1 md:order-2">
                {/* Buttons - above the graph */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-2">
                  {/* GitHub button - only for MC-Arquitectos */}
                  {currentProject.hasGithub && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="rounded-lg px-3 sm:px-4 md:px-5 py-1 md:py-1.5 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-transparent"
                    >
                      <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {/* Ver proyecto button - for all projects with demo link */}
                  {currentProject.demo !== "#" && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="rounded-lg px-3 sm:px-4 md:px-5 py-1 md:py-1.5 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:bg-transparent"
                      style={{ 
                        color: currentProject.color
                      }}
                    >
                      <a href={currentProject.demo} target="_blank" rel="noopener noreferrer">
                        {language === "es" ? "Ver proyecto" : "View project"}
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    </Button>
                  )}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentSlide}-${currentMetricIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="block sm:hidden">
                      <CircularProgress
                        percentage={currentMetric.value}
                        color={currentProject.color}
                        size={100}
                      />
                    </div>
                    <div className="hidden sm:block md:hidden">
                      <CircularProgress
                        percentage={currentMetric.value}
                        color={currentProject.color}
                        size={120}
                      />
                    </div>
                    <div className="hidden md:block">
                      <CircularProgress
                        percentage={currentMetric.value}
                        color={currentProject.color}
                        size={140}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
                <motion.p
                  key={`label-${currentSlide}-${currentMetricIndex}`}
                  className="text-[10px] sm:text-xs md:text-sm font-medium text-center max-w-[100px] sm:max-w-[140px] md:max-w-[160px] leading-relaxed"
                  style={{ color: currentProject.color }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentMetric.label}
                </motion.p>
                
                {/* Metric indicators */}
                <div className="flex justify-center gap-1.5 mt-2">
                  {currentProject.metrics.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentMetricIndex
                          ? "w-4"
                          : "w-1.5 bg-gray-300 dark:bg-gray-600"
                      }`}
                      style={{
                        backgroundColor: index === currentMetricIndex ? currentProject.color : undefined
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar indicator with colors */}
          <div className="flex justify-center gap-1.5 mt-4 md:mt-8">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setCurrentMetricIndex(0)
                }}
                className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-6 md:w-8"
                    : "w-1.5 md:w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                style={{
                  backgroundColor: index === currentSlide ? project.color : undefined
                }}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* GitHub CTA */}
        <motion.div 
          className="text-center mt-6 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-2 md:mb-4 text-xs sm:text-sm max-w-md mx-auto">
            {language === "es"
              ? "Explora más proyectos y contribuciones en mi repositorio"
              : "Explore more projects and contributions in my repository"}
          </p>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-gray-300 dark:border-gray-600 hover:border-[#24292e] hover:bg-[#24292e] hover:text-white transition-all rounded-lg px-4 md:px-6 py-1.5 md:py-2 inline-flex items-center gap-1.5 md:gap-2 text-xs sm:text-sm w-auto"
          >
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              {language === "es" ? "Ver más en GitHub" : "View more on GitHub"}
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
