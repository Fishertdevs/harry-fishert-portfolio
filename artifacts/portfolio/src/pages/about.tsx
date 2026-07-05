import Navbar from "@/components/navbar"
import About from "@/components/about"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <main className="pt-16">
        <About />
      </main>
      <Footer />
    </div>
  )
}
