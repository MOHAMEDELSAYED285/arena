import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/shared/Layout';
import SessionCard from '@/components/sessions/SessionCard';
import axios from 'axios';

interface Session {
  id: number;
  sport: string;
  date_time: string;
  location: string;
  game_size: string;
  price: number;
  slots_remaining: number;
}

const SessionsPage = () => {
  const router = useRouter();
  const { location, sports, fromQuiz } = router.query;
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        let url = 'http://localhost:8000/api/sessions/';
        if (fromQuiz === 'true') {
          url = 'http://localhost:8000/api/quiz-responses/';
        }
        
        const response = await axios.get(url, {
          params: {
            location,
            sports: typeof sports === 'string' ? sports : undefined
          }
        });

        setSessions(response.data.results || response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchSessions();
    }
  }, [router.isReady, location, sports, fromQuiz]);

  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl font-oswald font-bold text-center mb-8">
          {fromQuiz === 'true' ? 'Recommended Sessions' : 'All Sessions'}
        </h1>
        
        {loading ? (
          <div className="text-center">Loading sessions...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {sessions.map((session) => (
              <SessionCard 
                key={session.id}
                sport={session.sport}
                dateTime={session.date_time}
                location={session.location}
                gameSize={session.game_size}
                price={session.price}
                slotsRemaining={session.slots_remaining}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SessionsPage;