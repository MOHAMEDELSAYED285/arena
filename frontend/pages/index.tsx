import React, { useEffect, useState } from 'react';
import Layout from '@/components/shared/Layout';
import SessionCard from '@/components/sessions/SessionCard';
import ArenaHero from '@/components/sessions/ArenaHero';
import { api } from '@/utils/api';

interface Session {
  id: number;
  sport: string;
  date_time: string;
  location: string;
  game_size: string;
  price: number;
  slots_remaining: number;
}

const HomePage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.getSessions();
        setSessions(response.results); // Django REST Framework paginates by default
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sessions');
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <Layout>
      <ArenaHero />
      <div className="py-12">
        <h1 className="text-5xl font-oswald font-bold text-center mb-6">
          Find Your Perfect Sports Session
        </h1>

        {loading && (
          <div className="text-center text-gray-600">Loading sessions...</div>
        )}

        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}

        {sessions.length === 0 && !loading && !error && (
          <div className="text-center text-gray-600">No sessions available</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              sport={session.sport}
              dateTime={new Date(session.date_time).toLocaleString()}
              location={session.location}
              gameSize={session.game_size}
              price={session.price}
              slotsRemaining={session.slots_remaining}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

