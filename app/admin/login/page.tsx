"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, User, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  // Simple admin credentials (in production, use proper auth)
  const ADMIN_USERNAME = "admin"
  const ADMIN_PASSWORD = "harry2024"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      // Store auth in sessionStorage
      sessionStorage.setItem("adminAuth", "true")
      toast({
        title: language === "es" ? "Acceso concedido" : "Access granted",
        description: language === "es" ? "Bienvenido al panel de administracion" : "Welcome to the admin panel",
      })
      router.push("/admin/dashboard")
    } else {
      toast({
        title: language === "es" ? "Error de autenticacion" : "Authentication error",
        description: language === "es" ? "Credenciales incorrectas" : "Invalid credentials",
        variant: "destructive"
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === "es" ? "Volver al inicio" : "Back to home"}
        </Link>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl text-white">
              {language === "es" ? "Panel de Administracion" : "Admin Panel"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {language === "es" 
                ? "Ingresa tus credenciales para acceder" 
                : "Enter your credentials to access"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  {language === "es" ? "Usuario" : "Username"}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="username"
                    type="text"
                    placeholder={language === "es" ? "Ingresa tu usuario" : "Enter your username"}
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  {language === "es" ? "Contrasena" : "Password"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={language === "es" ? "Ingresa tu contrasena" : "Enter your password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
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
                  : (language === "es" ? "Iniciar Sesion" : "Sign In")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-6">
          {language === "es" 
            ? "Acceso restringido solo para administradores" 
            : "Restricted access for administrators only"}
        </p>
      </motion.div>
    </div>
  )
}
