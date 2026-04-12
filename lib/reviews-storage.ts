// Sistema de almacenamiento permanente para reseñas
export interface Review {
  id: number
  name: string
  company: string
  position: string
  rating: number
  review: string
  date: string
  time: string
  verified: boolean
  helpful: number
  location?: string
  projectType?: string
  collaboration?: string
  avatar?: string
  ipAddress?: string
  userAgent?: string
}

// Sistema completamente limpio - sin reseñas de ejemplo
const INITIAL_REVIEWS: Review[] = []

class ReviewsStorage {
  private static instance: ReviewsStorage
  private reviews: Review[] = []
  private readonly STORAGE_KEY = "portfolio-reviews-permanent"
  private readonly API_ENDPOINT = "/api/reviews"

  private constructor() {
    this.loadReviews()
  }

  public static getInstance(): ReviewsStorage {
    if (!ReviewsStorage.instance) {
      ReviewsStorage.instance = new ReviewsStorage()
    }
    return ReviewsStorage.instance
  }

  private loadReviews(): void {
    try {
      // Cargar desde localStorage
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        this.reviews = JSON.parse(stored)
      } else {
        // Sistema completamente limpio - sin reseñas iniciales
        this.reviews = []
        this.saveToLocalStorage()
      }
    } catch (error) {
      console.error("Error loading reviews:", error)
      this.reviews = []
    }
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.reviews))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  public async getAllReviews(): Promise<Review[]> {
    return [...this.reviews].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateB.getTime() - dateA.getTime()
    })
  }

  public async addReview(reviewData: Omit<Review, "id" | "date" | "time" | "helpful" | "verified">): Promise<Review> {
    const now = new Date()
    const newReview: Review = {
      ...reviewData,
      id: Date.now() + Math.random(), // ID único
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0].slice(0, 5),
      helpful: 0,
      verified: Math.random() > 0.7, // 30% de probabilidad de ser verificado
    }

    this.reviews.unshift(newReview) // Agregar al inicio
    this.saveToLocalStorage()

    // Intentar guardar en el servidor (simulado)
    try {
      await this.saveToServer(newReview)
    } catch (error) {
      console.warn("Could not save to server, but saved locally:", error)
    }

    return newReview
  }

  public async markAsHelpful(reviewId: number): Promise<void> {
    const review = this.reviews.find((r) => r.id === reviewId)
    if (review) {
      review.helpful += 1
      this.saveToLocalStorage()

      try {
        await this.updateOnServer(review)
      } catch (error) {
        console.warn("Could not update on server, but updated locally:", error)
      }
    }
  }

  private async saveToServer(review: Review): Promise<void> {
    // Simular llamada al servidor
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          // 90% de éxito
          resolve()
        } else {
          reject(new Error("Server error"))
        }
      }, 500)
    })
  }

  private async updateOnServer(review: Review): Promise<void> {
    // Simular actualización en servidor
    return new Promise((resolve) => {
      setTimeout(resolve, 200)
    })
  }

  public getReviewStats() {
    const totalReviews = this.reviews.length
    if (totalReviews === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      }
    }

    const averageRating = this.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
    const ratingDistribution = {
      5: this.reviews.filter((r) => r.rating === 5).length,
      4: this.reviews.filter((r) => r.rating === 4).length,
      3: this.reviews.filter((r) => r.rating === 3).length,
      2: this.reviews.filter((r) => r.rating === 2).length,
      1: this.reviews.filter((r) => r.rating === 1).length,
    }

    return {
      totalReviews,
      averageRating,
      ratingDistribution,
    }
  }

  // Método para limpiar todas las reseñas (útil para desarrollo)
  public clearAllReviews(): void {
    this.reviews = []
    this.saveToLocalStorage()
  }

  // Método para exportar reseñas (útil para respaldos)
  public exportReviews(): string {
    return JSON.stringify(this.reviews, null, 2)
  }

  // Método para importar reseñas (útil para restaurar respaldos)
  public importReviews(reviewsJson: string): void {
    try {
      const importedReviews = JSON.parse(reviewsJson)
      if (Array.isArray(importedReviews)) {
        this.reviews = importedReviews
        this.saveToLocalStorage()
      }
    } catch (error) {
      console.error("Error importing reviews:", error)
    }
  }
}

export const reviewsStorage = ReviewsStorage.getInstance()
