import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/shared/Layout';
import SessionCard from '@/components/sessions/SessionCard';
import { Filter, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Session {
  id: number;
  sport: string;
  date_time: string;
  location: string;
  game_size: string;
  price: number;
  total_slots: number;
  booked_slots: number;
  slots_remaining: number;
  match_score?: number;
}

interface Filters {
  sport: string;
  date: string;
  location: string;
}

const SessionsPage = () => {
  const router = useRouter();
  const { location, sports, fromQuiz } = router.query;
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [filters, setFilters] = useState<Filters>({
    sport: '',
    date: '',
    location: ''
  });

  const sportOptions = ['All', 'FOOTBALL', 'BASKETBALL', 'TENNIS', 'CRICKET', 'RUGBY'];
  const locationOptions = ['All', 'NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL'];

  useEffect(() => {
    const fetchSessions = async () => {
      if (!router.isReady) return;

      try {
        let response;
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        if (fromQuiz === 'true' && sports) {
          // Get sessions based on quiz responses
          console.log('Fetching sessions based on quiz responses...');
          response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/quiz-preferences/`,
            {
              favouriteSports: typeof sports === 'string' ? sports.split(',') : sports,
              location: location
            },
            config
          );
          console.log('Quiz response data:', response.data);
          const recommendedSessions = response.data.recommendations || [];
          setSessions(recommendedSessions);
          setFilteredSessions(recommendedSessions);
        } else {
          // Get all sessions
          console.log('Fetching all sessions...');
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/sessions/`,
            config
          );
          console.log('All sessions data:', response.data);
          const allSessions = response.data.results || [];
          setSessions(allSessions);
          setFilteredSessions(allSessions);
        }

        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching sessions:', error.response || error);
        setError(error.response?.data?.error || 'Failed to fetch sessions');
        setLoading(false);
      }
    };

    fetchSessions();
  }, [router.isReady, sports, fromQuiz, location, user]);

  // Apply filters when filter state or sessions change
  useEffect(() => {
    console.log('Applying filters:', filters);
    console.log('Current sessions:', sessions);
    
    let result = [...sessions];

    if (filters.sport && filters.sport !== 'All') {
      result = result.filter(session => session.sport === filters.sport);
    }

    if (filters.location && filters.location !== 'All') {
      result = result.filter(session => session.location === filters.location);
    }

    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString();
      result = result.filter(session => 
        new Date(session.date_time).toDateString() === filterDate
      );
    }

    console.log('Filtered results:', result);
    setFilteredSessions(result);
  }, [filters, sessions]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    console.log('Filter changed:', key, value);
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading sessions...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-center mb-8">
            {fromQuiz === 'true' ? 'Recommended Sessions' : 'All Sessions'}
          </h1>

          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-arena-orange" />
              <h2 className="text-xl font-semibold">Filters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sport Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Sport</label>
                <select
                  value={filters.sport}
                  onChange={(e) => handleFilterChange('sport', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-black transition-colors"
                >
                  {sportOptions.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-black transition-colors"
                />
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-black transition-colors"
                >
                  {locationOptions.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-8">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No sessions available at the moment.
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No sessions found matching your filter criteria.
            </div>
          ) : (
            filteredSessions.map((session) => (
              <SessionCard 
                key={session.id}
                id={session.id}
                sport={session.sport}
                dateTime={new Date(session.date_time).toLocaleString()}
                location={session.location}
                gameSize={session.game_size}
                price={session.price}
                slotsRemaining={session.slots_remaining}
                matchScore={session.match_score}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SessionsPage;