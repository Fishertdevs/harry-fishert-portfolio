import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export const metadata = {
  title: "Contacto - Harry Lasso",
  description: "Ponte en contacto conmigo para proyectos o colaboraciones",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
