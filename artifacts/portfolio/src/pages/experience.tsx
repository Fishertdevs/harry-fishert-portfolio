import Navbar from "@/components/navbar"
import Experience from "@/components/experience"
import Footer from "@/components/footer"

export default function ExperiencePage() {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <main className="pt-16">
        <Experience />
      </main>
      <Footer />
    </div>
  )
}
