<template lang="pug">
  h5.text-light Find Characters
  .d-flex.w-100.flex-wrap.justify-content-center.align-items-center.gap-2
    OmInput(@search="handleSearch" placeholder="Search by name")
    div.flex-row(v-for="option in selectorOptions" :key="option.label")
      MultiSelector(
        :modelValue="filters[option.label]"
        :options="option"
        @update:modelValue="(value) => handleFiltersUpdate({ [option.label]: value })"
      )
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const filters = ref({
  name: "",
  status: "",
  species: "",
  gender: "",
});

const route = useRoute();
onMounted(() => {
  if (route.query) {
    Object.assign(filters.value, route.query);
  }
});

const selectorOptions = [
  {
    label: "status",
    values: ["alive", "dead", "unknown"],
  },
  {
    label: "species",
    values: ["Human", "Alien", "Robot", "Humanoid", "Cronenberg"],
  },
  {
    label: "gender",
    values: ["female", "male", "genderless", "unknown"],
  },
];

const emit = defineEmits();

const handleFiltersUpdate = (updatedFilters: Record<string, string>) => {
  Object.assign(filters.value, updatedFilters);
  applyFilters();
};

// Handle search input
const handleSearch = (searchTerm: string) => {
  filters.value.name = searchTerm;
  applyFilters();
};

// Apply filters and update URL query parameters
const applyFilters = () => {
  const { name, status, species, gender } = filters.value;
  emit("updateFilters", { name, status, species, gender });
};
</script>
