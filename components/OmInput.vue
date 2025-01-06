<template lang="pug">
  .form-field.mb-0(v-if="placeholder")
    label.form-label.text-light {{ "search" }}
    .input-group
      input.form-control(
        :placeholder="placeholder"
        v-model="search"
        @keyup.enter="$emit('search', search)"
      )
      button.btn.btn-danger(
        v-if="search"
        @click="clearSearch"
      ) Clear
      button.btn.btn-success(
        :disabled="!search"
        @click="$emit('search', search)"
      ) Search
      
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: String,
});

const search = ref("");

const emit = defineEmits(["search"]);

const clearSearch = () => {
  search.value = "";
  emit("search", search.value);
};
</script>
