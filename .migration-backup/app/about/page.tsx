import Navbar from "@/components/navbar"
import About from "@/components/about"
import Footer from "@/components/footer"

export const metadata = {
  title: "Sobre Mi - Harry Lasso",
  description: "Conoce mas sobre Harry Fishert Lasso Hernandez, estudiante de Ingenieria de Sistemas",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <About />
      </main>
      <Footer />
    </div>
  )
}
