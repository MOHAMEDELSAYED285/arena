import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ExploreVenues = () => {
  const venues = [
    {
      id: 1,
      image: '/assets/basketball.jpg',
      title: 'Basketball Court',
      type: 'Indoor',
      stats: '12 Venues Available'
    },
    {
      id: 2,
      image: '/assets/tennis.jpg',
      title: 'Tennis Courts',
      type: 'Outdoor',
      stats: '8 Venues Available'
    },
    {
      id: 3,
      image: '/assets/football.jpg',
      title: 'Football Field',
      type: 'Outdoor',
      stats: '15 Venues Available'
    },
    {
      id: 4,
      image: '/assets/volleyball.jpg',
      title: 'Volleyball',
      type: 'Indoor',
      stats: '6 Venues Available'
    }
  ];

  return (
    <section className="bg-arena-orange py-32">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-5xl font-bold text-black mb-4">
            EXPLORE VENUES
          </h2>
          <p className="text-black/80 text-lg max-w-2xl">
            Discover and book the perfect venue for your game. We've partnered with top facilities across London.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {venues.map((venue) => (
            <motion.div
              key={venue.id}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="aspect-[4/5]">
                <Image
                  src={venue.image}
                  alt={venue.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{venue.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/80">{venue.type}</span>
                    <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {venue.stats}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreVenues;