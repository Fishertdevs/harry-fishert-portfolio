"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Save,
  RefreshCw,
  CheckCircle,
  Star,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  MessageSquare,
  X,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { reviewsStorage, type Review } from "@/lib/reviews-storage"

const Settings = () => {
  const { portfolioData, updatePortfolioData } = usePortfolio()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("reviews")
  const [formData, setFormData] = useState(portfolioData)
  const [successMessage, setSuccessMessage] = useState("")

  // Estado de reseñas
  const [reviews, setReviews] = useState<Review[]>([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<{ name: string; position: string; company: string; rating: number; review: string }>({
    name: "",
    position: "",
    company: "",
    rating: 5,
    review: "",
  })

  // Sincronizar formData con portfolioData cuando cambie
  useEffect(() => {
    setFormData(portfolioData)
  }, [portfolioData])

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      setLoadingReviews(true)
      const all = await reviewsStorage.getAllReviews()
      setReviews(all)
    } catch (error) {
      console.error("Error loading reviews:", error)
    } finally {
      setLoadingReviews(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    updatePortfolioData({ [name]: value })
  }

  const handleSaveChanges = () => {
    setIsLoading(true)
    setSuccessMessage("")
    setTimeout(() => {
      updatePortfolioData(formData)
      setSuccessMessage("Cambios guardados correctamente")
      toast({
        title: "Cambios guardados",
        description: "Los datos de contacto se han guardado y se reflejan en tiempo real",
      })
      setIsLoading(false)
    }, 400)
  }

  // ---- Gestión de reseñas ----
  const startEdit = (review: Review) => {
    setEditingId(review.id)
    setEditForm({
      name: review.name,
      position: review.position || "",
      company: review.company || "",
      rating: review.rating,
      review: review.review,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const saveEdit = async (id: number) => {
    await reviewsStorage.updateReview(id, editForm)
    await loadReviews()
    setEditingId(null)
    toast({ title: "Reseña actualizada", description: "Los cambios se guardaron correctamente" })
  }

  const handleDelete = async (id: number) => {
    await reviewsStorage.deleteReview(id)
    await loadReviews()
    toast({ title: "Reseña eliminada", description: "La reseña se eliminó permanentemente" })
  }

  const handleTogglePublish = async (review: Review) => {
    const newState = !(review.approved === true)
    await reviewsStorage.setApproved(review.id, newState)
    await loadReviews()
    toast({
      title: newState ? "Reseña publicada" : "Reseña ocultada",
      description: newState
        ? "Ahora es visible en el portafolio"
        : "Ya no se muestra en el portafolio",
    })
  }

  return (
    <section id="settings" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text">Panel de Administración</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona las reseñas y tus datos de contacto. Los cambios se reflejan en tiempo real.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-8 max-w-md">
            <TabsTrigger value="reviews" className="gap-2">
              <MessageSquare className="h-4 w-4" /> Reseñas
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Save className="h-4 w-4" /> Contacto y Redes
            </TabsTrigger>
          </TabsList>

          {/* ---- RESEÑAS ---- */}
          <TabsContent value="reviews">
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Gestión de reseñas</CardTitle>
                <CardDescription>
                  Edita, elimina o publica las reseñas enviadas por los usuarios. Solo las reseñas publicadas se
                  muestran en el portafolio.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingReviews ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                      <MessageSquare className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Aún no hay reseñas enviadas. Cuando alguien envíe una, aparecerá aquí para gestionarla.
                    </p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800"
                    >
                      {editingId === review.id ? (
                        /* Modo edición */
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label>Nombre</Label>
                              <Input
                                value={editForm.name}
                                onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>Calificación (1-5)</Label>
                              <Input
                                type="number"
                                min={1}
                                max={5}
                                value={editForm.rating}
                                onChange={(e) =>
                                  setEditForm((p) => ({ ...p, rating: Math.min(5, Math.max(1, Number(e.target.value))) }))
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>Cargo</Label>
                              <Input
                                value={editForm.position}
                                onChange={(e) => setEditForm((p) => ({ ...p, position: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>Empresa</Label>
                              <Input
                                value={editForm.company}
                                onChange={(e) => setEditForm((p) => ({ ...p, company: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label>Reseña</Label>
                            <Textarea
                              rows={3}
                              value={editForm.review}
                              onChange={(e) => setEditForm((p) => ({ ...p, review: e.target.value }))}
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={cancelEdit} className="gap-1">
                              <X className="h-4 w-4" /> Cancelar
                            </Button>
                            <Button size="sm" onClick={() => saveEdit(review.id)} className="gap-1">
                              <Save className="h-4 w-4" /> Guardar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* Modo vista */
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                              <span
                                className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${
                                  review.approved === true
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                }`}
                              >
                                {review.approved === true ? "Publicada" : "Pendiente"}
                              </span>
                            </div>
                            {(review.position || review.company) && (
                              <p className="text-xs text-primary mb-1">
                                {[review.position, review.company].filter(Boolean).join(" - ")}
                              </p>
                            )}
                            <div className="flex gap-0.5 mb-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`h-3.5 w-3.5 ${
                                    s <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{review.review}</p>
                          </div>
                          <div className="flex sm:flex-col gap-2 shrink-0">
                            <Button
                              variant={review.approved === true ? "outline" : "default"}
                              size="sm"
                              onClick={() => handleTogglePublish(review)}
                              className="gap-1"
                            >
                              {review.approved === true ? (
                                <>
                                  <EyeOff className="h-4 w-4" /> Ocultar
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4" /> Publicar
                                </>
                              )}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => startEdit(review)} className="gap-1">
                              <Pencil className="h-4 w-4" /> Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(review.id)}
                              className="gap-1"
                            >
                              <Trash2 className="h-4 w-4" /> Eliminar
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ---- CONTACTO Y REDES ---- */}
          <TabsContent value="contact">
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Datos de contacto y redes sociales</CardTitle>
                <CardDescription>
                  Actualiza tu email, teléfono y enlaces de redes sociales. Los cambios se reflejan en tiempo real.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>

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
              </CardContent>
              <CardFooter className="flex items-center justify-end gap-4">
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
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Settings
