import axios from 'axios';

// register youtube axios instance
const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    key: 'AIzaSyDV-D04s-RbQDwPXxadnt2LKpuC1rPveUc',
  },
});

export default youtube;
