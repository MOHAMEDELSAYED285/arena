'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, SplitSquareVertical } from 'lucide-react'

const offers = [
  {
    title: 'Centralized Venue Platform',
    description: 'All your venue bookings in one place. Find, compare, and book venues effortlessly.',
    icon: Building2
  },
  {
    title: 'Split-Pay for Group',
    description: 'Easily split costs between teammates. No more chasing payments or awkward money conversations.',
    icon: SplitSquareVertical
  },
  {
    title: 'Lobby: Find a Player',
    description: 'Connect with other players in your area. Never play short-handed again.',
    icon: Users
  }
]

export default function ArenaOffersSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(/assets/arena-logo.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '120px',
          backgroundPosition: 'center',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            What Arena <span className="text-[#F5A524]">Offers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-center w-16 h-16 bg-[#F5A524]/10 rounded-2xl mb-8 group-hover:bg-[#F5A524]/20 transition-colors duration-300">
                  <offer.icon 
                    className="w-8 h-8 text-[#F5A524]" 
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#F5A524] transition-colors duration-300">
                  {offer.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {offer.description}
                </p>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

