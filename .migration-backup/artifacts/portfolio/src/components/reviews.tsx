"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Calendar, ThumbsUp, MessageSquare, Award, Clock, MapPin, Building, Send, Sparkles, User, Mail, Briefcase, Building2, FileText, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { reviewsStorage, type Review } from "@/lib/reviews-storage"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
    "bg-amber-500",
    "bg-rose-500",
    "bg-teal-500",
  ]

  const colorIndex = name.length % colors.length
  return { initials, color: colors[colorIndex] }
}

const Reviews = () => {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
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
    email: "",
    company: "",
    position: "",
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

      setReviews((prevReviews) =>
        prevReviews.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
      )

      toast({
        title: language === "es" ? "¡Gracias por tu feedback!" : "Thanks for your feedback!",
        description: language === "es" ? "Has marcado esta reseña como útil." : "You marked this review as helpful.",
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: language === "es" ? "No se pudo marcar la reseña como útil" : "Could not mark review as helpful",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.review || !selectedRating) {
      toast({
        title: "Error",
        description: language === "es" 
          ? "Por favor completa todos los campos requeridos y selecciona una calificación."
          : "Please complete all required fields and select a rating.",
        variant: "destructive",
      })
      return
    }

    if (formData.review.length < 20) {
      toast({
        title: "Error",
        description: language === "es"
          ? "La reseña debe tener al menos 20 caracteres."
          : "The review must be at least 20 characters.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await reviewsStorage.addReview({
        name: formData.name,
        company: formData.company || (language === "es" ? "Empresa independiente" : "Independent Company"),
        position: formData.position || (language === "es" ? "Cliente" : "Client"),
        location: "",
        projectType: "",
        collaboration: "",
        rating: selectedRating,
        review: formData.review,
      })

      await loadReviews()

      toast({
        title: language === "es" ? "¡Reseña enviada!" : "Review sent!",
        description: language === "es" 
          ? "Gracias por compartir tu experiencia."
          : "Thank you for sharing your experience.",
        duration: 5000,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        position: "",
        review: "",
        rating: 0,
      })
      setSelectedRating(0)
      setCurrentStep(1)
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        title: "Error",
        description: language === "es"
          ? "Hubo un problema al guardar la reseña. Por favor intenta de nuevo."
          : "There was a problem saving the review. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Interactive Star Rating Component
  const InteractiveStarRating = () => {
    const ratingTexts = language === "es" 
      ? ["", "Malo", "Regular", "Bueno", "Muy bueno", "Excelente"]
      : ["", "Poor", "Fair", "Good", "Very Good", "Excellent"]

    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              className="relative group"
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star
                className={`h-10 w-10 transition-all duration-200 ${
                  star <= (hoverRating || selectedRating)
                    ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
              {star <= (hoverRating || selectedRating) && (
                <motion.div
                  className="absolute inset-0 bg-amber-400/20 rounded-full blur-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {(hoverRating > 0 || selectedRating > 0) && (
            <motion.div
              key={hoverRating || selectedRating}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-lg font-medium"
              style={{ color: "#f59e0b" }}
            >
              {ratingTexts[hoverRating || selectedRating]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Simple Star Rating for display
  const StarRating = ({ rating, size = "h-4 w-4" }: { rating: number, size?: string }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  )

  // Step indicator for the form
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <motion.div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              currentStep >= step
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
            animate={{ scale: currentStep === step ? 1.1 : 1 }}
          >
            {step}
          </motion.div>
          {step < 3 && (
            <div className={`w-12 h-1 mx-1 rounded ${
              currentStep > step ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  // Form steps
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "¿Cómo calificarías tu experiencia?" : "How would you rate your experience?"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {language === "es" ? "Selecciona una calificación" : "Select a rating"}
              </p>
            </div>
            <InteractiveStarRating />
            <div className="flex justify-end pt-4">
              <Button 
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={selectedRating === 0}
                className="bg-primary hover:bg-primary/90"
              >
                {language === "es" ? "Continuar" : "Continue"}
              </Button>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "Cuéntanos sobre ti" : "Tell us about yourself"}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={language === "es" ? "Tu nombre *" : "Your name *"}
                  className="pl-10 h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={language === "es" ? "Tu email *" : "Your email *"}
                  className="pl-10 h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder={language === "es" ? "Tu cargo" : "Your position"}
                    className="pl-10 h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={language === "es" ? "Tu empresa" : "Your company"}
                    className="pl-10 h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
              >
                {language === "es" ? "Atrás" : "Back"}
              </Button>
              <Button 
                type="button"
                onClick={() => setCurrentStep(3)}
                disabled={!formData.name || !formData.email}
                className="bg-primary hover:bg-primary/90"
              >
                {language === "es" ? "Continuar" : "Continue"}
              </Button>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "Escribe tu reseña" : "Write your review"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {language === "es" ? "Comparte tu experiencia trabajando conmigo" : "Share your experience working with me"}
              </p>
            </div>

            <div className="relative">
              <Textarea
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                placeholder={language === "es" 
                  ? "Describe tu experiencia... ¿Qué te gustó? ¿Qué podría mejorar?"
                  : "Describe your experience... What did you like? What could be improved?"
                }
                rows={5}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 resize-none"
                required
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>{language === "es" ? "Mínimo 20 caracteres" : "Minimum 20 characters"}</span>
                <span className={formData.review.length < 20 ? "text-red-500" : "text-green-500"}>
                  {formData.review.length}/20
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {language === "es" ? "Calificación:" : "Rating:"}
                </span>
                <StarRating rating={selectedRating} size="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {language === "es" ? "Nombre:" : "Name:"}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{formData.name}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(2)}
              >
                {language === "es" ? "Atrás" : "Back"}
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting || formData.review.length < 20}
                className="bg-primary hover:bg-primary/90 min-w-[140px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === "es" ? "Enviando..." : "Sending..."}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="h-4 w-4 mr-2" />
                    {language === "es" ? "Enviar reseña" : "Submit review"}
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        )
    }
  }

  if (isLoading) {
    return (
      <section id="reviews" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {language === "es" ? "Cargando reseñas..." : "Loading reviews..."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "es" ? "Reseñas" : "Reviews"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            {t("reviewsDescription")}
          </p>
          <div className="h-1 w-16 bg-primary mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Stats Cards - only show if there are reviews */}
        {reviews.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Average Rating */}
            <Card className="text-center bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
                  <Award className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {reviewStats.averageRating.toFixed(1)}
                </div>
                <StarRating rating={Math.round(reviewStats.averageRating)} />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {language === "es" ? "Calificación promedio" : "Average rating"}
                </p>
              </CardContent>
            </Card>

            {/* Total Reviews */}
            <Card className="text-center bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                  <MessageSquare className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {reviewStats.totalReviews}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "es" ? "Reseñas totales" : "Total reviews"}
                </p>
              </CardContent>
            </Card>

            {/* Rating Distribution */}
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardContent className="pt-6">
                <h4 className="font-medium mb-4 text-center text-gray-900 dark:text-white text-sm">
                  {language === "es" ? "Distribución" : "Distribution"}
                </h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-xs w-3">{rating}</span>
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-amber-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution] / (reviewStats.totalReviews || 1)) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-4">
                        {reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Empty state or CTA */}
        {reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 max-w-md mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
              <MessageSquare className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === "es" ? "Aún no hay reseñas disponibles." : "No reviews available yet."}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {language === "es" ? "Se el primero en dejar una!" : "Be the first to leave one!"}
            </p>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 px-8 py-3 text-base">
                  <Sparkles className="h-5 w-5 mr-2" />
                  {language === "es" ? "+ Dejar una reseña" : "+ Leave a review"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl font-semibold text-primary">
                    {language === "es" ? "Comparte tu experiencia" : "Share your experience"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-4">
                  <StepIndicator />
                  <AnimatePresence mode="wait">
                    {renderFormStep()}
                  </AnimatePresence>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        ) : (
          <>
            {/* Add review button */}
            <div className="flex justify-center mb-8">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 px-6 py-2.5">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {language === "es" ? "Dejar una reseña" : "Leave a review"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-0 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold text-primary">
                      {language === "es" ? "Comparte tu experiencia" : "Share your experience"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <StepIndicator />
                    <AnimatePresence mode="wait">
                      {renderFormStep()}
                    </AnimatePresence>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Reviews grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
                      <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div
                              className={`${avatar.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                            >
                              {avatar.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <CardTitle className="text-base text-gray-900 dark:text-white truncate">
                                  {review.name}
                                </CardTitle>
                                {review.verified && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                                    {language === "es" ? "Verificado" : "Verified"}
                                  </Badge>
                                )}
                              </div>
                              {(review.position || review.company) && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  {review.position}{review.position && review.company && " en "}{review.company}
                                </p>
                              )}
                              <div className="flex items-center gap-3 mt-2">
                                <StarRating rating={review.rating} size="h-4 w-4" />
                                <span className="text-xs text-gray-400">
                                  {dateTime.relative}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                            {review.review}
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-primary h-8 px-2"
                              onClick={() => handleHelpfulClick(review.id)}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span className="text-xs">{language === "es" ? "Útil" : "Helpful"} ({review.helpful})</span>
                            </Button>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {dateTime.date}
                            </span>
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
      </div>
    </section>
  )
}

export default Reviews
