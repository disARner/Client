import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://powerful-shelf-90195.herokuapp.com',
});

export default instance;
