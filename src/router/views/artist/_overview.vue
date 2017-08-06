<template>
<div class="page-container">

  <section class="page-section tracks">
    <div class="section-header">
      <h1>Top Tracks</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <ol class="flex-table">
      <flextable
      v-for="(track, index) in toptracks"
      :key="track.id"
      :primaryID="track.id"
      :type="track.type"
      :image="track.album.images[0].url"
      :title="track.name"
      :duration="track.duration_ms"
      :index="index"
      ></flextable>
    </ol>
  </section>

  <section class="page-section albums">
    <div class="section-header">
      <h1>Albums</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container">
      <sectionitem
      v-for="album in albums"
      :key="album.id"
      :type="album.type"
      :primaryID="album.id"
      :secondaryID="album.artists[0].id"
      :image="album.images[0].url"
      :title="album.name"
      :artist="album.artists"
      ></sectionitem>
    </div>
  </section>

  <section class="page-section singles">
    <div class="section-header">
      <h1>Singles</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container">
      <sectionitem
      v-for="single in singles"
      :key="single.id"
      :type="single.type"
      :primaryID="single.id"
      :secondaryID="single.artists[0].id"
      :image="single.images[0].url"
      :title="single.name"
      :artist="single.artists"
      ></sectionitem>
    </div>
  </section>

  <section class="page-section appearson">
    <div class="section-header">
      <h1>Appears On</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container">
      <sectionitem
      v-for="album in appearson"
      :key="album.id"
      :type="album.type"
      :primaryID="album.id"
      :secondaryID="album.artists[0].id"
      :image="album.images[0].url"
      :title="album.name"
      :artist="album.artists"
      ></sectionitem>
    </div>
  </section>

</div>
</template>
<script>
export default {
  data() {
    return {
      toptracks: [],
      albums: [],
      singles: [],
      appearson: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
    $parent: 'fetchData',
  },
  methods: {
    fetchData() {
      // Get this artist's albums from the api
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/albums`,
        params: {
          market: this.$store.state.currentUser.country,
          album_type: 'album',
        },
      }).then((res) => {
        this.albums = res.data.items;
      }).catch(() => {
        this.$store.commit('error', 'Albums could not be fetched, please try again later.');
        this.albums = [];
      });

      // Get this artist's singles from the api
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/albums`,
        params: {
          market: this.$store.state.currentUser.country,
          album_type: 'single',
        },
      }).then((res) => {
        this.singles = res.data.items;
      }).catch(() => {
        this.$store.commit('error', 'Singles could not be fetched, please try again later.');
        this.singles = [];
      });

      // Get album's this artist appears on from the api
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/albums`,
        params: {
          market: this.$store.state.currentUser.country,
          album_type: 'appears_on',
        },
      }).then((res) => {
        this.appearson = res.data.items;
      }).catch(() => {
        this.$store.commit('error', 'Albums this artist appears on could not be fetched, please try again later.');
        this.appearson = [];
      });

      // Get this artist's top tracks from the api
      this.axios({
        method: 'get',
        url: `/artists/${this.$route.params.id}/top-tracks`,
        params: {
          country: this.$store.state.currentUser.country,
        },
      }).then((res) => {
        this.toptracks = res.data.tracks;
      }).catch(() => {
        this.$store.commit('error', 'This artists top tracks could not be fetched, please try again later.');
        this.toptracks = [];
      });
    },
  },
};
</script>
