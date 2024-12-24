'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ArenaDownloadSection = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle newsletter signup
  }

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Download CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8">
            GET IN THE GAME,
            <br />
            ANYTIME, ANYWHERE
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button 
              className="bg-[#F5A524] hover:bg-[#F5A524]/90 text-white font-bold text-lg px-12 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              DOWNLOAD THE APP
            </button>
          </motion.div>
        </motion.div>

        {/* Newsletter and Contact Section */}
        <div className="bg-[#F5A524] rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto">
              {/* Newsletter Form */}
              <div className="mb-16">
                <h3 className="text-black font-bold text-2xl mb-6">
                  SIGN UP FOR OUR NEWSLETTER
                </h3>
                <form onSubmit={handleSubmit} className="group">
                  <div className="flex items-center bg-white rounded-lg p-2 focus-within:ring-2 focus-within:ring-black/20 transition-shadow">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="flex-grow bg-transparent px-3 py-3 text-black placeholder:text-gray-500 focus:outline-none"
                      required
                    />
                    <button 
                      type="submit" 
                      className="bg-black text-white p-3 rounded-md hover:bg-black/90 transition-colors"
                      aria-label="Submit newsletter signup"
                    >
                      <ArrowRight className="h-6 w-6" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div>
                  <h3 className="text-black font-bold text-lg mb-4">CONTACT US</h3>
                  <a 
                    href="#" 
                    className="text-black/80 hover:text-black transition-colors"
                  >
                    Get in touch
                  </a>
                </div>
                
                <div>
                  <h3 className="text-black font-bold text-lg mb-4">FAQs</h3>
                  <a 
                    href="#" 
                    className="text-black/80 hover:text-black transition-colors"
                  >
                    Common questions
                  </a>
                </div>
                
                <div>
                  <h3 className="text-black font-bold text-lg mb-4">FOLLOW US</h3>
                  <div className="flex gap-4">
                    <a 
                      href="#" 
                      className="text-black/80 hover:text-black transition-colors"
                    >
                      Twitter
                    </a>
                    <a 
                      href="#" 
                      className="text-black/80 hover:text-black transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="text-center">
                <h2 className="text-black text-5xl font-black tracking-tight inline-block border-t-4 border-black pt-6">
                  ARENA
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArenaDownloadSection

