<template>
  <div
    class="flex w-10/12 sticky top-10 mx-auto rounded-xl overflow-hidden shadow"
  >
    <button class="app-btn-nav app-bg-primary justify-center">
      ADD TEAM +
    </button>
    <button class="app-btn-nav bg-green-400/60 justify-center">
      SAVE ALL <mdi:content-save class="ml-2" />
    </button>
  </div>

  <section class="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto p-16">
    <div
      v-for="(team, index) in teams"
      :key="index"
      class="app-bg-ternary shadow-md w-full"
    >
      <div class="flex justify-center relative">
        <img :src="team.image" />
        <ImageInput :id="index"></ImageInput>
      </div>
      <div class="p-2">
        <input type="text" class="bg-transparent p-2" :value="team.name" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useStore } from "@/stores/store";

import ImageInput from "@/views/app/teams/ImageInput.vue";

const $store = useStore();

onMounted(() => update());

const teams = ref([]);

const update = async () => {
  if (!$store.user.isAuthorized) {
    return;
  }

  teams.value = await $store.getTeams();
};
</script>
