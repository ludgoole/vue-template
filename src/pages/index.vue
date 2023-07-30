<route lang="yaml">
meta:
  title: home
  hideHeader: true
  roles: [ADMIN]
</route>

<script lang="ts" setup>
// import { useCounterStore } from '@/stores/counter'
import { getMockData, getTestData } from '@/apis/test'

// const { count } = toRefs(useCounterStore())

getTestData({ id: 1 }).then((data) => {
  console.log('🚀 ~ file: index.vue ~ line 24 ~ getTestData ~ data', data)
})

getMockData().then((data) => {
  console.log('🚀 ~ file: index.vue:20 ~ getMockData ~ data:', data)
})
</script>

<template>
  <div class="Home p-4 bg-gray-1">
    <section class="cash p-4 rounded-md bg-slate-600 color-white">
      <header>Cashable Balance</header>
      <p>0.00</p>
      <p flex text-center mt-8>
        <span flex-1><i i-material-symbols:download></i> Recharge</span>
        <span flex-1><i i-material-symbols:upload-rounded></i> Withdrawal</span>
      </p>
    </section>
    <section class="invite box-base">
      <img src="@/assets/images/invite.png" alt="" />
    </section>
    <section class="usdp box-base px-0 flex text-center color-slate-700">
      <div flex-1>
        <p text-sm>
          Today's order income
        </p>
        <p py-2>
          USDT
        </p>
        <p>2.89 USDT</p>
      </div>
      <div w-1px bg-gray-1>
      </div>
      <div flex-1>
        <p text-sm>
          Today's team earnings
        </p>
        <p py-2>
          USDT
        </p>
        <p>0.89 USDT</p>
      </div>
    </section>
    <section class="notice box-base flex-justify">
      <p>Notice</p>
      <p>more <i i-gg:more-o></i></p>
    </section>

    <section class="info box-base">
      <header>More Information</header>
      <ul mt-2>
        <li flex-justify mt-2>
          <p>BTC<span text-sm>/USDT</span></p>
          <p>29293.23</p>
          <p class="Home-tag" border-base px-2 bg-green-1 border-green-2 color-green>
            +0.345
          </p>
        </li>
        <li flex-justify mt-4>
          <p>BTC<span text-sm>/USDT</span></p>
          <p>2293.23</p>
          <p class="Home-tag" border-base px-2 bg-red-1 border-red-2 color-red>
            +0.305
          </p>
        </li>
        <li flex-justify mt-4>
          <p>BTC<span text-sm>/USDT</span></p>
          <p>2923.23</p>
          <p class="Home-tag" border-base px-2 bg-blue-1 border-blue-2 color-blue>
            +0.450
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="less" scoped>
.Home {

  &-tag {
    line-height: 24px;
    font-size: 14px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
}
</style>
