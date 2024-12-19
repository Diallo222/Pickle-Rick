import { defineStore } from "pinia";

export const useCharactersStore = defineStore("characters", {
  state: () => ({
    characters: [] as any[],
    loading: false,
    character: {},
  }),
  actions: {
    async fetchAllCharacters() {
      this.loading = true;
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character`
        );
        const data = await response.json();
        this.characters = data.results || [];
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchCharacter(id: number) {
      this.loading = true;
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        this.character = await response.json();
      } catch (error) {
        console.error("Failed to fetch character:", error);
      } finally {
        this.loading = false;
      }
    },
    async filterCharacters(
      name: string,
      status: string,
      species: string,
      type: string,
      gender: string
    ) {
      this.loading = true;
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`
        );
        const data = await response.json();
        this.characters = data.results || [];
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    allCharacters: (state) => state.characters,
    isLoading: (state) => state.loading,
    singleCharacter: (state) => state.character,
  },
});
