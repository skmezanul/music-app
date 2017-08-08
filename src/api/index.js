import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

// your api token goes here:
const token = 'BQAOMG9b_l6thynKFID9aJeNi_X7sHFXdq6OyfSUoG_HIcQRx-7KeVT8CisZEVQwPCsdrMMsVmwZ9xPxgOttWZ3neD7hQh95OMrZpsFwBnXae_84-td15FcCEG-1w-LD9zLNfQ0wnm9rgpzgFUGIPN8zVTuCZji58rb9Vaot5D_lksYAqbO5uK7aR3N06_OXBLjHTiYUn2kIWhb50Q2LIKHpIFlyJ3HHU_y91PO13kEoviqaCLQzKpZalYe3ZWqE9UCOmm8blg6IqMCPnQoX4oaU4PPI5DB0PXsy2Kh0SoFcVBqvhyS6Tdc3uAtsSxi7HgcZaQ';
// you can get it from
// https://developer.spotify.com/web-api/console/post-next/
// remember to grant all permissions for the app to work properly.

// set default baseURL
Vue.axios.defaults.baseURL = 'https://api.spotify.com/v1/';

// set default authorization header
Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
