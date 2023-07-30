<route lang="yaml">
meta:
  title: Sign up
  hideHeader: true
  hideFooter: true
</route>

<script setup lang="ts">
import localforage from 'localforage'
import { Toast } from 'vant'
const router = useRouter()

// ts
interface Sign {
  username: string
  password: string
}

// created
const username = ref('')
const phone = ref('')
const password = ref('')
const repeatPassword = ref('')
const paymentPassword = ref('')
const referralCode = ref('')
const verificationCode = ref('')
const type1 = ref<'password' | 'text'>('password')
const type2 = ref<'password' | 'text'>('password')
const type3 = ref<'password' | 'text'>('password')

// method
const onSubmit = (values: Sign) => {
  if (values.password !== '123456') {
    return Toast({
      message: '用户名或密码不正确',
    })
  }

  router.push('/')
  localforage.setItem('Authorization', 'token')
  localforage.setItem('userInfo', {
    ...values,
    role: values.username === 'admin' ? 'ADMIN' : '',
  })
}
</script>

<template>
  <div class="Sign flex-center bg-gray-1 px-8">
    <section class="container box-base bg-white">
      <VanForm @submit="onSubmit">
        <VanField
          v-model="username"
          name="username"
          label="Sign Username"
          placeholder="Sign Username"
          :rules="[{ required: true, message: 'Please enter username' }]"
        >
          <template #label>
            <i i-ic:baseline-person-outline></i>
            Sign Username
          </template>
        </VanField>
        <VanField
          v-model="phone"
          name="phone"
          type="tel"
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
          :type="type1"
          name="password"
          label="Sign Password"
          placeholder="Sign Password"
          :right-icon="type1 === 'text' ? 'closed-eye' : 'eye-o'"
          :rules="[{ required: true, message: 'Please enter password' }]"
          @click-right-icon="type1 = type1 === 'text' ? 'password' : 'text'"
        >
          <template #label>
            <i i-ic:outline-lock></i>
            Sign Password
          </template>
        </VanField>
        <VanField
          v-model="repeatPassword"
          :type="type2"
          name="repeatPassword"
          label="Repeat Sign Password"
          placeholder="Repeat Sign Password"
          :right-icon="type2 === 'text' ? 'closed-eye' : 'eye-o'"
          :rules="[{ required: true, message: 'Please enter password again' }]"
          @click-right-icon="type2 = type2 === 'text' ? 'password' : 'text'"
        >
          <template #label>
            <i i-ic:outline-lock></i>
            Repeat Sign Password
          </template>
        </VanField>
        <VanField
          v-model="paymentPassword"
          :type="type3"
          name="paymentPassword"
          label="Rayment Password"
          placeholder="Rayment Password"
          :right-icon="type3 === 'text' ? 'closed-eye' : 'eye-o'"
          :rules="[{ required: true, message: 'Please enter password again' }]"
          @click-right-icon="type3 = type3 === 'text' ? 'password' : 'text'"
        >
          <template #label>
            <i i-ic:outline-lock></i>
            Rayment Password
          </template>
        </VanField>
        <VanField
          v-model="referralCode"
          name="referralCode"
          label="Referral Code"
          placeholder="Referral Code"
          :rules="[{ required: true, message: 'Please enter Referral Code' }]"
        >
          <template #label>
            <i i-gg:keyboard></i>
            Referral Code
          </template>
        </VanField>
        <VanField
          v-model="verificationCode"
          name="verificationCode"
          label="Verification Code"
          placeholder="Verification Code"
          :rules="[{ required: true, message: 'Please enter Verification Code' }]"
        >
          <template #label>
            <i i-ri:fingerprint-fill></i>
            Verification Code
          </template>
        </VanField>
        <div style="margin: 16px;">
          <VanButton block type="primary" native-type="submit">
            Sign up
          </VanButton>
        </div>
      </VanForm>
      <p pr-4 text-right color-gray-4 @click="router.push('/login')">
        Login
      </p>
    </section>
  </div>
</template>

<style lang="less">
.Sign {
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
