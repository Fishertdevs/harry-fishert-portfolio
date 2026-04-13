"use client"

import { useState, useEffect } from "react"
import { Github, ExternalLink, ArrowRight, Users, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"

const Experience = () => {
  const { language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const [currentSlide, setCurrentSlide] = useState(0)

  const projects = language === "es"
    ? [
        {
          title: "Sistema de Reservas",
          highlight: "MiKaza",
          description: "Plataforma web completa para gestión de reservas de alojamientos con panel administrativo avanzado, sistema de pagos integrado y notificaciones en tiempo real.",
          metrics: [
            { icon: Users, label: "Usuarios activos", value: "500+" },
            { icon: Clock, label: "Tiempo de desarrollo", value: "3 meses" },
            { icon: TrendingUp, label: "Incremento reservas", value: "+40%" }
          ],
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          scope: "Sistema completo de reservas con autenticación, panel admin, reportes y analytics.",
          github: "https://github.com/harryfishert",
          demo: "#",
          color: "#0ea5e9"
        },
        {
          title: "Procesador",
          highlight: "NLP",
          description: "Sistema avanzado de procesamiento de lenguaje natural para análisis de textos, detección de sentimientos y extracción de entidades con modelos de machine learning.",
          metrics: [
            { icon: Users, label: "Textos procesados", value: "10K+" },
            { icon: Clock, label: "Tiempo de respuesta", value: "<500ms" },
            { icon: TrendingUp, label: "Precisión", value: "94%" }
          ],
          technologies: ["Python", "FastAPI", "TensorFlow", "spaCy"],
          scope: "API REST para análisis de texto con endpoints de clasificación, NER y sentiment analysis.",
          github: "https://github.com/harryfishert",
          demo: "#",
          color: "#0ea5e9"
        },
        {
          title: "Gestor de",
          highlight: "Vuelos",
          description: "Aplicación web para búsqueda y gestión de vuelos con comparador de precios, sistema de pagos integrado y gestión de reservas multi-destino.",
          metrics: [
            { icon: Users, label: "Búsquedas/día", value: "2K+" },
            { icon: Clock, label: "Desarrollo", value: "4 meses" },
            { icon: TrendingUp, label: "Conversión", value: "+25%" }
          ],
          technologies: ["Vue.js", "Django", "Redis", "Docker"],
          scope: "Integración con APIs de aerolíneas, comparador de precios y sistema de notificaciones.",
          github: "https://github.com/harryfishert",
          demo: "#",
          color: "#0ea5e9"
        },
        {
          title: "ERP",
          highlight: "Arquitectura",
          description: "Sistema ERP completo para empresa de arquitectura con módulos de inventario, gestión de proyectos, facturación electrónica y reportes financieros.",
          metrics: [
            { icon: Users, label: "Proyectos gestionados", value: "150+" },
            { icon: Clock, label: "Reducción tiempo", value: "-60%" },
            { icon: TrendingUp, label: "ROI", value: "300%" }
          ],
          technologies: ["Django", "PostgreSQL", "Celery", "AWS"],
          scope: "Sistema modular con control de acceso, auditoría y generación automática de reportes.",
          github: "https://github.com/harryfishert",
          demo: "#",
          color: "#0ea5e9"
        }
      ]
    : [
        {
          title: "Booking System",
          highlight: "MiKaza",
          description: "Complete web platform for accommodation booking management with advanced admin panel, integrated payment system, and real-time notifications.",
          metrics: [
            { icon: Users, label: "Active users", value: "500+" },
            { icon: Clock, label: "Development time", value: "3 months" },
            { icon: TrendingUp, label: "Booking increase", value: "+40%" }
          ],
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          scope: "Complete booking system with authentication, admin panel, reports and analytics.",
          github: "https://github.com/harryfishert",
          demo: "#",
          color: "#0ea5e9"
        },
        {
          title: "NLP",
          highlight: "Processor",
          description: "Advanced natural language processing system for text analysis, sentiment detection, and entity extraction with machine learning models.",
          metrics: [
            { icon: Users, label: "Texts processed", value: "10K+" },
            { icon: Clock, label: "Response time", value: "<500ms" },
            { icon: TrendingUp, label: "Accuracy", value: "94%" }
          ],
          technologies: ["Python", "FastAPI", "TensorFlow", "spaCy"],
          scope: "REST API for text analysis with classification, NER and sentiment analysis endpoints.",
          github: "https://github.com/harryfishert",
          demo: "#",
          color: "#0ea5e9"
        },
        {
          title: "Flight",
          highlight: "Manager",
          description: "Web application for flight search and management with price comparator, integrated payment system, and multi-destination booking management.",
          metrics: [
            { icon: Users, label: "Searches/day", value: "2K+" },
            { icon: Clock, label: "Development", value: "4 months" },
            { icon: TrendingUp, label: "Conversion", value: "+25%" }
          ],
          technologies: ["Vue.js", "Django", "Redis", "Docker"],
          scope: "Integration with airline APIs, price comparator, and notification system.",
          github: "https://github.com/harryfishert",
          demo: "#",
          color: "#0ea5e9"
        },
        {
          title: "Architecture",
          highlight: "ERP",
          description: "Complete ERP system for architecture company with inventory modules, project management, electronic invoicing, and financial reports.",
          metrics: [
            { icon: Users, label: "Projects managed", value: "150+" },
            { icon: Clock, label: "Time reduction", value: "-60%" },
            { icon: TrendingUp, label: "ROI", value: "300%" }
          ],
          technologies: ["Django", "PostgreSQL", "Celery", "AWS"],
          scope: "Modular system with access control, auditing, and automatic report generation.",
          github: "https://github.com/harryfishert",
          demo: "#",
          color: "#0ea5e9"
        }
      ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [projects.length])

  return (
    <section id="experience" className="relative py-16 md:py-20 bg-white dark:bg-gray-900 overflow-hidden">
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "es"
              ? "Proyectos que generan impacto"
              : "Projects that generate impact"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            {language === "es"
              ? "Soluciones reales con métricas comprobables y resultados tangibles para clientes y empresas."
              : "Real solutions with verifiable metrics and tangible results for clients and businesses."}
          </p>
          <div className="h-1 w-16 bg-primary mx-auto rounded-full mt-4"></div>
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
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-4"
            >
              {/* Left side - Project info */}
              <div className="flex-1 text-center md:text-left order-2 md:order-1">
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {projects[currentSlide].title}{" "}
                  <span className="text-primary">{projects[currentSlide].highlight}</span>
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-4 leading-relaxed">
                  {projects[currentSlide].description}
                </p>

                {/* Scope */}
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    {language === "es" ? "Alcance del proyecto" : "Project scope"}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {projects[currentSlide].scope}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  {projects[currentSlide].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Button
                    asChild
                    className="bg-[#24292e] hover:bg-[#24292e]/90 text-white rounded-lg px-5 py-2 flex items-center gap-2"
                  >
                    <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 rounded-lg px-5 py-2 flex items-center gap-2"
                  >
                    <a href={projects[currentSlide].demo} target="_blank" rel="noopener noreferrer">
                      {language === "es" ? "Ver proyecto" : "View project"}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right side - Metrics card */}
              <div className="flex-shrink-0 order-1 md:order-2 w-full md:w-auto">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-2xl p-6 md:p-8 border border-primary/20">
                  <h4 className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-6 uppercase tracking-wider">
                    {language === "es" ? "Métricas del proyecto" : "Project metrics"}
                  </h4>
                  
                  <div className="space-y-5">
                    {projects[currentSlide].metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + 0.2 }}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <metric.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {metric.label}
                          </p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {metric.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar indicator */}
          <div className="flex justify-center gap-1.5 mt-8">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* GitHub CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            {language === "es"
              ? "Explora más proyectos y contribuciones en mi repositorio"
              : "Explore more projects and contributions in my repository"}
          </p>
          <Button
            asChild
            variant="outline"
            className="border-gray-300 dark:border-gray-600 hover:border-[#24292e] hover:bg-[#24292e] hover:text-white transition-all rounded-lg px-6 py-2 flex items-center gap-2 mx-auto"
          >
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              {language === "es" ? "Ver todo en GitHub" : "View all on GitHub"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
