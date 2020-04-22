import axios from 'axios';

const instance = axios.create({
  baseURL: '192.168.43.47:3000',
});

export default instance;
