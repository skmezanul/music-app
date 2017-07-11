<template>
<main class="main-container" :class="{ 'stage-compact': $route.meta.header === 'compact' }">

  <!--Stage-->
  <div class="stage">

    <!--Background-->
    <div class="stage-background">
      <parallax :speedFactor="0.3">
        <img v-show="$route.meta.current === 'overview'" src="/static/images/header.jpg" alt="Ellie Goulding" />
        <img v-show="$route.meta.current === 'information'" src="/static/images/bio1.jpg" alt="Ellie Goulding" />
      </parallax>
    </div>

    <div class="stage-inner">

      <!--Content-->
      <div class="stage-container">
        <transition name="fade">
          <h2 v-show="$route.meta.header === 'full'">Artist</h2>
        </transition>
        <h1>Ellie Goulding</h1>
        <div class="genres">
          <a>Electro</a><a>Pop</a><a>Folk</a>
        </div>
        <div class="button-container">
          <div class="button-group">
            <a class="btn btn-accent"><i class="material-icons">play_circle_filled</i>Play All</a>
            <a class="btn"><i class="material-icons">add_circle</i>Follow</a>
            <a class="btn btn-icon"><i class="material-icons">favorite</i></a>
          </div>
          <a class="btn btn-transparent"><i class="material-icons">share</i>Share</a>
        </div>
      </div>

      <!--Navigation-->
      <nav class="subnav mobile-hidden" v-in-viewport='69'>
        <ul>
          <li>
            <router-link to="/artist/">Overview</router-link>
          </li>
          <li>
            <router-link to="/artist/concerts">Concerts</router-link>
          </li>
          <li>
            <router-link to="/artist/playlists">Playlists</router-link>
          </li>
          <li>
            <router-link to="/artist/feed">Artist Feed</router-link>
          </li>
          <li>
            <router-link to="/artist/similar">Similar Artists</router-link>
          </li>
          <li>
            <router-link to="/artist/information">Information</router-link>
          </li>
        </ul>
      </nav>

    </div>

  </div>

  <!--Router View-->
    <router-view></router-view>

</main>
</template>
