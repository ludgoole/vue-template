<route lang="yaml">
meta:
  title: 登录
  hideHeader: true
</route>

<script setup lang="ts">
import localforage from 'localforage'
const router = useRouter()

// ts
interface Login {
  username: string
  password: string
}

// created
const title = '育知道 训练营'
const username = ref('')
const password = ref('')

// method
const onSubmit = (values: Login) => {
  console.log('submit', values)
  router.push('/')
  localforage.setItem('Authorization', 'token')
  localforage.setItem('userInfo', {
    ...values,
    role: 'V3',
  })
}
</script>

<template>
  <div class="Login" text-center>
    <div class="logo" mt-32>
      <i text-6xl class="i-carbon:apple"></i>
    </div>
    <h1 class="title" mt-4>
      {{ title }}
    </h1>
    <VanForm mt-8 @submit="onSubmit">
      <VanCellGroup inset>
        <VanField
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <VanField
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </VanCellGroup>
      <div style="margin: 16px;">
        <VanButton round block type="primary" native-type="submit">
          提交
        </VanButton>
      </div>
    </VanForm>
  </div>
</template>
