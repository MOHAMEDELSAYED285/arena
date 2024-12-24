import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/shared/Layout';
import { CheckCircle } from 'lucide-react';

const BookingSuccessPage = () => {
  const router = useRouter();
  const { payment_intent, payment_intent_client_secret } = router.query;

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your booking. We've sent you an email with all the details.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/dashboard/bookings"
              className="block w-full bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-black/90 transition-colors"
            >
              View My Bookings
            </Link>
            
            <Link 
              href="/sessions"
              className="block w-full bg-gray-100 text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Browse More Sessions
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingSuccessPage;