<template lang="pug">
    .spinner-container.d-flex.justify-content-center.align-items-center(v-if="loading" style="height: 100vh")
      .spinner-border.text-primary.text-center(role="status")
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
