<template lang="pug">
    .container.d-flex.flex-column.flex-md-row.justify-content-around.gap-3
      Filter(:locations="locations" :episodes="episodes")
      CharacterList
    </template>

<script setup lang="ts">
import { useLocationStore } from "~/store/locations";
import { useEpisodeStore } from "~/store/episode";

const locationStore = useLocationStore();
const episodeStore = useEpisodeStore();
onMounted(() => {
  locationStore.fetchAllLocations();
  episodeStore.fetchAllEpisodes();
});
const locations = computed(() => locationStore.allLocations);
const episodes = computed(() => episodeStore.allEpisodes);
</script>
