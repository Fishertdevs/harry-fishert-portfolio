import Navbar from "@/components/navbar"
import Reviews from "@/components/reviews"
import Footer from "@/components/footer"

export const metadata = {
  title: "Resenas - Harry Lasso",
  description: "Opiniones y resenas de clientes y colaboradores",
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Reviews />
      </main>
      <Footer />
    </div>
  )
}
