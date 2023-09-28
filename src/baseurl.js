import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://43.204.92.123:4008/smart_catering_api', 
  baseURL: 'http://localhost:4008/smart_catering_api', 

 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
