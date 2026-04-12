"use client"

import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Globe, Server, Layers, Briefcase } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

const Skills = () => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("programming")
  const progressRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const programmingSkills = [
    { name: "Python", level: 75, description: t("pythonDesc"), color: "#3776ab" },
    { name: "JavaScript", level: 45, description: t("javascriptDesc"), color: "#f7df1e" },
    { name: "HTML/CSS", level: 65, description: t("htmlcssDesc"), color: "#e34f26" },
    { name: "SQL", level: 60, description: t("sqlDesc"), color: "#336791" },
    { name: "Java / C-C++", level: 40, description: t("javacDesc"), color: "#007396" },
  ]

  // Frameworks organizados por categoría con colores
  const pythonFrameworks = [
    { name: "Streamlit", level: 80, description: t("streamlitDesc"), color: "#ff4b4b" },
    { name: "Flet", level: 65, description: t("fletDesc"), color: "#02569b" },
    { name: "Flask", level: 70, description: t("flaskDesc"), color: "#000000" },
    { name: "Django", level: 65, description: t("djangoDesc"), color: "#092e20" },
    { name: "FastAPI", level: 60, description: t("fastApiDesc"), color: "#009688" },
    { name: "PyQt", level: 55, description: t("pyqtDesc"), color: "#41cd52" },
    { name: "Kivy", level: 50, description: t("kivyDesc"), color: "#3776ab" },
    { name: "Tkinter", level: 60, description: t("tkinterDesc"), color: "#306998" },
    { name: "Pygame", level: 45, description: t("pygameDesc"), color: "#43b02a" },
  ]

  const jsFrameworks = [
    { name: "React", level: 50, description: t("reactDesc"), color: "#61dafb" },
    { name: "Next.js", level: 55, description: t("nextDesc"), color: "#000000" },
    { name: "Vue.js", level: 40, description: t("vueDesc"), color: "#4fc08d" },
    { name: "Node.js", level: 45, description: t("nodeDesc"), color: "#339933" },
    { name: "Express.js", level: 40, description: t("expressDesc"), color: "#000000" },
  ]

  const htmlFrameworks = [
    { name: "Tailwind CSS", level: 60, description: t("tailwindDesc"), color: "#06b6d4" },
    { name: "Bootstrap", level: 55, description: t("bootstrapDesc"), color: "#7952b3" },
  ]

  // Actualizar las bases de datos para incluir NoSQL
  const sqlFrameworks = [
    { name: "SQLite", level: 65, description: t("sqliteDesc"), color: "#003b57" },
    { name: "MySQL Workbench", level: 55, description: t("workbenchDesc"), color: "#4479a1" },
    { name: "MongoDB (NoSQL)", level: 45, description: t("mongoDesc"), color: "#47a248" },
    { name: "Microsoft Access", level: 60, description: t("accessDbDesc"), color: "#a4373a" },
    { name: "PostgreSQL", level: 40, description: t("postgresDesc"), color: "#336791" },
  ]

  const javaFrameworks = [
    { name: "Eclipse", level: 50, description: t("eclipseDesc"), color: "#2c2255" },
    { name: "Apache", level: 40, description: t("apacheDesc"), color: "#d22128" },
    { name: "Java SE", level: 45, description: t("javaSeDesc"), color: "#007396" },
    { name: "Spring", level: 35, description: t("springDesc"), color: "#6db33f" },
  ]

  const cFrameworks = [
    { name: "Qt", level: 40, description: t("qtDesc"), color: "#41cd52" },
    { name: "GCC", level: 45, description: t("gccDesc"), color: "#a42e2b" },
  ]

  // Actualizar las herramientas con las nuevas tecnologías mencionadas
  const toolsSkills = [
    { name: "VS Code", level: 80, description: t("vscodeDesc"), color: "#007acc" },
    { name: "Git & GitHub", level: 70, description: t("versionControlDesc"), color: "#f05032" },
    { name: "AWS", level: 45, description: t("awsDesc"), color: "#ff9900" },
    { name: "Power BI", level: 55, description: t("powerBiDesc"), color: "#f2c811" },
    { name: "Paquete Office", level: 75, description: t("officeDesc"), color: "#d83b01" },
    { name: "Figma & Canva", level: 60, description: t("prototypeDesc"), color: "#f24e1e" },
    { name: "Unity", level: 45, description: t("unityDesc"), color: "#000000" },
    { name: "Android Studio", level: 50, description: t("androidstudioDesc"), color: "#3ddc84" },
    { name: "Microsoft Access", level: 60, description: t("accessDesc"), color: "#a4373a" },
    { name: "Docker", level: 35, description: t("dockerDesc"), color: "#2496ed" },
    { name: "Postman", level: 55, description: t("postmanDesc"), color: "#ff6c37" },
    { name: "Azure DevOps", level: 40, description: t("azureDevOpsDesc"), color: "#0078d4" },
    { name: "GIS", level: 35, description: t("gisDesc"), color: "#2e7d32" },
    { name: "Slack", level: 70, description: t("slackDesc"), color: "#4a154b" },
    { name: "Trello", level: 65, description: t("trelloDesc"), color: "#0079bf" },
  ]

  // Agregar nuevas habilidades blandas relacionadas con soporte y metodologías
  const softSkills = [
    { name: t("teamwork"), level: 85, description: t("teamworkDesc"), color: "#8b5cf6" },
    { name: t("problemSolving"), level: 80, description: t("problemSolvingDesc"), color: "#06b6d4" },
    { name: t("communication"), level: 75, description: t("communicationDesc"), color: "#10b981" },
    { name: t("projectManagement"), level: 70, description: t("projectManagementDesc"), color: "#f59e0b" },
    { name: t("adaptability"), level: 85, description: t("adaptabilityDesc"), color: "#ef4444" },
    { name: t("customerSupport"), level: 70, description: t("customerSupportDesc"), color: "#06b6d4" },
    { name: t("agileMethodologies"), level: 65, description: t("agileMethodologiesDesc"), color: "#8b5cf6" },
    { name: t("qualityAssurance"), level: 60, description: t("qaDesc"), color: "#10b981" },
  ]

  const languageSkills = [
    { name: t("spanishLang"), level: 100, description: t("spanishDesc"), color: "#dc2626" },
    { name: t("englishLang"), level: 50, description: t("englishDesc"), color: "#2563eb" },
    { name: t("portugueseLang"), level: 30, description: t("portugueseDesc"), color: "#16a34a" },
  ]

  // Función para crear gráfico de torta SVG
  const createPieChart = (data: any[], size = 200) => {
    const total = data.reduce((sum, item) => sum + item.level, 0)
    let currentAngle = 0

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const percentage = (item.level / total) * 100
          const angle = (item.level / total) * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + angle

          const x1 = size / 2 + (size / 2 - 10) * Math.cos((startAngle * Math.PI) / 180)
          const y1 = size / 2 + (size / 2 - 10) * Math.sin((startAngle * Math.PI) / 180)
          const x2 = size / 2 + (size / 2 - 10) * Math.cos((endAngle * Math.PI) / 180)
          const y2 = size / 2 + (size / 2 - 10) * Math.sin((endAngle * Math.PI) / 180)

          const largeArcFlag = angle > 180 ? 1 : 0

          const pathData = [
            `M ${size / 2} ${size / 2}`,
            `L ${x1} ${y1}`,
            `A ${size / 2 - 10} ${size / 2 - 10} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z",
          ].join(" ")

          currentAngle += angle

          return (
            <motion.path
              key={index}
              d={pathData}
              fill={item.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          )
        })}
      </svg>
    )
  }

  // Función para crear barra de progreso circular
  const CircularProgress = ({ percentage, color, size = 120, strokeWidth = 8 }: any) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold" style={{ color }}>
            {percentage}%
          </span>
        </div>
      </div>
    )
  }

  // Función para crear gráfico de barras animado
  const AnimatedBar = ({ skill, index }: any) => (
    <motion.div
      key={skill.name}
      className="mb-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-800 dark:text-white flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: skill.color }} />
          {skill.name}
        </span>
        <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{skill.description}</p>
    </motion.div>
  )

  return (
    <section id="skills" className="py-20 bg-blue-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("skillsTitle")}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-gray-700 dark:text-gray-300 mt-6 max-w-2xl mx-auto">{t("skillsDescription")}</p>
        </div>

        <Tabs
          defaultValue="programming"
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-6xl mx-auto animate-on-scroll"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-10 bg-white dark:bg-gray-700 p-1 rounded-lg shadow-md">
            <TabsTrigger
              value="programming"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">{t("programming")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="frameworks"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">{t("frameworks")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">{t("tools")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="softskills"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">{t("softSkills")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="languages"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{t("languagesTab")}</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <TabsContent value="programming" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {programmingSkills.map((skill, index) => (
                    <AnimatedBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-lg font-semibold mb-4 text-center">{t("distributionTitle")}</h3>
                  <div className="relative">{createPieChart(programmingSkills, 250)}</div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    {programmingSkills.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: skill.color }} />
                        <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="frameworks" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Python Frameworks */}
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-5 shadow-md">
                  <h3 className="text-lg font-semibold text-primary mb-4 text-center">{t("pythonFrameworks")}</h3>
                  <div className="flex justify-center mb-4">{createPieChart(pythonFrameworks, 180)}</div>
                  <div className="space-y-2">
                    {pythonFrameworks.slice(0, 5).map((skill, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: skill.color }} />
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                        </div>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* JavaScript Frameworks */}
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-5 shadow-md">
                  <h3 className="text-lg font-semibold text-primary mb-4 text-center">{t("jsFrameworks")}</h3>
                  <div className="flex justify-center mb-4">{createPieChart(jsFrameworks, 180)}</div>
                  <div className="space-y-2">
                    {jsFrameworks.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: skill.color }} />
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                        </div>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bases de Datos */}
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-5 shadow-md">
                  <h3 className="text-lg font-semibold text-primary mb-4 text-center">{t("sqlFrameworks")}</h3>
                  <div className="flex justify-center mb-4">{createPieChart(sqlFrameworks, 180)}</div>
                  <div className="space-y-2">
                    {sqlFrameworks.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: skill.color }} />
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                        </div>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {toolsSkills.map((skill, index) => (
                    <AnimatedBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-lg font-semibold mb-4 text-center">{t("developmentTools")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {toolsSkills.slice(0, 4).map((skill, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <CircularProgress percentage={skill.level} color={skill.color} size={100} strokeWidth={6} />
                        <span className="text-sm mt-2 text-center text-gray-600 dark:text-gray-300">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="softskills" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {softSkills.map((skill, index) => (
                    <AnimatedBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-lg font-semibold mb-4 text-center">{t("softSkillsProfile")}</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {softSkills.map((skill, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <CircularProgress percentage={skill.level} color={skill.color} size={120} strokeWidth={8} />
                        <span className="text-sm mt-2 text-center text-gray-600 dark:text-gray-300">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="languages" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {languageSkills.map((skill, index) => (
                    <AnimatedBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-lg font-semibold mb-4 text-center">{t("linguisticCompetence")}</h3>
                  <div className="flex justify-center items-center space-x-8">
                    {languageSkills.map((skill, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <CircularProgress percentage={skill.level} color={skill.color} size={140} strokeWidth={10} />
                        <span className="text-sm mt-2 text-center text-gray-600 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          {skill.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  )
}

export default Skills
