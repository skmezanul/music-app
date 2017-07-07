<template>
<main class="main-container" :class="{ 'compact-header': $route.meta.compactHeader === true }">
  <header class="header">
    <div class="background-container">
      <router-view name="headerbackground"></router-view>
    </div>
    <div class="header-inner">
      <router-view name="header"></router-view>
      <nav class="subnav mobile-hidden">
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
  </header>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</main>
</template>
