<script lang="ts" setup>
import { toggleDark } from '/src/composables'
</script>

<template>
  <button
    p="!none"
    btn="~ yellow-50 dark:iconify"
    i="ph-sun-bold dark:ph-moon-duotone"
    @click="() => toggleDark()"
  ></button>
</template>
