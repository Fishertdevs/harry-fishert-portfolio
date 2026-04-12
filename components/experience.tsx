"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar, Code, TrendingUp, Target } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

const Experience = () => {
  const { t } = useLanguage()

  // Datos para gráficos interactivos
  const projectStats = [
    { name: t("projectsCompletedStat"), value: 15, color: "#3b82f6", icon: "📊" },
    { name: t("technologiesMastered"), value: 8, color: "#10b981", icon: "💻" },
    { name: t("developmentHours"), value: 240, color: "#f59e0b", icon: "⏱️" },
    { name: t("collaborations"), value: 5, color: "#8b5cf6", icon: "🤝" },
  ]

  const skillsGrowth = [
    { skill: t("frontendDevelopment"), before: 25, after: 70, color: "#3b82f6" },
    { skill: t("backendDevelopment"), before: 30, after: 75, color: "#10b981" },
    { skill: t("databaseManagement"), before: 25, after: 65, color: "#f59e0b" },
    { skill: t("fullStackIntegration"), before: 20, after: 68, color: "#8b5cf6" },
  ]

  const projectTimeline = [
    { month: "Ene", projects: 2, hours: 25 },
    { month: "Mar", projects: 3, hours: 35 },
    { month: "May", projects: 2, hours: 30 },
    { month: "Jul", projects: 4, hours: 40 },
  ]

  // Componente para estadísticas circulares
  const CircularStat = ({ stat, index }: any) => {
    const percentage = Math.min((stat.value / 15) * 100, 100) // Normalizar para visualización

    return (
      <motion.div
        className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative w-20 h-20 mb-3">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={stat.color}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 100" }}
              animate={{ strokeDasharray: `${percentage} 100` }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">{stat.icon}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 text-center">{stat.name}</div>
        </div>
      </motion.div>
    )
  }

  // Componente para gráfico de crecimiento de habilidades
  const SkillsGrowthChart = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
      <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
        <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
        {t("skillsGrowthTitle")}
      </h4>
      <div className="space-y-4">
        {skillsGrowth.map((skill, index) => (
          <motion.div
            key={index}
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.skill}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {skill.before}% → {skill.after}%
              </span>
            </div>
            <div className="relative">
              {/* Barra de antes */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                <motion.div
                  className="h-full bg-gray-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.before}%` }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                />
              </div>
              {/* Barra de después */}
              <div className="w-full h-2 mt-1 bg-gray-200 dark:bg-gray-600 rounded-full">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.after}%` }}
                  transition={{ delay: index * 0.2 + 1, duration: 1.2 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  // Componente para timeline de proyectos
  const ProjectTimeline = () => (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
      <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
        <Target className="h-5 w-5 mr-2 text-green-600" />
        {t("projectTimelineTitle")}
      </h4>
      <div className="space-y-4">
        {projectTimeline.map((month, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="font-medium text-gray-700 dark:text-gray-300">{month.month} 2025</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{month.projects}</div>
                <div className="text-xs text-gray-500">{t("projects")}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{month.hours}h</div>
                <div className="text-xs text-gray-500">{t("hours")}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("experienceTitle")}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-gray-700 dark:text-gray-300 mt-6 max-w-2xl mx-auto">{t("experienceDescription")}</p>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {projectStats.map((stat, index) => (
            <CircularStat key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Gráficos interactivos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <SkillsGrowthChart />
          <ProjectTimeline />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-primary pl-8 ml-4">
            <div className="mb-12 relative animate-on-scroll">
              <span className="absolute -left-10 top-0 bg-primary text-white p-2 rounded-full shadow-md">
                <Briefcase className="h-5 w-5" />
              </span>

              <Card className="bg-white dark:bg-gray-800 shadow-lg card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">{t("softwareDevelopment")}</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        {t("mcArchitects")}
                      </CardDescription>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> {t("semester")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <div>{t("devResponsibility1")}</div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <div>{t("devResponsibility2")}</div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <div>{t("devResponsibility3")}</div>
                    </li>
                  </ul>

                  {/* Métricas de rendimiento */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{t("modules")}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">95%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{t("efficiency")}</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">Django</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{t("framework")}</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">4</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{t("months")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-12 relative animate-on-scroll" style={{ animationDelay: "200ms" }}>
              <span className="absolute -left-10 top-0 bg-primary text-white p-2 rounded-full shadow-md">
                <Code className="h-5 w-5" />
              </span>

              <Card className="bg-white dark:bg-gray-800 shadow-lg card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">{t("featuredProjects")}</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        {t("personalDevelopment")}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-primary">{t("miKazaProject")}</h4>
                      <p className="mt-1 text-gray-700 dark:text-gray-300">{t("miKazaDesc")}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">JavaScript</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Reservas</span>
                      </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium text-primary">{t("nlpProject")}</h4>
                      <p className="mt-1 text-gray-700 dark:text-gray-300">{t("nlpDesc")}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Python</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">NLP</span>
                      </div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium text-primary">{t("flightProject")}</h4>
                      <p className="mt-1 text-gray-700 dark:text-gray-300">{t("flightDesc")}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">JavaScript</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Pagos</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
