import React, { useState } from 'react';
import Layout from '@/components/shared/Layout';
import { motion } from 'framer-motion';
import LoadingLogo from '@/components/shared/LoadingLogo';
import axios from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  phone: string;
  venueDetails: string;
}

export default function VenueOwnersPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    phone: '',
    venueDetails: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

// frontend/pages/venue-owners.tsx
// frontend/pages/venue-owners.tsx
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Log the data being sent
      console.log('Sending data:', formData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/venue-owners/`, 
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          subject: formData.subject || '',
          phone: formData.phone || '',
          venue_details: formData.venueDetails || ''
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Response:', response.data);

      if (response.data) {
        setSubmitted(true);
      }
    } catch (error: any) {
      console.error('Submission error:', error.response?.data || error);
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response?.data?.errors) {
        errorMessage = Object.entries(error.response.data.errors)
          .map(([field, errors]) => `${field}: ${errors}`)
          .join('\n');
      }
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
};
  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-600">
              We've received your details and will be in touch shortly with more information about getting your venue on ARENA.
            </p>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Are You A Venue?</h1>
            <p className="text-gray-600 text-lg">
              Ready to elevate your players' experience? Fill in your details below to get started and we'll send over a demo
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white rounded-2xl shadow-sm border p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                  First Name*
                </label>
                <input
                  required
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FFA50B] transition-colors"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  required
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FFA50B] transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email*
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FFA50B] transition-colors"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FFA50B] transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FFA50B] transition-colors"
              />
            </div>

            {/* Venue Details */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="venueDetails">
                Venue Name & Address
              </label>
              <textarea
                id="venueDetails"
                name="venueDetails"
                value={formData.venueDetails}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FFA50B] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFA50B] text-white py-4 rounded-xl font-semibold hover:bg-[#FFA50B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <LoadingLogo size={100} />
          <p className="mt-4 text-gray-600">Submitting your request...</p>
        </div>
      )}
    </Layout>
  );
}