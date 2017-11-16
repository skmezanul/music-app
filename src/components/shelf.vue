<template lang="pug">
.shelf-item(v-if='data.playlist')
  .background-container
    img(:src='cover[0].url')
  .shelf-container
    h1.title {{ title }}
    .cover-container
      img(:src='cover[0].url', :alt='title')
    .shelf-inner
      h2 {{ $formatValue(data.playlist.description) }}
      ol.list
        ma-list(
          v-for='(playlist, index) in data.playlist.tracks.items',
          :key='playlist.track.id',
          :trackid='playlist.track.id',
          :type='playlist.track.type',
          :image='playlist.track.album.images',
          :title='playlist.track.name',
          :artists='playlist.track.artists',
          :album='playlist.track.album',
          :explicit='playlist.track.explicit',
          :duration='playlist.track.duration_ms',
          :index='index')
</template>

<script>
import { mapGetters } from 'vuex';
import * as Vibrant from 'node-vibrant';

export default {
  data() {
    return {
      data: {
        playlist: [],
      },
    }
  },
  props: [
    'type',
    'primaryid',
    'secondaryid',
    'title',
    'cover',
  ],
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    fetchData() {
      const that = this;

      that.axios.all([
          that.getSinglePlaylist(),
        ]).then((res) => {
          that.data.playlist = res[0].data;
        });
    },
    // get playlist from the api
    getSinglePlaylist() {
      const that = this,
            market = that.market;

      return that.$spotifyApi({
        method: 'get',
        url: `/users/${that.secondaryid}/playlists/${that.primaryid}`,
        params: {
          market,
          limit: 3,
        },
      })
    },

    // get artist info from the api
    getArtistInfo(artistid) {
      const that = this;

      that.$spotifyApi({
        method: 'get',
        url: `/artists/${artistid}`,
      }).then((res) => {
        that.data.artist = res.data;
      });
    },
  },
  computed: {
    ...mapGetters({
      market: 'getMarket',
    }),
  },
};
</script>

<style lang="scss">
.shelf-item {
  @include relative;
  min-height: 300px;
  .background-container {
      @include absolute($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: -1);
      @include flex($display: flex, $justify: center, $align: center);
      overflow: hidden;

      img {
        display: block;
        width: 100vw;
        height: 100vh;
        filter: blur(10px) saturate(130%);
        object-fit: cover;
      }
      &:after {
          @include absolute($top: 0, $right: 0, $bottom: 0, $left: 0, $z-index: 1);
          background: ease-in-out-sine-gradient(to top, $main-bg-color, rgba($main-bg-color, 0.5));
          content: "";
      }
  }
  .shelf-container {
    @include flex($display: flex, $wrap: wrap);
    padding: 35px;
    .title {
      @include flex($basis: 100%);
      margin-bottom: 25px;
    }
    .cover-container {
        overflow: hidden;
        margin-right: 35px;
        min-width: 170px;
        width: 170px;
        height: 170px;
        border-radius: 10px;
        box-shadow: $shadow;
    }
    .shelf-inner {
      h2 {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
