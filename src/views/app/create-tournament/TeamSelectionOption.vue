<template>
  <div v-if="selectable" class="flex flex-col">
    <button
      class="app-btn-round bg-black/10 p-8"
      @click="() => emit('selected')"
    >
      <span v-if="isDefault">-</span>
      <span v-else>+</span>
    </button>
  </div>

  <div v-else class="flex flex-col">
    <img :src="team.image" />
    <span class="text-xl text-center">{{ team.name }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps(["team", "selectable", "isDefault"]);

const emit = defineEmits(["selected"]);
</script>
