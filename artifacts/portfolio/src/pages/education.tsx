import Navbar from "@/components/navbar"
import Education from "@/components/education"
import Footer from "@/components/footer"

export default function EducationPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <main className="pt-16">
        <Education />
      </main>
      <Footer />
    </div>
  )
}
