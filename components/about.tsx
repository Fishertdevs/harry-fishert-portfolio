"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Server, Database, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { usePortfolio } from "@/lib/portfolio-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const About = () => {
  const { t } = useLanguage()
  const { portfolioData } = usePortfolio()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, delay: 0.2 },
    },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.1 * i,
      },
    }),
  }

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("aboutTitle")}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={imageVariants}>
            <motion.div
              className="relative w-full h-80 md:h-96 overflow-hidden rounded-full shadow-xl mx-auto max-w-xs border-4 border-primary"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/images/avatar.png" alt={portfolioData.name} className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          <motion.div variants={containerVariants}>
            <motion.h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white" variants={itemVariants}>
              {t("aboutHeading")}
            </motion.h3>

            <motion.p className="text-gray-700 dark:text-gray-300 mb-6" variants={itemVariants}>
              {portfolioData.aboutParagraph1}
            </motion.p>

            <motion.p className="text-gray-700 dark:text-gray-300 mb-8" variants={itemVariants}>
              {portfolioData.aboutParagraph2}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Code className="h-5 w-5 text-primary mr-3" />,
                  label: t("experience"),
                  value: portfolioData.experience,
                  index: 1,
                },
                {
                  icon: <Server className="h-5 w-5 text-primary mr-3" />,
                  label: t("specialization"),
                  value: portfolioData.specialization,
                  index: 2,
                },
                {
                  icon: <Database className="h-5 w-5 text-primary mr-3" />,
                  label: t("projectsCompleted"),
                  value: portfolioData.projectsCompleted,
                  index: 3,
                },
                {
                  icon: <Globe className="h-5 w-5 text-primary mr-3" />,
                  label: t("status"),
                  value: t("statusValue"),
                  index: 4,
                },
              ].map((item) => (
                <motion.div key={item.label} custom={item.index} variants={cardVariants}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4 flex items-center">
                        {item.icon}
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                          <p className="font-medium text-gray-800 dark:text-white">{item.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
