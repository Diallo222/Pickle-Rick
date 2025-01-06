<template lang="pug">
    .d-flex.justify-content-center.align-items-center.placeholder-glow(v-if="loading" style="height: 10vh")
      img.placeholder(src="/assets/rmlogo.png" style="width: 180px;object-fit: contain;")
</template>
<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>
<style lang=""></style>
