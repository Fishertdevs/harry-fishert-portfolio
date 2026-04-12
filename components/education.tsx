"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, BookOpen, Calendar, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

const Education = () => {
  const { t } = useLanguage()

  // Datos para gráficos interactivos - ACTUALIZADO
  const academicProgress = [
    { semester: "1-2", credits: 18, gpa: 3.8 },
    { semester: "3-4", credits: 20, gpa: 4.0 },
    { semester: "5-6", credits: 22, gpa: 4.2 },
    { semester: "7-8", credits: 24, gpa: 4.1 },
  ]

  const skillsAcquired = [
    { area: t("programmingSkill"), percentage: 75, color: "#3b82f6" },
    { area: t("databaseSkill"), percentage: 60, color: "#10b981" },
    { area: t("networkingSkill"), percentage: 45, color: "#f59e0b" },
    { area: t("webDevelopmentSkill"), percentage: 55, color: "#8b5cf6" },
    { area: t("agileMethodologiesSkill"), percentage: 70, color: "#ef4444" },
  ]

  // Componente para gráfico de habilidades adquiridas
  const SkillsChart = () => (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
      <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
        <BookOpen className="h-5 w-5 mr-2 text-green-600" />
        {t("skillsAcquired")}
      </h4>
      <div className="space-y-4">
        {skillsAcquired.map((skill, index) => (
          <motion.div
            key={index}
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.area}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{skill.percentage}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.percentage}%` }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  // Componente para estadísticas - ACTUALIZADO
  const StatsCard = ({ icon, title, value, subtitle, color }: any) => (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4"
      style={{ borderLeftColor: color }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold" style={{ color }}>
            {value}
          </p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
      </div>
    </motion.div>
  )

  return (
    <section id="education" className="py-20 bg-blue-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("educationTitle")}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-gray-700 dark:text-gray-300 mt-6 max-w-2xl mx-auto">{t("educationDescription")}</p>
        </div>

        {/* Estadísticas - ACTUALIZADO */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatsCard
            icon={<GraduationCap className="h-6 w-6" style={{ color: "#3b82f6" }} />}
            title={t("currentSemester")}
            value="8°"
            subtitle={t("ofSemesters")}
            color="#3b82f6"
          />
          <StatsCard
            icon={<Clock className="h-6 w-6" style={{ color: "#10b981" }} />}
            title={t("yearsStudied")}
            value="3.5"
            subtitle={t("ofYears")}
            color="#10b981"
          />
          <StatsCard
            icon={<BookOpen className="h-6 w-6" style={{ color: "#f59e0b" }} />}
            title={t("credits")}
            value="122"
            subtitle={t("totalCredits")}
            color="#f59e0b"
          />
          <StatsCard
            icon={<Award className="h-6 w-6" style={{ color: "#8b5cf6" }} />}
            title={t("certifications")}
            value="3"
            subtitle={t("completed")}
            color="#8b5cf6"
          />
        </div>

        {/* Gráficos interactivos */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
          <SkillsChart />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-primary pl-8 ml-4">
            <div className="mb-12 relative animate-on-scroll">
              <span className="absolute -left-10 top-0 bg-primary text-white p-2 rounded-full shadow-md">
                <GraduationCap className="h-5 w-5" />
              </span>

              <Card className="bg-white dark:bg-gray-800 shadow-lg card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">{t("systemsEngineering")}</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        {t("universidadCentral")}
                      </CardDescription>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> 2022 - {t("present")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{t("currentSemesterDesc")}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-12 relative animate-on-scroll" style={{ animationDelay: "200ms" }}>
              <span className="absolute -left-10 top-0 bg-primary text-white p-2 rounded-full shadow-md">
                <Award className="h-5 w-5" />
              </span>

              <Card className="bg-white dark:bg-gray-800 shadow-lg card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">{t("highSchool")}</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        {t("highSchoolName")}
                      </CardDescription>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> 2021
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{t("highSchoolDesc")}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-12 relative animate-on-scroll" style={{ animationDelay: "400ms" }}>
              <span className="absolute -left-10 top-0 bg-primary text-white p-2 rounded-full shadow-md">
                <BookOpen className="h-5 w-5" />
              </span>

              <Card className="bg-white dark:bg-gray-800 shadow-lg card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-gray-800 dark:text-white">{t("coursesAndCertifications")}</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        {t("complementaryTraining")}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <div>
                        <span className="font-medium">{t("softSkillsCourse")}</span> – {t("softSkillsDesc")}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <div>
                        <span className="font-medium">{t("infosecCourse")}</span> – {t("infosecDesc")}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <div>
                        <span className="font-medium">{t("softwareDevCourse")}</span> – {t("softwareDevDesc")}
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
