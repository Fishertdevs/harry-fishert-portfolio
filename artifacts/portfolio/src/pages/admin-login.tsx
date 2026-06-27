import { useState } from "react"
import { useLocation } from "wouter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, Mail, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { Link } from "wouter"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const { language } = useLanguage()
  const [, setLocation] = useLocation()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const ADMIN_EMAIL = "fishertdevs@gmail.com"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    if (email === ADMIN_EMAIL) {
      sessionStorage.setItem("adminAuth", "true")
      toast({ title: language === "es" ? "Acceso concedido" : "Access granted", description: language === "es" ? "Bienvenido al panel de administración" : "Welcome to the admin panel" })
      setLocation("/admin/dashboard")
    } else {
      toast({ title: language === "es" ? "Acceso denegado" : "Access denied", description: language === "es" ? "Email no autorizado" : "Unauthorized email", variant: "destructive" })
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          {language === "es" ? "Volver al sitio" : "Back to site"}
        </Link>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{language === "es" ? "Panel de Administración" : "Admin Panel"}</CardTitle>
            <CardDescription>{language === "es" ? "Acceso restringido solo para el administrador" : "Restricted access for administrator only"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{language === "es" ? "Correo electrónico" : "Email"}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="email" type="email" placeholder="admin@example.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (language === "es" ? "Verificando..." : "Verifying...") : (language === "es" ? "Acceder" : "Access")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
