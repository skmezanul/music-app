import axios from 'axios';

// register music-app backend axios instance
const backend = axios.create({
  baseURL: 'http://api.micro100.de:3000/music-app/v1/',
});

export default backend;
