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

export default function TermsPage() {
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
              {language === "es" ? "Términos y Condiciones" : "Terms and Conditions"}
            </h1>
          </AnimatedSection>
          <div className="prose prose-gray dark:prose-invert max-w-none text-center">
            <AnimatedSection delay={0.2}>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
                {language === "es" ? `Última actualización: ${new Date().toLocaleDateString("es-ES")}` : `Last updated: ${new Date().toLocaleDateString("en-US")}`}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">{language === "es" ? "1. Aceptación de los Términos" : "1. Acceptance of Terms"}</h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">{language === "es" ? "Al acceder y utilizar este sitio web, aceptas estar sujeto a estos términos." : "By accessing and using this website, you agree to be bound by these terms."}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">{language === "es" ? "2. Propiedad Intelectual" : "2. Intellectual Property"}</h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">{language === "es" ? "Todo el contenido de este sitio es de mi propiedad. No está permitido copiar o distribuir el contenido sin autorización." : "All content on this site is my property. Copying or distributing content without authorization is not permitted."}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">{language === "es" ? "3. Contacto" : "3. Contact"}</h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">{language === "es" ? "Si tienes preguntas, puedes contactarme a través de la sección de contacto." : "If you have questions, you can contact me through the contact section."}</p>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
