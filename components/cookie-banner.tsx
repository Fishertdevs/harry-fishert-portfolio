"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"

export default function CookieBanner() {
  const { language } = useLanguage()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already accepted or rejected cookies
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (!cookieConsent) {
      // Show banner after a small delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary mb-1">
                {language === "es" ? "Uso de Cookies" : "Cookie Usage"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "es" 
                  ? "Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestro uso de cookies. "
                  : "We use cookies to improve your experience on our website. By continuing to browse, you accept our use of cookies. "}
                <a href="#" className="text-primary hover:underline">
                  {language === "es" ? "Politica de Cookies" : "Cookie Policy"}
                </a>
                {" "}{language === "es" ? "y" : "and"}{" "}
                <a href="#" className="text-primary hover:underline">
                  {language === "es" ? "Terminos y Condiciones" : "Terms and Conditions"}
                </a>.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReject}
              className="flex-1 md:flex-none border-gray-300 dark:border-gray-600"
            >
              {language === "es" ? "Rechazar" : "Reject"}
            </Button>
            <Button 
              size="sm"
              onClick={handleAccept}
              className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {language === "es" ? "Aceptar" : "Accept"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
