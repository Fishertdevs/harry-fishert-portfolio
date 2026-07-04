import { useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { Link } from "wouter"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion, useInView } from "framer-motion"

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  )
}

export default function CookiesPage() {
  const { language } = useLanguage()
  const es = language === "es"

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">

          {/* Back button — left */}
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4 mb-8">
              ← {es ? "Volver al inicio" : "Back to home"}
            </Link>
          </AnimatedSection>

          {/* Title — centered */}
          <AnimatedSection delay={0.1}>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              {es ? "Política de Cookies" : "Cookies Policy"}
            </h1>
            <p className="text-center text-xs md:text-sm text-gray-400 dark:text-gray-500 mb-8">
              {es ? `Última actualización: ${new Date().toLocaleDateString("es-ES")}` : `Last updated: ${new Date().toLocaleDateString("en-US")}`}
            </p>
            <div className="h-1 w-14 bg-primary mx-auto rounded-full mb-10" />
          </AnimatedSection>

          {/* Content — left aligned */}
          <div className="space-y-8 text-left">

            <AnimatedSection delay={0.2}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "¿Qué son las cookies?" : "What Are Cookies?"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Permiten que el sitio recuerde tus preferencias y mejore tu experiencia en futuras visitas."
                  : "Cookies are small text files that websites store on your device when you visit them. They allow the site to remember your preferences and improve your experience on future visits."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "Cookies que utilizamos" : "Cookies We Use"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {es
                  ? "Este sitio utiliza únicamente cookies funcionales y de preferencias. No se utilizan cookies de rastreo, publicidad ni analíticas de terceros."
                  : "This site uses only functional and preference cookies. No tracking, advertising, or third-party analytics cookies are used."}
              </p>
              <div className="space-y-3">
                {[
                  {
                    name: es ? "Preferencia de idioma" : "Language preference",
                    desc: es ? "Recuerda si prefieres el sitio en español o en inglés." : "Remembers whether you prefer the site in Spanish or English.",
                    duration: es ? "Persistente (localStorage)" : "Persistent (localStorage)",
                    type: es ? "Funcional" : "Functional",
                  },
                  {
                    name: es ? "Preferencia de tema" : "Theme preference",
                    desc: es ? "Guarda si prefieres el modo claro u oscuro." : "Saves whether you prefer light or dark mode.",
                    duration: es ? "Persistente (localStorage)" : "Persistent (localStorage)",
                    type: es ? "Funcional" : "Functional",
                  },
                  {
                    name: es ? "Aviso de cookies" : "Cookie notice",
                    desc: es ? "Registra si ya has aceptado o cerrado el aviso de cookies." : "Records whether you have already accepted or dismissed the cookie notice.",
                    duration: es ? "30 días" : "30 days",
                    type: es ? "Necesaria" : "Necessary",
                  },
                ].map((cookie, i) => (
                  <div key={i} className="border border-gray-100 dark:border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{cookie.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{cookie.type}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{cookie.desc}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{es ? "Duración:" : "Duration:"} {cookie.duration}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "Cookies de terceros" : "Third-Party Cookies"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Este sitio no instala cookies de seguimiento, publicidad ni analíticas de terceros. Los enlacces a plataformas externas como GitHub, Instagram o WhatsApp pueden generar sus propias cookies, las cuales están sujetas a las políticas de privacidad de cada plataforma."
                  : "This site does not install third-party tracking, advertising, or analytics cookies. Links to external platforms such as GitHub, Instagram, or WhatsApp may generate their own cookies, which are subject to each platform's privacy policies."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "Control de cookies" : "Cookie Control"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {es
                  ? "Puedes controlar y gestionar las cookies de las siguientes maneras:"
                  : "You can control and manage cookies in the following ways:"}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <li>{es ? "Cambiando la configuración de tu navegador para bloquear o eliminar cookies." : "Changing your browser settings to block or delete cookies."}</li>
                <li>{es ? "Usando el modo de navegación privada o incógnito." : "Using private or incognito browsing mode."}</li>
                <li>{es ? "Borrando manualmente el localStorage de tu navegador." : "Manually clearing your browser's localStorage."}</li>
              </ul>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                {es
                  ? "Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio, como la pérdida de tus preferencias de idioma y tema."
                  : "Please note that disabling certain cookies may affect site functionality, such as losing your language and theme preferences."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.45}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "Cambios en esta política" : "Changes to This Policy"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Me reservo el derecho de actualizar esta Política de Cookies cuando sea necesario. Los cambios se publicarán en esta página con la fecha de actualización correspondiente."
                  : "I reserve the right to update this Cookies Policy when necessary. Changes will be published on this page with the corresponding update date."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "Contacto" : "Contact"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Si tienes preguntas sobre cómo usamos las cookies, puedes contactarme a través de la sección de contacto del portafolio."
                  : "If you have questions about how we use cookies, you can contact me through the portfolio's contact section."}
              </p>
            </AnimatedSection>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
