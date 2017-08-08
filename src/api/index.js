import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

// your api token goes here:
const token = 'BQAdw9G9eDByt8diJZRTTQzwMWBbouxB0dRX1ipZY9-BYzsFdf709zo78wGQEYx4MEN5D3ObxJOq97kKpHAyuXtm2-rRNShHYyrUAMJKs2IH2PE1v0qmqnqGrQ7WcmN1F8Cp5-SG9k1Y9mqVPXb0HmAkj5p7HpddsLTqzWRq2xehkByyAmYJzXc1g9-61pLcfn_JECyU-jamBtXOYvzpmMEWMilFIHZFlqMiA6A7bafW6A-QFTPix5HZ9NY43kUzXuowe0hi1mf7YXnLaARXqgukhvyfjBEsCnYMRRwlEXx8yhwnUT_EHl7ULFuvYxhrmpwEUw';

// you can get it from
// https://developer.spotify.com/web-api/console/post-next/
// remember to grant all permissions for the app to work properly.

// set default baseURL
Vue.axios.defaults.baseURL = 'https://api.spotify.com/v1/';

// set default authorization header
Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
