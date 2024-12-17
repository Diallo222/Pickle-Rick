<template lang="pug">
    .spinner-border.text-primary(v-if="loading" role:status)
</template>
<script setup lang="ts">

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});

</script>
<style lang="">
    
</style>