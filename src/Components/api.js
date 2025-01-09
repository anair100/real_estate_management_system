// api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/properties',
});

export default api;
