"use client"

import { useState, useEffect } from "react"
import { Github, ExternalLink, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"

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
          title: "Sistema de Reservas",
          highlight: "MiKaza",
          logo: "MK",
          description: "Plataforma web completa para gestión de reservas de alojamientos con panel administrativo avanzado, sistema de pagos integrado y notificaciones en tiempo real.",
          metrics: [
            { label: "Satisfacción", value: 95 },
            { label: "Rendimiento", value: 90 },
            { label: "Crecimiento", value: 40 },
          ],
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          scope: "Sistema completo de reservas con autenticación, panel admin, reportes y analytics.",
          github: "https://github.com/harryfishert",
          demo: "#",
        },
        {
          title: "Procesador",
          highlight: "NLP",
          logo: "NLP",
          description: "Sistema avanzado de procesamiento de lenguaje natural para análisis de textos, detección de sentimientos y extracción de entidades con modelos de machine learning.",
          metrics: [
            { label: "Precisión", value: 94 },
            { label: "Cobertura", value: 88 },
            { label: "Velocidad", value: 97 },
          ],
          technologies: ["Python", "FastAPI", "TensorFlow", "spaCy"],
          scope: "API REST para análisis de texto con endpoints de clasificación, NER y sentiment analysis.",
          github: "https://github.com/harryfishert",
          demo: "#",
        },
        {
          title: "Gestor de",
          highlight: "Vuelos",
          logo: "GV",
          description: "Aplicación web para búsqueda y gestión de vuelos con comparador de precios, sistema de pagos integrado y gestión de reservas multi-destino.",
          metrics: [
            { label: "Conversión", value: 25 },
            { label: "Disponibilidad", value: 99 },
            { label: "Retención", value: 72 },
          ],
          technologies: ["Vue.js", "Django", "Redis", "Docker"],
          scope: "Integración con APIs de aerolíneas, comparador de precios y sistema de notificaciones.",
          github: "https://github.com/harryfishert",
          demo: "#",
        },
        {
          title: "ERP",
          highlight: "Arquitectura",
          logo: "ERP",
          description: "Sistema ERP completo para empresa de arquitectura con módulos de inventario, gestión de proyectos, facturación electrónica y reportes financieros.",
          metrics: [
            { label: "Eficiencia", value: 60 },
            { label: "Adopción", value: 85 },
            { label: "ROI", value: 92 },
          ],
          technologies: ["Django", "PostgreSQL", "Celery", "AWS"],
          scope: "Sistema modular con control de acceso, auditoría y generación automática de reportes.",
          github: "https://github.com/harryfishert",
          demo: "#",
        },
      ]
    : [
        {
          title: "Booking System",
          highlight: "MiKaza",
          logo: "MK",
          description: "Complete web platform for accommodation booking management with advanced admin panel, integrated payment system, and real-time notifications.",
          metrics: [
            { label: "Satisfaction", value: 95 },
            { label: "Performance", value: 90 },
            { label: "Growth", value: 40 },
          ],
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          scope: "Complete booking system with authentication, admin panel, reports and analytics.",
          github: "https://github.com/harryfishert",
          demo: "#",
        },
        {
          title: "NLP",
          highlight: "Processor",
          logo: "NLP",
          description: "Advanced natural language processing system for text analysis, sentiment detection, and entity extraction with machine learning models.",
          metrics: [
            { label: "Accuracy", value: 94 },
            { label: "Coverage", value: 88 },
            { label: "Speed", value: 97 },
          ],
          technologies: ["Python", "FastAPI", "TensorFlow", "spaCy"],
          scope: "REST API for text analysis with classification, NER and sentiment analysis endpoints.",
          github: "https://github.com/harryfishert",
          demo: "#",
        },
        {
          title: "Flight",
          highlight: "Manager",
          logo: "GV",
          description: "Web application for flight search and management with price comparator, integrated payment system, and multi-destination booking management.",
          metrics: [
            { label: "Conversion", value: 25 },
            { label: "Uptime", value: 99 },
            { label: "Retention", value: 72 },
          ],
          technologies: ["Vue.js", "Django", "Redis", "Docker"],
          scope: "Integration with airline APIs, price comparator, and notification system.",
          github: "https://github.com/harryfishert",
          demo: "#",
        },
        {
          title: "Architecture",
          highlight: "ERP",
          logo: "ERP",
          description: "Complete ERP system for architecture company with inventory modules, project management, electronic invoicing, and financial reports.",
          metrics: [
            { label: "Efficiency", value: 60 },
            { label: "Adoption", value: 85 },
            { label: "ROI", value: 92 },
          ],
          technologies: ["Django", "PostgreSQL", "Celery", "AWS"],
          scope: "Modular system with access control, auditing, and automatic report generation.",
          github: "https://github.com/harryfishert",
          demo: "#",
        },
      ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [projects.length])

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
              ? "Proyectos que generan impacto"
              : "Projects that generate impact"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {language === "es"
              ? "Soluciones reales con métricas comprobables y resultados tangibles para clientes y empresas."
              : "Real solutions with verifiable metrics and tangible results for clients and businesses."}
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
                {/* Project logo badge */}
                <div className="flex justify-center md:justify-start mb-2 md:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-[10px] sm:text-xs md:text-sm tracking-wide">
                      {projects[currentSlide].logo}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                  {projects[currentSlide].title}{" "}
                  <span className="text-primary">{projects[currentSlide].highlight}</span>
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base mb-2 md:mb-4 leading-relaxed">
                  {projects[currentSlide].description}
                </p>

                {/* Scope - hidden on mobile for space */}
                <div className="hidden sm:block mb-2 md:mb-4 p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    {language === "es" ? "Alcance del proyecto" : "Project scope"}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {projects[currentSlide].scope}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2 mb-3 md:mb-6">
                  {projects[currentSlide].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/10 text-primary text-[10px] sm:text-xs font-medium rounded-full"
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
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10 rounded-lg px-3 sm:px-4 md:px-5 py-1.5 md:py-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                  >
                    <a href={projects[currentSlide].demo} target="_blank" rel="noopener noreferrer">
                      {language === "es" ? "Ver proyecto" : "View project"}
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right side - Circular metrics */}
              <div className="flex-shrink-0 order-1 md:order-2 w-full md:w-auto">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-primary/20">
                  <h4 className="text-center text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3 md:mb-6 uppercase tracking-wider">
                    {language === "es" ? "Métricas del proyecto" : "Project metrics"}
                  </h4>
                  <div className="flex items-start justify-center gap-3 sm:gap-4 md:gap-6">
                    {projects[currentSlide].metrics.map((metric, index) => (
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
                            color="#0ea5e9"
                            size={70}
                          />
                        </div>
                        <div className="hidden sm:block md:hidden">
                          <CircularProgress
                            percentage={metric.value}
                            label={metric.label}
                            color="#0ea5e9"
                            size={85}
                          />
                        </div>
                        <div className="hidden md:block">
                          <CircularProgress
                            percentage={metric.value}
                            label={metric.label}
                            color="#0ea5e9"
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

          {/* Progress bar indicator */}
          <div className="flex justify-center gap-1.5 mt-4 md:mt-8">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-6 md:w-8 bg-primary"
                    : "w-1.5 md:w-2 bg-gray-300 dark:bg-gray-600"
                }`}
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
