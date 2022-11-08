<template>
  <ul>
    <li v-if="canLock" @click="() => action('lock')">
      <button class="app-btn-nav">
        <mdi:lock-open class="mr-2 ml-16 text-4xl" />Lock
      </button>
    </li>

    <li v-else-if="canUnlock" @click="() => action('unlock')">
      <button class="app-btn-nav">
        <mdi:lock class="mr-2 ml-16 text-4xl" /> Unlock
      </button>
    </li>

    <li v-if="canSetTiebreaker" @click="() => action('tiebreaker')">
      <button class="app-btn-nav">
        <mdi:swap-vertical class="mr-2 ml-16 text-4xl" />Tiebreaker
      </button>
    </li>

    <li v-if="canUnsubscribe" @click="() => action('subscribe')">
      <button class="app-btn-nav">
        <mdi:cards-heart class="mr-2 ml-16 text-4xl" />Subscribed
      </button>
    </li>

    <li v-if="canSubscribe" @click="() => action('unsubscribe')">
      <button class="app-btn-nav">
        <mdi:cards-heart-outline class="mr-2 ml-16 text-4xl" />Subscribe
      </button>
    </li>

    <li>
      <button class="app-btn-nav" @click="() => action('bigscreen')">
        <mdi:fullscreen class="mr-2 ml-16 text-4xl" />Bigscreen
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "@/stores/store";

const $store = useStore();

const canUnlock = computed(
  () => $store.tournament.isOwner && $store.tournament.isLocked
);

const canLock = computed(
  () => $store.tournament.isOwner && !$store.tournament.isLocked
);

const canSetTiebreaker = computed(() => $store.tournament.isOwner);

const canSubscribe = computed(
  () =>
    $store.user.isAuthorized &&
    $store.tournament &&
    !$store.tournament.isOwner &&
    !$store.tournament.isSubscribed
);

const canUnsubscribe = computed(
  () =>
    $store.user.isAuthorized &&
    $store.tournament &&
    !$store.tournament.isOwner &&
    $store.tournament.isSubscribed
);

const action = (actionName: string) => {
  switch (actionName) {
    case "lock":
      break;
    case "unlock":
      break;
    case "tiebreaker":
      break;
    case "subscribe":
      break;
    case "unsubscribe":
      break;
    case "bigscreen":
      break;
  }
};
</script>

<style lang="less" scoped></style>
