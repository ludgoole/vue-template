<route lang="yaml">
meta:
  title: mine
  hideHeader: true
  roles: [ADMIN]
  </route>

<script lang="ts" setup>
// const active = ref(0)
</script>

<template>
  <div class="Order p-4 bg-gray-100 color-gray-4">
    <header flex justify-end>
      <i i-material-symbols:share-outline></i>
    </header>
    <section class="profile box-base flex items-center">
      <img src="@/assets/images/logo.png" alt="" />
      <ul ml-2>
        <li>Mobile: 180000000</li>
        <li>Invitation Code: 12</li>
        <li>UID: 11</li>
      </ul>
      <VanIcon ml-auto name="arrow" />
    </section>
    <section class="grid box-base">
      <ul flex flex-wrap mt--4 text-xs text-center>
        <li class="basis-1\/3 mt-4">
          <p text-32px>
            <i i-twemoji:money-bag></i>
          </p>
          <p>Financial Flow</p>
        </li>
        <li class="basis-1\/3 mt-4">
          <p text-32px>
            <i i-uil:money-withdrawal></i>
          </p>
          <p>Withdrawal Record</p>
        </li>
        <li class="basis-1\/3 mt-4">
          <p text-32px>
            <i i-noto:money-bag></i>
          </p>
          <p>Payment History</p>
        </li>
        <li class="basis-1\/3 mt-4">
          <p text-32px>
            <i i-noto:money-bag></i>
          </p>
          <p>Collection History</p>
        </li>
        <li class="basis-1\/3 mt-4">
          <p text-32px>
            <i i-noto:money-bag></i>
          </p>
          <p>Recharge Record</p>
        </li>
        <li class="basis-1\/3 mt-4">
          <p text-32px>
            <i i-noto:money-bag></i>
          </p>
          <p>Profit</p>
        </li>
      </ul>
    </section>
    <section class="cell box-base p-0">
      <ul text-sm text-center divide-y>
        <li class="flex-justify items-center p-4">
          <p>
            <i i-ph:bag></i>
            Bind USDT
          </p>
          <VanIcon ml-auto name="arrow" />
        </li>
        <li class="flex-justify items-center p-4">
          <p>
            <i i-material-symbols:settings-outline></i>
            Google Auth
          </p>
          <VanIcon ml-auto name="arrow" />
        </li>
        <li class="flex-justify items-center p-4">
          <p>
            <i i-ant-design:team-outlined></i>
            My team
          </p>
          <VanIcon ml-auto name="arrow" />
        </li>
        <li class="flex-justify items-center p-4">
          <p>
            <i i-mdi:tag-outline></i>
            USDT Address List
          </p>
          <VanIcon ml-auto name="arrow" />
        </li>
        <li class="flex-justify items-center p-4">
          <p>
            <i i-ri:bank-card-line></i>
            Bank Card List
          </p>
          <VanIcon ml-auto name="arrow" />
        </li>
        <li class="flex-justify items-center p-4">
          <p>
            <i i-ic:outline-lock></i>
            Password
          </p>
          <VanIcon ml-auto name="arrow" />
        </li>
        <li class="flex-justify items-center p-4">
          <p>
            <i i-ph:question></i>
            Help Center
          </p>
          <VanIcon ml-auto name="arrow" />
        </li>
      </ul>
    </section>
    <section mt-4>
      <VanButton type="danger" block>
        块级元素
      </VanButton>
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
