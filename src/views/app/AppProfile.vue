<template>
  <section class="flex flex-col items-center justify-center">
    <h3>Welcome {{ userStore.name }}</h3>
    <button class="btn" @click="userStore.signOut">SIGN OUT</button>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<style lang="less" scoped></style>
