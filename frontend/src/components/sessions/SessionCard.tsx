import React from 'react';
import Image from 'next/image';
import { Clock, MapPin, Users } from 'lucide-react';

interface SessionCardProps {
  sport: string;
  dateTime: string;
  location: string;
  gameSize: string;
  price: number | string;
  slotsRemaining: number;
  matchScore?: number;
}

const formatPrice = (price: number | string): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `£${numericPrice.toFixed(2)}`;
};

const getVenueCategoryImage = (sport: string): string => {
  const sportImages: { [key: string]: string } = {
    'FOOTBALL': '/football-venue.jpg',
    'BASKETBALL': '/basketball-venue.jpg',
    'TENNIS': '/tennis-venue.jpg',
    'CRICKET': '/cricket-venue.jpg',
    'RUGBY': '/rugby-venue.jpg'
  };

  return sportImages[sport] || '/default-venue.jpg';
};

const SessionCard: React.FC<SessionCardProps> = ({
  sport,
  dateTime,
  location,
  gameSize,
  price,
  slotsRemaining,
  matchScore
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48">
        <div className="relative w-full h-full">
          <Image 
            src={getVenueCategoryImage(sport)}
            alt={`${sport} venue`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Match Score Badge */}
        {matchScore !== undefined && matchScore > 0 && (
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm text-black px-3 py-1.5 rounded-full text-sm font-medium">
              {Math.round(matchScore * 100)}% Match
            </div>
          </div>
        )}

        {/* Sport Title & Slots */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <h3 className="text-xl font-bold text-white">{sport}</h3>
          <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1.5 rounded-full text-sm font-medium">
            {slotsRemaining} slots left
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Date & Location */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Time</span>
            </div>
            <p className="font-medium">{dateTime}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Location</span>
            </div>
            <p className="font-medium">{location}</p>
          </div>
        </div>

        {/* Game Size */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500">
            <Users className="w-4 h-4" />
            <span className="text-sm">Game Size</span>
          </div>
          <p className="font-medium">{gameSize}</p>
        </div>

        {/* Price & Book Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold">{formatPrice(price)}</span>
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-black/90 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;