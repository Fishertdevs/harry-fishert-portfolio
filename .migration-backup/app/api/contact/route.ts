import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, subject, message } = data

    // Validación básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Aquí normalmente enviarías un email usando un servicio como SendGrid, Mailgun, etc.
    // Por ahora, simulamos un envío exitoso

    // Simulamos un pequeño retraso para que parezca que está procesando
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" }, { status: 200 })
  } catch (error) {
    console.error("Error al enviar el mensaje:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
