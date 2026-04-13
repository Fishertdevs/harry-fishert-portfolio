"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { reviewsStorage, type Review } from "@/lib/reviews-storage"

const ReviewsCarousel = () => {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const textVariants = {
    enter: {
      opacity: 0,
      y: 30
    },
    center: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -30
    }
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
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

  if (reviews.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {language === "es" ? "Resenas" : "Reviews"}
            </h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto"></div>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400">
            {language === "es" ? "Aun no hay resenas disponibles." : "No reviews available yet."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-r from-orange-100/50 to-transparent dark:from-orange-900/20 rounded-r-full blur-2xl" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 bg-gradient-to-l from-yellow-100/50 to-transparent dark:from-yellow-900/20 rounded-l-full blur-2xl" />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {language === "es" ? "Resenas" : "Reviews"}
          </h2>
          <div className="h-1 w-20 bg-emerald-500 mx-auto"></div>
        </motion.div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800"
            aria-label="Next review"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Review Content */}
          <div className="min-h-[300px] flex items-center justify-center px-8">
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
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium mb-8 leading-relaxed max-w-3xl mx-auto">
                  "{reviews[currentSlide].review}"
                </p>

                {/* Reviewer Info */}
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-lg">
                    {reviews[currentSlide].name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
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
                    ? "w-8 h-3 bg-emerald-500" 
                    : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewsCarousel
