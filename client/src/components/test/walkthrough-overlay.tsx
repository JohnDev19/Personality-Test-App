"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronRight, Check, HelpCircle } from "lucide-react"

interface WalkthroughStep {
  element: string
  title: string
  description: string
  position: "top" | "bottom" | "left" | "right"
  icon?: React.ReactNode
}

const steps: WalkthroughStep[] = [
  {
    element: ".progress-bar",
    title: "Track Your Progress",
    description: "See how far you've come in discovering your personality type.",
    position: "bottom",
    icon: (
      <div className="bg-blue-100 p-2 rounded-full text-blue-600">
        <ChevronRight size={20} />
      </div>
    ),
  },
  {
    element: ".rating-scale",
    title: "Rate Your Agreement",
    description:
      "Use the 1-7 scale to indicate how much you agree with each statement. 1 means strongly disagree, 7 means strongly agree.",
    position: "top",
    icon: (
      <div className="bg-purple-100 p-2 rounded-full text-purple-600">
        <HelpCircle size={20} />
      </div>
    ),
  },
  {
    element: ".neutral-marker",
    title: "Neutral Position",
    description: "The middle value (4) represents a neutral stance if you're unsure or neither agree nor disagree.",
    position: "bottom",
    icon: (
      <div className="bg-green-100 p-2 rounded-full text-green-600">
        <Check size={20} />
      </div>
    ),
  },
]

export default function WalkthroughOverlay({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (isVisible) {
      const measureDiv = document.createElement("div")
      measureDiv.style.position = "absolute"
      measureDiv.style.visibility = "hidden"
      measureDiv.style.maxWidth = "90vw"
      document.body.appendChild(measureDiv)

      let maxWidth = 0
      let maxHeight = 0

      steps.forEach((step) => {
        measureDiv.innerHTML = `
          <h3 class="text-lg font-semibold">${step.title}</h3>
          <p class="mt-2">${step.description}</p>
        `

        const width = measureDiv.offsetWidth
        const height = measureDiv.offsetHeight

        maxWidth = Math.max(maxWidth, width)
        maxHeight = Math.max(maxHeight, height)
      })

      maxWidth += 48
      maxHeight += 120

      setModalSize({
        width: Math.min(maxWidth, window.innerWidth - 32),
        height: maxHeight,
      })

      document.body.removeChild(measureDiv)
    }
  }, [isVisible])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setIsVisible(false)
      setTimeout(onComplete, 300)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 sm:px-0">
      <div
        className="w-full max-w-md mx-auto"
        style={{
          minHeight: modalSize.height > 0 ? `${modalSize.height}px` : "auto",
          minWidth: modalSize.width > 0 ? `${modalSize.width}px` : "auto",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
            style={{
              minHeight: modalSize.height > 0 ? `${modalSize.height}px` : "auto",
            }}
          >
            <div className="relative">
              {/* Decorative top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80" />

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4 mb-4">
                  {steps[currentStep].icon || (
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <ChevronRight size={20} />
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      {steps[currentStep].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
                      {steps[currentStep].description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex gap-1.5">
                    {steps.map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8 }}
                        animate={{
                          scale: index === currentStep ? 1 : 0.8,
                          backgroundColor:
                            index === currentStep
                              ? "var(--primary)"
                              : index < currentStep
                                ? "var(--primary-light)"
                                : "var(--muted)",
                        }}
                        className={`h-1.5 rounded-full`}
                        style={{
                          width: index === currentStep ? "2rem" : "0.75rem",
                          "--primary": "rgb(var(--primary))",
                          "--primary-light": "rgba(var(--primary), 0.6)",
                          "--muted": "rgb(var(--muted))",
                        }}
                      />
                    ))}
                  </div>
                  <Button onClick={handleNext} className="relative overflow-hidden group">
                    <span className="relative z-10">{currentStep === steps.length - 1 ? "Get Started" : "Next"}</span>
                    <motion.span
                      className="absolute inset-0 bg-primary-foreground/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

