
import axios from 'axios';

// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// console.log('baseUrl:',apiBaseUrl);

const api = axios.create({
  // baseURL: apiBaseUrl,
});

export default api;
