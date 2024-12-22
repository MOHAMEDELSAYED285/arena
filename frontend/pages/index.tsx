import React, { useState } from 'react';
import Layout from '@/components/shared/Layout';
import Hero from '@/components/landing/Hero';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import ExploreVenues from '@/components/landing/ExploreVenues';
import ArenaOffersSection from '@/components/landing/ArenaOffersSection';
import QuizModal from '@/components/landing/QuizModal';

const HomePage = () => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  return (
    <Layout>
      <Hero onGetStarted={() => setIsQuizModalOpen(true)} />
      <HowItWorksSection />
      <ExploreVenues />
      <ArenaOffersSection />
      <QuizModal 
        isOpen={isQuizModalOpen} 
        onClose={() => setIsQuizModalOpen(false)} 
      />
    </Layout>
  );
};

export default HomePage;