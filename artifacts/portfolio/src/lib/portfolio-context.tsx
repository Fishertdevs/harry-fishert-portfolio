"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type PortfolioData = {
  // Información personal
  name: string
  title: string
  description: string
  email: string
  phone: string
  location: string

  // Experiencia
  experience: string
  specialization: string
  projectsCompleted: string

  // Educación
  currentSemester: string
  yearsStudied: string
  credits: string
  certifications: string

  // Redes sociales
  github: string
  instagram: string
  whatsapp: string

  // Sobre mí
  aboutParagraph1: string
  aboutParagraph2: string
}

type PortfolioContextType = {
  portfolioData: PortfolioData
  updatePortfolioData: (data: Partial<PortfolioData>) => void
  resetPortfolioData: () => void
}

const defaultPortfolioData: PortfolioData = {
  // Información personal
  name: "Harry Fishert Lasso Hernández",
  title: "Estudiante de Ingeniería de Sistemas",
  description:
    "Desarrollador Full Stack especializado en arquitecturas web modernas y soluciones tecnológicas integrales.",
  email: "fishertcode@gmail.com",
  phone: "+57 311 251 2939",
  location: "Colombia",

  // Experiencia
  experience: "1 año",
  specialization: "Full Stack",
  projectsCompleted: "15+",

  // Educación - ACTUALIZADO
  currentSemester: "8°",
  yearsStudied: "3.5",
  credits: "122",
  certifications: "3",

  // Redes sociales
  github: "https://github.com/Fishertdevs",
  instagram: "https://instagram.com/",
  whatsapp:
    "https://api.whatsapp.com/send?phone=573112512939&text=Estimado%20Harry,%20me%20comunico%20contigo%20tras%20revisar%20tu%20portafolio%20profesional.%20Estoy%20interesado%20en%20conocer%20mas%20sobre%20tus%20servicios%20de%20desarrollo%20y%20me%20gustaria%20solicitar%20una%20cotizacion%20personalizada%20para%20un%20proyecto.%20Quedo%20atento%20a%20tu%20disponibilidad%20para%20coordinar%20una%20reunion.%20Saludos%20cordiales.",

  // Sobre mí
  aboutParagraph1:
    "Desarrollador Full Stack con formación en Ingeniería de Sistemas, especializado en el desarrollo de soluciones tecnológicas end-to-end. Experiencia en la creación de aplicaciones web modernas, sistemas SaaS y plataformas escalables orientadas a resultados. Enfocado en construir sistemas que optimizan procesos, mejoran la eficiencia operativa y aportan valor real a los negocios, combinando desarrollo frontend y backend para transformar ideas en productos digitales funcionales y eficientes.",
  aboutParagraph2:
    "Me caracterizo por la rápida adaptación a nuevas tecnologías, el pensamiento analítico y la capacidad de resolver problemas mediante soluciones prácticas, trabajando de manera colaborativa y con un enfoque constante en la mejora continua.",
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData)

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const savedData = localStorage.getItem("portfolio-settings")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setPortfolioData({ ...defaultPortfolioData, ...parsedData })
      } catch (error) {
        console.error("Error parsing saved portfolio data:", error)
      }
    }
  }, [])

  // Guardar datos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("portfolio-settings", JSON.stringify(portfolioData))
  }, [portfolioData])

  const updatePortfolioData = (data: Partial<PortfolioData>) => {
    setPortfolioData((prev) => ({ ...prev, ...data }))
  }

  const resetPortfolioData = () => {
    setPortfolioData(defaultPortfolioData)
    localStorage.removeItem("portfolio-settings")
  }

  return (
    <PortfolioContext.Provider value={{ portfolioData, updatePortfolioData, resetPortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
