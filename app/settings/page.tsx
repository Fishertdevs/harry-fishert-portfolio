import Navbar from "@/components/navbar"
import Settings from "@/components/settings"
import Footer from "@/components/footer"

export const metadata = {
  title: "Ajustes - Harry Lasso",
  description: "Configuracion y ajustes del portfolio",
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Settings />
      </main>
      <Footer />
    </div>
  )
}
