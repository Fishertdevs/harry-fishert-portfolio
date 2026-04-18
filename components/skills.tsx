"use client"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion, AnimatePresence } from "framer-motion"

const Skills = () => {
  const { language } = useLanguage()
  const { portfolioData } = usePortfolio()
  const [currentSlide, setCurrentSlide] = useState(0)

  const services = language === "es"
    ? [
        {
          title: "Desarrollo",
          highlight: "Backend",
          percentage: 90,
          features: [
            "Python con Django y FastAPI",
            "APIs REST y GraphQL escalables",
            "Bases de datos SQL y NoSQL"
          ],
          color: "#0ea5e9",
          context: "Dominio técnico en arquitecturas servidor",
          whatsappMessage: "Hola Harry, estoy interesado en tus servicios de Desarrollo Backend. Me gustaria conocer mas sobre como puedes ayudarme con APIs, bases de datos y arquitecturas servidor."
        },
        {
          title: "Desarrollo",
          highlight: "Frontend",
          percentage: 85,
          features: [
            "React.js y Next.js",
            "Vue.js y Nuxt.js",
            "Interfaces modernas y responsivas"
          ],
          color: "#10b981",
          context: "Alto nivel en interfaces de usuario modernas",
          whatsappMessage: "Hola Harry, estoy interesado en tus servicios de Desarrollo Frontend. Me gustaria conocer mas sobre como puedes ayudarme con interfaces modernas en React o Next.js."
        },
        {
          title: "Arquitectura de",
          highlight: "Software",
          percentage: 85,
          features: [
            "Diseño de sistemas SaaS",
            "Plataformas E-commerce",
            "Websites y aplicaciones web"
          ],
          color: "#8b5cf6",
          context: "Sólida capacidad en diseño de sistemas escalables",
          whatsappMessage: "Hola Harry, estoy interesado en tus servicios de Arquitectura de Software. Me gustaria conocer mas sobre diseño de sistemas SaaS y plataformas escalables."
        },
        {
          title: "Automatización",
          highlight: "con IA",
          percentage: 80,
          features: [
            "Integración de modelos de lenguaje",
            "Automatización de flujos de trabajo",
            "Chatbots y asistentes virtuales"
          ],
          color: "#f59e0b",
          context: "Integración avanzada de modelos de lenguaje",
          whatsappMessage: "Hola Harry, estoy interesado en tus servicios de Automatización con IA. Me gustaría conocer más sobre integración de modelos de lenguaje y chatbots."
        },
        {
          title: "Optimización",
          highlight: "SEO",
          percentage: 75,
          features: [
            "SEO técnico y on-page",
            "Análisis de rendimiento web",
            "Estrategias de posicionamiento"
          ],
          color: "#ef4444",
          context: "Estrategias efectivas de posicionamiento web",
          whatsappMessage: "Hola Harry, estoy interesado en tus servicios de Optimización SEO. Me gustaría conocer más sobre estrategias de posicionamiento y rendimiento web."
        },
        {
          title: "DevOps",
          highlight: "& Cloud",
          percentage: 70,
          features: [
            "Docker y Kubernetes",
            "CI/CD con GitHub Actions",
            "AWS, GCP y despliegue en la nube"
          ],
          color: "#06b6d4",
          context: "Competencia en infraestructura y despliegue cloud",
          whatsappMessage: "Hola Harry, estoy interesado en tus servicios de DevOps y Cloud. Me gustaria conocer mas sobre Docker, CI/CD y despliegue en la nube."
        }
      ]
    : [
        {
          title: "Backend",
          highlight: "Development",
          percentage: 90,
          features: [
            "Python with Django and FastAPI",
            "Scalable REST and GraphQL APIs",
            "SQL and NoSQL databases"
          ],
          color: "#0ea5e9",
          context: "Technical mastery in server-side architectures",
          whatsappMessage: "Hi Harry, I'm interested in your Backend Development services. I would like to know more about how you can help me with APIs, databases and server architectures."
        },
        {
          title: "Frontend",
          highlight: "Development",
          percentage: 85,
          features: [
            "React.js and Next.js",
            "Vue.js and Nuxt.js",
            "Modern and responsive interfaces"
          ],
          color: "#10b981",
          context: "High proficiency in modern user interfaces",
          whatsappMessage: "Hi Harry, I'm interested in your Frontend Development services. I would like to know more about how you can help me with modern interfaces in React or Next.js."
        },
        {
          title: "Software",
          highlight: "Architecture",
          percentage: 85,
          features: [
            "SaaS system design",
            "E-commerce platforms",
            "Websites and web applications"
          ],
          color: "#8b5cf6",
          context: "Strong capability in scalable system design",
          whatsappMessage: "Hi Harry, I'm interested in your Software Architecture services. I would like to know more about SaaS system design and scalable platforms."
        },
        {
          title: "AI",
          highlight: "Automation",
          percentage: 80,
          features: [
            "Language model integration",
            "Workflow automation",
            "Chatbots and virtual assistants"
          ],
          color: "#f59e0b",
          context: "Advanced integration of language models",
          whatsappMessage: "Hi Harry, I'm interested in your AI Automation services. I would like to know more about language model integration and chatbots."
        },
        {
          title: "SEO",
          highlight: "Optimization",
          percentage: 75,
          features: [
            "Technical and on-page SEO",
            "Web performance analysis",
            "Positioning strategies"
          ],
          color: "#ef4444",
          context: "Effective web positioning strategies",
          whatsappMessage: "Hi Harry, I'm interested in your SEO Optimization services. I would like to know more about positioning strategies and web performance."
        },
        {
          title: "DevOps",
          highlight: "& Cloud",
          percentage: 70,
          features: [
            "Docker and Kubernetes",
            "CI/CD with GitHub Actions",
            "AWS, GCP and cloud deployment"
          ],
          color: "#06b6d4",
          context: "Competence in infrastructure and cloud deployment",
          whatsappMessage: "Hi Harry, I'm interested in your DevOps and Cloud services. I would like to know more about Docker, CI/CD and cloud deployment."
        }
      ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [services.length])

  // WhatsApp link with contextual message based on current service
  const getWhatsAppLink = (serviceIndex: number) => {
    const message = services[serviceIndex].whatsappMessage
    return `https://api.whatsapp.com/send?phone=573112512939&text=${encodeURIComponent(message)}`
  }

  // Circular progress component with responsive size
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

  return (
    <section id="skills" className="relative flex flex-col justify-center py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
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
            <pattern id="skills-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.3)" />
              <circle cx="15" cy="15" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="85" cy="85" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skills-dots)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header - no label, captivating title */}
        <motion.div 
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
            {language === "es"
              ? "Habilidades tecnológicas orientadas a resultados"
              : "Technology skills oriented to results"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {language === "es"
              ? "Desarrollo soluciones digitales escalables y eficientes, orientadas a mejorar resultados y rendimiento."
              : "I build scalable and efficient digital solutions, focused on improving results and performance."}
          </p>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-3 md:mt-4"></div>
        </motion.div>

        {/* Carousel - balanced grid on desktop, stacked on mobile */}
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
                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
                  {services[currentSlide].title}{" "}
                  <span style={{ color: services[currentSlide].color }}>{services[currentSlide].highlight}</span>
                </h3>

                {/* Features - no icons */}
                <ul className="space-y-1 md:space-y-2 mb-3 md:mb-6">
                  {services[currentSlide].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Button - always centered */}
                <div className="flex justify-center">
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm"
                  >
                    <a href={getWhatsAppLink(currentSlide)} target="_blank" rel="noopener noreferrer">
                      {language === "es" ? "Conoce más" : "Learn more"}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Circular progress - RIGHT on desktop, top on mobile */}
              <div className="flex flex-col items-center gap-2 md:gap-3 order-1 md:order-2">
                <div className="block sm:hidden">
                  <CircularProgress
                    percentage={services[currentSlide].percentage}
                    color={services[currentSlide].color}
                    size={100}
                  />
                </div>
                <div className="hidden sm:block md:hidden">
                  <CircularProgress
                    percentage={services[currentSlide].percentage}
                    color={services[currentSlide].color}
                    size={120}
                  />
                </div>
                <div className="hidden md:block">
                  <CircularProgress
                    percentage={services[currentSlide].percentage}
                    color={services[currentSlide].color}
                    size={140}
                  />
                </div>
                <motion.p
                  className="text-[10px] sm:text-xs md:text-sm font-medium text-center max-w-[100px] sm:max-w-[140px] md:max-w-[160px] leading-relaxed"
                  style={{ color: services[currentSlide].color }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
                >
                  {services[currentSlide].context}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar indicator - centered, auto only */}
          <div className="flex justify-center gap-1.5 mt-4 md:mt-8">
            {services.map((_, index) => (
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
      </div>
    </section>
  )
}

export default Skills
