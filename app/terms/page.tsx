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

export default function TermsPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {language === "es" ? "Términos y Condiciones" : "Terms and Conditions"}
            </h1>
          </AnimatedSection>

          <div className="prose prose-gray dark:prose-invert max-w-none text-center">
            {language === "es" ? (
              <>
                <AnimatedSection delay={0.2}>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Última actualización: {new Date().toLocaleDateString("es-ES")}
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Aceptación de los Términos</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Al acceder y utilizar este sitio web, aceptas estar sujeto a estos términos y condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar este sitio.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Uso del Sitio</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Este sitio web es un portafolio profesional destinado a mostrar mis habilidades, proyectos y experiencia como desarrollador. El contenido es solo para fines informativos.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.5}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Propiedad Intelectual</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Todo el contenido de este sitio, incluyendo textos, gráficos, logos y código, es de mi propiedad o tengo licencia para usarlo. No está permitido copiar, modificar o distribuir el contenido sin autorización previa.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.6}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Limitación de Responsabilidad</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    No me hago responsable de daños directos o indirectos que puedan surgir del uso de este sitio web o de la imposibilidad de acceder a él.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.7}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Modificaciones</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Me reservo el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.8}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">6. Contacto</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Si tienes preguntas sobre estos términos, puedes contactarme a través de los medios proporcionados en la sección de contacto.
                  </p>
                </AnimatedSection>
              </>
            ) : (
              <>
                <AnimatedSection delay={0.2}>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Last updated: {new Date().toLocaleDateString("en-US")}
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    By accessing and using this website, you agree to be bound by these terms and conditions of use. If you do not agree with any part of these terms, you should not use this site.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Use of the Site</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    This website is a professional portfolio intended to showcase my skills, projects, and experience as a developer. The content is for informational purposes only.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.5}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Intellectual Property</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    All content on this site, including text, graphics, logos, and code, is my property or I have a license to use it. Copying, modifying, or distributing the content without prior authorization is not permitted.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.6}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Limitation of Liability</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    I am not responsible for direct or indirect damages that may arise from the use of this website or the inability to access it.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.7}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Modifications</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    I reserve the right to modify these terms at any time. Changes will take effect immediately after being published on the site.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.8}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">6. Contact</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    If you have questions about these terms, you can contact me through the means provided in the contact section.
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
