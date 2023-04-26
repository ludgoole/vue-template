<route lang="yaml">
meta:
  title: Interview
</route>

<script setup lang="ts">
import Interview from '../markdown/Interview.md'
</script>

<template>
  <div class="Interview" flex-1 flex text-left overflow-hidden>
    <div px-6 w-24 mr-20 h-full overflow-auto>
      <nav v-for="n in 100" :key="n" my-4>
        第{{ n }}题
      </nav>
    </div>
    <Interview h-full overflow-auto />
  </div>
</template>
