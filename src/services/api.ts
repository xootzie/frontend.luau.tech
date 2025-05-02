import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL
});

export const testBackend = async () => {
  const response = await api.get('/api/test');
  return response.data;
};