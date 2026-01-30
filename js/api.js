const API_BASE_URL = 'http://127.0.0.1:5001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.warn('No auth token found');
    return {
      'Content-Type': 'application/json',
    };
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};