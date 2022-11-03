<template>
  <header>
    <button class="btn-round">
      <mdi-menu class="icon" />
    </button>
    <div class="self-center">bracket master</div>
    <button
      v-if="!userStore.isLoggedIn"
      class="btn sign-in-google"
      @click="userStore.signIn"
    >
      <span class="mr-2">Sign in</span> <mdi-google class="icon" />
    </button>
    <button
      v-else
      class="btn-round p-0 w-20 h-20"
      @click="this.$router.push('profile')"
    >
      <img :src="userStore.image" />
    </button>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<style lang="less" scoped>
header {
  display: flex;
  padding: 8px 8px;
  box-shadow: var(--app-elevation-4);
  justify-content: space-between;

  button {
    .icon {
      font-size: 3rem;
    }
  }

  // .sign-in-google {
  //   padding: 0.5rem 1rem;

  //   .icon {
  //     font-size: 2rem;
  //   }
  // }
}
</style>
