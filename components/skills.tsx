"use client"

import { useState, useEffect } from "react"
import { Check, ArrowRight } from "lucide-react"
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
          color: "#0ea5e9"
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
          color: "#0ea5e9"
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
          color: "#0ea5e9"
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
          color: "#0ea5e9"
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
          color: "#0ea5e9"
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
          color: "#0ea5e9"
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
          color: "#0ea5e9"
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
          color: "#0ea5e9"
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
          color: "#0ea5e9"
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
          color: "#0ea5e9"
        }
      ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [services.length])

  // WhatsApp link with professional message
  const whatsappMessage = language === "es"
    ? "Hola Harry, me interesa conocer más sobre tus servicios de desarrollo. ¿Podríamos agendar una llamada para discutir mi proyecto?"
    : "Hi Harry, I'm interested in learning more about your development services. Could we schedule a call to discuss my project?"
  
  const whatsappLink = `https://api.whatsapp.com/send?phone=573112512939&text=${encodeURIComponent(whatsappMessage)}`

  // Circular progress component
  const CircularProgress = ({ percentage, color, size = 160 }: { percentage: number, color: string, size?: number }) => {
    const strokeWidth = 8
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
            className="text-3xl md:text-4xl font-bold"
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
    <section id="skills" className="relative py-16 md:py-20 bg-white dark:bg-gray-900 overflow-hidden">
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "es" 
              ? "Tecnología que impulsa tu negocio" 
              : "Technology that drives your business"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            {language === "es"
              ? "Soluciones integrales para transformar tus ideas en productos digitales de alto impacto"
              : "Comprehensive solutions to transform your ideas into high-impact digital products"}
          </p>
          <div className="h-1 w-16 bg-primary mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Carousel - centered, reduced gap */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center py-4"
            >
              {/* Circular progress - top */}
              <div className="mb-6">
                <CircularProgress 
                  percentage={services[currentSlide].percentage} 
                  color={services[currentSlide].color}
                  size={140}
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {services[currentSlide].title}{" "}
                <span className="text-primary">{services[currentSlide].highlight}</span>
              </h3>
              
              {/* Features - centered */}
              <ul className="space-y-2 mb-6">
                {services[currentSlide].features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-sm md:text-base"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Button - links to WhatsApp */}
              <Button 
                asChild
                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-2 flex items-center gap-2"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  {language === "es" ? "Conoce más" : "Learn more"}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar indicator - centered, auto only */}
          <div className="flex justify-center gap-1.5 mt-6">
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
