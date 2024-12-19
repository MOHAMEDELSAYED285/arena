import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/router';


interface QuizFormData {
  fullName: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  location: string;
  favouriteSports: string[];
  customSport: string;
}

const LOCATIONS = [
  'North London',
  'South London',
  'East London',
  'West London',
  'Central London'
];

const SPORTS = [
  'Football',
  'Basketball',
  'Tennis',
  'Cricket',
  'Rugby',
  'Other'
];

const QuizForm = () => {
    const router = useRouter(); // <-- Add this line

  const [formData, setFormData] = useState<QuizFormData>({
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    location: '',
    favouriteSports: [],
    customSport: ''
  });

  const [errors, setErrors] = useState<Partial<QuizFormData>>({});
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof QuizFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSportSelection = (sport: string) => {
    setFormData(prev => {
      const sports = prev.favouriteSports.includes(sport)
        ? prev.favouriteSports.filter(s => s !== sport)
        : [...prev.favouriteSports, sport];
      return { ...prev, favouriteSports: sports };
    });
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Partial<QuizFormData> = {};

    if (stepNumber === 1) {
      if (!formData.fullName) newErrors.fullName = 'Name is required';
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    } else if (stepNumber === 2) {
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.location) newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      try {
        // First, save the quiz responses
        const response = await axios.post('http://localhost:8000/api/quiz-responses/', formData);
        
        // Redirect to sessions page with quiz parameters
        router.push({
          pathname: '/sessions',
          query: {
            location: formData.location,
            sports: formData.favouriteSports.join(','),
            fromQuiz: 'true'
          }
        });
      } catch (error) {
        console.error('Error submitting quiz:', error);
        // Handle error appropriately
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-1/3 h-2 rounded-full ${
                stepNumber <= step ? 'bg-arena-orange' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-gray-600">Step {step} of 3</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-arena-orange focus:border-arena-orange
                  ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-arena-orange focus:border-arena-orange
                  ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-arena-orange focus:border-arena-orange
                  ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.gender}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-arena-orange focus:border-arena-orange
                  ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-arena-orange focus:border-arena-orange
                  ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select location</option>
                {LOCATIONS.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.location}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Favourite Sports
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SPORTS.map(sport => (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => handleSportSelection(sport)}
                    className={`px-4 py-2 rounded-lg border ${
                      formData.favouriteSports.includes(sport)
                        ? 'bg-arena-orange text-white border-arena-orange'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-arena-orange'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
              {formData.favouriteSports.includes('Other') && (
                <input
                  type="text"
                  name="customSport"
                  value={formData.customSport}
                  onChange={handleInputChange}
                  className="mt-3 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-arena-orange focus:border-arena-orange"
                  placeholder="Enter your sport"
                />
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="ml-auto px-6 py-2 bg-arena-orange text-white rounded-lg hover:bg-arena-orange/90"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-arena-orange text-white rounded-lg hover:bg-arena-orange/90"
            >
              Find Sessions
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuizForm;