import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, SplitSquareVertical } from 'lucide-react';

const ArenaOffersSection = () => {
  const offers = [
    {
      title: 'CENTRALIZED VENUE PLATFORM',
      description: 'All your favorite sports venues in one place. Find, compare, and book venues effortlessly.',
      icon: Building2
    },
    {
      title: 'SPLIT-PAY FOR GROUP',
      description: 'Share costs easily with your teammates. No more chasing payments or awkward money conversations.',
      icon: SplitSquareVertical
    },
    {
      title: 'LOBBY: FIND A PLAYER',
      description: 'Never play short-handed again. Connect with players in your area and complete your team.',
      icon: Users
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex flex-col items-start mb-20">
          <h2 className="text-5xl font-bold">
            WHAT ARENA <span className="text-arena-orange">OFFERS</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            We're revolutionizing how sports venues are booked and games are organized.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="mb-6 p-4 rounded-2xl bg-gray-50 w-fit group-hover:bg-black/5 transition-colors">
                <offer.icon 
                  className="w-8 h-8 text-arena-orange" 
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">{offer.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{offer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArenaOffersSection;