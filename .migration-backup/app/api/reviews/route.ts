import { NextResponse } from "next/server"

// Simulamos una base de datos en memoria (en producción usarías una DB real)
const reviewsDatabase: any[] = []

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      reviews: reviewsDatabase,
      total: reviewsDatabase.length,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Error al obtener las reseñas" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const reviewData = await request.json()

    // Validación básica
    if (!reviewData.name || !reviewData.review || !reviewData.rating) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
    }

    // Crear nueva reseña con timestamp
    const newReview = {
      ...reviewData,
      id: Date.now() + Math.random(),
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0].slice(0, 5),
      helpful: 0,
      verified: Math.random() > 0.7,
      createdAt: new Date().toISOString(),
    }

    // Agregar a la "base de datos"
    reviewsDatabase.unshift(newReview)

    // Simular un pequeño retraso
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      review: newReview,
      message: "Reseña guardada correctamente",
    })
  } catch (error) {
    console.error("Error saving review:", error)
    return NextResponse.json({ error: "Error al guardar la reseña" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { reviewId, action } = await request.json()

    if (action === "helpful") {
      const review = reviewsDatabase.find((r) => r.id === reviewId)
      if (review) {
        review.helpful = (review.helpful || 0) + 1
        return NextResponse.json({
          success: true,
          message: "Reseña marcada como útil",
        })
      }
    }

    return NextResponse.json({ error: "Reseña no encontrada" }, { status: 404 })
  } catch (error) {
    console.error("Error updating review:", error)
    return NextResponse.json({ error: "Error al actualizar la reseña" }, { status: 500 })
  }
}
