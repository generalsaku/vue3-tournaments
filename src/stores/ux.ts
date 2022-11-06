import { ref } from "vue";
import { defineStore } from "pinia";

export const useUxStore = defineStore("ux", () => {

  const isPanelOpen = ref(false);
  const isLoading = ref(false);
  
  const togglePanel = () => {
    isPanelOpen.value = !isPanelOpen.value 
  }

  const setLoading = (value:boolean) => {
    isLoading.value = value 
  }

  return { isPanelOpen, isLoading, togglePanel, setLoading };
});