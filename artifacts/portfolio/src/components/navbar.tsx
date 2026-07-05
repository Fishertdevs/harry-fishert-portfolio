"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"
import { Link, useLocation } from "wouter"

const ThemeSwitch = ({ theme, onToggle }: { theme: string | undefined; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors flex items-center px-0.5 shrink-0"
  >
    <motion.span
      className="w-5 h-5 rounded-full bg-white shadow flex items-center justify-center"
      animate={{ x: theme === "dark" ? 22 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {theme === "dark" ? <Moon className="w-3 h-3 text-indigo-500" /> : <Sun className="w-3 h-3 text-amber-500" />}
    </motion.span>
  </button>
)

const LanguageSwitch = ({ language, onToggle }: { language: string; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    aria-label="Change language"
    className="relative w-14 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors shrink-0"
  >
    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[11px] leading-none">🇪🇸</span>
    <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[11px] leading-none">🇺🇸</span>
    <motion.span
      className="absolute top-0.5 w-6 h-5 rounded-full bg-white shadow flex items-center justify-center text-[11px] leading-none"
      animate={{ x: language === "es" ? 2 : 30 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {language === "es" ? "🇪🇸" : "🇺🇸"}
    </motion.span>
  </button>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [pathname] = useLocation()

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLanguage = (lang: string) => {
    setLanguage(lang)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("skills"), href: "/skills" },
    { name: t("experience"), href: "/experience" },
    { name: t("education"), href: "/education" },
    { name: t("contact"), href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const transparentHero = pathname === "/" && !scrolled

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        transparentHero ? "bg-transparent" : "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`text-xl font-bold transition-colors ${
                transparentHero ? "text-white" : "text-primary"
              }`}
            >
              Harry Fishert
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
                    isActive(item.href)
                      ? transparentHero
                        ? "text-white font-semibold"
                        : "text-primary font-semibold"
                      : transparentHero
                        ? "text-white/80 hover:text-white"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeSwitch theme={theme} onToggle={toggleTheme} />
            <LanguageSwitch language={language} onToggle={() => toggleLanguage(language === "es" ? "en" : "es")} />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitch theme={theme} onToggle={toggleTheme} />
            <LanguageSwitch language={language} onToggle={() => toggleLanguage(language === "es" ? "en" : "es")} />

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg p-4 animate-fade-in">
          <div className="flex flex-col space-y-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-base font-medium outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
