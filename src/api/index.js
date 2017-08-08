import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

// your api token goes here:
const token = 'BQD5J924NSZVPEOs85fuKXEpcUjqP3OjuC_7e61wfeBC65hR1koXeqCPTXCdhnN2eBR3N0ysuhNAheptO0_YVnOWYTHD7MzcEjpWCbXuUFfL8n1Ay1Mtft_ugAWOmtmUwgMpcshaPr1m7IMho90N5s8lz0gwsEWQcAkaeAtwwdPZ5qZEA-ypJHPDt9W8-35ttr-c1LBbGP7coePpyOcsweeh8lExQg_KyqwoCoXilAmfxKcfzv-EPV-P7sS7C6Ax44ssiTvwP9EDzLP59RlvDgD_3w58sxFzrfkDEd2mTgQ1Fnpp-gtSERPb_RLE1t7S-R3pDQ';

// you can get it from
// https://developer.spotify.com/web-api/console/post-next/
// remember to grant all permissions for the app to work properly.

// set default baseURL
Vue.axios.defaults.baseURL = 'https://api.spotify.com/v1/';

// set default authorization header
Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
