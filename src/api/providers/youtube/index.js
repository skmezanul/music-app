import Vue from 'vue';
import axios from 'axios';
import { baseURL, credentials } from '../../config';

// register youtube axios instance
const youtube = axios.create({
  baseURL: baseURL.youtube,
  params: {
    part: 'snippet',
    key: credentials.youtubeApiKey,
  },
});

Vue.prototype.$youtubeApi = youtube;

export default youtube;
