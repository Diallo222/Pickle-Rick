<template lang="pug">
    .w-75
      h2.mt-4 Characters List
      Loader(:loading="isLoading")
      p.text-danger(v-if="!isLoading && characters.length === 0") No characters found!
      .row
        CharacterCard( v-if="!isLoading && characters.length > 0" v-for="character in characters" :key="character.id" :character="character")
      Paginator
    </template>

<script setup lang="ts">
import { useCharactersStore } from "@/store/characters";
import { useLocationStore } from "@/store/locations";
import { useEpisodeStore } from "~/store/episode";

const charactersStore = useCharactersStore();
const locationStore = useLocationStore();
const episodeStore = useEpisodeStore();

onMounted(() => {
  charactersStore.fetchAllCharacters();
});

// Computed property for filtered characters based on location
const characters = computed(() => {
  const locationName = location.value?.name;
  const episodeId = episode.value?.id;

  // If neither location nor episode is provided, return all characters
  if (!locationName && !episodeId) {
    return charactersStore.allCharacters;
  }

  return charactersStore.allCharacters.filter((character: any) => {
    const matchesLocation = locationName
      ? character.location.name === locationName
      : true;

    const matchesEpisode = episodeId
      ? character.episode.some((ep: string) => ep.endsWith(`/${episodeId}`))
      : true;

    return matchesLocation && matchesEpisode;
  });
});

const isLoading = computed(() => charactersStore.isLoading);

const location = computed(() => locationStore.singleLocation);
const episode = computed(() => episodeStore.singleEpisode);
</script>
