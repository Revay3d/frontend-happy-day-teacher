import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-happy-day-teacher.onrender.com/api'
});

export function login(key) {
  return api.post('/login', { key }); 
}

export function getCartas(token) {
  return api.get('/carta', {
    headers: {
      Authorization: `${token}`
    }
  });
}