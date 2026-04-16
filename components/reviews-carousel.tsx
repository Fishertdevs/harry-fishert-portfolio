"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Plus, Check, Send, User, Briefcase, Building, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { reviewsStorage, type Review } from "@/lib/reviews-storage"

// Default simulated review
const defaultReview: Review = {
  id: "default-1",
  name: "María González",
  email: "maria@example.com",
  position: "CEO",
  company: "TechStartup",
  rating: 5,
  review: "Trabajar con Harry fue una experiencia increíble. Su profesionalismo, atención al detalle y capacidad para entender nuestras necesidades superaron todas nuestras expectativas. El proyecto se entregó a tiempo y con una calidad excepcional. Definitivamente lo recomiendo para cualquier proyecto de desarrollo web.",
  date: "2026-03-15",
  approved: true
}

const ReviewsCarousel = () => {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
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

  const loadReviews = async () => {
    try {
      setIsLoading(true)
      const allReviews = await reviewsStorage.getAllReviews()
      // Add default review if no reviews exist
      if (allReviews.length === 0) {
        setReviews([defaultReview])
      } else {
        setReviews([defaultReview, ...allReviews])
      }
    } catch (error) {
      console.error("Error loading reviews:", error)
      setReviews([defaultReview])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isAutoPlaying || reviews.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, reviews.length])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await reviewsStorage.addReview({
        name: formData.name,
        email: formData.email,
        position: formData.position,
        company: formData.company,
        rating: formData.rating,
        review: formData.review,
        date: new Date().toISOString().split('T')[0],
        approved: false
      })
      
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        position: "",
        company: "",
        rating: 5,
        review: ""
      })
      
      setTimeout(() => {
        setIsDialogOpen(false)
        setSubmitSuccess(false)
        setCurrentStep(1)
      }, 2000)
      
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== ""
      case 2:
        return true // Position and company are optional
      case 3:
        return formData.rating > 0
      case 4:
        return formData.review.trim().length >= 10
      default:
        return false
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setFormData({
      name: "",
      email: "",
      position: "",
      company: "",
      rating: 5,
      review: ""
    })
    setSubmitSuccess(false)
  }

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {language === "es" ? "Cargando reseñas..." : "Loading reviews..."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const currentReview = reviews[currentSlide]

  // Step content for multi-step form
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
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "Cuéntanos sobre ti" : "Tell us about yourself"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === "es" ? "Paso 1 de 4" : "Step 1 of 4"}
              </p>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={language === "es" ? "Tu nombre completo *" : "Your full name *"}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="pl-10 border-gray-200 dark:border-gray-700 focus:border-primary h-12"
                />
              </div>
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
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "Información profesional" : "Professional information"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
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
                  className="pl-10 border-gray-200 dark:border-gray-700 focus:border-primary h-12"
                />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={language === "es" ? "Nombre de tu empresa" : "Your company name"}
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="pl-10 border-gray-200 dark:border-gray-700 focus:border-primary h-12"
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
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "¿Cómo fue tu experiencia?" : "How was your experience?"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === "es" ? "Paso 3 de 4" : "Step 3 of 4"}
              </p>
            </div>
            <div className="flex justify-center gap-2 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="p-2 hover:scale-125 transition-all duration-200"
                >
                  <Star
                    className={`h-10 w-10 transition-colors ${
                      star <= formData.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {formData.rating === 5 && (language === "es" ? "¡Excelente!" : "Excellent!")}
              {formData.rating === 4 && (language === "es" ? "Muy bueno" : "Very good")}
              {formData.rating === 3 && (language === "es" ? "Bueno" : "Good")}
              {formData.rating === 2 && (language === "es" ? "Regular" : "Fair")}
              {formData.rating === 1 && (language === "es" ? "Necesita mejorar" : "Needs improvement")}
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
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {language === "es" ? "Comparte tu opinión" : "Share your thoughts"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === "es" ? "Paso 4 de 4" : "Step 4 of 4"}
              </p>
            </div>
            <Textarea
              placeholder={language === "es" 
                ? "Cuéntanos tu experiencia trabajando conmigo. ¿Qué te gustó? ¿Qué podría mejorar? Tu opinión es muy valiosa..." 
                : "Tell us about your experience working with me. What did you like? What could be improved? Your opinion is very valuable..."}
              value={formData.review}
              onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
              required
              rows={5}
              className="border-gray-200 dark:border-gray-700 focus:border-primary resize-none"
            />
            <p className="text-xs text-gray-400 text-right">
              {formData.review.length} / {language === "es" ? "mínimo 10 caracteres" : "minimum 10 characters"}
            </p>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-white">
            {language === "es" ? "Clientes y resultados" : "Clients and results"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-3">
            {language === "es" 
              ? "Proyectos desarrollados en entornos productivos para quienes han confiado en mi trabajo"
              : "Projects developed in production environments for those who have trusted my work"}
          </p>
          <div className="h-1 w-12 md:w-20 bg-primary mx-auto"></div>
        </motion.div>

        {/* Reviews Content - Text style like professional profile */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Name */}
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {currentReview?.name}
              </h3>

              {/* Position & Company */}
              <p className="text-primary font-medium mb-2 md:mb-3 text-xs sm:text-sm md:text-base">
                {currentReview?.position && currentReview?.company
                  ? `${currentReview.position} - ${currentReview.company}`
                  : currentReview?.company || currentReview?.position || ""}
              </p>

              {/* Role badge style */}
              <div className="flex justify-center gap-1 mb-4 md:mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      star <= (currentReview?.rating || 5)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text - styled like the about description */}
              <div className="relative min-h-[100px] sm:min-h-[120px] md:min-h-[140px]">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto">
                  &ldquo;{currentReview?.review}&rdquo;
                </p>
              </div>

              {/* Progress bar indicator */}
              <div className="flex items-center gap-1.5 mt-6 md:mt-8 justify-center">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === currentSlide
                        ? "w-6 md:w-8 bg-primary"
                        : "w-1.5 md:w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Add Review Button and Dialog */}
        <div className="text-center mt-8">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                <Plus className="h-4 w-4" />
                {language === "es" ? "Dejar una reseña" : "Leave a review"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center gradient-text text-xl">
                  {language === "es" ? "Comparte tu experiencia" : "Share your experience"}
                </DialogTitle>
              </DialogHeader>
              
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {language === "es" ? "¡Gracias por tu reseña!" : "Thanks for your review!"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {language === "es" ? "Tu reseña será revisada y publicada pronto." : "Your review will be reviewed and published soon."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReview}>
                  {/* Progress indicator */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            step < currentStep
                              ? "bg-primary text-white"
                              : step === currentStep
                              ? "bg-primary text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {step < currentStep ? <Check className="w-4 h-4" /> : step}
                        </div>
                        {step < 4 && (
                          <div
                            className={`flex-1 h-1 mx-2 rounded transition-colors ${
                              step < currentStep ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step content */}
                  <AnimatePresence mode="wait">
                    {renderStepContent()}
                  </AnimatePresence>

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
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
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
