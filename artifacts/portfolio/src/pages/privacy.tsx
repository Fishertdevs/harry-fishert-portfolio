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

export default function PrivacyPage() {
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
              {es ? "Política de Privacidad" : "Privacy Policy"}
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
                {es ? "1. Introducción" : "1. Introduction"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Este sitio web es un portafolio profesional personal. Me comprometo a proteger tu privacidad y garantizar que cualquier dato que compartas voluntariamente sea tratado con la máxima confidencialidad y respeto."
                  : "This website is a personal professional portfolio. I am committed to protecting your privacy and ensuring that any data you voluntarily share is handled with the utmost confidentiality and respect."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "2. Información que recopilamos" : "2. Information We Collect"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {es
                  ? "Este sitio no recopila información personal de forma automática. Solo se recopila información cuando tú la proporcionas de manera voluntaria, como en los siguientes casos:"
                  : "This site does not automatically collect personal information. Information is only collected when you provide it voluntarily, such as in the following cases:"}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <li>{es ? "Al enviar un mensaje a través del formulario de contacto." : "When sending a message through the contact form."}</li>
                <li>{es ? "Al interactuar con los botones de WhatsApp o redes sociales." : "When interacting with WhatsApp or social media buttons."}</li>
                <li>{es ? "Al dejar una reseña o valoración en el sitio." : "When leaving a review or rating on the site."}</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "3. Uso de la información" : "3. Use of Information"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {es
                  ? "Cualquier información que proporciones de forma voluntaria se utilizará exclusivamente para:"
                  : "Any information you voluntarily provide will be used exclusively to:"}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <li>{es ? "Responder a tu consulta o solicitud de servicio." : "Respond to your inquiry or service request."}</li>
                <li>{es ? "Mejorar la experiencia del usuario en el sitio." : "Improve the user experience on the site."}</li>
                <li>{es ? "Mantener la funcionalidad de tus preferencias (tema, idioma)." : "Maintain your preference functionality (theme, language)."}</li>
              </ul>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                {es
                  ? "Nunca se comparte, vende ni transfiere tu información a terceros sin tu consentimiento expreso."
                  : "Your information is never shared, sold, or transferred to third parties without your express consent."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "4. Almacenamiento local" : "4. Local Storage"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Este sitio utiliza el almacenamiento local del navegador (localStorage) únicamente para guardar tus preferencias de idioma y tema (claro/oscuro). Estos datos no se transmiten a ningún servidor y permanecen en tu dispositivo."
                  : "This site uses the browser's local storage (localStorage) solely to save your language and theme (light/dark) preferences. This data is not transmitted to any server and remains on your device."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.45}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "5. Servicios de terceros" : "5. Third-Party Services"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "El sitio puede incluir enlaces a perfiles de GitHub, Instagram, WhatsApp u otras plataformas externas. Cada uno de estos servicios tiene su propia política de privacidad, sobre la cual no tengo control ni responsabilidad."
                  : "The site may include links to GitHub, Instagram, WhatsApp, or other external platforms. Each of these services has its own privacy policy, over which I have no control or responsibility."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "6. Tus derechos" : "6. Your Rights"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {es
                  ? "Tienes derecho a:"
                  : "You have the right to:"}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <li>{es ? "Solicitar información sobre los datos que se hayan guardado sobre ti." : "Request information about any data stored about you."}</li>
                <li>{es ? "Solicitar la eliminación de cualquier dato personal." : "Request the deletion of any personal data."}</li>
                <li>{es ? "Retirar tu consentimiento en cualquier momento." : "Withdraw your consent at any time."}</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.55}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "7. Contacto" : "7. Contact"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Si tienes preguntas, dudas o solicitudes relacionadas con esta política de privacidad, puedes contactarme directamente a través de la sección de contacto del portafolio o mediante WhatsApp."
                  : "If you have questions, concerns, or requests related to this privacy policy, you can contact me directly through the portfolio's contact section or via WhatsApp."}
              </p>
            </AnimatedSection>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
