<template lang="pug">
    .container.d-flex.flex-column.flex-md-row.justify-content-around.gap-3
      Filter(
        @updateFilters="handleFiltersChange"
      )
      .w-75
        h2.mt-4 Characters List
        Loader(:loading="isLoading")
        p.text-danger(v-if="!isLoading && characters.length === 0") No characters found!
        .row
          CharacterCard( v-if="!isLoading && characters.length > 0" v-for="character in characters" :key="character.id" :character="character")
        Paginator(
          :currentPage="currentPage" 
          :pages="totalPages" 
          :allParams="allParams" 
          @updatePage="handlePageChange"
        )
    </template>

<script setup lang="ts">
import { useCharactersStore } from "@/store/characters";

const charactersStore = useCharactersStore();
const currentPage = ref(1);

const route = useRoute();
const router = useRouter();

const characters = computed(() => charactersStore.allCharacters);
const isLoading = computed(() => charactersStore.isLoading);
const totalPages = computed(() => charactersStore.allPages);
const allParams = computed(() => charactersStore.allParams);

// Fetch characters when the component is mounted
onMounted(() => {
  if (route.query) {
    const { page, name, status, species, gender } = route.query;
    currentPage.value = Number(page) || 1;
    charactersStore.filterCharacters(page, name, status, species, "", gender);
  } else {
    charactersStore.filterCharacters(1, "", "", "", "", "");
  }
});

// Handler for changing to a specific page on pagination
const handlePageChange = (page: number) => {
  currentPage.value = page;
  const { name, status, species, gender } = allParams.value;
  charactersStore.filterCharacters(page, name, status, species, "", gender);

  router.push({ query: { page, name, status, species, gender } });
};

// Handler for changing filters
const handleFiltersChange = (filters: any) => {
  const { name, status, species, gender } = filters;
  currentPage.value = 1;
  charactersStore.filterCharacters(1, name, status, species, "", gender);
  router.push({ query: { page: 1, name, status, species, gender } });
};
</script>
