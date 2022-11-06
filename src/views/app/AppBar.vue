<template>
  <header class="app-shadow-primary app-flex-center justify-between px-4 py-2">
    <button class="app-btn-round" @click="uxStore.togglePanel">
      <mdi-menu class="icon text-5xl" />
    </button>
    <div class="self-center">bracket master</div>
    <button
      v-if="!userStore.isLoggedIn"
      class="app-btn bg-red-400"
      @click="userStore.signIn"
    >
      <span class="mr-2">Sign in</span> <mdi-google class="icon" />
    </button>
    <button
      v-else
      class="app-btn-round p-0 w-20 h-20"
      @click="this.$router.push({ name: 'profile' })"
    >
      <img :src="userStore.image" />
    </button>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useUxStore } from "@/stores/ux";

const userStore = useUserStore();
const uxStore = useUxStore();
</script>

<style lang="less" scoped></style>
