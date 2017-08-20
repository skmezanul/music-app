import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

// your api token goes here:
const token = 'BQCxl4bLG5Go1zwhCLYE_QgDidCeSOJpr0_QuvyVorbiAtjoDxnsLd6tQTDo9PXePae1wIi2n0gFNtQdyklF8711bNN5ZWnD5R84TzCpLJZgBaakYX3PfhhS6HSgkzv2YoiFg1lN4SNXQ_q_wxeQJNepcMZVLfreKn86qp12HFUrPcwjUqaMBnhlmbWdGiwfZispxe5PZ4ieKZMiljyDtRICyUhjFlHpJXqpYWxnW6fwfAUKL9X-xxkMcBrGRjzZ-hMRpBXAd0wSl3yiJE6BJK9p5ShMZYwuT4Qywd_GBPyPARVwQ0Vc8kUMuI9gTVtn6rvDOQ';
// you can get it from
// https://developer.spotify.com/web-api/console/post-next/
// remember to grant all permissions for the app to work properly.

// set default baseURL
Vue.axios.defaults.baseURL = 'https://api.spotify.com/v1/';

// set default authorization header
Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
