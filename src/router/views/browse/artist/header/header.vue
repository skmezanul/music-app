<template>
<div class="header-container">
  <h2 v-if="$route.meta.compactHeader != true" class="subline">Artist</h2>
  <h1 class="headline">Ellie Goulding</h1>
  <h2 v-if="$route.meta.concerts != true" class="subline"><span>Electro</span><span>Pop</span><span>Folk</span></h2>
  <h2 v-else class="subline">Concerts near Frankfurt am Main</h2>
  <div class="header-buttons">
    <div class="btn-combined">
      <a v-if="$route.meta.concerts != true" class="btn btn-accent"><i class="material-icons">play_circle_filled</i>Play All</a>
      <a v-else class="btn btn-accent"><i class="material-icons">event_available</i>Buy Tickets</a>
      <a class="btn"><i class="material-icons">add_circle</i>Follow</a>
      <a class="btn btn-icon"><i class="material-icons">favorite</i></a>
    </div>
    <a class="btn btn-transparent"><i class="material-icons">share</i>Share</a>
  </div>
</div>
</template>
