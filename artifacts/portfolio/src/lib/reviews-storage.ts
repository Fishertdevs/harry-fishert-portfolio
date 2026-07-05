// Sistema de reseñas respaldado por la base de datos (vía API)
export interface Review {
  id: number
  name: string
  email?: string
  company?: string
  position?: string
  rating: number
  review: string
  date?: string
  approved?: boolean
}

const isBrowser = typeof window !== "undefined"

const getApiBase = (): string => {
  const base = (import.meta as any).env?.BASE_URL || "/"
  return `${base}${base.endsWith("/") ? "" : "/"}api/`
}

class ReviewsStorage {
  private static instance: ReviewsStorage

  private constructor() {}

  public static getInstance(): ReviewsStorage {
    if (!ReviewsStorage.instance) {
      ReviewsStorage.instance = new ReviewsStorage()
    }
    return ReviewsStorage.instance
  }

  public async getAllReviews(): Promise<Review[]> {
    if (!isBrowser) return []
    try {
      const res = await fetch(`${getApiBase()}reviews`)
      if (!res.ok) throw new Error(`Failed to load reviews: ${res.status}`)
      const data = await res.json()
      return data.map((r: any) => ({
        id: r.id,
        name: r.name,
        email: r.email ?? undefined,
        company: r.company ?? undefined,
        position: r.position ?? undefined,
        rating: r.rating,
        review: r.review,
        date: r.createdAt,
        approved: r.approved,
      }))
    } catch (error) {
      console.error("Error loading reviews:", error)
      return []
    }
  }

  public async addReview(
    reviewData: Omit<Review, "id" | "date" | "approved">
  ): Promise<Review> {
    const res = await fetch(`${getApiBase()}reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: reviewData.name,
        email: reviewData.email || undefined,
        position: reviewData.position || undefined,
        company: reviewData.company || undefined,
        rating: reviewData.rating,
        review: reviewData.review,
        approved: true,
      }),
    })

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}))
      throw new Error(errBody?.error ? JSON.stringify(errBody.error) : "No se pudo enviar la reseña")
    }

    const created = await res.json()
    return {
      id: created.id,
      name: created.name,
      email: created.email ?? undefined,
      company: created.company ?? undefined,
      position: created.position ?? undefined,
      rating: created.rating,
      review: created.review,
      date: created.createdAt,
      approved: created.approved,
    }
  }
}

export const reviewsStorage = ReviewsStorage.getInstance()
