<template lang="pug">
.loader-container
	ul
		li
		li
		li
		li
		li
		li
</template>

<style lang="scss" scoped>
.loader-container {
    @include position(fixed, 997);
    @include flex-center;
    margin-bottom: 81px;
    height: 100%;
    background-color: $main-bg-color;
    ul {
        position: relative;
        width: 100px;
        li {
            position: absolute;
            bottom: 0;
            width: 5px;
            height: 0;
            border-radius: 5px;
            background-color: $accent-color;
            &:nth-child(1) {
                left: 0;
                animation: loading1 1s ease infinite 0;
            }
            &:nth-child(2) {
                left: 20px;
                animation: loading2 1s ease infinite 0.1s;
            }
            &:nth-child(3) {
                left: 40px;
                animation: loading1 1s ease-in-out infinite 0.2s;
            }
            &:nth-child(4) {
                left: 60px;
                animation: loading2 1s ease-in infinite 0.3s;
            }
            &:nth-child(5) {
                left: 80px;
                animation: loading1 1s ease-in-out infinite 0.4s;
            }
            &:nth-child(6) {
                left: 100px;
                animation: loading2 1s ease infinite 0.5s;
            }
        }
    }
}
@keyframes loading1 {
    0% {
        height: 10px;
    }
    50% {
        height: 50px;
    }
    100% {
        height: 10px;
    }
}
@keyframes loading2 {
    0% {
        height: 20px;
    }
    50% {
        height: 65px;
    }
    100% {
        height: 20px;
    }
}
</style>
