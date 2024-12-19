<template lang="pug">
.container-fluid
    .row
        // Sidebar column
        .col-12.col-md-3
            SideBar
        // Products column
        .col-12.col-md-9
            Loader(:loading="productsStore.productsLoading")
            .row.row-cols-1.row-cols-sm-2.row-cols-md-3.g-4
                ProductCard(v-for="product in products" :key="product.id" :product="product")
</template>

<script setup lang="ts">
import { useProductsStore } from "@/store/products";

const productsStore = useProductsStore();

onMounted(() => {
  productsStore.fetchCategories();
  productsStore.fetchProducts();
});

const products = computed(() => productsStore.allProducts);
</script>
