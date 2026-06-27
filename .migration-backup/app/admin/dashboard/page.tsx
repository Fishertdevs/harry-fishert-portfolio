"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Settings from "@/components/settings"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated via sessionStorage
    const auth = sessionStorage.getItem("adminAuth")
    if (auth !== "true") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {language === "es" ? "Volver al sitio" : "Back to site"}
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "Panel de Administracion" : "Admin Dashboard"}
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              {language === "es" ? "Cerrar sesion" : "Logout"}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Settings Content */}
      <main>
        <Settings />
      </main>
    </div>
  )
}
