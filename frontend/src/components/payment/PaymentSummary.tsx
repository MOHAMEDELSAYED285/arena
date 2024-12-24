import React from 'react';
import { Calendar, MapPin, Users, Info } from 'lucide-react';

interface SessionDetails {
  id: number;
  sport: string;
  date_time: string;  // Changed from dateTime to match backend
  location: string;
  game_size: string;  // Changed from gameSize to match backend
  price: number;
}

interface PaymentSummaryProps {
  session: SessionDetails;
}

const PaymentSummary = ({ session }: PaymentSummaryProps) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>
        
        <div className="space-y-6">
          {/* Session Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">{session.sport} Session</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(session.date_time).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{session.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{session.game_size}</span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="pt-6 border-t space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Session Price</span>
              <span>{formatPrice(session.price)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service Fee</span>
              <span>{formatPrice(session.price * 0.1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">VAT</span>
              <span>{formatPrice(session.price * 0.2)}</span>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">
                  {formatPrice(session.price * 1.3)}
                </span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="pt-6 border-t">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Info className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">Cancellation Policy</p>
                <p className="text-sm text-gray-600">
                  Free cancellation up to 24 hours before the session starts. 
                  After that, a 50% refund will be provided if cancelled at least 
                  6 hours before the start time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;