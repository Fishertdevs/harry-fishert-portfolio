import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import AnimationObserver from "@/components/animation-observer"
import NavigationDots from "@/components/navigation-dots"
import SectionNavigation from "@/components/section-navigation"
import Reviews from "@/components/reviews"
// Importar el componente Settings
import Settings from "@/components/settings"

// Actualizar la función Home para incluir el componente Settings
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AnimationObserver>
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Reviews />
          <Contact />
          <Settings />
        </main>
      </AnimationObserver>
      <Footer />
      <ScrollToTop />
      <NavigationDots />
      <SectionNavigation />
    </div>
  )
}
