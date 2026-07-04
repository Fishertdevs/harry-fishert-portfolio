"use client"

import { useEffect, useRef, type ReactNode, useState } from "react"

interface AnimationObserverProps {
  children: ReactNode
}

const AnimationObserver = ({ children }: AnimationObserverProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Retrasar la inicialización para mejorar el rendimiento inicial
    const initTimeout = setTimeout(() => {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Para elementos con clase animate-on-scroll
            if (entry.target.classList.contains("animate-on-scroll")) {
              entry.target.classList.add("visible")
            }

            // Para barras de progreso animadas
            const progressBars = entry.target.querySelectorAll(".animate-progress-bar")
            if (progressBars.length > 0) {
              // Usar requestAnimationFrame para optimizar el rendimiento
              requestAnimationFrame(() => {
                progressBars.forEach((bar) => {
                  const value = bar.getAttribute("data-value")
                  if (value) {
                    // Resetear primero
                    ;(bar as HTMLElement).style.width = "0%"

                    // Luego animar después de un pequeño retraso
                    setTimeout(() => {
                      ;(bar as HTMLElement).style.width = value
                    }, 50)
                  }
                })
              })
            }
          } else {
            // Cuando el elemento sale completamente de la vista, resetear las animaciones
            if (entry.intersectionRatio <= 0) {
              // Para elementos con clase animate-on-scroll
              if (entry.target.classList.contains("animate-on-scroll")) {
                entry.target.classList.remove("visible")
              }

              // Resetear barras de progreso
              const progressBars = entry.target.querySelectorAll(".animate-progress-bar")
              if (progressBars.length > 0) {
                requestAnimationFrame(() => {
                  progressBars.forEach((bar) => {
                    ;(bar as HTMLElement).style.width = "0%"
                  })
                })
              }
            }
          }
        })
      }, options)

      // Observar elementos con animate-on-scroll
      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => {
        observerRef.current?.observe(el)
      })

      // Observar contenedores de barras de progreso
      const progressContainers = document.querySelectorAll(".animate-fade-in")
      progressContainers.forEach((el) => {
        observerRef.current?.observe(el)
      })

      setIsInitialized(true)
    }, 100) // Pequeño retraso para mejorar el rendimiento inicial

    return () => {
      clearTimeout(initTimeout)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return <>{children}</>
}

export default AnimationObserver
