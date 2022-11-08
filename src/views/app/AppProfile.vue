<template>
  <section class="flex flex-col items-center justify-center">
    <h2 class="mt-10">Welcome {{ $store.user.name }}</h2>
    <button class="app-btn mt-5 bg-red-400" @click="signOut">LOG OUT</button>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";

const $store = useStore();
const router = useRouter();

const signOut = () => {
  $store.deauthorize();
  router.push({ name: "home" });
};
</script>

<style lang="less" scoped></style>
