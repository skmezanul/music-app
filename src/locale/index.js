import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    search: 'Search',
    myaccount: 'My Account',
    settings: 'Settings',
    logout: 'Log out',
    browse: 'Browse',
    radio: 'Radio',
    mylibrary: 'My Library',
    recentlyplayed: 'Recently Played',
    songs: 'Songs',
    albums: 'Albums',
    artists: 'Artists',
    toptracks: 'Top Tracks',
    singles: 'Singles',
    appearson: 'Appears On',
    myplaylists: 'My Playlists',
    newplaylist: 'New Playlist',
    showmore: 'Show More',
    showless: 'Show Less',
  },
  de: {
    search: 'Suchen',
    myaccount: 'Mein Konto',
    settings: 'Einstellungen',
    logout: 'Abmelden',
    browse: 'Browse',
    radio: 'Radio',
    mylibrary: 'Bibliothek',
    recentlyplayed: 'Zuletzt gehört',
    songs: 'Songs',
    albums: 'Alben',
    artists: 'Künstler',
    toptracks: 'Beliebt',
    singles: 'Singles',
    appearson: 'Erscheint auf',
    myplaylists: 'Playlists',
    newplaylist: 'Neue Playlist',
    showmore: 'Mehr Zeigen',
    showless: 'Weniger Zeigen',
  },
};

/* eslint-disable no-new */

export default new VueI18n({
  locale: 'de',
  messages,
});
