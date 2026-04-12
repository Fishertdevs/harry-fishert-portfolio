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
    "https://api.whatsapp.com/send?phone=573112512939&text=Hola%20Harry,%20vi%20tu%20portafolio%20y%20me%20gustaría%20hablar%20contigo%20sobre%20una%20oportunidad",

  // Sobre mí
  aboutParagraph1:
    "Desarrollador Full Stack con sólida formación en Ingeniería de Sistemas, especializado en la creación e implementación de soluciones tecnológicas end-to-end. Combino habilidades técnicas en desarrollo frontend y backend con una metodología orientada a resultados.",
  aboutParagraph2:
    "Me distingo por mi capacidad para adaptarme rápidamente a nuevas tecnologías y frameworks, así como por facilitar la colaboración efectiva en equipos multidisciplinarios. Con un nivel intermedio de inglés, participo activamente en proyectos diversos y mantengo un compromiso constante con el perfeccionamiento de mis habilidades técnicas.",
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
