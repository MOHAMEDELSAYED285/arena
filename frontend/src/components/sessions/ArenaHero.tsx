import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const ArenaHero: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Instead of using Image component for GIF, use regular img tag
  const HeroGif = () => (
    <div className="relative w-full h-[600px]">
      <img
        src="/assets/arena-hero.gif"
        alt="Arena Animation"
        className="w-full h-full object-contain"
        style={{ maxWidth: '100%', margin: '0 auto' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
    </div>
  );

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 pt-32 pb-32">
          <div className="max-w-[90rem] mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-[3.5rem] font-bold tracking-tight leading-none">
              <div className="inline-block whitespace-nowrap">BOOK SPORTS VENUES, FIND PLAYERS,</div>
              <div className="mt-4">AND SPLIT PAYMENTS.</div>
            </h1>
            <div className="flex flex-col items-center space-y-6 mt-12">
              <button className="bg-[#FFA50B] text-black px-10 py-4 rounded-lg font-bold text-lg">
                DOWNLOAD THE APP
              </button>
              <button className="text-black font-bold text-lg">
                BOOK A VENUE
              </button>
            </div>
          </div>
          <HeroGif />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <motion.div 
        className="container mx-auto px-4 pt-32 pb-32"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        <motion.div 
          className="max-w-[90rem] mx-auto text-center mb-16"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 100 }
            }
          }}
          style={{ y: textY }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-[3.5rem] font-bold tracking-tight leading-none">
            <div className="inline-block whitespace-nowrap">BOOK SPORTS VENUES, FIND PLAYERS,</div>
            <div className="mt-4">AND SPLIT PAYMENTS.</div>
          </h1>
          
          <div className="flex flex-col items-center space-y-6 mt-12">
            <motion.button
              className="bg-[#FFA50B] text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#FF9500] transition-all duration-300"
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

        {/* Hero GIF with Parallax Effect */}
        <motion.div 
          className="mb-32"
          style={{
            scale: imageScale,
            opacity: imageOpacity
          }}
        >
          <HeroGif />
        </motion.div>


      </motion.div>
    </div>
  );
};

export default ArenaHero;