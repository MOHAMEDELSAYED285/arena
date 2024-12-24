import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { MapPin, Flame, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';

interface FormData {
  fullName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  location: string;
  favouriteSports: string[];
}

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  location?: string;
  favouriteSports?: string;
  submit?: string;
}

interface QuizFormProps {
  onClose: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ onClose }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    location: '',
    favouriteSports: []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  // Load user preferences from backend or localStorage
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/quiz-preferences/user/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );

          const { preferences } = response.data;
          if (preferences) {
            setFormData(prev => ({
              ...prev,
              ...preferences
            }));
          }
        } catch (error) {
          console.error('Error loading preferences:', error);
          // Fallback to localStorage if API fails
          loadLocalPreferences();
        }
      } else {
        loadLocalPreferences();
      }
    };

    const loadLocalPreferences = () => {
      const savedPreferences = localStorage.getItem('userQuizPreferences');
      if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        setFormData(prev => ({
          ...prev,
          location: preferences.location || '',
          favouriteSports: preferences.favouriteSports || []
        }));
      }
    };

    loadUserPreferences();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSportSelection = (sport: string) => {
    setFormData(prev => {
      const sports = prev.favouriteSports.includes(sport)
        ? prev.favouriteSports.filter(s => s !== sport)
        : [...prev.favouriteSports, sport];
      return { ...prev, favouriteSports: sports };
    });
    if (errors.favouriteSports) {
      setErrors(prev => ({ ...prev, favouriteSports: undefined }));
    }
  };

  const savePreferences = async () => {
    if (user) {
      try {
        // Save to backend
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/quiz-preferences/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        // Cache recommendations
        if (response.data.recommendations) {
          sessionStorage.setItem('recommendedSessions', 
            JSON.stringify(response.data.recommendations)
          );
        }
      } catch (error) {
        console.error('Error saving preferences:', error);
        throw error;
      }
    }

    // Save to localStorage as backup
    const preferencesToSave = {
      location: formData.location,
      favouriteSports: formData.favouriteSports,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('userQuizPreferences', JSON.stringify(preferencesToSave));
    sessionStorage.setItem('quizData', JSON.stringify(formData));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (formData.favouriteSports.length === 0) newErrors.favouriteSports = 'Select at least one sport';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }

      await savePreferences();

      if (!user) {
        onClose();
        router.push({
          pathname: '/register',
          query: { returnUrl: '/quiz/recommendations' }
        });
      } else {
        onClose();
        router.push({
          pathname: '/sessions',
          query: {
            location: formData.location,
            sports: formData.favouriteSports.join(','),
            fromQuiz: 'true'
          }
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component JSX remains the same
  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Personal Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-arena-orange" />
            <h3 className="text-xl font-semibold">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black transition-colors"
                placeholder="Enter your full name"
                disabled={loading}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black transition-colors"
                placeholder="Enter your phone number"
                disabled={loading}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black transition-colors"
                disabled={loading}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black transition-colors"
                disabled={loading}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-arena-orange" />
            <h3 className="text-xl font-semibold">Where do you want to play?</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {['NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL'].map(loc => (
              <motion.button
                key={loc}
                type="button"
                onClick={() => !loading && setFormData(prev => ({ ...prev, location: loc }))}
                className={`px-6 py-4 rounded-2xl border-2 transition-all ${
                  formData.location === loc
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-300'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                disabled={loading}
              >
                {loc}
              </motion.button>
            ))}
          </div>
          {errors.location && (
            <p className="text-red-500 text-sm mt-2">{errors.location}</p>
          )}
        </div>

        {/* Sports Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-5 h-5 text-arena-orange" />
            <h3 className="text-xl font-semibold">What sports do you play?</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['FOOTBALL', 'BASKETBALL', 'TENNIS', 'CRICKET', 'RUGBY'].map(sport => (
              <motion.button
                key={sport}
                type="button"
                onClick={() => !loading && handleSportSelection(sport)}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className={`px-6 py-4 rounded-2xl border-2 transition-all ${
                  formData.favouriteSports.includes(sport)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-300'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {sport}
              </motion.button>
            ))}
          </div>
          {errors.favouriteSports && (
            <p className="text-red-500 text-sm mt-2">{errors.favouriteSports}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className="bg-black text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Finding Sessions...' : 'Find Sessions'}
          </motion.button>
        </div>

        {errors.submit && (
          <div className="text-red-500 text-center mt-4">
            {errors.submit}
          </div>
        )}
      </form>
    </div>
  );
};

export default QuizForm;