import Navbar from "@/components/navbar"
import Skills from "@/components/skills"
import Footer from "@/components/footer"

export const metadata = {
  title: "Habilidades - Harry Lasso",
  description: "Conoce las habilidades tecnicas y tecnologias que domino",
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Skills />
      </main>
      <Footer />
    </div>
  )
}
