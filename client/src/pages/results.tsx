"use client"

import { useParams, useLocation } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { personalityTypes } from "@/lib/questions"
import ResultCard from "@/components/test/result-card"
import { Button } from "@/components/ui/button"
import { Share2, RotateCcw, Download, ChevronUp } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { jsPDF } from "jspdf"
import { useState, useEffect } from "react"

export default function Results() {
  const { type } = useParams()
  const [_, navigate] = useLocation()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const personalityType = personalityTypes[type as keyof typeof personalityTypes]

  const { data: results } = useQuery({
    queryKey: ["/api/test/results/1"],
  })

  const latestResult = results?.[results.length - 1]
  const userName = sessionStorage.getItem("userName") || "Anonymous"

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!personalityType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 rounded-lg bg-card shadow-lg">
          <h2 className="text-xl font-bold mb-4">Invalid Personality Type</h2>
          <p className="mb-6 text-muted-foreground">We couldn't find the personality type you're looking for.</p>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${userName}'s Personality Type`,
        text: `${userName} is a ${type} (${personalityType.name})! Take the test to discover yours.`,
        url: window.location.href,
      })
    } catch (error) {
      // fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href)

      const notification = document.createElement("div")
      notification.className =
        "fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg"
      notification.textContent = "Link copied to clipboard!"
      document.body.appendChild(notification)

      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
    }
  }

  const exportToPDF = () => {
    setIsExporting(true)

    setTimeout(() => {
      try {
        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.getWidth()
        const pageHeight = doc.internal.pageSize.getHeight()
        let currentY = 0

        const checkForNewPage = (requiredSpace) => {
          if (currentY + requiredSpace > pageHeight - 20) {
            doc.addPage()
            currentY = 20

            doc.setFillColor(230, 240, 255)
            doc.rect(0, 0, pageWidth, 20, "F")

            doc.setFontSize(10)
            doc.setTextColor(100, 100, 100)
            doc.text(`Page ${doc.getNumberOfPages()}`, pageWidth - 20, 10)

            return true
          }
          return false
        }

        doc.setFillColor(230, 240, 255)
        doc.rect(0, 0, pageWidth, 40, "F")

        doc.setTextColor(40, 40, 100)
        doc.setFontSize(24)
        doc.setFont(undefined, "bold")
        doc.text(`${userName}'s Personality Analysis`, pageWidth / 2, 20, { align: "center" })
        currentY = 40

        doc.setTextColor(0, 0, 0)
        doc.setFontSize(18)
        doc.setFont(undefined, "bold")
        currentY += 10
        doc.text(`Type: ${type} - ${personalityType.name}`, pageWidth / 2, currentY, { align: "center" })
        currentY += 15

        doc.setFontSize(12)
        doc.setFont(undefined, "normal")
        doc.setTextColor(60, 60, 60)
        const description = doc.splitTextToSize(personalityType.description, pageWidth - 40)
        checkForNewPage(description.length * 7)
        doc.text(description, 20, currentY)
        currentY += description.length * 7 + 15

        if (latestResult?.details?.traits) {
          checkForNewPage(25)
          doc.setFont(undefined, "bold")
          doc.setTextColor(40, 40, 100)
          doc.text("Trait Analysis:", 20, currentY)
          currentY += 10

          doc.setFont(undefined, "normal")
          doc.setTextColor(60, 60, 60)
          const traits = latestResult.details.traits

          Object.entries(traits).forEach(([trait, score]) => {
            checkForNewPage(15)
            const formattedTrait = trait.charAt(0).toUpperCase() + trait.slice(1)
            const scoreValue = Math.round(score)

            doc.text(`${formattedTrait}:`, 30, currentY)

            doc.setDrawColor(200, 200, 200)
            doc.setFillColor(230, 240, 255)
            doc.roundedRect(70, currentY - 4, 100, 6, 1, 1, "FD")

            doc.setFillColor(100, 120, 240)
            doc.roundedRect(70, currentY - 4, score, 6, 1, 1, "F")

            doc.text(`${scoreValue}%`, 175, currentY)
            currentY += 15
          })
        }

        checkForNewPage(25)
        doc.setFont(undefined, "bold")
        doc.setTextColor(40, 40, 100)
        doc.text("Key Strengths:", 20, currentY)
        currentY += 10

        doc.setFont(undefined, "normal")
        doc.setTextColor(60, 60, 60)
        personalityType.strengths.forEach((strength) => {
          checkForNewPage(10)
          doc.text(`• ${strength}`, 30, currentY)
          currentY += 10
        })

        currentY += 10
        checkForNewPage(25)
        doc.setFont(undefined, "bold")
        doc.setTextColor(40, 40, 100)
        doc.text("Growth Areas:", 20, currentY)
        currentY += 10

        doc.setFont(undefined, "normal")
        doc.setTextColor(60, 60, 60)
        personalityType.growthAreas.forEach((area) => {
          checkForNewPage(10)
          doc.text(`• ${area}`, 30, currentY)
          currentY += 10
        })

        currentY = pageHeight - 20
        const today = new Date()
        const dateStr = today.toLocaleDateString()
        doc.setFontSize(10)
        doc.setTextColor(150, 150, 150)
        doc.text(`Generated on ${dateStr} | Personality Test Results`, pageWidth / 2, currentY, { align: "center" })
        doc.text(`Page ${doc.getNumberOfPages()} of ${doc.getNumberOfPages()}`, pageWidth - 20, currentY + 10)

        doc.save(`${userName}-personality-analysis.pdf`)
      } catch (error) {
        console.error("PDF generation failed:", error)
      } finally {
        setIsExporting(false)
      }
    }, 100)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-primary/10 px-4 py-8 sm:px-6 md:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto pb-16 relative"
      >
        {/* header */}
        <motion.div variants={container} initial="hidden" animate="show" className="text-center mb-8 md:mb-12">
          <motion.div
            variants={item}
            className="inline-block bg-primary/15 backdrop-blur-sm rounded-full px-4 py-2 text-primary font-medium mb-4 shadow-sm"
          >
            <span className="animate-pulse mr-2">•</span>
            Analysis Complete
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          >
            {userName}'s Personality Type
          </motion.h1>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2"
          >
            <span className="text-2xl sm:text-3xl font-bold">{type}</span>
            <span className="hidden sm:block text-muted-foreground">•</span>
            <span className="text-xl sm:text-2xl text-muted-foreground font-medium">{personalityType.name}</span>
          </motion.div>
        </motion.div>

        {/* Main clntent */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ResultCard
            type={type}
            name={personalityType.name}
            description={personalityType.description}
            image={personalityType.image}
            details={latestResult?.details}
          />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 sm:mt-10 md:mt-12 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-primary/20 hover:border-primary/30 shadow-sm"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Take Test</span> Again
            </Button>

            <Button onClick={handleShare} className="gap-2 shadow-md hover:shadow-lg transition-all duration-300">
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>

            <Button
              variant="outline"
              className="gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-primary/20 hover:border-primary/30 shadow-sm disabled:opacity-70"
              onClick={exportToPDF}
              disabled={isExporting}
            >
              {isExporting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Exporting...
                </span>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Export Results
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-6 pt-4 border-t border-primary/10">
            <p>Thank you for taking our personality assessment.</p>
            <p className="mt-1">This analysis is based on your responses and is intended for personal growth.</p>
          </div>
        </motion.div>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 p-3 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground shadow-lg hover:bg-primary transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

