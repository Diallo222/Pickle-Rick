import { defineStore } from "pinia";

export const useLocationStore = defineStore("locations", {
  state: () => ({
    locations: [] as any[],
    loading: false,
    location: {},
  }),
  actions: {
    async fetchAllLocations() {
      this.loading = true;
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/location"
        );
        const data = await response.json();
        this.locations = data.results || [];
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchLocation(id: number) {
      this.loading = true;
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/location/${id}`
        );
        const data = await response.json();
        this.location = data;
        console.log("LOCATION:", this.location);
      } catch (error) {
        console.error("Failed to fetch location:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    allLocations: (state) => state.locations,
    singleLocation: (state) => state.location,
  },
});
