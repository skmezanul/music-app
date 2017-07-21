<template>
<!--
<div class="page-container">
  <section class="page-section tracks">
    <div class="section-header">
      <h1>Top Tracks</h1>
    </div>
    <ol class="flex-table">
    <flextable v-for="(item, index) in singles" :key="item.id" :image="item.image" :title="item.title" :subtitle="item.subtitle" :index="index"></flextable>
    </ol>
  </section>
  <section class="page-section singles">
    <div class="section-header">
      <h1>Singles</h1>
      <div class="section-actions" @click="collapsed = !collapsed">
        <span v-show="collapsed === true">Show More<i class="material-icons">keyboard_arrow_down</i></span><span v-show="collapsed === false">Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container" :class="{'is-collapsed' : collapsed }">
      <sectionitem v-for="item in singles" type="album" :key="item.id" :image="item.image" :title="item.title" :subtitle="item.subtitle"></sectionitem>
      </sectionitem>
    </div>
  </section>
</div>
-->
<div class="page-container">

  <section class="page-section tracks">
    <div class="section-header">
      <h1>Top Tracks</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <!--
    <ol class="flex-table">
      <flextable v-for="(track, index) in singles" :key="track.id" :image="track.image" :title="track.title" :artist="track.subtitle" :duration="track.duration" :index="index"></flextable>
    </ol>
    -->
  </section>

  <section class="page-section albums">
    <div class="section-header">
      <h1>Albums</h1>
      <div class="section-actions">
        <span>Show Less<i class="material-icons">keyboard_arrow_up</i></span>
      </div>
    </div>
    <div class="section-items-container">
      <sectionitem v-for="album in albums" :key="album.id" :type="album.type" :primaryID="album.id" :secondaryID="album.artists[0].id" :image="album.images[0].url" :title="album.name" :artist="album.artists"></sectionitem>
    </div>
  </section>

</div>
</template>
<script>
import spotifyApi from '../../../api/'

export default {
  data() {
    return {
      tracks: {},
      albums: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    spotifyApi.getArtistAlbums(to.params.id, (err, response) => {
      next(vm => vm.albums = response.items)
    })
  },
  beforeRouteUpdate(to, from, next) {
    spotifyApi.getArtistAlbums(to.params.id, (err, response) => {
      this.albums = response.items
      next()
    })
  }
}
</script>
