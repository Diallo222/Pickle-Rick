<template lang="pug">
    .card.rounded-4
      img.card-img-top.rounded-4.rounded-bottom-0.image(:src="character.image" alt="Card image cap")
      .card-body
        h5.card-title.fw-semibold.text-light {{character.name}}
        p.card-text Status : {{ character.status }}
        p.card-text Species : {{ character.species }}
        p.card-text Origin : {{ character.origin.name }}
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
  border-radius: 20px;
  background-color: #97ce4c;
}
.image {
  height: 14rem;
  width: 100%;
  object-fit: contain;
}
.card-text {
  font-size: 0.8rem;
  margin: 0;
  color: white;
}
</style>
