// src/types/index.ts
export interface Session {
    id: number;
    sport: string;
    date_time: string;
    location: string;
    game_size: string;
    price: number;
    slots_remaining: number;
    match_score?: number;
  }