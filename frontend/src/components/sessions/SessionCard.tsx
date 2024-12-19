import React from 'react';
import { Clock, MapPin, Users, DollarSign } from 'lucide-react';

interface SessionCardProps {
  sport: string;
  dateTime: string;
  location: string;
  gameSize: string;
  price: number;
  slotsRemaining: number;
  imageUrl?: string; // Make imageUrl optional
}

const SessionCard: React.FC<SessionCardProps> = ({
  sport,
  dateTime,
  location,
  gameSize,
  price,
  slotsRemaining,
  imageUrl = "/placeholder.svg?height=400&width=600" // Add default value
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
      <div className="relative h-32">
        <img 
          src={imageUrl}
          alt={sport}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <h3 className="text-lg font-bold text-white">{sport}</h3>
          <span className="bg-arena-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
            {slotsRemaining} slots left
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-arena-orange" />
            <span>{dateTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-arena-orange" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <Users className="w-5 h-5 text-arena-orange" />
          <span>{gameSize}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-arena-orange font-bold text-base">
            <DollarSign className="w-6 h-6" />
            <span>{price}</span>
          </div>
          <button 
            className="bg-arena-orange text-white px-6 py-2 rounded-full font-semibold 
                       hover:bg-arena-orange/90 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-arena-orange focus:ring-offset-2"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;

