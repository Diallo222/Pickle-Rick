<template lang="pug">
    .w-25
      h5 Find Characters
      //- form
        .mb-3
          label.form-label(for="name") Name
          input.form-control#name(v-model="name" placeholder="Enter character name")
        .mb-3
          label.form-label(for="status") Status
          select.form-select#status(:value="status")
            option(value="") -- Select Status --
            option(value="alive") Alive
            option(value="dead") Dead
            option(value="unknown") Unknown
        .mb-3
          label.form-label(for="species") Species
          select.form-select#species(v-model="species")
            option(value="") -- Select Specy --
            option(value="Human") Human
            option(value="Alien") Alien
            option(value="Robot") Robot
            option(value="Humanoid") Humanoid
            option(value="Cronenberg") Cronenberg
        .mb-3
          label.form-label(for="type") Type
          input.form-control#type(v-model="type" placeholder="Enter type")
        .mb-3
          label.form-label(for="gender") Gender
          select.form-select#gender(v-model="gender")
            option(value="") -- Select Gender --
            option(value="female") Female
            option(value="male") Male
            option(value="genderless") Genderless
            option(value="unknown") Unknown
      MultiSelector(:placeholder="'name'" :value="name" :options="selectorOptions" :onchange="updateFilter")
      h5.mt-2 Based on Location
      form(v-if="locations.length > 0 && !loading")
        .mb-3
          label.form-label(for="location") Location
          select.form-select#location(v-model="location")
            option(value="") -- Select Location --
            option(v-for="location in locations" :value="location.id") {{ location.name }}
      h5 Based on Episodes
        form(v-if="episodes.length > 0 && !loading")
          .mb-3
            label.form-label(for="episode") Episode
            select.form-select#episode(v-model="episode")
              option(value="") -- Select Episode --
              option(v-for="episode in episodes" :value="episode.id") {{ episode.name }}
      
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useCharactersStore } from "@/store/characters";
import { useLocationStore } from "~/store/locations";
import { useEpisodeStore } from "~/store/episode";

const props = defineProps({
  locations: Array,
  episodes: Array,
});

const name = ref("");
const status = ref("");
const species = ref("");
const type = ref("");
const gender = ref("");
const location = ref(0);
const episode = ref(0);

const charactersStore = useCharactersStore();
const locationStore = useLocationStore();
const episodeStore = useEpisodeStore();

const loading = computed(() => locationStore.isLoading);

const selectorOptions = [
  {
    label: "status",
    values: [" ","alive", "dead", "unknown"],
  },
  {
    label: "species",
    values: [" ","Human", "Alien", "Robot", "Humanoid", "Cronenberg"],
  },
  {
    label: "gender",
    values: [" ","female", "male", "genderless", "unknown"],
  },
];
// Apply filter
const applyFilters = () => {
  charactersStore.filterCharacters(
    name.value,
    status.value,
    species.value,
    type.value,
    gender.value
  );
};

const updateFilter = (key: string, value: string) => {
  switch (key) {
    case "name":
      name.value = value;
      break;
    case "type":
      type.value = value;
      break;
    case "status":
      status.value = value;
      break;
    case "species":
      species.value = value;
      break;
    case "gender":
      gender.value = value;
      break;
    default:
      break;
  }
  console.log("Filter updated:", key, value);

  applyFilters();
};

const findLocation = () => {
  if (!location.value) return (locationStore.location = {});
  locationStore.fetchLocation(location.value);
};

const findEpisode = () => {
  if (!episode.value) return (episodeStore.episode = {});
  episodeStore.fetchEpisode(episode.value);
};

// Watch for changes in filter values
watch(
  [name, status, species, type, gender, location, episode],
  ([name, status, species, type, gender, location, episode]) => {
    applyFilters();
  }
);

watch([location], ([location]) => findLocation());

watch([episode], ([episode]) => findEpisode());
</script>

<style></style>
