<template>
<main class="main-container" :class="{ 'stage-compact': $route.meta.header === 'compact' }">

  <!--Stage-->
  <div class="stage">

    <!--Background-->
    <div class="stage-background">
      <parallax :speedFactor="0.3">
        <img src="https://i.scdn.co/image/a0861fd5913a776b587a56ba3b6ce9910c0542f1" alt="Ellie Goulding" />
      </parallax>
    </div>

    <div class="stage-inner">

      <!--Content-->
      <div class="stage-container">
          <h2>Album by Ellie Goulding</h2>
        <h1>{{ $route.params.id }}</h1>
        <div class="button-container">
          <div class="button-group">
            <a class="btn btn-accent"><i class="material-icons">play_circle_filled</i>Play All</a>
            <a class="btn btn-icon"><i class="material-icons">favorite</i></a>
          </div>
          <a class="btn btn-transparent"><i class="material-icons">share</i>Share</a>
        </div>
      </div>

    </div>

  </div>

  <!--Router View-->
  <router-view></router-view>

</main>
</template>
