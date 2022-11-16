<template>
  <div flex="~ col" justify-between min-h-100vh>
    <TheHeader />
    <RouterView flex-1 overflow-auto text-center />
    <TheFooter />
  </div>
</template>
