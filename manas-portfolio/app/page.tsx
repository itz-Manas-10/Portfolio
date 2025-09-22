"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import { AnimatedText } from "@/components/animated-text"
import { useState, useEffect } from "react"

export default function Portfolio() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [formStatus, setFormStatus] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(type)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px",
      },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
    script.onload = () => {
      // @ts-ignore
      window.emailjs?.init({
        publicKey: "tI6TBfqJrsTsXRX02",
      })
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus("")

    const form = e.currentTarget
    const formData = new FormData(form)

    const templateParams = {
      from_name: formData.get("name"),
      from_email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      to_email: "manasagrawal8790@gmail.com", // Explicitly set recipient
    }

    console.log("[v0] Sending email with params:", templateParams)

    try {
      // @ts-ignore
      const result = await window.emailjs?.send("service_a9owdvn", "template_36ljlev", templateParams)

      console.log("[v0] EmailJS result:", result)
      setFormStatus("✅ Message sent successfully!")
      form.reset()
    } catch (error) {
      console.error("[v0] EmailJS error:", error)
      setFormStatus(`❌ Failed to send message: ${error.text || error.message || "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setFormStatus(""), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/tempest-logo-cyan.png" alt="Tempest" className="h-15 w-48 object-contain" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("education")}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Education
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>

            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="https://github.com/itz-Manas-10" target="_blank">
                <Github className="w-4 h-4 mr-2" />
                Github Profile
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Hi, I am
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Manas Agrawal
                  </span>
                </h1>
                <p className="text-xl text-blue-200">
                  I am a <AnimatedText />
                </p>
                <p className="text-lg text-slate-200 leading-relaxed max-w-2xl">
                  A passionate and driven 2nd-year Computer Science and Engineering student at VIT Chennai, with a
                  strong focus on Cybersecurity, AI/ML, and building real-world tech solutions fueled by innovation and
                  curiosity.
                </p>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
              >
                <Link
                  href="https://acrobat.adobe.com/id/urn:aaid:sc:AP:42bd212c-57a4-4e7f-b592-f9b7aa4d51a4"
                  target="_blank"
                >
                  Check Resume
                </Link>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-22%20at%2022.08.40_4f8cedd9.jpg-Fl1BK4zytmPKOtt9tdQAHCVm4MErSz.jpeg"
                      alt="Manas Agrawal"
                      className="w-72 h-72 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-6 bg-slate-950/50 transition-all duration-1000 ${
          visibleSections.has("about") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardContent className="p-8">
              <p className="text-lg text-slate-200 leading-relaxed">
                I am a motivated and versatile individual, always eager to take on new challenges. With a passion for
                learning, I am dedicated to delivering high-quality results. With a positive attitude and a growth
                mindset, I am ready to make a meaningful contribution and achieve great things in the field of
                technology, particularly in cybersecurity and artificial intelligence.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 px-6 transition-all duration-1000 delay-200 ${
          visibleSections.has("skills") ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-95 rotate-1"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Skills</h2>
          <p className="text-center text-slate-300 mb-12 text-lg">
            Here are some of my skills on which I have been working on for the past 2 years.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-950/70 border-2 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-float">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-blue-300">Programming Languages</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <span className="text-slate-200">C</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">C++</span>
                    </div>
                    <span className="text-slate-200">C++</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PY</span>
                    </div>
                    <span className="text-slate-200">Python</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">J</span>
                    </div>
                    <span className="text-slate-200">Java</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-950/70 border-2 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-float-delayed">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-purple-300">Tools & Platforms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">L</span>
                    </div>
                    <span className="text-slate-200">Linux</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="text-slate-200">Git/GitHub</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VS</span>
                    </div>
                    <span className="text-slate-200">VS Code</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">GC</span>
                    </div>
                    <span className="text-slate-200">Google Cloud</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">W</span>
                    </div>
                    <span className="text-slate-200">Wireshark</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-orange-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B</span>
                    </div>
                    <span className="text-slate-200">Burp Suite</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-950/70 border-2 border-slate-700/50 hover:border-blue-500/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-float">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-blue-400">Cybersecurity</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">N</span>
                    </div>
                    <span className="text-slate-200">Networking</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B</span>
                    </div>
                    <span className="text-slate-200">Bash Scripting</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">W</span>
                    </div>
                    <span className="text-slate-200">WiFi Security</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-slate-200">Phishing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-950/70 border-2 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-float-delayed">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center text-purple-400">Others</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">O</span>
                    </div>
                    <span className="text-slate-200">OOPS</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">D</span>
                    </div>
                    <span className="text-slate-200">DSA</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-slate-200">Problem Solving</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-slate-900/70 rounded-lg p-3 border border-slate-700/50 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:bg-slate-800/70">
                    <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <span className="text-slate-200">Generative AI</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className={`py-20 px-6 bg-slate-950/30 relative overflow-hidden transition-all duration-1000 delay-300 ${
          visibleSections.has("experience") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">WHAT I'VE DONE SO FAR</p>
            <h2 className="text-5xl font-bold text-white">Work Experience.</h2>
          </div>

          <div className="relative">
            {/* Diagonal background element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-900 transform skew-x-12 origin-top-right"></div>

            {/* Timeline container */}
            <div className="relative z-10 flex flex-col items-center space-y-12">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-600"></div>

              {/* Experience 1 - Technical Member OSPC */}
              <div className="flex items-center w-full max-w-4xl">
                <div className="w-1/2 pr-8 text-right">
                  <Card className="bg-slate-800/80 border-slate-600/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">TECHNICAL MEMBER</h3>
                      <p className="text-slate-300 text-sm mb-4">OSPC CYBERSECURITY AND BLOCKCHAIN</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative z-20">
                  <div className="w-16 h-16 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">OS</span>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 pl-8">
                  <p className="text-slate-300 font-medium">OCT 2024 - PRESENT</p>
                </div>
              </div>

              {/* Experience 2 - Product Design & Manufacturing */}
              <div className="flex items-center w-full max-w-4xl">
                <div className="w-1/2 pr-8 text-right">
                  <p className="text-slate-300 font-medium">JUN 2025 - PRESENT</p>
                </div>

                <div className="relative z-20">
                  <div className="w-16 h-16 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PD</span>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 pl-8">
                  <Card className="bg-slate-100 border-slate-300 text-slate-900">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">PRODUCT DESIGN & MANUFACTURER</h3>
                      <p className="text-slate-600 text-sm">PRODINNO CLUB</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Resume Download Section */}
              <div className="flex items-center w-full max-w-4xl mt-16">
                <div className="w-1/2 pr-8"></div>

                <div className="relative z-20">
                  <div className="w-16 h-16 bg-slate-700 rounded-full border-4 border-slate-600 flex items-center justify-center">
                    <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">↓</span>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 pl-8">
                  <Card className="bg-slate-100 border-slate-300">
                    <CardContent className="p-6 text-center">
                      <Button asChild className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3">
                        <Link
                          href="https://acrobat.adobe.com/id/urn:aaid:sc:AP:42bd212c-57a4-4e7f-b592-f9b7aa4d51a4"
                          target="_blank"
                        >
                          MY RESUME ↓
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 px-6 bg-slate-950/20 transition-all duration-1000 delay-400 ${
          visibleSections.has("projects") ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-90"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-950/50 border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-float">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">IoT Systems</h3>
                <p className="text-slate-300 mb-4">Smart Irrigation & Smart Dustbin</p>
                <p className="text-slate-200 mb-4">
                  Automated waste management and water-efficient irrigation solutions using Arduino, sensors, and Python
                  for real-world environmental challenges.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    Arduino
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    Sensors
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    Python
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-950/50 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-float-delayed">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">ISHAL Assistant</h3>
                <p className="text-slate-300 mb-4">AI-driven Virtual Assistant</p>
                <p className="text-slate-200 mb-4">
                  Voice commands, text-to-speech, and system automation with modular command execution using Python,
                  NLP, and Speech Recognition.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    Python
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    NLP
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    Speech Recognition
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className={`py-20 px-6 transition-all duration-1000 delay-500 ${
          visibleSections.has("education")
            ? "opacity-100 -translate-x-0 rotate-0"
            : "opacity-0 -translate-x-16 -rotate-2"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Education</h2>
          <div className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-blue-400">B.Tech in Computer Science & Engineering</h3>
                  <span className="text-slate-300">2024–2028</span>
                </div>
                <p className="text-slate-200 mb-2">VIT Chennai</p>
                <p className="text-purple-400 font-semibold">CGPA: 9.29/10</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-purple-400">Senior High School</h3>
                  <span className="text-slate-300">2022–2024</span>
                </div>
                <p className="text-slate-200 mb-2">Global Public School & Junior College</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-blue-400">Primary & Secondary Education</h3>
                  <span className="text-slate-300">2012–2022</span>
                </div>
                <p className="text-slate-200 mb-2">Podar International School</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 px-6 bg-slate-950/30 transition-all duration-1000 delay-600 ${
          visibleSections.has("contact") ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Contact</h2>
          <p className="text-center text-slate-300 mb-12 text-lg">
            Feel free to reach out to me for any questions or opportunities!
          </p>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left side - Contact information */}
            <div className="order-1">
              <Card className="bg-slate-950/50 border-slate-700/50">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-blue-400" />
                      <button
                        onClick={() => copyToClipboard("+91 9423748938", "phone")}
                        className="text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        +91 9423748938
                        {copiedItem === "phone" && <span className="ml-2 text-green-400 text-sm">Copied!</span>}
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-purple-400" />
                      <button
                        onClick={() => copyToClipboard("manasagrawal8790@gmail.com", "email")}
                        className="text-slate-200 hover:text-purple-400 transition-colors cursor-pointer"
                      >
                        manasagrawal8790@gmail.com
                        {copiedItem === "email" && <span className="ml-2 text-green-400 text-sm">Copied!</span>}
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="w-6 h-6 text-blue-400" />
                      <Link
                        href="https://maps.app.goo.gl/rEa2yJHLyoREP9y2A"
                        target="_blank"
                        className="text-slate-200 hover:text-blue-400 transition-colors"
                      >
                        Orange Building, Dream Citi, Nashik
                      </Link>
                    </div>

                    <div className="pt-6 space-y-4">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                      >
                        <Link href="https://github.com/itz-Manas-10" target="_blank">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub Profile
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                      >
                        <Link href="https://www.linkedin.com/in/manas-agrawal8790/" target="_blank">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn Profile
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white bg-transparent"
                      >
                        <Link href="https://leetcode.com/u/Manas8790/" target="_blank">
                          <div className="w-4 h-4 mr-2 bg-orange-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">LC</span>
                          </div>
                          LeetCode Profile
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Email form */}
            <div className="order-2">
              <Card className="bg-slate-950/50 border-slate-700/50">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <h3 className="text-2xl font-semibold text-blue-300">Email Me</h3>
                      <span className="text-2xl">🚀</span>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <textarea
                          name="message"
                          placeholder="Message"
                          rows={6}
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                        ></textarea>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Send"}
                      </Button>

                      {formStatus && (
                        <div
                          className={`text-center mt-4 ${formStatus.includes("✅") ? "text-green-400" : "text-red-400"}`}
                        >
                          {formStatus}
                        </div>
                      )}
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-700">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-300">© 2024 Manas Agrawal. Built with passion for technology and innovation.</p>
        </div>
      </footer>
    </div>
  )
}
