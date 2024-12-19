<template lang="pug">
    .card(class="card")
      img.card-img-top(:src="character.image" alt="Card image cap" class="image")
      .card-body
        h5.card-title {{character.name}}
        p.card-text status : {{ character.status }}
        p.card-text species : {{ character.species }}
</template>

<script setup lang="ts">
const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.card {
  width: 14rem;
  margin: 10px;
  padding: 0px;
}
.image {
  height: 14rem;
  width: 100%;
  object-fit: contain;
}
</style>
