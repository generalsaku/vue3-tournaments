<template>
  <div
    class="flex flex-col radius-md app-bg-ternary rounded-xl app-shadow-secondary p-8"
  >
    <div class="flex">
      <div class="flex flex-col flex-1">
        <h3 class="text-5xl">
          <slot name="title"></slot>
        </h3>
        <div class="mt-4">
          <slot name="description"></slot>
        </div>
      </div>
      <div>
        <slot name="icon"></slot>
      </div>
    </div>
    <div class="mt-auto">
      <button
        v-if="goTo"
        :disabled="!$store.user.isAuthorized"
        class="app-btn-outline ml-auto mt-4"
        @click="$router.push(goTo)"
      >
        Let's go
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";

defineProps(["goTo"]);

const $store = useStore();
</script>

<style lang="less" scoped></style>
