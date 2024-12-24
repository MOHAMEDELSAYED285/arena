import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ExploreVenues = () => {
  const venues = [
    {
      id: 1,
      image: '/assets/football.jpg',
      title: 'Football',
      properties: '12 Available Venues'
    },
    {
      id: 2,
      image: '/assets/basketball.jpg',
      title: 'Basketball',
      properties: '8 Available Venues'
    },
    {
      id: 3,
      image: '/assets/tennis.jpeg',
      title: 'Tennis',
      properties: '15 Available Venues'
    },
    {
      id: 4,
      image: '/assets/cricket.jpg',
      title: 'Cricket',
      properties: '6 Available Venues'
    },
    {
      id: 5,
      image: '/assets/rugby.jpg',
      title: 'Rugby',
      properties: '10 Available Venues'
    }
  ];

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.querySelector('.overflow-x-auto');
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="explore-venues" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-4">
            <span className="text-4xl block text-black mb-2">EXPLORE VENUES</span>
            <span className="text-2xl text-[#FFA50B]">Find Your Perfect Match</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Discover and book premium sports facilities across London. From indoor courts to outdoor pitches, 
            find the perfect venue for your game.
          </p>
        </div>

        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
            {venues.map((venue) => (
              <motion.div
                key={venue.id}
                className="flex-shrink-0 w-72 cursor-pointer group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative w-full h-96 rounded-3xl overflow-hidden mb-4">
                  <Image
                    src={venue.image}
                    alt={venue.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="text-lg font-semibold">{venue.title}</h3>
                      <p className="text-sm text-white/80">{venue.properties}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            className="absolute top-1/2 -left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            onClick={() => scrollContainer('left')}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button
            className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            onClick={() => scrollContainer('right')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ExploreVenues;