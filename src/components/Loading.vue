<template>
  <v-progress-linear
    :active="loading"
    :color="color"
    :indeterminate="true"
    class="ma-0"
    height="4"
    style="top: -2px;"
  >Loading...</v-progress-linear>
</template>
<script>
export default {
  props: {
    loading: Boolean,
    color: String,
  },
};
</script>
<style>
.v-progress-linear {
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
</style>