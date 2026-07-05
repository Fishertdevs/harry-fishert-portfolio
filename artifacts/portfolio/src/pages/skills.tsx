import Navbar from "@/components/navbar"
import Skills from "@/components/skills"
import Footer from "@/components/footer"

export default function SkillsPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <main className="pt-16">
        <Skills />
      </main>
      <Footer />
    </div>
  )
}
