"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Plus, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { reviewsStorage, type Review } from "@/lib/reviews-storage"

const ReviewsCarousel = () => {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  // Form state
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

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

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

  const textVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {language === "es" ? "Cargando resenas..." : "Loading reviews..."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Decorative elements with portfolio colors */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-r-full blur-2xl" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-l from-primary/10 to-transparent rounded-l-full blur-2xl" />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {language === "es" ? "Resenas" : "Reviews"}
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        {reviews.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {language === "es" ? "Aun no hay resenas disponibles. Se el primero en dejar una!" : "No reviews available yet. Be the first to leave one!"}
            </p>
          </div>
        ) : (
          /* Carousel Container */
          <div className="max-w-4xl mx-auto relative mb-12">
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 rounded-full bg-white dark:bg-gray-900 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 rounded-full bg-white dark:bg-gray-900 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
              aria-label="Next review"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </Button>

            {/* Review Content */}
            <div className="min-h-[280px] flex items-center justify-center px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-center"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          star <= reviews[currentSlide].rating
                            ? "text-primary fill-primary"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium mb-8 leading-relaxed max-w-3xl mx-auto">
                    &ldquo;{reviews[currentSlide].review}&rdquo;
                  </p>

                  {/* Reviewer Info */}
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">
                      {reviews[currentSlide].name}
                    </p>
                    <p className="text-primary text-sm font-medium">
                      {reviews[currentSlide].position && reviews[currentSlide].company
                        ? `${reviews[currentSlide].position} - ${reviews[currentSlide].company}`
                        : reviews[currentSlide].company || reviews[currentSlide].position || ""}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index 
                      ? "w-8 h-3 bg-primary" 
                      : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Add Review Button and Dialog */}
        <div className="text-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                <Plus className="h-4 w-4" />
                {language === "es" ? "Dejar una resena" : "Leave a review"}
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
                    {language === "es" ? "Gracias por tu resena!" : "Thanks for your review!"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {language === "es" ? "Tu resena sera revisada y publicada pronto." : "Your review will be reviewed and published soon."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating Stars */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {language === "es" ? "Calificacion" : "Rating"}
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
                    placeholder={language === "es" ? "Escribe tu resena aqui... *" : "Write your review here... *"}
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
                        {language === "es" ? "Enviar resena" : "Submit review"}
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
