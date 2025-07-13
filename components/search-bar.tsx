"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition

      if (!SpeechRecognition) {
        alert("Voice search is not supported in your browser. Please type your search.")
        return
      }

      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-IN"

      setIsListening(true)

      recognition.onstart = () => {
        console.log("Voice recognition started")
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSearchQuery(transcript)
        setIsListening(false)

        // Auto-search after voice input
        setTimeout(() => {
          if (transcript.trim()) {
            router.push(`/products?search=${encodeURIComponent(transcript.trim())}`)
          }
        }, 500)
      }

      recognition.onerror = () => {
        setIsListening(false)
        alert("Voice search failed. Please try again or type your search.")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (error) {
      setIsListening(false)
      alert("Voice search is not available. Please type your search.")
    }
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full bg-white border-0 focus:ring-2 focus:ring-orange-300 rounded-lg"
            />
          </div>
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg">
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={`bg-white border-white hover:bg-gray-50 ${isListening ? "animate-pulse" : ""}`}
            onClick={handleVoiceSearch}
            title="Voice Search"
            disabled={isListening}
          >
            <Mic className={`h-5 w-5 ${isListening ? "text-red-500" : "text-orange-600"}`} />
          </Button>
        </form>
      </div>
    </div>
  )
}
