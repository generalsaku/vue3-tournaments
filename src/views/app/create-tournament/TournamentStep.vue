<template>
  <section class="flex flex-col mb-16">
    <div class="flex">
      <div
        class="flex items-center justify-center ring-1 ring-gray-100 rounded-full w-12 h-12 mr-4"
      >
        <span class="text-3xl">{{ step }}</span>
      </div>
      <div class="flex">
        {{ name }} <mdi:check v-if="valid" class="ml-2 text-4xl" />
      </div>
      <mdi:chevron-up v-if="open" class="ml-auto text-5xl" />
      <mdi:chevron-down v-else class="ml-auto text-5xl" />
    </div>
    <div v-if="open">
      <slot></slot>
      <div class="flex justify-end mt-16">
        <button v-if="!hideBack" class="app-btn mr-8" @click="back">
          BACK
        </button>
        <button
          v-if="!hideComplete"
          class="app-btn app-bg-primary"
          :disabled="!valid"
          @click="next"
        >
          CONTINUE
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps(["step", "name", "open", "hideBack", "hideComplete", "valid"]);
const emit = defineEmits(["back", "next"]);

const back = () => {
  emit("back");
};

const next = () => {
  emit("next");
};
</script>
