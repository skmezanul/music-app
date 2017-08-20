<template lang="pug">
.loading
	svg.spinner(viewbox='0 0 66 66')
		circle.path(cx='33', cy='33', r='30')
</template>

<style lang="scss">
$offset: 187;
$duration: 1.4s;

.loading {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 996;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 81px;
    height: 100%;
    background-color: $main-bg-color;
    .spinner {
        width: 65px;
        height: 65px;
        animation: rotate $duration linear infinite;
        .path {
            fill: none;
            stroke-width: 4px;
            stroke-linecap: round;
        }
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
        transform: rotate(135deg);
        stroke-dashoffset: $offset/4;
    }
    100% {
        transform: rotate(450deg);
        stroke-dashoffset: $offset;
    }
}

.path {
    transform-origin: center;
    animation: dash $duration ease-in-out infinite;
    stroke: $accent-color;
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
}
</style>
