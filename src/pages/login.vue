<route lang="yaml">
meta:
  title: Login
  hideHeader: true
  hideFooter: true
</route>

<script setup lang="ts">
import localforage from 'localforage'
import { Toast } from 'vant'
const router = useRouter()

// ts
interface Login {
  username: string
  password: string
}

// created
const title = 'Login to UPay'
const username = ref('')
const phone = ref('')
const password = ref('')

// method
const onSubmit = (values: Login) => {
  Toast('login success!')

  router.push('/')
  localforage.setItem('Authorization', 'token')
  localforage.setItem('userInfo', {
    ...values,
    role: values.username === 'admin' ? 'ADMIN' : '',
  })
}
</script>

<template>
  <div class="Login flex-center bg-gray-1 px-8">
    <section class="container box-base bg-white">
      <h1 mt-4 text-2xl text-center>
        {{ title }}
      </h1>
      <VanForm @submit="onSubmit">
        <VanField
          v-model="username"
          name="username"
          label="Login Username"
          placeholder="Login Username"
          :rules="[{ required: true, message: 'Please enter username' }]"
        >
          <template #label>
            <i i-ic:baseline-person-outline></i>
            Login Username
          </template>
        </VanField>
        <VanField
          v-model="phone"
          type="tel"
          name="phone"
          label="Mobile Number"
          placeholder="Mobile Number"
          :rules="[{ required: true, message: 'Please enter mobile number' }]"
        >
          <template #label>
            <i i-ph:phone></i>
            Mobile Number
          </template>
        </VanField>
        <VanField
          v-model="password"
          type="password"
          name="password"
          label="Login Password"
          placeholder="Login password"
          :rules="[{ required: true, message: 'Please enter password' }]"
        >
          <template #label>
            <i i-ic:outline-lock></i>
            Login Password
          </template>
        </VanField>
        <div style="margin: 16px;">
          <VanButton block type="primary" native-type="submit">
            login
          </VanButton>
        </div>
      </VanForm>
      <p pr-4 text-right color-gray-4 @click="router.push('/sign')">
        Sign up
      </p>
    </section>
  </div>
</template>

<style lang="less">
.Login {
  .container {
    width: 80vw;
  }
  .van-field {
    flex-direction: column;
    &__label {
      width: 100%;
    }
  }
}
</style>
