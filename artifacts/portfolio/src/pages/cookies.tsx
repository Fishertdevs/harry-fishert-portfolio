import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion, useInView } from "framer-motion"

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay }}>
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
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 mb-8">
              {language === "es" ? "Volver al inicio" : "Back to home"}
            </Link>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
              {language === "es" ? "Política de Cookies" : "Cookies Policy"}
            </h1>
          </AnimatedSection>
          <div className="prose prose-gray dark:prose-invert max-w-none text-center">
            <AnimatedSection delay={0.2}>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
                {language === "es" ? `Última actualización: ${new Date().toLocaleDateString("es-ES")}` : `Last updated: ${new Date().toLocaleDateString("en-US")}`}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">{language === "es" ? "¿Qué son las cookies?" : "What are cookies?"}</h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">{language === "es" ? "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web." : "Cookies are small text files that are stored on your device when you visit a website."}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">{language === "es" ? "Cookies que utilizamos" : "Cookies we use"}</h2>
              <ul className="list-none text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4 space-y-1 md:space-y-2">
                <li>{language === "es" ? "Recordar tus preferencias de idioma" : "Remember your language preferences"}</li>
                <li>{language === "es" ? "Mantener tu preferencia de tema (claro/oscuro)" : "Maintain your theme preference (light/dark)"}</li>
                <li>{language === "es" ? "Mejorar el rendimiento del sitio" : "Improve site performance"}</li>
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">{language === "es" ? "Cookies de terceros" : "Third-party cookies"}</h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">{language === "es" ? "Este sitio no utiliza cookies de seguimiento de terceros ni cookies publicitarias." : "This site does not use third-party tracking cookies or advertising cookies."}</p>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
