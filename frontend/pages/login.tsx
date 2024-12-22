import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Layout from '@/components/shared/Layout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { returnUrl } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);

      // Check if there's quiz data in session storage
      const quizData = sessionStorage.getItem('quizData');

      if (quizData && (returnUrl === '/quiz/recommendations' || router.query.fromQuiz)) {
        const parsedQuizData = JSON.parse(quizData);
        // Clear the stored quiz data
        sessionStorage.removeItem('quizData');
        
        // Redirect to sessions with quiz data
        router.push({
          pathname: '/sessions',
          query: {
            location: parsedQuizData.location,
            sports: parsedQuizData.favouriteSports.join(','),
            fromQuiz: 'true'
          }
        });
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8">
            Login to ARENA
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-black transition-colors"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-black transition-colors"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                href={{
                  pathname: '/register',
                  query: returnUrl ? { returnUrl } : {}
                }}
                className="text-black hover:text-gray-700 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {(returnUrl === '/quiz/recommendations' || router.query.fromQuiz) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                Login to see your recommended sessions based on your preferences
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;