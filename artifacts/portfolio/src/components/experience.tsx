"use client"

import { useState, useEffect } from "react"
import { Github, Star, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"

const projectColors = {
  sgc: "#1e3a5f",
  noosfera: "#7c3aed",
  picapastos: "#ef0000",
  alterego: "#722f37",
  mitiendago: "#16a34a",
  mc: "#3b82f6",
  drmario: "#0ea5e9",
  mymemorial: "#6366f1",
}

const getDomain = (url: string) => {
  if (!url || url === "#") return ""
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "")
  }
}

const Experience = () => {
  const { language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const [currentSlide, setCurrentSlide] = useState(0)

  const projects = language === "es"
    ? [
        {
          title: "SGC",
          highlight: "Abogados",
          role: "Web Developer",
          period: "Jun 2026",
          description: "Desarrollo de sitio web para una firma de abogados, enfocado en presentar sus principales servicios jurídicos y facilitar el contacto con nuevos clientes.",
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          image: "/projects/sgcabogados.png",
          hasGithub: false,
          demo: "https://sgcabogados.com.co",
          featured: true,
          color: projectColors.sgc,
        },
        {
          title: "Noosfera",
          highlight: "IA",
          role: "Full Stack Developer",
          period: "2025",
          description: "Proyecto académico desarrollado a medida para generar imágenes con inteligencia artificial a partir de los pulsos únicos de cada persona, transformando datos biométricos en arte digital.",
          technologies: ["Next.js", "Python", "IA Generativa", "PostgreSQL"],
          image: "/projects/noosfera.png",
          hasGithub: false,
          demo: "https://noosfera.cloud",
          featured: true,
          color: projectColors.noosfera,
        },
        {
          title: "Picapastos",
          highlight: "y Molinos Vilar",
          role: "Web Developer",
          period: "Dic 2025 – Feb 2026",
          description: "Desarrollo de sitio web corporativo con catálogo de productos y sistema administrativo interno, logrando un mayor posicionamiento de la marca y la optimización de la gestión de su catálogo.",
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          image: "/projects/picapastos.png",
          hasGithub: false,
          demo: "https://www.picapastosymolinosvilar.com.co",
          featured: true,
          color: projectColors.picapastos,
        },
        {
          title: "AlterEgo",
          highlight: "Store",
          role: "Web Developer & UX/UI",
          period: "Sep 2025 – Nov 2025",
          description: "Desarrollo de e-commerce con panel de administración y flujo de ventas integrado a WhatsApp, mejorando la gestión de pedidos y la experiencia de usuario.",
          technologies: ["Next.js", "React", "Supabase", "WhatsApp API"],
          image: "/projects/alterego.png",
          hasGithub: false,
          demo: "https://www.alterego-store.com.co",
          featured: true,
          color: projectColors.alterego,
        },
        {
          title: "MiTiendaGo",
          highlight: "",
          role: "Desarrollador SaaS",
          period: "Mar 2025 – May 2025",
          description: "Diseño e implementación de sistema SaaS para la gestión de ingresos de caja, adaptable a múltiples tipos de negocio, facilitando el control financiero y la toma de decisiones.",
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          image: "/projects/mitiendago.png",
          hasGithub: false,
          demo: "https://app.mitiendago.co",
          featured: true,
          color: projectColors.mitiendago,
        },
        {
          title: "Dr. Mario",
          highlight: "Sánchez",
          role: "Web Developer",
          period: "2025 – 2026",
          description: "Desarrollo de sitio web profesional para consultorio médico especializado, con presentación de servicios, información del especialista y sistema de contacto para programación de citas.",
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          image: "/projects/drmario.png",
          hasGithub: false,
          demo: "https://dr-mario-sanchez-website-api-server-one.vercel.app",
          featured: false,
          color: projectColors.drmario,
        },
        {
          title: "My Memorial",
          highlight: "Forever",
          role: "Full Stack Developer",
          period: "2025 – 2026",
          description: "Plataforma digital de homenaje y memoria que permite crear perfiles conmemorativos para preservar recuerdos, compartir historias de vida y mantener vivos los legados personales.",
          technologies: ["Next.js", "React", "Supabase", "Node.js"],
          image: "/projects/mymemorial.png",
          hasGithub: false,
          demo: "https://my-memorial-forever-api-server-ztvm.vercel.app",
          featured: false,
          color: projectColors.mymemorial,
        },
        {
          title: "MC",
          highlight: "Arquitectos",
          role: "Arquitecto de Software & Backend",
          period: "Sep 2024 – Dic 2024",
          description: "Definición de arquitectura backend con FastAPI e implementación de sistema de geolocalización por coordenadas para predios en Bogotá, integrando bases de datos relacionales y preparando la estructura para modelos de machine learning.",
          technologies: ["FastAPI", "Python", "PostgreSQL", "GIS"],
          image: "/projects/mcarquitectos.png",
          hasGithub: true,
          demo: "#",
          featured: false,
          color: projectColors.mc,
        },
      ]
    : [
        {
          title: "SGC",
          highlight: "Abogados",
          role: "Web Developer",
          period: "Jun 2026",
          description: "Development of a website for a law firm, focused on presenting their main legal services and facilitating contact with new clients.",
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          image: "/projects/sgcabogados.png",
          hasGithub: false,
          demo: "https://sgcabogados.com.co",
          featured: true,
          color: projectColors.sgc,
        },
        {
          title: "Noosfera",
          highlight: "IA",
          role: "Full Stack Developer",
          period: "2025",
          description: "Academic project built to generate images with artificial intelligence from each person's unique pulses, transforming biometric data into digital art.",
          technologies: ["Next.js", "Python", "Generative AI", "PostgreSQL"],
          image: "/projects/noosfera.png",
          hasGithub: false,
          demo: "https://noosfera.cloud",
          featured: true,
          color: projectColors.noosfera,
        },
        {
          title: "Picapastos",
          highlight: "y Molinos Vilar",
          role: "Web Developer",
          period: "Dec 2025 – Feb 2026",
          description: "Development of corporate website with product catalog and internal administrative system, achieving greater brand positioning and optimization of catalog management.",
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          image: "/projects/picapastos.png",
          hasGithub: false,
          demo: "https://www.picapastosymolinosvilar.com.co",
          featured: true,
          color: projectColors.picapastos,
        },
        {
          title: "AlterEgo",
          highlight: "Store",
          role: "Web Developer & UX/UI",
          period: "Sep 2025 – Nov 2025",
          description: "E-commerce development with admin panel and sales flow integrated with WhatsApp, improving order management and user experience.",
          technologies: ["Next.js", "React", "Supabase", "WhatsApp API"],
          image: "/projects/alterego.png",
          hasGithub: false,
          demo: "https://www.alterego-store.com.co",
          featured: true,
          color: projectColors.alterego,
        },
        {
          title: "MiTiendaGo",
          highlight: "",
          role: "SaaS Developer",
          period: "Mar 2025 – May 2025",
          description: "Design and implementation of SaaS system for cash income management, adaptable to multiple types of business, facilitating financial control and decision making.",
          technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
          image: "/projects/mitiendago.png",
          hasGithub: false,
          demo: "https://app.mitiendago.co",
          featured: true,
          color: projectColors.mitiendago,
        },
        {
          title: "Dr. Mario",
          highlight: "Sánchez",
          role: "Web Developer",
          period: "2025 – 2026",
          description: "Development of a professional website for a specialized medical office, featuring service presentation, specialist information, and a contact system for appointment scheduling.",
          technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
          image: "/projects/drmario.png",
          hasGithub: false,
          demo: "https://dr-mario-sanchez-website-api-server-one.vercel.app",
          featured: false,
          color: projectColors.drmario,
        },
        {
          title: "My Memorial",
          highlight: "Forever",
          role: "Full Stack Developer",
          period: "2025 – 2026",
          description: "Digital tribute and memory platform that allows creating commemorative profiles to preserve memories, share life stories, and keep personal legacies alive.",
          technologies: ["Next.js", "React", "Supabase", "Node.js"],
          image: "/projects/mymemorial.png",
          hasGithub: false,
          demo: "https://my-memorial-forever-api-server-ztvm.vercel.app",
          featured: false,
          color: projectColors.mymemorial,
        },
        {
          title: "MC",
          highlight: "Arquitectos",
          role: "Software Architect & Backend",
          period: "Sep 2024 – Dec 2024",
          description: "Backend architecture definition with FastAPI and implementation of geolocation system by coordinates for properties in Bogota, integrating relational databases and preparing the structure for machine learning models.",
          technologies: ["FastAPI", "Python", "PostgreSQL", "GIS"],
          image: "/projects/mcarquitectos.png",
          hasGithub: true,
          demo: "#",
          featured: false,
          color: projectColors.mc,
        },
      ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [projects.length])

  const currentProject = projects[currentSlide]

  return (
    <section id="experience" className="relative flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
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
        <motion.div
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {language === "es" ? "Experiencia Laboral" : "Work Experience"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {language === "es"
              ? "Desarrollo de soluciones full stack basadas en problemas reales y enfocadas en entornos de producción."
              : "Development of full stack solutions based on real problems and focused on production environments."}
          </p>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-3 md:mt-4"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 py-2 md:py-4"
            >
              <div className="text-center order-2 md:order-1">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                  <span className="inline-flex items-center justify-center gap-1.5 flex-wrap">
                    <span>{currentProject.title}</span>
                    {currentProject.highlight && (
                      <span style={{ color: currentProject.color }}>{currentProject.highlight}</span>
                    )}
                    {currentProject.featured && (
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500" />
                    )}
                  </span>
                </h3>

                <div className="flex flex-nowrap justify-center items-center gap-1.5 sm:gap-2 mb-2 md:mb-3 whitespace-nowrap">
                  <span className="text-[11px] sm:text-sm font-semibold" style={{ color: currentProject.color }}>
                    {currentProject.role}
                  </span>
                  <span className="text-gray-400 text-[11px] sm:text-sm">|</span>
                  <span className="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400">
                    {currentProject.period}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base mb-3 md:mb-4 leading-relaxed">
                  {currentProject.description}
                </p>

                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4">
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

                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {currentProject.hasGithub && (
                    <Button asChild variant="ghost" size="sm" className="rounded-lg px-3 sm:px-4 py-1 md:py-1.5 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:bg-transparent">
                      <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {currentProject.demo !== "#" && (
                    <Button asChild variant="ghost" size="sm" className="rounded-lg px-3 sm:px-4 py-1 md:py-1.5 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:bg-transparent" style={{ color: currentProject.color }}>
                      <a href={currentProject.demo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        {language === "es" ? "Ver proyecto" : "View project"}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div
                  className="rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  style={{ boxShadow: `0 10px 40px -12px ${currentProject.color}40` }}
                >
                  <div className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1.5 w-full px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-inner">
                      <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                        {getDomain(currentProject.demo) || `${currentProject.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.dev`}
                      </span>
                    </div>
                  </div>
                  <div className="relative aspect-[16/10] bg-white dark:bg-gray-900">
                    <img
                      src={currentProject.image || "/placeholder.svg"}
                      alt={`${language === "es" ? "Vista previa de" : "Preview of"} ${currentProject.title} ${currentProject.highlight}`}
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap justify-center gap-1.5 mt-6 md:mt-8">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide ? "w-6 md:w-8" : "w-1.5 md:w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                style={{ backgroundColor: index === currentSlide ? project.color : undefined }}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-6 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-2 md:mb-4 text-xs sm:text-sm max-w-md mx-auto">
            {language === "es" ? "Explora más proyectos y contribuciones" : "Explore more projects and contributions"}
          </p>
          <Button asChild size="sm" className="bg-[#24292e] hover:bg-[#1a1e22] text-white transition-all rounded-lg px-4 md:px-6 py-1.5 md:py-2 inline-flex items-center gap-1.5 md:gap-2 text-xs sm:text-sm w-auto">
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              {language === "es" ? "Ver más en GitHub" : "View more on GitHub"}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
