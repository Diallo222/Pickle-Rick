import { defineStore } from "pinia";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
    productsLoading: false,
    categories: [] as string[],
    selectedCategory: null as string | null,
    catLoading: false,
  }),
  actions: {
    async fetchProducts() {
      this.productsLoading = true;
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        this.products = await response.json();
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        this.productsLoading = false;
      }
    },
    async fetchCategories() {
      this.catLoading = true;
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        this.categories = await response.json();
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        this.catLoading = false;
      }
    },
    async fetchCategoryProducts(category: string) {
      this.selectedCategory = category;
      this.productsLoading = true;
      this.products = [];
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        this.products = await response.json();
      } catch (error) {
        console.error("Failed to fetch products for category:", error);
      } finally {
        this.productsLoading = false;
      }
    },
  },
  getters: {
    allProducts: (state) => state.products,
    allCategories: (state) => state.categories,
  },
});
