<template lang="pug">
  .w-25
    h5 Find Characters
    OmInput(@search="handleSearch" placeholder="Search by name")
    div(v-for='option in selectorOptions' :key='option.label')
      MultiSelector(
      :options="option"
      @update:modelValue="handleFiltersUpdate"
      )
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCharactersStore } from "@/store/characters";
const charactersStore = useCharactersStore();

// States
const filters = ref({
  name: "",
  status: "",
  species: "",
  gender: "",
});

// Filter options
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

// Handlers
const handleFiltersUpdate = (updatedFilters) => {
  Object.assign(filters.value, updatedFilters);
  applyFilters();
};

const handleSearch = (searchTerm) => {
  filters.value.name = searchTerm;
  applyFilters();
};

const applyFilters = () => {
  // Apply filters
  const { name, status, species, gender } = filters.value;
  charactersStore.filterCharacters(name, status, species, "", gender);
};
</script>
