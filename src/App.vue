<template>
  <div flex="~ col" justify-between min-h-100vh>
    <TheHeader fixed w-full />
    <RouterView flex-1 overflow-auto text-center mt-60px />
    <TheFooter />
  </div>
</template>
