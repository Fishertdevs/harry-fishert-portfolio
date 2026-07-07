

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Plus, Check, Send, User, Briefcase, Building, BadgeCheck, Heart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { reviewsStorage, type Review } from "@/lib/reviews-storage"

const reviewsPerPage = 3

const ReviewsCarousel = () => {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Likes trackeados en localStorage para no repetir
  const [likedIds, setLikedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem("review-likes")
      return new Set(saved ? JSON.parse(saved) : [])
    } catch { return new Set() }
  })

  // Si hay sesión admin activa
  const [isAdmin] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem("adminAuth") === "true"
  )

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    company: "",
    rating: 5,
    review: ""
  })

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async (silent = false) => {
    try {
      if (!silent) setIsLoading(true)
      const allReviews = await reviewsStorage.getAllReviews()
      setReviews(allReviews.filter((r) => r.approved === true))
    } catch (error) {
      console.error("Error loading reviews:", error)
      if (!silent) setReviews([])
    } finally {
      if (!silent) setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= reviewsPerPage) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / reviewsPerPage))
    }, 8000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, reviews.length])

  const handleLike = async (review: Review) => {
    if (likedIds.has(review.id)) return
    try {
      const updated = await reviewsStorage.likeReview(review.id)
      setReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, likes: updated.likes } : r))
      const next = new Set(likedIds).add(review.id)
      setLikedIds(next)
      localStorage.setItem("review-likes", JSON.stringify([...next]))
    } catch (e) {
      console.error("Error liking review:", e)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm(language === "es" ? "¿Eliminar esta reseña?" : "Delete this review?")) return
    try {
      await reviewsStorage.deleteReview(id)
      setReviews((prev) => {
        const next = prev.filter((r) => r.id !== id)
        setCurrentSlide((s) => Math.min(s, Math.max(0, Math.ceil(next.length / reviewsPerPage) - 1)))
        return next
      })
    } catch (e) {
      console.error("Error deleting review:", e)
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await reviewsStorage.addReview({
        name: formData.name,
        email: formData.email,
        position: formData.position,
        company: formData.company,
        rating: formData.rating,
        review: formData.review,
      })

      setSubmitSuccess(true)
      setFormData({ name: "", email: "", position: "", company: "", rating: 5, review: "" })

      loadReviews(true)
        .then(() => setCurrentSlide(0))
        .catch((error) => console.error("Error reloading reviews:", error))

      setTimeout(() => {
        setIsDialogOpen(false)
        setSubmitSuccess(false)
        setCurrentStep(1)
      }, 3000)
    } catch (error) {
      console.error("Error submitting review:", error)
      setSubmitError(
        language === "es"
          ? "No se pudo enviar tu reseña. Por favor, intentá de nuevo."
          : "We couldn't submit your review. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1) }
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1) }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.name.trim().length > 0
      case 2: return true
      case 3: return formData.rating > 0
      case 4: return formData.review.trim().length > 10
      default: return false
    }
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", position: "", company: "", rating: 5, review: "" })
    setCurrentStep(1)
    setSubmitSuccess(false)
    setSubmitError(null)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "Cuéntanos sobre ti" : "Tell us about yourself"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {language === "es" ? "Paso 1 de 4" : "Step 1 of 4"}
              </p>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={language === "es" ? "Tu nombre completo *" : "Your full name *"}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="pl-10 border-gray-200 dark:border-slate-700 focus:border-primary h-12"
              />
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "Información profesional" : "Professional information"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {language === "es" ? "Paso 2 de 4 (Opcional)" : "Step 2 of 4 (Optional)"}
              </p>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={language === "es" ? "Tu cargo o posición" : "Your position or role"}
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="pl-10 border-gray-200 dark:border-slate-700 focus:border-primary h-12"
                />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={language === "es" ? "Nombre de tu empresa" : "Your company name"}
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="pl-10 border-gray-200 dark:border-slate-700 focus:border-primary h-12"
                />
              </div>
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "¿Cómo fue tu experiencia?" : "How was your experience?"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {language === "es" ? "Paso 3 de 4" : "Step 3 of 4"}
              </p>
            </div>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 transition-colors ${
                      star <= formData.rating ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">
              {formData.rating === 5 ? (language === "es" ? "¡Excelente!" : "Excellent!") :
               formData.rating === 4 ? (language === "es" ? "Muy bueno" : "Very good") :
               formData.rating === 3 ? (language === "es" ? "Bueno" : "Good") :
               formData.rating === 2 ? (language === "es" ? "Regular" : "Fair") :
               (language === "es" ? "Mejorable" : "Needs improvement")}
            </p>
          </motion.div>
        )
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "Tu reseña" : "Your review"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {language === "es" ? "Paso 4 de 4" : "Step 4 of 4"}
              </p>
            </div>
            <Textarea
              placeholder={language === "es"
                ? "Comparte tu experiencia trabajando con Harry... (mínimo 10 caracteres)"
                : "Share your experience working with Harry... (minimum 10 characters)"}
              value={formData.review}
              onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
              rows={5}
              className="border-gray-200 dark:border-slate-700 focus:border-primary resize-none"
            />
            {submitError && (
              <p className="text-sm text-red-500 text-center">{submitError}</p>
            )}
          </motion.div>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-slate-400">
            {language === "es" ? "Cargando reseñas..." : "Loading reviews..."}
          </p>
        </div>
      </section>
    )
  }

  const totalPages = Math.max(1, Math.ceil(reviews.length / reviewsPerPage))
  const visibleReviews = reviews.slice(
    currentSlide * reviewsPerPage,
    currentSlide * reviewsPerPage + reviewsPerPage
  )

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {language === "es" ? "Lo que dicen de mí" : "What people say"}
          </h2>
          <div className="h-1 w-12 md:w-16 bg-primary mx-auto rounded-full mt-2 md:mt-4"></div>
          <p className="text-gray-600 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base mt-3">
            {language === "es"
              ? "Opiniones reales de clientes y colaboradores"
              : "Real opinions from clients and collaborators"}
          </p>
        </motion.div>

        {reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-slate-400">
            <p className="text-base">{language === "es" ? "Sé el primero en dejar una reseña" : "Be the first to leave a review"}</p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {visibleReviews.map((review, i) => (
                  <div
                    key={review.id ?? `${currentSlide}-${i}`}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-100 dark:border-slate-700/60 p-4 sm:p-5 text-left flex flex-col"
                  >
                    {/* Header: avatar + name + stars */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-base sm:text-lg font-bold shrink-0">
                          {review?.name?.trim()?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                              {review?.name}
                            </h3>
                            <BadgeCheck className="w-4 h-4 text-primary fill-primary/15 shrink-0" />
                          </div>
                          <p className="text-gray-400 dark:text-slate-500 text-[10px] sm:text-xs uppercase tracking-wide truncate">
                            {review?.position && review?.company
                              ? `${review.position} en ${review.company}`
                              : review?.company || review?.position || (language === "es" ? "Usuario verificado" : "Verified user")}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 shrink-0 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              star <= (review?.rating || 5)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-300 dark:text-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-4 flex-1 mb-3">
                      {review?.review}
                    </p>

                    {/* Footer: like + delete */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700/60">
                      {/* Like button */}
                      <button
                        onClick={() => handleLike(review)}
                        disabled={likedIds.has(review.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-200 rounded-lg px-2 py-1 
                          ${likedIds.has(review.id)
                            ? "text-rose-500 bg-rose-50 dark:bg-rose-500/10 cursor-default"
                            : "text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 cursor-pointer"
                          }`}
                        title={language === "es" ? "Me gusta" : "Like"}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-all ${likedIds.has(review.id) ? "fill-rose-500" : ""}`}
                        />
                        <span>{review.likes ?? 0}</span>
                      </button>

                      {/* Delete — solo admin */}
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg px-2 py-1 transition-all duration-200"
                          title={language === "es" ? "Eliminar reseña" : "Delete review"}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5 mt-6 justify-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => { setCurrentSlide(index); setIsAutoPlaying(false) }}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === currentSlide
                        ? "w-6 md:w-8 bg-primary"
                        : "w-1.5 md:w-2 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Review Button + Dialog */}
        <div className="text-center mt-8">
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm() }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                <Plus className="h-4 w-4" />
                {language === "es" ? "Dejar una reseña" : "Leave a review"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-center gradient-text text-lg">
                  {language === "es" ? "Comparte tu experiencia" : "Share your experience"}
                </DialogTitle>
              </DialogHeader>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {language === "es" ? "¡Gracias por tu reseña!" : "Thanks for your review!"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {language === "es" ? "Tu opinión ya está publicada." : "Your review has been published."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Step progress bar */}
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < currentStep ? "bg-primary" : "bg-gray-200 dark:bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {renderStepContent()}
                  </AnimatePresence>

                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-200 dark:border-slate-700">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                      {language === "es" ? "Anterior" : "Previous"}
                    </Button>

                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        {language === "es" ? "Siguiente" : "Next"}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 text-white gap-2"
                        disabled={isSubmitting || !canProceed()}
                      >
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            {language === "es" ? "Enviar" : "Submit"}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

export default ReviewsCarousel
