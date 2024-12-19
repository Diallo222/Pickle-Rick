import { defineStore } from "pinia";

export const useEpisodeStore = defineStore("episode", {
  state: () => ({
    episodes: [],
    loading: false,
    episode: {},
  }),
  actions: {
    async fetchAllEpisodes() {
      this.loading = true;
      try {
        const response = await fetch("https://rickandmortyapi.com/api/episode");
        const data = await response.json();
        this.episodes = data.results || [];
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchEpisode(id: number) {
      this.loading = true;
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${id}`
        );
        const data = await response.json();
        this.episode = data;
      } catch (error) {
        console.error("Failed to fetch episode:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    allEpisodes: (state) => state.episodes,
    isLoading: (state) => state.loading,
    singleEpisode: (state) => state.episode,
  },
});
