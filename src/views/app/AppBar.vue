<script setup lang="ts"></script>

<template>
  <header>
    <button>
      <mdi-menu class="icon" />
    </button>
    <div class="self-center">bracket master</div>
    <button class="sign-in-google flex items-center bg-red-400 hover:bg-red-300 ring-1 ring-red-300">
      <span class="mr-2">Sign in</span> <mdi-google class="icon" />
    </button>
  </header>
</template>

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

  .sign-in-google {
    padding: 0.5rem 1rem;

    .icon {
      font-size: 2rem;
    }
  }
}
</style>
