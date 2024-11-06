import axios from 'axios';

// can add this url to env as well
const api = axios.create({
  baseURL: 'http://localhost:4000',
});

// api/v1/ -> api routes
// auth/v1/ -> auth routes

export const login = async (credentials) => {
  const { data } = await api.post('/auth/v1/login', credentials);
  return data;
};

export const register = async (credentials) => {
  const { data } = await api.post('/auth/v1/register', credentials);
  return data;
};

export const fetchAllReviews = async (date) => {
  const { data } = await api.get('/api/v1//reviews', {
    params: { date },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth") || ""
        }`
    }
  });
  return data;

};
export const fetchReviews = async (date, category) => {
  const { data } = await api.get('/api/v1//reviews/filter', {
    params: { date, category },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth") || ""
        }`
    }
  });
  return data;
};

export const fetchSummary = async (date) => {
  const { data } = await api.get('/api/v1//summary', {
    params: { date },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth") || ""
        }`
    }
  });
  return data;
};
