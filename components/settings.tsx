"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Save, Lock, Unlock, RefreshCw, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

// Código de acceso (en una aplicación real, esto estaría en el servidor)
const ACCESS_CODE = "harry2025"

const Settings = () => {
  const { t } = useLanguage()
  const { portfolioData, updatePortfolioData, resetPortfolioData } = usePortfolio()
  const { toast } = useToast()
  const [accessCode, setAccessCode] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState(portfolioData)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Sincronizar formData con portfolioData cuando cambie
  useEffect(() => {
    setFormData(portfolioData)
  }, [portfolioData])

  // Verificar si hay una sesión guardada
  useEffect(() => {
    const savedAuth = localStorage.getItem("portfolio-auth")
    if (savedAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    // Simular verificación
    setTimeout(() => {
      if (accessCode === ACCESS_CODE) {
        setIsAuthenticated(true)
        localStorage.setItem("portfolio-auth", "true")
        toast({
          title: "Acceso concedido",
          description: "Bienvenido al panel de ajustes",
        })
      } else {
        setErrorMessage("Código de acceso incorrecto")
        toast({
          title: "Acceso denegado",
          description: "El código ingresado no es válido",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("portfolio-auth")
    toast({
      title: "Sesión cerrada",
      description: "Has salido del panel de ajustes",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)

    // Actualizar inmediatamente en el contexto para reflejar cambios en tiempo real
    updatePortfolioData({ [name]: value })
  }

  const handleSaveChanges = () => {
    setIsLoading(true)
    setSuccessMessage("")

    // Simular guardado
    setTimeout(() => {
      updatePortfolioData(formData)
      setSuccessMessage("Cambios guardados correctamente")
      toast({
        title: "Cambios guardados",
        description: "Los cambios se han guardado correctamente y se reflejan en tiempo real",
      })
      setIsLoading(false)
    }, 500)
  }

  const handleResetChanges = () => {
    setFormData(portfolioData)
    toast({
      title: "Cambios descartados",
      description: "Se han restaurado los valores guardados",
    })
  }

  const handleResetAll = () => {
    resetPortfolioData()
    toast({
      title: "Datos restablecidos",
      description: "Se han restaurado todos los valores por defecto",
    })
  }

  if (!isAuthenticated) {
    return (
      <section id="settings" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Panel de Ajustes</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
            <p className="text-gray-700 dark:text-gray-300 mt-6 max-w-2xl mx-auto">Acceso único del propietario.</p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Acceso Restringido
                </CardTitle>
                <CardDescription>Ingresa el código de acceso para continuar</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAccessSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="accessCode">Código de acceso</Label>
                      <Input
                        id="accessCode"
                        type="password"
                        placeholder="Ingresa el código de acceso"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        required
                      />
                      {errorMessage && (
                        <p className="text-sm text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" /> {errorMessage}
                        </p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Verificando...
                        </>
                      ) : (
                        "Acceder"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="settings" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold gradient-text">Panel de Ajustes</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Panel exclusivo del propietario - Los cambios se reflejan en tiempo real
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <Unlock className="h-4 w-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>

        <Card className="border-2 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Editar información</CardTitle>
            <CardDescription>
              Los cambios se aplican automáticamente en tiempo real. Usa "Guardar cambios" para confirmar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="about">Sobre Mí</TabsTrigger>
                <TabsTrigger value="stats">Estadísticas</TabsTrigger>
                <TabsTrigger value="social">Redes Sociales</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título profesional</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción corta</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="about" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aboutParagraph1">Primer párrafo</Label>
                  <Textarea
                    id="aboutParagraph1"
                    name="aboutParagraph1"
                    value={formData.aboutParagraph1}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutParagraph2">Segundo párrafo</Label>
                  <Textarea
                    id="aboutParagraph2"
                    name="aboutParagraph2"
                    value={formData.aboutParagraph2}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experiencia</Label>
                    <Input id="experience" name="experience" value={formData.experience} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Especialización</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectsCompleted">Proyectos completados</Label>
                    <Input
                      id="projectsCompleted"
                      name="projectsCompleted"
                      value={formData.projectsCompleted}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentSemester">Semestre actual</Label>
                    <Input
                      id="currentSemester"
                      name="currentSemester"
                      value={formData.currentSemester}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsStudied">Años estudiados</Label>
                    <Input
                      id="yearsStudied"
                      name="yearsStudied"
                      value={formData.yearsStudied}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Créditos</Label>
                    <Input id="credits" name="credits" value={formData.credits} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certificaciones</Label>
                    <Input
                      id="certifications"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" name="github" value={formData.github} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" name="instagram" value={formData.instagram} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp (URL completa)</Label>
                  <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleResetChanges}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Descartar cambios
              </Button>
              <Button variant="destructive" onClick={handleResetAll}>
                Restablecer todo
              </Button>
            </div>
            <div className="flex items-center gap-4">
              {successMessage && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-green-600 dark:text-green-400 flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-1" /> {successMessage}
                </motion.span>
              )}
              <Button onClick={handleSaveChanges} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar cambios
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

export default Settings
