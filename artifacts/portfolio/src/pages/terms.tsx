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

export default function TermsPage() {
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
              {es ? "Términos y Condiciones" : "Terms and Conditions"}
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
                {es ? "1. Aceptación de los Términos" : "1. Acceptance of Terms"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Al acceder y utilizar este sitio web, aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguno de los puntos descritos, te pedimos que no hagas uso de este sitio."
                  : "By accessing and using this website, you agree to comply with these Terms and Conditions. If you disagree with any of the points described, we ask that you refrain from using this site."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "2. Propiedad Intelectual" : "2. Intellectual Property"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Todo el contenido de este sitio, incluyendo textos, imágenes, diseños, código fuente, logotipos y elementos visuales, es propiedad exclusiva de Harry Fishert. Queda estrictamente prohibida su reproducción, distribución o uso comercial sin autorización previa y por escrito."
                  : "All content on this site, including texts, images, designs, source code, logos, and visual elements, is the exclusive property of Harry Fishert. Reproduction, distribution, or commercial use without prior written authorization is strictly prohibited."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "3. Uso del Sitio" : "3. Use of the Site"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {es
                  ? "Al utilizar este sitio, te comprometes a:"
                  : "By using this site, you agree to:"}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <li>{es ? "No realizar actividades que puedan dañar, deshabilitar o sobrecargar el sitio." : "Not engage in activities that could damage, disable, or overload the site."}</li>
                <li>{es ? "No intentar acceder de forma no autorizada a ningún sistema o red relacionada." : "Not attempt unauthorized access to any related system or network."}</li>
                <li>{es ? "No utilizar el contenido del sitio con fines ilegales o no autorizados." : "Not use the site's content for illegal or unauthorized purposes."}</li>
                <li>{es ? "No reproducir, copiar ni distribuir el contenido sin autorización." : "Not reproduce, copy, or distribute content without authorization."}</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "4. Servicios y Proyectos" : "4. Services and Projects"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Los proyectos y servicios mostrados en este portafolio son de carácter informativo. Para contratar cualquier servicio de desarrollo, consultoría o diseño, deberás contactarme directamente para acordar condiciones, alcance y precio."
                  : "The projects and services shown in this portfolio are for informational purposes. To hire any development, consulting, or design service, you must contact me directly to agree on conditions, scope, and pricing."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "5. Limitación de Responsabilidad" : "5. Limitation of Liability"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Este sitio web se proporciona 'tal cual', sin garantías de ningún tipo. No me responsabilizo por daños directos o indirectos derivados del uso de la información presentada, ni por la disponibilidad continua del sitio."
                  : "This website is provided 'as is', without warranties of any kind. I am not responsible for direct or indirect damages arising from the use of the information presented, nor for the continuous availability of the site."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.45}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "6. Modificaciones" : "6. Modifications"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Me reservo el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor desde el momento de su publicación en este sitio. Se recomienda revisarlos periódicamente."
                  : "I reserve the right to modify these Terms and Conditions at any time. Changes will take effect from the moment they are published on this site. It is recommended to review them periodically."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {es ? "7. Contacto" : "7. Contact"}
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {es
                  ? "Para cualquier consulta relacionada con estos términos, puedes contactarme a través de la sección de contacto del portafolio o directamente por WhatsApp."
                  : "For any inquiries related to these terms, you can contact me through the portfolio's contact section or directly via WhatsApp."}
              </p>
            </AnimatedSection>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
