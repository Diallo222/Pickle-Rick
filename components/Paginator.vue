<template lang="pug">
  .d-flex.justify-content-center.m-2
    button.btn.btn-success(v-if="currentPage > 1" @click="onPrevPage") Prev
    button.btn.mx-2.text-light(
      v-for="page in visiblePages" 
      :key="page" 
      @click="handlePageChange(page)" 
      :class="{ 'btn-success': page === currentPage }"
    ) {{ page }}
    button.btn.btn-success(v-if="currentPage < pages" @click="onNextPage") Next
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits();

// Computed property for visible pages
const visiblePages = computed(() => {
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);
  const start = Math.max(1, props.currentPage - half);
  const end = Math.min(props.pages, start + maxVisible - 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const onNextPage = () => {
  if (props.currentPage < props.pages) {
    handlePageChange(props.currentPage + 1);
  }
};
const onPrevPage = () => {
  if (props.currentPage > 1) {
    handlePageChange(props.currentPage - 1);
  }
};

// Handler for changing to a specific page
const handlePageChange = (page: number) => {
  emit("updatePage", page);
};
</script>
