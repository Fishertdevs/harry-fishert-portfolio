"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

const Experience = () => {
  const { t } = useLanguage()

  const projects = [
    {
      title: "Sistema de Reservas MiKaza",
      description: "Plataforma web completa para gestion de reservas de alojamientos con panel administrativo.",
      image: "/images/project-1.jpg",
      tags: ["React", "JavaScript", "Reservas"],
      link: "#"
    },
    {
      title: "Procesador NLP",
      description: "Sistema de procesamiento de lenguaje natural para analisis de textos y sentimientos.",
      image: "/images/project-2.jpg",
      tags: ["Python", "NLP", "Machine Learning"],
      link: "#"
    },
    {
      title: "Gestor de Vuelos",
      description: "Aplicacion web para busqueda y gestion de vuelos con sistema de pagos integrado.",
      image: "/images/project-3.jpg",
      tags: ["React", "JavaScript", "Pagos"],
      link: "#"
    },
    {
      title: "ERP Arquitectura",
      description: "Sistema ERP para empresa de arquitectura con modulos de inventario, proyectos y facturacion.",
      image: "/images/project-4.jpg",
      tags: ["Django", "Python", "PostgreSQL"],
      link: "#"
    }
  ]

  return (
    <section id="experience" className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Tech background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 40%),
                           radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)`
        }} />
        {/* Network nodes */}
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            NUESTRO PORTAFOLIO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubre algunos de los proyectos que hemos desarrollado con dedicacion y excelencia para nuestros clientes.
          </p>
          <div className="h-1 w-16 bg-primary mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-gray-700 dark:to-gray-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-30">
                      {index === 0 && "🏠"}
                      {index === 1 && "🧠"}
                      {index === 2 && "✈️"}
                      {index === 3 && "🏗️"}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust message */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-primary">
            Gracias por confiar en nosotros
          </h3>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
