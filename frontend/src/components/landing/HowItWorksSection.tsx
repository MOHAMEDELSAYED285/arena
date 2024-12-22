import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

// 1. Define the possible tabs as a type
type TabType = 'players' | 'venues';

// 2. Define the shape of each step
interface StepData {
  title: string;
  description: string;
  image: string;
}

// 3. Define the shape of the steps object
interface Steps {
  players: StepData[];
  venues: StepData[];
}

const HowItWorksSection: React.FC = () => {
  // 4. Annotate activeTab with the TabType
  const [activeTab, setActiveTab] = useState<TabType>('players');

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // 5. Annotate steps as Steps
  const steps: Steps = {
    players: [
      {
        title: 'Find and Book Venues',
        description:
          'Discover nearby courts and fields. Filter by sport, location, and amenities.',
        image: '/assets/explore-venue.jpg',
      },
      {
        title: 'Choose Your Time',
        description:
          'See real-time availability and instantly book your preferred slot.',
        image: '/assets/select-time.jpg',
      },
      {
        title: 'Share With Team',
        description:
          'Split costs automatically and manage team payments in one place.',
        image: '/assets/split-payment.jpg',
      },
    ],
    venues: [
      {
        title: 'List Your Space',
        description:
          'Create your venue profile with photos, amenities, and pricing.',
        image: '/assets/list-venue.jpg',
      },
      {
        title: 'Accept Bookings',
        description:
          'Manage your calendar and handle bookings with ease.',
        image: '/assets/manage-bookings.jpg',
      },
      {
        title: 'Track Performance',
        description:
          'Monitor bookings, revenue, and ratings all in one dashboard.',
        image: '/assets/grow-business.jpg',
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="py-20 bg-gray-50"
      aria-labelledby="how-it-works-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            id="how-it-works-title"
            className="text-4xl font-bold text-gray-900"
          >
            How It <span className="text-arena-orange">Works</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="mb-12 flex justify-center">
          <div
            className="inline-flex rounded-lg bg-white p-1 shadow-sm"
            role="tablist"
            aria-label="User type selection"
          >
            {(['players', 'venues'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative rounded-md px-8 py-2.5 text-sm font-medium transition-all duration-200 
                  ${
                    activeTab === tab
                      ? 'text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`${tab}-panel`}
                id={`${tab}-tab`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-md bg-arena-orange"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
                <span className="relative z-10 capitalize">
                  {tab === 'players' ? 'For Players' : 'For Venues'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          role="tabpanel"
          id={`${activeTab}-panel`}
          aria-labelledby={`${activeTab}-tab`}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
        >
          <AnimatePresence mode="wait">
            {
              /* 6. Provide types for `step` and `index` */
              steps[activeTab].map((step: StepData, index: number) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  variants={cardVariants}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 33vw,
                             400px"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-arena-orange/10 text-sm font-semibold text-arena-orange">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))
            }
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
