<template>
<div class="loading">
  <svg class="spinner" width="75px" height="75px" viewBox="0 0 66 66">
   <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
  </svg>
</div>
</template>
<style lang="scss">
$offset: 187;
$duration: 1.4s;

.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 996;
    background-color: $main-bg-color;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 200px;
    padding-bottom: 81px;
    .spinner {
        animation: rotate $duration linear infinite;
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(270deg);
    }
}

@keyframes dash {
    0% {
        stroke-dashoffset: $offset;
    }
    50% {
        stroke-dashoffset: $offset/4;
        transform: rotate(135deg);
    }
    100% {
        stroke-dashoffset: $offset;
        transform: rotate(450deg);
    }
}

.path {
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    stroke: $accent-color;
    transform-origin: center;
    animation: dash $duration ease-in-out infinite;
}
</style>
