import Navbar from "@/components/navbar"
import Projects from "@/components/projects"
import Footer from "@/components/footer"

export const metadata = {
  title: "Proyectos - Harry Lasso",
  description: "Mis proyectos de desarrollo web y aplicaciones",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Projects />
      </main>
      <Footer />
    </div>
  )
}
