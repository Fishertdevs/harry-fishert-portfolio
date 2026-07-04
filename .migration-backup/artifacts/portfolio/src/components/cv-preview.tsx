"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Actualizar el componente CVPreview con la nueva imagen y link
const CVPreview = ({ onDownload }: { onDownload: (format: string) => void }) => {
  return (
    <div className="cv-preview bg-white p-8 max-w-4xl mx-auto">
      {/* Mostrar la nueva imagen del CV actualizado */}
      <div className="flex justify-center mb-6">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1754268268493.jpg-WmFCtVEDSCEIJSqnfjjvPIsVdv8m6g.jpeg"
          alt="CV actualizado de Harry Fishert Lasso Hernández - Desarrollador Full-Stack"
          className="w-full max-w-3xl shadow-lg rounded-md"
        />
      </div>

      {/* Botón para ver en Google Drive con el nuevo link */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 mb-4">Para una mejor visualización, acceda al documento completo.</p>
        <div className="flex justify-center">
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1AkywFwEI7V0WQwshUHyGuJmnydpFcXNW/view?usp=drivesdk",
                "_blank",
              )
            }
          >
            <ExternalLink className="h-4 w-4" />
            Ver en Google Drive
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CVPreview
