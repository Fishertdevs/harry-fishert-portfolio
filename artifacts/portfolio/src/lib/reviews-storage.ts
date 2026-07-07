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
  likes?: number
}

const isBrowser = typeof window !== "undefined"

const getApiBase = (): string => {
  const base = (import.meta as any).env?.BASE_URL || "/"
  return `${base}${base.endsWith("/") ? "" : "/"}api/`
}

const mapRow = (r: any): Review => ({
  id: r.id,
  name: r.name,
  email: r.email ?? undefined,
  company: r.company ?? undefined,
  position: r.position ?? undefined,
  rating: r.rating,
  review: r.review,
  date: r.createdAt,
  approved: r.approved,
  likes: r.likes ?? 0,
})

class ReviewsStorage {
  private static instance: ReviewsStorage

  private constructor() {}

  public static getInstance(): ReviewsStorage {
    if (!ReviewsStorage.instance) {
      ReviewsStorage.instance = new ReviewsStorage()
    }
    return ReviewsStorage.instance
  }

  /** Reseñas aprobadas — para el carrusel público */
  public async getAllReviews(): Promise<Review[]> {
    if (!isBrowser) return []
    try {
      const res = await fetch(`${getApiBase()}reviews`)
      if (!res.ok) throw new Error(`Failed to load reviews: ${res.status}`)
      return (await res.json()).map(mapRow)
    } catch (error) {
      console.error("Error loading reviews:", error)
      return []
    }
  }

  /** Todas las reseñas (incluidas las ocultas) — para el panel admin */
  public async getAllReviewsAdmin(): Promise<Review[]> {
    if (!isBrowser) return []
    try {
      const res = await fetch(`${getApiBase()}reviews?admin=1`)
      if (!res.ok) throw new Error(`Failed to load admin reviews: ${res.status}`)
      return (await res.json()).map(mapRow)
    } catch (error) {
      console.error("Error loading admin reviews:", error)
      return []
    }
  }

  /** Crear nueva reseña */
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

    return mapRow(await res.json())
  }

  /** Actualizar campos de una reseña */
  public async updateReview(
    id: number,
    data: Partial<Pick<Review, "name" | "email" | "position" | "company" | "rating" | "review">>
  ): Promise<Review> {
    const res = await fetch(`${getApiBase()}reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}))
      throw new Error(errBody?.error ? JSON.stringify(errBody.error) : "No se pudo actualizar la reseña")
    }

    return mapRow(await res.json())
  }

  /** Eliminar una reseña */
  public async deleteReview(id: number): Promise<void> {
    const res = await fetch(`${getApiBase()}reviews/${id}`, {
      method: "DELETE",
    })

    if (!res.ok && res.status !== 204) {
      const errBody = await res.json().catch(() => ({}))
      throw new Error(errBody?.error ? JSON.stringify(errBody.error) : "No se pudo eliminar la reseña")
    }
  }

  /** Incrementar likes de una reseña */
  public async likeReview(id: number): Promise<Review> {
    const res = await fetch(`${getApiBase()}reviews/${id}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}))
      throw new Error(errBody?.error ? JSON.stringify(errBody.error) : "No se pudo registrar el like")
    }

    return mapRow(await res.json())
  }

  /** Aprobar u ocultar una reseña */
  public async setApproved(id: number, approved: boolean): Promise<Review> {
    const res = await fetch(`${getApiBase()}reviews/${id}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    })

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}))
      throw new Error(errBody?.error ? JSON.stringify(errBody.error) : "No se pudo cambiar el estado")
    }

    return mapRow(await res.json())
  }
}

export const reviewsStorage = ReviewsStorage.getInstance()
