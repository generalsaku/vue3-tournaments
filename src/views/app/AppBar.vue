<template>
  <header
    class="app-shadow-primary app-flex-center justify-between px-4 py-2 relative"
  >
    <button class="app-btn-round" @click="$store.togglePanel">
      <mdi-menu class="icon text-5xl" />
    </button>
    <div class="self-center flex flex-col items-center">
      <span>BRACKET MASTER</span>
      <div v-if="$store.tournament" class="flex justify-center items-center">
        <span class="text-3xl">"{{ $store.tournament.name }}"</span>
        <mdi:lock
          v-if="$store.tournament.isLocked"
          class="ml-2 mb-1 text-4xl"
        />
      </div>
    </div>
    <button
      v-if="!$store.user.isAuthorized"
      class="app-btn bg-red-400"
      @click="signIn"
    >
      <span class="mr-2">Sign in</span> <mdi-google class="icon" />
    </button>
    <button
      v-else
      class="app-btn-round p-0 w-20 h-20"
      @click="$router.push({ name: 'profile' })"
    >
      <img :src="$store.user.image" />
    </button>

    <div
      v-if="$store.isLoading"
      class="absolute inset-x-0 bottom-0 pulse"
    ></div>
  </header>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";

const $store = useStore();

const signIn = () => {
  window.location.href = `${
    import.meta.env.VITE_API_BASE_URL
  }/auth/login?redirectUri=${window.location.href}`;
};
</script>

<style lang="less" scoped>
.pulse {
  height: 2px;
  animation: pulse ease-in-out infinite 3s;
}

@keyframes pulse {
  0% {
    background: rgba(255, 255, 255, 0);
  }

  50% {
    background: rgba(255, 255, 255, 0.8);
  }

  100% {
    background: rgba(255, 255, 255, 0);
  }
}
</style>
