'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Twitter, Instagram, Facebook, Youtube, MapPin, Mail, Phone } from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Blog", href: "/blog" }
      ]
    },
    {
      title: "SUPPORT",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Safety", href: "/safety" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" }
      ]
    },
    {
      title: "VENUES",
      links: [
        { label: "List Your Venue", href: "/list-venue" },
        { label: "Venue Solutions", href: "/solutions" },
        { label: "Partner Program", href: "/partners" },
        { label: "Success Stories", href: "/stories" }
      ]
    }
  ]

  const contactInfo = [
    { icon: MapPin, text: "123 Sports Avenue, CA 94105" },
    { icon: Phone, text: "(555) 123-4567" },
    { icon: Mail, text: "hello@arena.com" }
  ]

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ]

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Logo and Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-3xl font-black">ARENA</h2>
            </Link>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-600">
                  <item.icon className="h-5 w-5 text-[#F5A524]" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-[#F5A524] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="flex gap-6 mb-4 md:mb-0">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="text-gray-600 hover:text-[#F5A524] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Arena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

