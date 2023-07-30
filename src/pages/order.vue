<route lang="yaml">
meta:
  title: order
  hideHeader: true
  roles: [ADMIN]
</route>

<script lang="ts" setup>
const active = ref(0)
</script>

<template>
  <div class="Order p-4 bg-gray-100">
    <section class="cash p-4 rounded-md bg-slate-600 color-white">
      <ul flex flex-wrap mt--4>
        <li class="basis-1\/2 mt-4">
          <p>Cashable Balance</p>
          <p>0.00</p>
        </li>
        <li class="basis-1\/2 mt-4">
          <p>Cashable Balance</p>
          <p>0.00</p>
        </li>
        <li class="basis-1\/2 mt-4">
          <p>Cashable Balance</p>
          <p>0.00</p>
        </li>
        <li class="basis-1\/2 mt-4">
          <p>Cashable Balance</p>
          <p>0.00</p>
        </li>
      </ul>
    </section>
    <section class="list box-base">
      <header flex-justify>
        <p>Order List</p>
        <p><i i-material-symbols:play-circle-outline></i></p>
      </header>
      <VanTabs v-model:active="active" type="card" mt-4>
        <VanTab title="Collection Orders">
          <ul mt-4 color-gray-4>
            <li flex>
              <p>Order Id:</p>
              <p>P137328737327827328</p>
            </li>
            <li flex>
              <p>Order Amount:</p>
              <p>2.22 USDT</p>
            </li>
            <li flex>
              <p>Commission:</p>
              <p>3.45 USDT</p>
            </li>
            <li flex>
              <p>Order Type:</p>
              <p>USDT Collection</p>
            </li>
            <li flex>
              <p>Time:</p>
              <p>2023-12-33 12:22:11</p>
            </li>
          </ul>
        </VanTab>
        <VanTab title="Payment Orders">
          内容 2
        </VanTab>
      </VanTabs>
    </section>
  </div>
</template>

<style lang="less">
.Order {
  --van-tabs-default-color: #3b82f6 !important;

  .van-tabs__nav--card {
    margin: 0;
  }
}
</style>
