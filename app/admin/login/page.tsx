"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, Mail, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")

  // Authorized admin email
  const ADMIN_EMAIL = "fishertdevs@gmail.com"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    if (email.toLowerCase().trim() === ADMIN_EMAIL) {
      // Store auth in sessionStorage
      sessionStorage.setItem("adminAuth", "true")
      toast({
        title: language === "es" ? "Acceso concedido" : "Access granted",
        description: language === "es" ? "Bienvenido al panel de administracion" : "Welcome to the admin panel",
      })
      router.push("/admin/dashboard")
    } else {
      toast({
        title: language === "es" ? "Acceso denegado" : "Access denied",
        description: language === "es" ? "Este correo no tiene permisos de administrador" : "This email does not have admin permissions",
        variant: "destructive"
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === "es" ? "Volver al inicio" : "Back to home"}
        </Link>

        <Card className="bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 backdrop-blur-sm shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              {language === "es" ? "Panel de Administracion" : "Admin Panel"}
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              {language === "es" 
                ? "Ingresa tu correo autorizado para acceder" 
                : "Enter your authorized email to access"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  {language === "es" ? "Correo electronico" : "Email"}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === "es" ? "Ingresa tu correo" : "Enter your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading 
                  ? (language === "es" ? "Verificando..." : "Verifying...") 
                  : (language === "es" ? "Acceder" : "Access")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-gray-500 dark:text-gray-500 text-sm mt-6">
          {language === "es" 
            ? "Acceso restringido solo para administradores" 
            : "Restricted access for administrators only"}
        </p>
      </motion.div>
    </div>
  )
}
