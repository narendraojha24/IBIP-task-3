"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      alert(`Thank you for subscribing with email: ${email}`)
      setEmail("")
    } else {
      alert("Please enter a valid email address")
    }
  }

  const handleSocialClick = (platform: string) => {
    // In a real app, these would link to actual social media pages
    const urls = {
      facebook: "https://facebook.com/shopkart",
      twitter: "https://twitter.com/shopkart",
      instagram: "https://instagram.com/shopkart",
      youtube: "https://youtube.com/shopkart",
    }

    // For demo purposes, just show an alert
    alert(`Redirecting to ${platform.charAt(0).toUpperCase() + platform.slice(1)} page...`)
    // In production: window.open(urls[platform], '_blank')
  }

  const handleContactClick = (type: string, value: string) => {
    if (type === "phone") {
      window.location.href = `tel:${value}`
    } else if (type === "email") {
      window.location.href = `mailto:${value}`
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">ShopKart</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your trusted shopping partner for the best deals on electronics, fashion, home essentials and more. Shop
              with confidence and enjoy fast delivery across India.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialClick("facebook")}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialClick("twitter")}
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialClick("instagram")}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => handleSocialClick("youtube")}
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/careers" className="block text-gray-400 hover:text-white transition-colors">
                Careers
              </Link>
              <Link href="/press" className="block text-gray-400 hover:text-white transition-colors">
                Press
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/returns" className="block text-gray-400 hover:text-white transition-colors">
                Returns & Refunds
              </Link>
              <Link href="/shipping" className="block text-gray-400 hover:text-white transition-colors">
                Shipping Info
              </Link>
              <Link href="/track-order" className="block text-gray-400 hover:text-white transition-colors">
                Track Your Order
              </Link>
              <Link href="/size-guide" className="block text-gray-400 hover:text-white transition-colors">
                Size Guide
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </form>
            <div className="space-y-2 pt-4">
              <button
                onClick={() => handleContactClick("phone", "1800-123-4567")}
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>1800-123-4567</span>
              </button>
              <button
                onClick={() => handleContactClick("email", "support@shopkart.com")}
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>support@shopkart.com</span>
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/security" className="hover:text-white transition-colors">
                Security
              </Link>
            </div>
            <div className="text-sm text-gray-400">© 2024 ShopKart. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
