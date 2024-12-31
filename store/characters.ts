import { defineStore } from "pinia";

export const useCharactersStore = defineStore("characters", {
  state: () => ({
    characters: [] as any[],
    loading: false,
    character: {},
    pages: 0,
  }),
  actions: {
    async fetchAllCharacters(page = 1) {
      this.loading = true;
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        const data = await response.json();
        this.characters = data.results || [];
        this.pages = data.info.pages;
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
        const queryParams = new URLSearchParams({
          name,
          status,
          species,
          type,
          gender,
        }).toString();

        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?${queryParams}`
        );
        const data = await response.json();
        this.characters = data.results || [];
        this.pages = data.info.pages;
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
    allPages: (state) => state.pages,
  },
});
