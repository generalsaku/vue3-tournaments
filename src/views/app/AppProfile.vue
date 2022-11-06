<template>
  <section class="flex flex-col items-center justify-center">
    <h2 class="mt-10">Welcome {{ userStore.name }}</h2>
    <button class="app-btn mt-5 bg-red-400" @click="signOut">LOG OUT</button>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const signOut = () => {
  userStore.signOut();
};
</script>

<style lang="less" scoped></style>
