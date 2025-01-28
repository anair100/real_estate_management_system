
import axios from 'axios';

 const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// console.log('baseUrl:',apiBaseUrl);

const api = axios.create({
  //Uncomment for seperate UI and service in local
  // baseURL: apiBaseUrl,
});

export default api;
