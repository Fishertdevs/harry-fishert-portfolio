"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Plus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { reviewsStorage, type Review } from "@/lib/reviews-storage"

// Generate avatar with initials
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

const ReviewsCarousel = () => {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
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
      setReviews(allReviews)
    } catch (error) {
      console.error("Error loading reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isAutoPlaying || reviews.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length)
    }, 6000)

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
      }, 2000)
      
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
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
  const avatar = currentReview ? generateAvatar(currentReview.name) : null

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
            {language === "es" ? "Reseñas" : "Reviews"}
          </h2>
          <div className="h-1 w-12 md:w-20 bg-primary mx-auto"></div>
        </motion.div>

        {reviews.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {language === "es" ? "Aún no hay reseñas disponibles. ¡Sé el primero en dejar una!" : "No reviews available yet. Be the first to leave one!"}
            </p>
          </div>
        ) : (
          /* Main content - Avatar LEFT, Text RIGHT (like professional profile) */
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center">
              
              {/* Avatar - LEFT side */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className={`w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-xl md:rounded-2xl ${avatar?.color} shadow-xl flex items-center justify-center`}
                  >
                    <span className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                      {avatar?.initials}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Text Content - RIGHT side with Carousel */}
              <motion.div
                className="flex flex-col justify-center items-center text-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
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
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 text-center">
                      {currentReview?.name}
                    </h3>

                    {/* Position & Company */}
                    <p className="text-primary font-medium mb-1 md:mb-2 text-center text-xs sm:text-sm md:text-base">
                      {currentReview?.position && currentReview?.company
                        ? `${currentReview.position} - ${currentReview.company}`
                        : currentReview?.company || currentReview?.position || ""}
                    </p>

                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-3 md:mb-4">
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

                    {/* Review Text */}
                    <div className="relative min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base text-center italic">
                        &ldquo;{currentReview?.review}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress bar indicator */}
                <div className="flex items-center gap-1.5 mt-3 md:mt-6 justify-center">
                  {reviews.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        index === currentSlide
                          ? "w-6 md:w-8 bg-primary"
                          : "w-1.5 md:w-2 bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Add Review Button and Dialog */}
        <div className="text-center mt-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                <Plus className="h-4 w-4" />
                {language === "es" ? "Dejar una reseña" : "Leave a review"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center gradient-text">
                  {language === "es" ? "Comparte tu experiencia" : "Share your experience"}
                </DialogTitle>
              </DialogHeader>
              
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {language === "es" ? "¡Gracias por tu reseña!" : "Thanks for your review!"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {language === "es" ? "Tu reseña será revisada y publicada pronto." : "Your review will be reviewed and published soon."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating Stars */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {language === "es" ? "Calificación" : "Rating"}
                    </p>
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= formData.rating
                                ? "text-primary fill-primary"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder={language === "es" ? "Tu nombre *" : "Your name *"}
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="border-gray-200 dark:border-gray-700 focus:border-primary"
                    />
                    <Input
                      type="email"
                      placeholder={language === "es" ? "Tu email *" : "Your email *"}
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="border-gray-200 dark:border-gray-700 focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder={language === "es" ? "Tu cargo" : "Your position"}
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      className="border-gray-200 dark:border-gray-700 focus:border-primary"
                    />
                    <Input
                      placeholder={language === "es" ? "Tu empresa" : "Your company"}
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="border-gray-200 dark:border-gray-700 focus:border-primary"
                    />
                  </div>

                  <Textarea
                    placeholder={language === "es" ? "Escribe tu reseña aquí... *" : "Write your review here... *"}
                    value={formData.review}
                    onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
                    required
                    rows={4}
                    className="border-gray-200 dark:border-gray-700 focus:border-primary resize-none"
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {language === "es" ? "Enviar reseña" : "Submit review"}
                      </>
                    )}
                  </Button>
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
