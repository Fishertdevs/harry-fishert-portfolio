"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Github,
  Code,
  LineChart,
  Bot,
  Server,
  Layers,
  Database,
  Globe,
  Star,
  Stars,
  Sparkles,
  Eye,
  ExternalLink,
  Braces,
  Briefcase,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

const Projects = () => {
  const { t } = useLanguage()
  const [mainCategory, setMainCategory] = useState("all")
  const [difficulty, setDifficulty] = useState("all")
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const [showDifficultyTabs, setShowDifficultyTabs] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Proyectos de Python organizados por dificultad
  const pythonProjects = {
    basic: [
      {
        id: 1,
        title: t("dataAnalysisBasicTitle"),
        description: t("dataAnalysisBasicDesc"),
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NChFJXz1hDFL6zNHyP7FNFcdAYwdNR.png",
        previewImages: ["/images/analisis-datos-ejecucion.png"],
        tags: ["python", "pandas", "matplotlib", "tkinter", "csv"],
        category: "python",
        difficulty: "basic",
        github: "https://github.com/Fishertdevs/Analisis_de_datos.git",
        demo: "https://drive.google.com/file/d/1ZFKzp6S_nI0Xl3VuMmSIf7D-nlT_5ZnQ/view?usp=sharing",
        icon: <LineChart className="h-10 w-10 text-primary" />,
      },
      {
        id: 2,
        title: t("notesAppTitle"),
        description: t("notesAppDesc"),
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Z9qBNyMIYGXdcHjcSCZEf6ZfFYDhno.png",
        previewImages: ["/images/notas-ejecucion.png"],
        tags: ["python", "pyqt5", "gui", "notas", "excel"],
        category: "python",
        difficulty: "basic",
        github: "https://github.com/Fishertdevs/Notes_App.git",
        demo: "https://drive.google.com/file/d/1UTc6tv8_rJrAFhl2CDakDAH6bMh7O-4O/view?usp=sharing",
        icon: <Code className="h-10 w-10 text-primary" />,
      },
    ],
    intermediate: [
      {
        id: 3,
        title: t("fileControlPanelTitle"),
        description: t("fileControlPanelDesc"),
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OzfIeGJZvMkprDtUrVgDmJDl2K4Pjs.png",
        previewImages: ["/images/panel-control-ejecucion.png"],
        tags: ["python", "streamlit", "plotly", "data-visualization", "file-analysis"],
        category: "python",
        difficulty: "intermediate",
        github: "https://github.com/Fishertdevs/Panel_de_Control.git",
        demo: "https://drive.google.com/file/d/1xAxVh5dvUOf9dj3rks5E5sZy99m0MZP9/view?usp=sharing",
        icon: <Layers className="h-10 w-10 text-primary" />,
      },
      {
        id: 4,
        title: t("advancedCurvesTitle"),
        description: t("advancedCurvesDesc"),
        image: "/images/curvas-avanzadas-main.png",
        previewImages: ["/images/curvas-avanzadas-ejecucion.png"],
        tags: ["python", "matemáticas", "visualización", "curvas", "análisis"],
        category: "python",
        difficulty: "intermediate",
        github: "https://github.com/Fishertdevs/Curvas_Avanzadas.git",
        demo: "#",
        icon: <LineChart className="h-10 w-10 text-primary" />,
      },
    ],
    advanced: [
      {
        id: 5,
        title: t("librarySearcherTitle"),
        description: t("librarySearcherDesc"),
        image: "/images/buscador-librerias-main.png",
        previewImages: ["/images/buscador-librerias-ejecucion.png"],
        tags: ["python", "librerías", "análisis", "desarrollo", "avanzado"],
        category: "python",
        difficulty: "advanced",
        github: "https://github.com/Fishertdevs/Buscador_de_Librerias.git",
        demo: "#",
        icon: <Server className="h-10 w-10 text-primary" />,
      },
      {
        id: 6,
        title: t("storiesSystemTitle"),
        description: t("storiesSystemDesc"),
        image: "/images/sistema-historias-main.png",
        previewImages: ["/images/sistema-historias-ejecucion.png"],
        tags: ["python", "gestión", "historias", "análisis de texto", "avanzado"],
        category: "python",
        difficulty: "advanced",
        github: "https://github.com/Fishertdevs/Sistema_de_historias.git",
        demo: "#",
        icon: <Bot className="h-10 w-10 text-primary" />,
      },
    ],
  }

  // Proyectos Web organizados por dificultad
  const webProjects = {
    basic: [
      {
        id: 7,
        title: t("retroGameTitle"),
        description: t("retroGameDesc"),
        image: "/images/juego-retro-portada.png",
        previewImages: ["/images/juego-retro-preview.png"],
        tags: ["html", "css", "javascript", "juego", "retro"],
        category: "web",
        difficulty: "basic",
        github: "https://github.com/Fishertdevs/Basic_Game.git",
        demo: "https://fishertdevs.github.io/Basic_Game/",
        icon: <Globe className="h-10 w-10 text-primary" />,
      },
      {
        id: 8,
        title: t("calculatorTitle"),
        description: t("calculatorDesc"),
        image: "/images/calculadora-portada.png",
        previewImages: ["/images/calculadora-preview-actual.png"],
        tags: ["html", "css", "javascript", "calculadora", "básico"],
        category: "web",
        difficulty: "basic",
        github: "https://github.com/Fishertdevs/Calculadora.git",
        demo: "https://fishertdevs.github.io/Calculadora/",
        icon: <Code className="h-10 w-10 text-primary" />,
      },
    ],
    intermediate: [
      {
        id: 9,
        title: t("githubUsersTitle"),
        description: t("githubUsersDesc"),
        image: "/images/usuarios-github-portada.png",
        previewImages: ["/images/usuarios-github-preview.png"],
        tags: ["html", "css", "javascript", "axios", "api", "github"],
        category: "web",
        difficulty: "intermediate",
        github: "https://github.com/Fishertdevs/Usuarios_Github.git",
        demo: "https://fishertdevs.github.io/Usuarios_Github/",
        icon: <Github className="h-10 w-10 text-primary" />,
      },
      {
        id: 10,
        title: t("snakeGameTitle"),
        description: t("snakeGameDesc"),
        image: "/images/snake-game-portada.png",
        previewImages: ["/images/snake-game-preview.png"],
        tags: ["html", "css", "javascript", "juego", "interactivo"],
        category: "web",
        difficulty: "intermediate",
        github: "https://github.com/Fishertdevs/Snake_Game.git",
        demo: "https://fishertdevs.github.io/Snake_Game/",
        icon: <Braces className="h-10 w-10 text-primary" />,
      },
    ],
    advanced: [
      {
        id: 11,
        title: t("nlpProcessorTitle"),
        description: t("nlpProcessorDesc"),
        image:
          "https://sjc.microlink.io/JiG1W-BA7r7hi1aLmCE2YXIdgcNUHUMH51LbEhH0LHzQzWtrQaACxC38PW6H8zPH7VUg74xmtdRzmyV4UJvxiQ.jpeg",
        previewImages: [
          "https://sjc.microlink.io/uAKT6wo-atK5_SZcqH9ZVGwr7bBOgtoLEQYxYvkWRJXApC7wDAlARJqagLwvd9BQ281enWJB7MgPWQyly1I4-g.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5OFZbf65BoWiocPSSYo9UZSAHmBLMI.png",
        ],
        tags: ["typescript", "next.js", "nlp", "ai", "react", "avanzado"],
        category: "web",
        difficulty: "advanced",
        github: "https://github.com/Fishertdevs/npl-procesor.git",
        demo: "https://v0-nlp-project-proposal.vercel.app",
        icon: <Bot className="h-10 w-10 text-primary" />,
      },
      {
        id: 12,
        title: t("employmentPlatformTitle"),
        description: t("employmentPlatformDesc"),
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-05%20213101-hyBK1m3tNTaQxVxggt2zxEJDJ5gUkB.png",
        previewImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-05%20213134-6T4EORXUTuQSzb1QdYhdmBkb30rw18.png",
        ],
        tags: ["react", "typescript", "next.js", "tailwind", "avanzado"],
        category: "web",
        difficulty: "advanced",
        github: "https://github.com/Fishertdevs/Plataforma_de_Empleo.git",
        demo: "https://kzmjekpqapb8ona7jyia.lite.vusercontent.net/",
        icon: <Briefcase className="h-10 w-10 text-primary" />,
      },
    ],
  }

  // Proyectos SQL organizados por dificultad
  const sqlProjects = {
    basic: [
      {
        id: 13,
        title: t("mysqlRegistryTitle"),
        description: t("mysqlRegistryDesc"),
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuEHRMFyDBGsrqVjL6WsiLNOHSCMyg.png",
        previewImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-06%20161456-lwYGteVwo8X9rH2OM3rs0Lz6RxvZXi.png",
        ],
        tags: ["python", "mysql", "tkinter", "crud", "gui"],
        category: "sql",
        difficulty: "basic",
        github: "https://github.com/Fishertdevs/Crud_mysql.git",
        demo: "#",
        icon: <Database className="h-10 w-10 text-primary" />,
      },
      {
        id: 14,
        title: t("sqliteQueriesTitle"),
        description: t("sqliteQueriesDesc"),
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Zh7VjF3dYBGv551ueOyfrtVVzCctmV.png",
        previewImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-04-03%20210818-RBa0xdiywaAQd4ueeIqRRF0B3E0Lco.png",
        ],
        tags: ["python", "sqlite", "consola", "crud", "básico"],
        category: "sql",
        difficulty: "basic",
        github: "https://github.com/Fishertdevs/Consultas_Basicas.git",
        demo: "#",
        icon: <Code className="h-10 w-10 text-primary" />,
      },
    ],
    intermediate: [
      {
        id: 15,
        title: t("beesProjectionTitle"),
        description: t("beesProjectionDesc"),
        image:
          "https://sjc.microlink.io/bb7kwKEG6MibemT0UKIndesY94z1KklHIKfJFjJrrIhbnekOzu0R7ve88tsCnl3iZ6E8bXIctZNJyiDcNcsi3g.jpeg",
        previewImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vF6so1kBS5Nzo6ZSnK01qql7vXCnCT.png",
        ],
        tags: ["python", "sql", "streamlit", "plotly", "folium", "visualización"],
        category: "sql",
        difficulty: "intermediate",
        github: "https://github.com/Fishertdevs/Proyeccion_de_Abejas.git",
        demo: "#",
        icon: <LineChart className="h-10 w-10 text-primary" />,
      },
      {
        id: 16,
        title: t("routeCalculatorTitle"),
        description: t("routeCalculatorDesc"),
        image:
          "https://sjc.microlink.io/YqAhWZQj4ViKLsTKng79OgcxNg4CgXa5_ZlRDjhnUNJUGr3u4IKOYEMEyji_LSB2cu_uQC5gfDwO38u69meDEA.jpeg",
        previewImages: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jgYgVMEEakHzj2M14RLddbR2SLy5Wf.png",
        ],
        tags: ["python", "jupyter", "optimización", "algoritmos", "métodos-numéricos"],
        category: "sql",
        difficulty: "intermediate",
        github: "https://github.com/Fishertdevs/Calculador_rutas.git",
        demo: "#",
        icon: <Server className="h-10 w-10 text-primary" />,
      },
    ],
    advanced: [
      {
        id: 17,
        title: t("miKazaPlatformTitle"),
        description: t("miKazaPlatformDesc"),
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TlBCKUiP1nAOEeHOVaZM3ULr1HmA8a.png",
        previewImages: [
          "https://sjc.microlink.io/icE_AlStXOafvINIHRH__3zZwEMBbMPY1sWBF9WFtHHcyDDmsquDYjXwtItvdqQUgA-mSaQuwgUQQ1TabXzFvg.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JaTYMYS5VHBNdNtqoRnTTfyqpD0r3d.png",
        ],
        tags: ["react", "next.js", "typescript", "sql", "full-stack", "avanzado"],
        category: "sql",
        difficulty: "advanced",
        github: "https://github.com/Fishertdevs/mi_kaza_1.0.git",
        demo: "https://v0-mi-kaza-application.vercel.app",
        icon: <Globe className="h-10 w-10 text-primary" />,
      },
    ],
  }

  // Combinar todos los proyectos
  const allProjects = [
    ...Object.values(pythonProjects).flat(),
    ...Object.values(webProjects).flat(),
    ...Object.values(sqlProjects).flat(),
  ]

  // Obtener proyectos según la categoría y dificultad seleccionadas
  const getFilteredProjects = () => {
    if (mainCategory === "all") {
      return allProjects
    }

    let categoryProjects
    switch (mainCategory) {
      case "python":
        categoryProjects = pythonProjects
        break
      case "web":
        categoryProjects = webProjects
        break
      case "sql":
        categoryProjects = sqlProjects
        break
      default:
        return allProjects
    }

    if (difficulty === "all") {
      return Object.values(categoryProjects).flat()
    }

    return categoryProjects[difficulty as keyof typeof categoryProjects]
  }

  const filteredProjects = getFilteredProjects()

  // Efecto para mostrar/ocultar pestañas de dificultad
  useEffect(() => {
    setShowDifficultyTabs(mainCategory !== "all")
    setDifficulty("all") // Resetear dificultad al cambiar categoría principal
  }, [mainCategory])

  // Efecto para animar la aparición de proyectos
  useEffect(() => {
    const timer = setTimeout(() => {
      const ids = filteredProjects.map((project) => project.id)
      setVisibleProjects(ids)
    }, 100)

    return () => clearTimeout(timer)
  }, [mainCategory, difficulty, filteredProjects])

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  // Iconos para niveles de dificultad
  const difficultyIcons = {
    basic: <Star className="h-4 w-4 mr-1 text-yellow-400" />,
    intermediate: <Stars className="h-4 w-4 mr-1 text-yellow-500" />,
    advanced: <Sparkles className="h-4 w-4 mr-1 text-yellow-600" />,
  }

  // Función para abrir el diálogo de preview
  const openPreview = (project: any) => {
    setSelectedProject(project)
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("projectsTitle")}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-gray-700 dark:text-gray-300 mt-6 max-w-2xl mx-auto">{t("projectsDescription")}</p>
        </div>

        {/* Categorías principales */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 animate-on-scroll">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={mainCategory === "all" ? "default" : "outline"}
              onClick={() => setMainCategory("all")}
              className="shadow-sm transition-all duration-300"
            >
              {t("all")}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={mainCategory === "python" ? "default" : "outline"}
              onClick={() => setMainCategory("python")}
              className="shadow-sm transition-all duration-300"
            >
              {t("python")}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={mainCategory === "web" ? "default" : "outline"}
              onClick={() => setMainCategory("web")}
              className="shadow-sm transition-all duration-300"
            >
              Web
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={mainCategory === "sql" ? "default" : "outline"}
              onClick={() => setMainCategory("sql")}
              className="shadow-sm transition-all duration-300"
            >
              SQL
            </Button>
          </motion.div>
        </div>

        {/* Pestañas de dificultad */}
        <AnimatePresence>
          {showDifficultyTabs && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-10"
            >
              <Tabs
                defaultValue="all"
                value={difficulty}
                onValueChange={setDifficulty}
                className="w-full max-w-2xl mx-auto"
              >
                <TabsList className="grid grid-cols-4 w-full bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    {t("all")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="basic"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center"
                  >
                    {difficultyIcons.basic} {t("basic")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="intermediate"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center"
                  >
                    {difficultyIcons.intermediate} {t("intermediate")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center"
                  >
                    {difficultyIcons.advanced} {t("advanced")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proyectos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${mainCategory}-${difficulty}`} // Esto hace que la animación se reinicie cuando cambia el filtro
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate={visibleProjects.includes(project.id) ? "visible" : "hidden"}
              className="h-full"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden group">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-primary/80 text-white dark:bg-primary/90 dark:text-white text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-700/80 text-white dark:bg-gray-600/90 dark:text-white text-xs"
                          >
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Badge de dificultad */}
                  <div className="absolute top-2 right-2">
                    <Badge
                      className={`
                        ${
                          project.difficulty === "basic"
                            ? "bg-green-500"
                            : project.difficulty === "intermediate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } 
                        text-white flex items-center gap-1 px-2 py-1
                      `}
                    >
                      {project.difficulty === "basic"
                        ? difficultyIcons.basic
                        : project.difficulty === "intermediate"
                          ? difficultyIcons.intermediate
                          : difficultyIcons.advanced}
                      {project.difficulty === "basic"
                        ? "Básico"
                        : project.difficulty === "intermediate"
                          ? "Intermedio"
                          : "Avanzado"}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="relative flex-grow">
                  <div className="absolute -top-10 left-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 transform transition-transform duration-300 hover:rotate-12">
                    {project.icon}
                  </div>
                  <div className="pt-6">
                    <CardTitle className="text-gray-800 dark:text-white">{project.title}</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
                      {project.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between mt-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="group transition-all duration-300 hover:border-primary"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2 group-hover:text-primary" />
                        {t("code")}
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 group transition-all duration-300"
                          onClick={() => openPreview(project)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {t("viewPreview")}
                          <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                            →
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0">
                        <DialogHeader className="p-4 border-b">
                          <DialogTitle>{project.title}</DialogTitle>
                          <DialogClose className="absolute right-4 top-4" />
                        </DialogHeader>
                        <div className="p-6">
                          <div className="flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-4 text-center">{t("appInExecution")}</h3>
                            <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
                              <img
                                src={project.previewImages[0] || "/placeholder.svg"}
                                alt={`${project.title} en ejecución`}
                                className="w-full h-auto object-contain"
                              />
                            </div>
                            <div className="mt-6 w-full flex justify-center gap-4">
                              <Button asChild variant="outline" size="sm">
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4 mr-2" />
                                  {t("viewOnGitHub")}
                                </a>
                              </Button>
                              {project.demo && project.demo !== "#" && (
                                <Button asChild size="sm">
                                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    {t("tryDemo")}
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Botón Ver más proyectos */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 group transition-all duration-300 shadow-lg"
            >
              <a
                href="https://github.com/Fishertdevs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                {t("seeMoreProjects")}
                <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
