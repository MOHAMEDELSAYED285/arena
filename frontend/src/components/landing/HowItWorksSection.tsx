'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Share2, PlayCircle } from 'lucide-react'
import { useRouter } from 'next/router'
import { useAuth } from '../../../contexts/AuthContext'

interface HowItWorksSectionProps {
  onGetStarted: () => void;
}

const steps = [
  {
    number: "01",
    title: "Find & Book",
    description: "Browse and book your preferred sports venues across London with real-time availability",
    icon: Calendar,
    imageUrl: "/assets/find-venue.png"
  },
  {
    number: "02",
    title: "Share & Split",
    description: "Invite your teammates and automatically split the costs. No more chasing payments",
    icon: Share2,
    imageUrl: "/assets/split-payment.png"
  },
  {
    number: "03",
    title: "Play & Enjoy",
    description: "Show up and play! We handle all the booking details so you can focus on your game",
    icon: PlayCircle,
    imageUrl: "/assets/play-game.png"
  }
];

export default function HowItWorksSection({ onGetStarted }: HowItWorksSectionProps) {
  const router = useRouter()
  const { user } = useAuth()

  const handleGetStarted = () => {
    const savedPreferences = localStorage.getItem('userQuizPreferences');
    
    if (savedPreferences && user) {
      // If user has saved preferences and is logged in, redirect to sessions
      const preferences = JSON.parse(savedPreferences);
      router.push({
        pathname: '/sessions',
        query: {
          location: preferences.location,
          sports: preferences.favouriteSports.join(','),
          fromQuiz: 'true'
        }
      });
    } else {
      // If no preferences or not logged in, show quiz modal
      onGetStarted();
    }
  };

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-black">HOW IT </span>
            <span className="text-[#FFA50B]">WORKS</span>
          </h2>
          <p className="text-gray-600">
            Book your next game in minutes with our seamless process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-bold">Step {step.number}</h3>
                <div className="w-12 h-12 rounded-full bg-[#FFA50B]/10 flex items-center justify-center">
                  {step.icon && <step.icon className="w-6 h-6 text-[#FFA50B]" />}
                </div>
              </div>
              
              <div className="relative h-48 mb-8">
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  fill
                  className="object-contain"
                />
              </div>

              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={handleGetStarted}
            className="bg-[#FFA50B] text-white px-12 py-4 rounded-full font-semibold hover:bg-[#FFA50B]/90 transition-colors mb-4"
          >
            Get Started Now
          </button>
          <p className="text-gray-500 text-sm">
            No credit card required • Free to get started
          </p>
        </div>
      </div>
    </section>
  )
}