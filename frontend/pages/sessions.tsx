import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/shared/Layout';
import SessionCard from '@/components/sessions/SessionCard';
import { Filter, Calendar, MapPin } from 'lucide-react';
import axios from 'axios';

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
  const [filters, setFilters] = useState<Filters>({
    sport: '',
    date: '',
    location: ''
  });

  // Available options for filters
  const sportOptions = ['All', 'FOOTBALL', 'BASKETBALL', 'TENNIS', 'CRICKET', 'RUGBY'];
  const locationOptions = ['All', 'NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL'];

  useEffect(() => {
    // In your sessions page
const fetchSessions = async () => {
    if (!router.isReady) return;
  
    try {
      let response;
      const token = localStorage.getItem('token'); // Get the stored token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
  
      if (fromQuiz === 'true' && sports) {
        response = await axios.post(
          'http://localhost:8000/api/quiz-responses/',
          {
            favouriteSports: typeof sports === 'string' ? sports.split(',') : sports
          },
          config  // Add the config here
        );
  
        setSessions(response.data.recommendations || []);
      } else {
        response = await axios.get('http://localhost:8000/api/sessions/', config);
        setSessions(response.data.results || []);
      }
  
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching sessions:', error.response || error);
      setError(error.response?.data?.error || 'Failed to fetch sessions');
      setLoading(false);
    }
  };

    fetchSessions();
  }, [router.isReady, sports, fromQuiz]);

  // Apply filters to sessions
  useEffect(() => {
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

    setFilteredSessions(result);
  }, [filters, sessions]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

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
          <div className="text-center text-red-600 mb-8">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center">Loading sessions...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <SessionCard 
                  key={session.id}
                  sport={session.sport}
                  dateTime={new Date(session.date_time).toLocaleString()}
                  location={session.location}
                  gameSize={session.game_size}
                  price={session.price}
                  slotsRemaining={session.slots_remaining}
                  matchScore={session.match_score}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">
                No sessions found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SessionsPage;