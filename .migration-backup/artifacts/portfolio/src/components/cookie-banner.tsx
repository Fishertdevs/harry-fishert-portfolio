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
      <div className="container mx-auto px-3 py-2 md:px-6 md:py-4">
        <div className="flex flex-row items-center justify-between gap-2 md:gap-6">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <Cookie className="w-4 h-4 md:w-6 md:h-6 text-amber-500 flex-shrink-0" />
            <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {language === "es" 
                ? "Usamos cookies para mejorar tu experiencia y personalizar el contenido. Al continuar navegando, aceptas nuestra "
                : "We use cookies to improve your experience and personalize content. By continuing to browse, you accept our "}
              <a href="/cookies" className="text-primary hover:underline font-medium">
                {language === "es" ? "Política de Cookies" : "Cookie Policy"}
              </a>
            </p>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReject}
              className="h-7 md:h-9 px-2 md:px-4 text-[10px] md:text-sm border-gray-300 dark:border-gray-600"
            >
              {language === "es" ? "Cerrar" : "Close"}
            </Button>
            <Button 
              size="sm"
              onClick={handleAccept}
              className="h-7 md:h-9 px-2 md:px-4 text-[10px] md:text-sm bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {language === "es" ? "Aceptar" : "Accept"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
