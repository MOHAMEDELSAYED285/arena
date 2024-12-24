import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import Layout from '@/components/shared/Layout';
import PaymentSummary from '@/components/payment/PaymentSummary';
import StripePaymentWrapper from '@/components/payment/StripePayment';
import { useAuth } from '../../../contexts/AuthContext';
import { ArrowLeft, Clock, MapPin, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface SessionDetails {
  id: number;
  sport: string;
  date_time: string;
  location: string;
  game_size: string;
  price: number;
}

const BookingConfirmationPage = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const [session, setSession] = useState<SessionDetails | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Review, 2: Payment
  const { user } = useAuth();

  // Fetch session details and create payment intent
  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
        setError('Request timed out. Please try again.');
      }
    }, 15000);

    const fetchData = async () => {
      if (!sessionId) return;

      try {
        if (!user) {
          router.push({
            pathname: '/login',
            query: { returnUrl: `/booking/confirmation/${sessionId}` }
          });
          return;
        }

        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        // Fetch session details
        const sessionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sessions/${sessionId}/`,
          config
        );

        if (isMounted) {
          setSession(sessionResponse.data);

          // Create payment intent
          const paymentResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent/`,
            { 
              session_id: sessionId,
              amount: sessionResponse.data.price * 100 
            },
            config
          );

          if (paymentResponse.data?.clientSecret) {
            setClientSecret(paymentResponse.data.clientSecret);
          } else {
            throw new Error('No client secret received');
          }

          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Error in booking confirmation:', err);
          setError(
            err.response?.data?.error || 
            err.message || 
            'Failed to load booking details'
          );
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [sessionId, router, user]);

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      <div className="relative flex items-center max-w-2xl w-full">
        <div className="flex-1 flex items-center">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
            } font-semibold`}
            animate={{ scale: step === 1 ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            1
          </motion.div>
          <div className="flex-1 mx-4">
            <motion.div
              className="h-1 bg-gray-200"
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: 1,
                backgroundColor: step >= 2 ? '#000' : '#e5e7eb'
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        <motion.div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
          } font-semibold`}
          animate={{ scale: step === 2 ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          2
        </motion.div>

        <div className="absolute -bottom-8 left-0 w-full flex justify-between text-sm">
          <span className={step >= 1 ? 'text-black' : 'text-gray-500'}>
            Review Booking
          </span>
          <span className={step >= 2 ? 'text-black' : 'text-gray-500'}>
            Payment
          </span>
        </div>
      </div>
    </div>
  );

  const renderSessionPreview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm border overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={`/assets/${session?.sport.toLowerCase()}.jpg`}
          alt={session?.sport || 'Sport venue'}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white">{session?.sport}</h3>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Time</span>
            </div>
            <p className="font-medium">
              {new Date(session?.date_time || '').toLocaleString()}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Location</span>
            </div>
            <p className="font-medium">{session?.location}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-500">
              <Users className="w-4 h-4" />
              <span className="text-sm">Game Size</span>
            </div>
            <p className="font-medium">{session?.game_size}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(2)}
          className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-black/90 transition-all"
        >
          Continue to Payment
        </motion.button>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 text-center"
          >
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-lg">Loading booking details...</p>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
            <p className="text-gray-600 mb-6">
              Something went wrong while loading your booking details. 
              Please try again or contact support if the problem persists.
            </p>
            <Link 
              href="/sessions" 
              className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sessions
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/sessions" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sessions
          </Link>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-4"
          >
            {step === 1 ? 'Review Booking' : 'Complete Payment'}
          </motion.h1>
          
          {renderStepIndicator()}
          
          <div className="space-y-8">
            {step === 1 ? (
              session && renderSessionPreview()
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {session && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
<PaymentSummary session={{
  id: session.id,
  sport: session.sport,
  date_time: session.date_time,
  location: session.location,
  game_size: session.game_size,
  price: session.price
}} />                    </motion.div>
                    {clientSecret && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <StripePaymentWrapper
                          clientSecret={clientSecret}
                          sessionId={sessionId as string}
                          amount={session.price * 100}
                          onSuccess={() => router.push('/booking/success')}
                          onError={(error) => setError(error)}
                        />
                        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-900 mb-1">
                                Secure Payment
                              </p>
                              <p className="text-sm text-gray-600">
                                Your payment is processed securely by Stripe. 
                                Your card details are never stored on our servers.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmationPage;