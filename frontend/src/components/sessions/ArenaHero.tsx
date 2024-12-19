import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const ArenaHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-4 pt-32 pb-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="max-w-[90rem] mx-auto text-center mb-16"
          variants={itemVariants}
          style={{ y: textY }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-[3.5rem] font-bold tracking-tight leading-none">
            <div className="inline-block whitespace-nowrap">BOOK SPORTS VENUES, FIND PLAYERS,</div>
            <div className="mt-4">AND SPLIT PAYMENTS.</div>
          </h1>
          <div className="flex flex-col items-center space-y-6 mt-12">
            <motion.button
              className="bg-[#FFA50B] text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#FF9500] transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              DOWNLOAD THE APP
            </motion.button>
            <motion.button
              className="text-black font-bold text-lg hover:text-gray-600 transition-colors"
              whileHover={{ y: -2 }}
            >
              BOOK A VENUE
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Image with Parallax Effect */}
        <motion.div 
          className="relative w-full h-[600px] mb-32"
          variants={itemVariants}
          style={{
            scale: imageScale,
            opacity: imageOpacity
          }}
        >
          <Image
            src="https://i.ibb.co/pPzS574/Screenshot-2024-12-19-at-11-03-Background-Removed-03-PM.png"
            alt="Sports Courts"
            fill
            className="object-cover brightness-90"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
        </motion.div>

        {/* Explore Venues Section */}
        <motion.div 
          className="bg-[#FFA50B] -mx-4 px-4 py-24"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
            EXPLORE VENUES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={`/venue-${index}.jpg`}
                  alt={`Venue ${index}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArenaHero;

