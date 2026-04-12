"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Calendar, ThumbsUp, MessageSquare, Award, Clock, MapPin, Building } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { reviewsStorage, type Review } from "@/lib/reviews-storage"

// Función para formatear fecha y hora de manera profesional
const formatDateTime = (date: string, time: string) => {
  const dateObj = new Date(`${date}T${time}`)
  return {
    date: dateObj.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: dateObj.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    relative: getRelativeTime(dateObj),
  }
}

// Función para obtener tiempo relativo
const getRelativeTime = (date: Date) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Hace unos momentos"
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`
  if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`
  if (diffInSeconds < 2592000) return `Hace ${Math.floor(diffInSeconds / 604800)} semanas`
  return `Hace ${Math.floor(diffInSeconds / 2592000)} meses`
}

// Función para generar avatar con iniciales
const generateAvatar = (name: string) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-teal-500",
  ]

  const colorIndex = name.length % colors.length
  return { initials, color: colors[colorIndex] }
}

const Reviews = () => {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewStats, setReviewStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  })
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    location: "",
    projectType: "",
    collaboration: "",
    review: "",
    rating: 0,
  })

  // Cargar reseñas al iniciar
  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      setIsLoading(true)
      const allReviews = await reviewsStorage.getAllReviews()
      const stats = reviewsStorage.getReviewStats()

      setReviews(allReviews)
      setReviewStats(stats)
    } catch (error) {
      console.error("Error loading reviews:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las reseñas",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating)
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleHelpfulClick = async (reviewId: number) => {
    try {
      await reviewsStorage.markAsHelpful(reviewId)

      // Actualizar el estado local
      setReviews((prevReviews) =>
        prevReviews.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
      )

      toast({
        title: "¡Gracias por tu feedback!",
        description: "Has marcado esta reseña como útil.",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo marcar la reseña como útil",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.review || !selectedRating) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos y selecciona una calificación.",
        variant: "destructive",
      })
      return
    }

    if (formData.review.length < 50) {
      toast({
        title: "Error",
        description: "La reseña debe tener al menos 50 caracteres.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Guardar la reseña usando el sistema de almacenamiento permanente
      const newReview = await reviewsStorage.addReview({
        name: formData.name,
        company: formData.company || "Empresa independiente",
        position: formData.position || "Cliente",
        location: formData.location,
        projectType: formData.projectType,
        collaboration: formData.collaboration,
        rating: selectedRating,
        review: formData.review,
      })

      // Recargar todas las reseñas y estadísticas
      await loadReviews()

      toast({
        title: "¡Reseña enviada exitosamente!",
        description: "Gracias por tu feedback profesional. Tu reseña ha sido guardada permanentemente.",
        duration: 5000,
      })

      // Resetear formulario
      setFormData({
        name: "",
        company: "",
        position: "",
        location: "",
        projectType: "",
        collaboration: "",
        review: "",
        rating: 0,
      })
      setSelectedRating(0)
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al guardar la reseña. Por favor intenta de nuevo.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const StarRating = ({ rating, interactive = false, size = "h-5 w-5" }: any) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          className={`${interactive ? "cursor-pointer" : "cursor-default"} transition-colors`}
          onClick={() => interactive && handleRatingClick(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          whileHover={interactive ? { scale: 1.1 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          disabled={!interactive}
        >
          <Star
            className={`${size} ${
              star <= (interactive ? hoverRating || selectedRating : rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            } transition-colors`}
          />
        </motion.button>
      ))}
    </div>
  )

  const RatingDistribution = () => (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className="flex items-center space-x-2">
          <span className="text-sm font-medium w-3">{rating}</span>
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-yellow-400 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution] / (reviewStats.totalReviews || 1)) * 100}%`,
              }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
            {reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution]}
          </span>
        </div>
      ))}
    </div>
  )

  if (isLoading) {
    return (
      <section id="reviews" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando reseñas...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="reviews" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("reviewsTitle")}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-gray-700 dark:text-gray-300 mt-6 max-w-2xl mx-auto">{t("reviewsDescription")}</p>

          {/* Indicador de persistencia */}
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Las reseñas se guardan permanentemente
          </div>
        </div>

        {/* Estadísticas de reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h-full"
          >
            <Card className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800 h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {reviewStats.totalReviews > 0 ? reviewStats.averageRating.toFixed(1) : "0.0"}
                </div>
                <StarRating rating={Math.round(reviewStats.averageRating)} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t("averageRating")}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="flex justify-center mb-4">
                  <MessageSquare className="h-12 w-12 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {reviewStats.totalReviews}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("totalReviews")}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="h-full"
          >
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 h-full">
              <CardContent className="p-6 h-full">
                <h4 className="font-semibold mb-4 text-center text-gray-800 dark:text-white">
                  {t("ratingDistribution")}
                </h4>
                <RatingDistribution />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Formulario para nueva reseña profesional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 shadow-lg border-2 border-blue-100 dark:border-gray-600">
            <CardHeader className="text-center border-b border-blue-100 dark:border-gray-600">
              <CardTitle className="text-2xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                {t("leaveReview")}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Comparte tu experiencia profesional trabajando conmigo
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información personal y profesional */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nombre completo *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Empresa/Organización
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nombre de tu empresa"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cargo/Posición</label>
                    <Input
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="Tu cargo o posición"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ubicación</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Ciudad, País"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tipo de proyecto
                    </label>
                    <Input
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      placeholder="Ej: Desarrollo web, Consultoría, etc."
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Duración de colaboración
                    </label>
                    <Input
                      name="collaboration"
                      value={formData.collaboration}
                      onChange={handleInputChange}
                      placeholder="Ej: 3 meses, 1 año, etc."
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                {/* Calificación */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Calificación general *
                  </label>
                  <div className="flex items-center space-x-4">
                    <StarRating rating={selectedRating} interactive={true} size="h-8 w-8" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      {selectedRating > 0 &&
                        (selectedRating === 5
                          ? "Excelente - Superó mis expectativas"
                          : selectedRating === 4
                            ? "Muy bueno - Cumplió mis expectativas"
                            : selectedRating === 3
                              ? "Bueno - Trabajo satisfactorio"
                              : selectedRating === 2
                                ? "Regular - Necesita mejoras"
                                : "Insatisfactorio - No recomendado")}
                    </span>
                  </div>
                </div>

                {/* Reseña detallada */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reseña profesional *
                  </label>
                  <Textarea
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    placeholder="Describe tu experiencia trabajando conmigo. Incluye detalles sobre la calidad del trabajo, comunicación, cumplimiento de plazos, y cualquier aspecto relevante..."
                    rows={6}
                    required
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Mínimo 50 caracteres. Sé específico y constructivo en tu feedback.</span>
                    <span className={formData.review.length < 50 ? "text-red-500" : "text-green-500"}>
                      {formData.review.length}/50
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 py-3 text-lg font-medium"
                  disabled={isSubmitting || formData.review.length < 50 || !selectedRating}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Guardando reseña permanentemente...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Star className="h-5 w-5 mr-2" />
                      Publicar reseña profesional
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reseñas existentes con diseño profesional */}
        {reviews.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Testimonios profesionales</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                {reviews.length} reseña{reviews.length !== 1 ? "s" : ""} real{reviews.length !== 1 ? "es" : ""}
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <AnimatePresence>
                {reviews.map((review, index) => {
                  const avatar = generateAvatar(review.name)
                  const dateTime = formatDateTime(review.date, review.time)

                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      <Card className="h-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              {/* Avatar profesional */}
                              <div
                                className={`${avatar.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}
                              >
                                {avatar.initials}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <CardTitle className="text-lg text-gray-800 dark:text-white">{review.name}</CardTitle>
                                  {review.verified && (
                                    <Badge
                                      variant="secondary"
                                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs"
                                    >
                                      ✓ Verificado
                                    </Badge>
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <Building className="h-3 w-3 mr-1" />
                                    <span className="font-medium">{review.position}</span>
                                    {review.company && (
                                      <>
                                        <span className="mx-1">en</span>
                                        <span className="font-medium">{review.company}</span>
                                      </>
                                    )}
                                  </div>
                                  {review.location && (
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {review.location}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Quote className="h-6 w-6 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                          </div>

                          {/* Información del proyecto */}
                          {(review.projectType || review.collaboration) && (
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                              <div className="flex flex-wrap gap-2 text-xs">
                                {review.projectType && (
                                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                                    {review.projectType}
                                  </Badge>
                                )}
                                {review.collaboration && (
                                  <Badge variant="outline" className="text-purple-600 border-purple-200">
                                    {review.collaboration}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Calificación y fecha */}
                          <div className="flex items-center justify-between mt-3">
                            <StarRating rating={review.rating} />
                            <div className="text-right">
                              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {dateTime.date}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {dateTime.time} • {dateTime.relative}
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-primary pl-4 mb-4">
                            "{review.review}"
                          </blockquote>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-primary transition-colors"
                              onClick={() => handleHelpfulClick(review.id)}
                            >
                              <ThumbsUp className="h-4 w-4 mr-2" />
                              Útil ({review.helpful})
                            </Button>
                            <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                              Reseña real verificada
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Mensaje cuando no hay reseñas */}
        {reviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <MessageSquare className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                Aún no hay testimonios profesionales
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Sé el primero en compartir tu experiencia profesional trabajando conmigo.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 Las reseñas profesionales se guardan permanentemente y ayudan a otros clientes a conocer la calidad
                  de mi trabajo y experiencia real.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Reviews
