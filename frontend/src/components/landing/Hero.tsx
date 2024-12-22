import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="w-full min-h-[calc(100vh-4rem)] bg-white flex items-center">
      <div className="max-w-[1400px] w-full mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-[3.5rem] leading-[1.1] font-bold tracking-tight">
                BOOK SPORTS VENUES.
                <br />
                FIND PLAYERS.
                <br />
                SPLIT PAYMENTS.
              </h1>
              <p className="text-gray-500 text-lg">
                Connect with players and venues in your area
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onGetStarted}
                className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-black/90 transition-colors"
              >
                Get Started
              </button>
              <button 
                className="bg-[#FF9F1C] text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FF9F1C]/90 transition-colors"
              >
                Download The App
              </button>
            </div>
          </div>
          
          {/* Right Side Image Grid */}
          <div className="relative w-full h-[550px] grid grid-cols-12 grid-rows-2 gap-4">
            {/* Football Field - Top Left */}
            <div className="col-span-7 row-span-1">
              <div className="relative w-full h-full overflow-hidden rounded-3xl">
                <Image
                  src="/assets/football.jpg"
                  alt="Football field"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Tennis Court - Right */}
            <div className="col-span-5 row-span-2 col-start-8">
              <div className="relative w-full h-full overflow-hidden rounded-3xl">
                <Image
                  src="/assets/tennis.jpg"
                  alt="Tennis court"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Basketball Court - Bottom Left */}
            <div className="col-span-7 row-span-1 row-start-2">
              <div className="relative w-full h-full overflow-hidden rounded-3xl">
                <Image
                  src="/assets/basketball.jpg"
                  alt="Basketball court"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;