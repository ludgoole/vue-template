<route lang="yaml">
meta:
  title: Markdown
  </route>

<script setup lang="ts">
import Profile from '../markdown/Profile.md'
</script>

<template>
  <div class="Markdown" text-left p-4 w-1000px mx-auto>
    <Profile />
  </div>
</template>

<style lang="less">
.Markdown {
  h1 {
    @apply font-bold text-4xl py-8;
  }
  h3 {
    @apply font-bold text-2xl py-4;
  }
  strong {
    @apply py-2;
  }
  img {
    @apply inline-block;
  }
}
</style>
