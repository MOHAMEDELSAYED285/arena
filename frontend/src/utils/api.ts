import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = {
  getSessions: async () => {
    try {
      const response = await axios.get(`${API_URL}/sessions/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  }
};

export default api;