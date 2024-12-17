<template lang="pug">
    .card(class="card")
      img.card-img-top(:src="product.image" alt="Card image cap" class="image")
      .card-body
        h4.card-title ${{product.price}}
        p.card-text {{product.title}}
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    product: {
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
  