<template lang="pug">
  a.btn(:class='type')
    i.material-icons(v-if='icon') {{ icon }}
    | {{ $t(title) }}
</template>

<script>
export default {
  props: [
    'type',
    'icon',
    'title',
  ],
};
</script>

<style lang="scss">
.button-container {
    display: flex;
    align-items: center;
    margin-top: 15px;

    .btn {
        display: inline-flex;
        padding: 13px;
        margin-right: 5px;
        border-radius: 3px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        font-weight: 700;
        font-size: 0.9em;
        font-family: 'Ubuntu', sans-serif;
        transition: background-color 0.3s, color 0.3s;
        &:hover {
            cursor: pointer;
        }
        &:not(.transparent) {
            background-color: $light-blue;
            &:hover {
                background-color: $white;
                color: $black;
            }
        }
        &:not(.icon) {
            i {
                margin-right: 5px;
            }
        }

        i {
            font-size: 1em;
            line-height: inherit;
        }

        &.accent {
            background-color: $accent-color;
        }
    }

    .button-group {
        display: flex;
        overflow: hidden;
        margin-right: 5px;
        border-radius: 5px;

        a {
            margin: 0;
            border-radius: 0;
            &:nth-child(3) {
                border-left: 1px solid $blue;
            }
        }
    }
}
</style>
