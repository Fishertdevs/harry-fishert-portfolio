"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CookiesPage() {
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
          {language === "es" ? "Política de Cookies" : "Cookies Policy"}
        </h1>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {language === "es" ? (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Última actualización: {new Date().toLocaleDateString("es-ES")}
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">¿Qué son las cookies?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar tus preferencias y mejorar tu experiencia de navegación.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Cookies que utilizamos</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Este sitio web utiliza cookies mínimas y esenciales para:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                <li>Recordar tus preferencias de idioma</li>
                <li>Mantener tu preferencia de tema (claro/oscuro)</li>
                <li>Mejorar el rendimiento del sitio</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Cookies de terceros</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Este sitio no utiliza cookies de seguimiento de terceros ni cookies publicitarias.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Cómo gestionar las cookies</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Puedes configurar tu navegador para rechazar cookies o para que te avise cuando se envíen. Sin embargo, algunas funciones del sitio pueden no funcionar correctamente si desactivas las cookies.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contacto</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Si tienes preguntas sobre nuestra política de cookies, puedes contactarme a través de la sección de contacto.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Last updated: {new Date().toLocaleDateString("en-US")}
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">What are cookies?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They are used to remember your preferences and improve your browsing experience.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Cookies we use</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This website uses minimal and essential cookies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
                <li>Remember your language preferences</li>
                <li>Maintain your theme preference (light/dark)</li>
                <li>Improve site performance</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Third-party cookies</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This site does not use third-party tracking cookies or advertising cookies.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">How to manage cookies</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You can configure your browser to reject cookies or to notify you when cookies are sent. However, some site features may not work properly if you disable cookies.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contact</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have questions about our cookies policy, you can contact me through the contact section.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
