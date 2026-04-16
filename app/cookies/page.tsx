"use client"

import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function CookiesPage() {
  const { language } = useLanguage()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <AnimatedSection>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 mb-8"
            >
              {language === "es" ? "Volver al inicio" : "Back to home"}
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
              {language === "es" ? "Política de Cookies" : "Cookies Policy"}
            </h1>
          </AnimatedSection>

          <div className="prose prose-gray dark:prose-invert max-w-none text-center">
            {language === "es" ? (
              <>
                <AnimatedSection delay={0.2}>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
                    Última actualización: {new Date().toLocaleDateString("es-ES")}
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">¿Qué son las cookies?</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar tus preferencias y mejorar tu experiencia de navegación.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">Cookies que utilizamos</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    Este sitio web utiliza cookies mínimas y esenciales para:
                  </p>
                  <ul className="list-none text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4 space-y-1 md:space-y-2">
                    <li>Recordar tus preferencias de idioma</li>
                    <li>Mantener tu preferencia de tema (claro/oscuro)</li>
                    <li>Mejorar el rendimiento del sitio</li>
                  </ul>
                </AnimatedSection>

                <AnimatedSection delay={0.5}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">Cookies de terceros</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    Este sitio no utiliza cookies de seguimiento de terceros ni cookies publicitarias.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.6}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">Cómo gestionar las cookies</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    Puedes configurar tu navegador para rechazar cookies o para que te avise cuando se envíen. Sin embargo, algunas funciones del sitio pueden no funcionar correctamente si desactivas las cookies.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.7}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">Contacto</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    Si tienes preguntas sobre nuestra política de cookies, puedes contactarme a través de la sección de contacto.
                  </p>
                </AnimatedSection>
              </>
            ) : (
              <>
                <AnimatedSection delay={0.2}>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
                    Last updated: {new Date().toLocaleDateString("en-US")}
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">What are cookies?</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    Cookies are small text files that are stored on your device when you visit a website. They are used to remember your preferences and improve your browsing experience.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">Cookies we use</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    This website uses minimal and essential cookies to:
                  </p>
                  <ul className="list-none text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4 space-y-1 md:space-y-2">
                    <li>Remember your language preferences</li>
                    <li>Maintain your theme preference (light/dark)</li>
                    <li>Improve site performance</li>
                  </ul>
                </AnimatedSection>

                <AnimatedSection delay={0.5}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">Third-party cookies</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    This site does not use third-party tracking cookies or advertising cookies.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.6}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">How to manage cookies</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    You can configure your browser to reject cookies or to notify you when cookies are sent. However, some site features may not work properly if you disable cookies.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.7}>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">Contact</h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                    If you have questions about our cookies policy, you can contact me through the contact section.
                  </p>
                </AnimatedSection>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
