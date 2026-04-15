"use client"

import { useState, useEffect } from "react"
import { Github, ExternalLink, ArrowRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"

// Colores para cada proyecto
const projectColors = [
  "#10b981", // Verde esmeralda - Picapastos
  "#8b5cf6", // Violeta - AlterEgo
  "#0ea5e9", // Azul cielo - Mi Kaza
  "#f59e0b", // Ámbar - Tender Go
  "#ef4444", // Rojo - MC-Arquitectos
  "#ec4899", // Rosa - Club Sacrifice
]

// Reusable circular progress — same visual as Skills section
const CircularProgress = ({
  percentage,
  label,
  color = "#0ea5e9",
  size = 100,
}: {
  percentage: number
  label: string
  color?: string
  size?: number
}) => {
  const strokeWidth = size < 80 ? 5 : size < 100 ? 6 : 7
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const fontSize = size < 80 ? "text-sm" : size < 100 ? "text-base" : "text-lg"
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="transparent" className="dark:stroke-gray-700" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            stroke={color} strokeWidth={strokeWidth} fill="transparent" strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${(percentage / 100) * circumference} ${circumference}` }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className={`${fontSize} font-bold`} style={{ color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {percentage}%
          </motion.span>
        </div>
      </div>
      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center leading-tight max-w-[60px] sm:max-w-[80px] md:max-w-[90px]">{label}</p>
    </div>
  )
}

const Experience = () => {
  const { language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const [currentSlide, setCurrentSlide] = useState(0)

  const projects = language === "es"
    ? [
        {
          title: "Picapastos y Molinos",
          highlight: "Vilar",
          logo: "PMV",
          role: "Web Developer",
          period: "Dic 2025 – Feb 2026",
          duration: "3 meses",
          description: "Desarrollo de sitio web corporativo con catálogo de productos y sistema administrativo interno, logrando un mayor posicionamiento de la marca y la optimización de la gestión de su catálogo.",
          metrics: [
            { label: "Posicionamiento", value: 95 },
            { label: "Optimización", value: 90 },
            { label: "Usabilidad", value: 100 },
          ],
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          scope: "Sitio web corporativo con catálogo de productos dinámico y panel administrativo para gestión de contenido.",
          github: "https://github.com/harryfishert",
          demo: "https://www.picapastosymolinosvilar.com.co",
          featured: true,
          color: projectColors[0],
        },
        {
          title: "AlterEgo",
          highlight: "Store",
          logo: "AE",
          role: "Web Developer & UX/UI",
          period: "Sep 2025 – Nov 2025",
          duration: "2 meses",
          description: "Desarrollo de e-commerce con panel de administración y flujo de ventas integrado a WhatsApp, mejorando la gestión de pedidos y la experiencia de usuario.",
          metrics: [
            { label: "Conversión", value: 85 },
            { label: "UX Score", value: 92 },
            { label: "Satisfacción", value: 95 },
          ],
          technologies: ["Next.js", "React", "Supabase", "WhatsApp API"],
          scope: "E-commerce completo con carrito de compras, panel admin y flujo de ventas automatizado via WhatsApp.",
          github: "https://github.com/harryfishert",
          demo: "https://www.alterego-store.com.co",
          featured: true,
          color: projectColors[1],
        },
        {
          title: "Mi Kaza",
          highlight: "Rental",
          logo: "MK",
          role: "Full Stack Developer",
          period: "May 2025 – Jun 2025",
          duration: "2 meses",
          description: "Implementación de plataforma de alojamiento universitario utilizando Next.js, React y Supabase, con gestión de datos en tiempo real y una base sólida para futuras versiones del producto.",
          metrics: [
            { label: "Real-time", value: 100 },
            { label: "Escalabilidad", value: 88 },
            { label: "Performance", value: 90 },
          ],
          technologies: ["Next.js", "React", "Supabase", "PostgreSQL"],
          scope: "Plataforma de alojamiento con búsqueda avanzada, sistema de reservas y gestión de propiedades en tiempo real.",
          github: "https://github.com/harryfishert",
          demo: "#",
          featured: false,
          color: projectColors[2],
        },
        {
          title: "Tender",
          highlight: "Go",
          logo: "TG",
          role: "Desarrollador SaaS",
          period: "Mar 2025 – May 2025",
          duration: "3 meses",
          description: "Diseño e implementación de sistema SaaS para la gestión de ingresos de caja, adaptable a múltiples tipos de negocio, facilitando el control financiero y la toma de decisiones.",
          metrics: [
            { label: "Eficiencia", value: 92 },
            { label: "Adaptabilidad", value: 95 },
            { label: "Control", value: 88 },
          ],
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          scope: "Sistema SaaS multi-tenant para gestión financiera con reportes automáticos y dashboard analítico.",
          github: "https://github.com/harryfishert",
          demo: "#",
          featured: false,
          color: projectColors[3],
        },
        {
          title: "MC",
          highlight: "Arquitectos",
          logo: "MC",
          role: "Arquitecto de Software & Backend",
          period: "Sep 2024 – Dic 2024",
          duration: "4 meses",
          description: "Definición de arquitectura backend con FastAPI e implementación de sistema de geolocalización por coordenadas para predios en Bogotá, integrando bases de datos relacionales y preparando la estructura para modelos de machine learning.",
          metrics: [
            { label: "Arquitectura", value: 95 },
            { label: "Geolocalización", value: 90 },
            { label: "ML Ready", value: 85 },
          ],
          technologies: ["FastAPI", "Python", "PostgreSQL", "GIS"],
          scope: "Backend escalable con sistema de geolocalización, API REST y preparación para integración de modelos ML.",
          github: "https://github.com/harryfishert",
          demo: "#",
          featured: false,
          color: projectColors[4],
        },
        {
          title: "Club Sacrifice",
          highlight: "Powerlifting",
          logo: "CS",
          role: "Frontend Developer",
          period: "Ene 2024",
          duration: "1 mes",
          description: "Desarrollo de interfaz web optimizada para el fortalecimiento de la presencia digital de la marca y mejora de la interacción con la comunidad.",
          metrics: [
            { label: "Engagement", value: 88 },
            { label: "Diseño", value: 92 },
            { label: "Velocidad", value: 95 },
          ],
          technologies: ["React", "Tailwind CSS", "Framer Motion"],
          scope: "Landing page interactiva con diseño moderno y optimización para redes sociales.",
          github: "https://github.com/harryfishert",
          demo: "#",
          featured: false,
          color: projectColors[5],
        },
      ]
    : [
        {
          title: "Picapastos y Molinos",
          highlight: "Vilar",
          logo: "PMV",
          role: "Web Developer",
          period: "Dec 2025 – Feb 2026",
          duration: "3 months",
          description: "Development of corporate website with product catalog and internal administrative system, achieving greater brand positioning and optimization of catalog management.",
          metrics: [
            { label: "Positioning", value: 95 },
            { label: "Optimization", value: 90 },
            { label: "Usability", value: 100 },
          ],
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          scope: "Corporate website with dynamic product catalog and admin panel for content management.",
          github: "https://github.com/harryfishert",
          demo: "https://www.picapastosymolinosvilar.com.co",
          featured: true,
          color: projectColors[0],
        },
        {
          title: "AlterEgo",
          highlight: "Store",
          logo: "AE",
          role: "Web Developer & UX/UI",
          period: "Sep 2025 – Nov 2025",
          duration: "2 months",
          description: "E-commerce development with admin panel and sales flow integrated with WhatsApp, improving order management and user experience.",
          metrics: [
            { label: "Conversion", value: 85 },
            { label: "UX Score", value: 92 },
            { label: "Satisfaction", value: 95 },
          ],
          technologies: ["Next.js", "React", "Supabase", "WhatsApp API"],
          scope: "Complete e-commerce with shopping cart, admin panel and automated sales flow via WhatsApp.",
          github: "https://github.com/harryfishert",
          demo: "https://www.alterego-store.com.co",
          featured: true,
          color: projectColors[1],
        },
        {
          title: "Mi Kaza",
          highlight: "Rental",
          logo: "MK",
          role: "Full Stack Developer",
          period: "May 2025 – Jun 2025",
          duration: "2 months",
          description: "Implementation of university housing platform using Next.js, React and Supabase, with real-time data management and a solid foundation for future product versions.",
          metrics: [
            { label: "Real-time", value: 100 },
            { label: "Scalability", value: 88 },
            { label: "Performance", value: 90 },
          ],
          technologies: ["Next.js", "React", "Supabase", "PostgreSQL"],
          scope: "Housing platform with advanced search, booking system and real-time property management.",
          github: "https://github.com/harryfishert",
          demo: "#",
          featured: false,
          color: projectColors[2],
        },
        {
          title: "Tender",
          highlight: "Go",
          logo: "TG",
          role: "SaaS Developer",
          period: "Mar 2025 – May 2025",
          duration: "3 months",
          description: "Design and implementation of SaaS system for cash income management, adaptable to multiple types of business, facilitating financial control and decision making.",
          metrics: [
            { label: "Efficiency", value: 92 },
            { label: "Adaptability", value: 95 },
            { label: "Control", value: 88 },
          ],
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          scope: "Multi-tenant SaaS system for financial management with automatic reports and analytical dashboard.",
          github: "https://github.com/harryfishert",
          demo: "#",
          featured: false,
          color: projectColors[3],
        },
        {
          title: "MC",
          highlight: "Arquitectos",
          logo: "MC",
          role: "Software Architect & Backend",
          period: "Sep 2024 – Dec 2024",
          duration: "4 months",
          description: "Backend architecture definition with FastAPI and implementation of geolocation system by coordinates for properties in Bogota, integrating relational databases and preparing the structure for machine learning models.",
          metrics: [
            { label: "Architecture", value: 95 },
            { label: "Geolocation", value: 90 },
            { label: "ML Ready", value: 85 },
          ],
          technologies: ["FastAPI", "Python", "PostgreSQL", "GIS"],
          scope: "Scalable backend with geolocation system, REST API and preparation for ML model integration.",
          github: "https://github.com/harryfishert",
          demo: "#",
          featured: false,
          color: projectColors[4],
        },
        {
          title: "Club Sacrifice",
          highlight: "Powerlifting",
          logo: "CS",
          role: "Frontend Developer",
          period: "Jan 2024",
          duration: "1 month",
          description: "Development of optimized web interface for strengthening the brand's digital presence and improving interaction with the community.",
          metrics: [
            { label: "Engagement", value: 88 },
            { label: "Design", value: 92 },
            { label: "Speed", value: 95 },
          ],
          technologies: ["React", "Tailwind CSS", "Framer Motion"],
          scope: "Interactive landing page with modern design and optimization for social networks.",
          github: "https://github.com/harryfishert",
          demo: "#",
          featured: false,
          color: projectColors[5],
        },
      ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [projects.length])

  const currentProject = projects[currentSlide]

  return (
    <section id="experience" className="relative flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)`
        }} />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="experience-dots" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="10" cy="10" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="70" cy="70" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
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
              ? "Proyectos reales con resultados tangibles para clientes y empresas."
              : "Real projects with tangible results for clients and businesses."}
          </p>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-3 md:mt-4"></div>
        </motion.div>

        {/* Carousel - side by side on desktop */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-12 py-2 md:py-4"
            >
              {/* Left side - Project info */}
              <div className="flex-1 text-center md:text-left order-2 md:order-1">
                {/* Project logo badge with featured indicator */}
                <div className="flex justify-center md:justify-start items-center gap-2 mb-2 md:mb-4">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${currentProject.color}15`,
                      border: `1px solid ${currentProject.color}30`
                    }}
                  >
                    <span 
                      className="font-bold text-[10px] sm:text-xs md:text-sm tracking-wide"
                      style={{ color: currentProject.color }}
                    >
                      {currentProject.logo}
                    </span>
                  </div>
                  {currentProject.featured && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-[10px] sm:text-xs font-medium text-amber-700 dark:text-amber-400">
                        {language === "es" ? "Destacado" : "Featured"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title with integrated logo */}
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                  {currentProject.title}{" "}
                  <span style={{ color: currentProject.color }}>{currentProject.highlight}</span>
                </h3>

                {/* Role and period */}
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-2 md:mb-3">
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

                {/* Scope - hidden on mobile for space */}
                <div className="hidden sm:block mb-2 md:mb-4 p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    {language === "es" ? "Alcance del proyecto" : "Project scope"}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {currentProject.scope}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2 mb-3 md:mb-6">
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

                {/* Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                  <Button
                    asChild
                    size="sm"
                    className="bg-[#24292e] hover:bg-[#24292e]/90 text-white rounded-lg px-3 sm:px-4 md:px-5 py-1.5 md:py-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  >
                    <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                      GitHub
                    </a>
                  </Button>
                  {currentProject.demo !== "#" && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-lg px-3 sm:px-4 md:px-5 py-1.5 md:py-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                      style={{ 
                        borderColor: currentProject.color,
                        color: currentProject.color
                      }}
                    >
                      <a href={currentProject.demo} target="_blank" rel="noopener noreferrer">
                        {language === "es" ? "Ver proyecto" : "View project"}
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Right side - Circular metrics */}
              <div className="flex-shrink-0 order-1 md:order-2 w-full md:w-auto">
                <div 
                  className="rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8"
                  style={{
                    background: `linear-gradient(135deg, ${currentProject.color}08 0%, ${currentProject.color}15 100%)`,
                    border: `1px solid ${currentProject.color}25`
                  }}
                >
                  <h4 className="text-center text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 md:mb-6 uppercase tracking-wider">
                    {language === "es" ? "Métricas del proyecto" : "Project metrics"}
                  </h4>
                  <div className="flex items-start justify-center gap-3 sm:gap-4 md:gap-6">
                    {currentProject.metrics.map((metric, index) => (
                      <motion.div
                        key={`${currentSlide}-${index}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.1 }}
                      >
                        <div className="block sm:hidden">
                          <CircularProgress
                            percentage={metric.value}
                            label={metric.label}
                            color={currentProject.color}
                            size={70}
                          />
                        </div>
                        <div className="hidden sm:block md:hidden">
                          <CircularProgress
                            percentage={metric.value}
                            label={metric.label}
                            color={currentProject.color}
                            size={85}
                          />
                        </div>
                        <div className="hidden md:block">
                          <CircularProgress
                            percentage={metric.value}
                            label={metric.label}
                            color={currentProject.color}
                            size={100}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar indicator with colors */}
          <div className="flex justify-center gap-1.5 mt-4 md:mt-8">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
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
          <p className="text-gray-600 dark:text-gray-400 mb-2 md:mb-4 text-xs sm:text-sm">
            {language === "es"
              ? "Explora más proyectos y contribuciones en mi repositorio"
              : "Explore more projects and contributions in my repository"}
          </p>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-gray-300 dark:border-gray-600 hover:border-[#24292e] hover:bg-[#24292e] hover:text-white transition-all rounded-lg px-4 md:px-6 py-1.5 md:py-2 flex items-center gap-1.5 md:gap-2 mx-auto text-xs sm:text-sm"
          >
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              {language === "es" ? "Ver todo en GitHub" : "View all on GitHub"}
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
