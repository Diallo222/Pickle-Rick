<template lang="pug">
    .d-flex.justify-content-center.m-2
      button.btn.btn-primary(v-if="currentPage > 1" @click="onPrevPage") Prev
      button.btn.btn-primary.mx-2(v-for="page in visiblePages" :key="page" @click="handlePageChange(page)" :class="{'btn-secondary': page === currentPage }") {{ page }}
      button.btn.btn-primary(v-if="currentPage < pages" @click="onNextPage") Next
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCharactersStore } from "~/store/characters";

const currentPage = ref(1);
const charactersStore = useCharactersStore();

const pages = computed(() => charactersStore.allPages);

const visiblePages = computed(() => {
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(pages.value, currentPage.value + 2);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const onNextPage = () => {
  if (currentPage.value < pages.value) {
    handlePageChange(currentPage.value + 1);
  }
};

const onPrevPage = () => {
  if (currentPage.value > 1) {
    handlePageChange(currentPage.value - 1);
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  charactersStore.fetchAllCharacters(page);
};
</script>
