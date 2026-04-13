"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === "es" ? "Volver al inicio" : "Back to home"}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {language === "es" ? "Política de Privacidad" : "Privacy Policy"}
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {language === "es" ? (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Última actualización: {new Date().toLocaleDateString("es-ES")}
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Información que recopilamos</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Este sitio web es un portafolio personal y no recopila información personal de los visitantes de forma activa. Solo se recopila información cuando decides contactarme voluntariamente a través de los medios proporcionados.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Uso de la información</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Cualquier información que proporciones voluntariamente (como tu nombre y correo electrónico al contactarme) se utilizará únicamente para responder a tu consulta y no será compartida con terceros.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Seguridad</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Me comprometo a proteger tu información personal. Aunque ningún método de transmisión por Internet es 100% seguro, implemento medidas razonables para proteger la información que me proporcionas.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Enlaces a otros sitios</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Este sitio puede contener enlaces a sitios externos (GitHub, LinkedIn, etc.). No soy responsable de las prácticas de privacidad de estos sitios externos.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Tus derechos</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tienes derecho a acceder, rectificar o eliminar cualquier información personal que me hayas proporcionado. Para ejercer estos derechos, contáctame a través de los medios disponibles.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Cambios a esta política</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Me reservo el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios se publicarán en esta página con una fecha de actualización revisada.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contacto</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Si tienes preguntas sobre esta política de privacidad, puedes contactarme a través de la sección de contacto del sitio.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Last updated: {new Date().toLocaleDateString("en-US")}
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Information we collect</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This website is a personal portfolio and does not actively collect personal information from visitors. Information is only collected when you voluntarily choose to contact me through the provided means.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Use of information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Any information you voluntarily provide (such as your name and email when contacting me) will be used solely to respond to your inquiry and will not be shared with third parties.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Security</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                I am committed to protecting your personal information. Although no method of Internet transmission is 100% secure, I implement reasonable measures to protect the information you provide.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Links to other sites</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This site may contain links to external sites (GitHub, LinkedIn, etc.). I am not responsible for the privacy practices of these external sites.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Your rights</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You have the right to access, rectify, or delete any personal information you have provided to me. To exercise these rights, contact me through the available means.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Changes to this policy</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                I reserve the right to update this privacy policy at any time. Changes will be posted on this page with a revised update date.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contact</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have questions about this privacy policy, you can contact me through the contact section of the site.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
