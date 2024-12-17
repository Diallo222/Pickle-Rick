<template lang="pug">
    .sidebar
      h1.display-4 Sidebar
      p.lead Categories
      Loader(:loading="productsStore.catLoading")
      ul.list-group
        li.list-group-item
          input.form-check-input(
            type="radio" 
            name="category" 
            id="none"
            value=""
            v-model="selectedCategory" 
            @change="fetchCategoryData"
          )
          label.form-check-label(for="none") None
        li.list-group-item(v-for="category in categories" :key="category")
          input.form-check-input(
            type="radio" 
            name="category" 
            :id="category" 
            :value="category" 
            v-model="selectedCategory" 
            @change="fetchCategoryData"
          )
          label.form-check-label(:for="category") {{ category }}
  </template>
  
  <script setup lang="ts">
import { computed } from "vue";
import { useProductsStore } from "@/store/products";

const productsStore = useProductsStore();

// Computed properties for categories and selectedCategory
const categories = computed(() => productsStore.categories);
const selectedCategory = computed({
  get: () => productsStore.selectedCategory,
  set: (value: string | null) => {
    productsStore.selectedCategory = value;
  },
});

const fetchCategoryData = () => {
  if (selectedCategory.value) {
    productsStore.fetchCategoryProducts(selectedCategory.value);
  } else {
    productsStore.fetchProducts();
  }
};
</script>

