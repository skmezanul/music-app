<template>
<div class="header-container">
  <h2 v-if="$route.meta.compactHeader != true">Artist</h2>
  <h1>Ellie Goulding</h1>
  <h2><span>Electro</span><span>Pop</span><span>Folk</span></h2>
  <div class="button-container">
    <div class="button-group">
      <a class="btn btn-accent"><i class="material-icons">play_circle_filled</i>Play All</a>
      <a class="btn"><i class="material-icons">add_circle</i>Follow</a>
      <a class="btn btn-icon"><i class="material-icons">favorite</i></a>
    </div>
    <a class="btn btn-transparent"><i class="material-icons">share</i>Share</a>
  </div>
</div>
</template>
