"use client"

import { useState, useEffect } from "react"

const roles = ["CTF Player", "Cybersecurity Enthusiast", "AI/ML Explorer", "Problem Solver", "Tech Innovator"]

export function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % roles.length)
        setIsVisible(true)
      }, 300)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`text-blue-400 font-semibold transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {roles[currentIndex]}
    </span>
  )
}
