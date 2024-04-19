import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://hybrid.srishticampus.in/smart_catering_api', 
  // baseURL: 'http://localhost:4008/smart_catering_api', 

 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
