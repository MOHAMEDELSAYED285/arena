import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Layout from '@/components/shared/Layout';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First try to register
      const registerResponse = await axios.post('http://localhost:8000/api/auth/register/', {
        email,
        password,
        username,
      });

      console.log('Registration successful:', registerResponse.data);

      // If registration is successful, log in
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(
        err.response?.data?.error || 
        'Failed to register. Please check your information and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-oswald font-bold text-center mb-8">
            Sign Up for ARENA
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-arena-orange focus:border-arena-orange"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-arena-orange focus:border-arena-orange"
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-arena-orange focus:border-arena-orange"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-arena-orange text-white py-2 rounded-lg transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-arena-orange/90'
              }`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
            </form>

             <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-arena-orange hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;