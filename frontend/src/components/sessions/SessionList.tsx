import React from 'react';
import SessionCard from './SessionCard';

interface Session {
  id: number;
  sport: string;
  dateTime: string;
  location: string;
  gameSize: string;
  price: number;
  slotsRemaining: number;
}

interface SessionListProps {
  sessions: Session[];
}

const SessionList = ({ sessions }: SessionListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {sessions.map((session) => (
        <SessionCard key={session.id} {...session} />
      ))}
    </div>
  );
};

export default SessionList;