import { createRouter, createWebHashHistory } from 'vue-router'
import localforage from 'localforage'
import { Toast } from 'vant'
import routes from '~pages'

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const token = await localforage.getItem('Authorization')
  const user = (await localforage.getItem('userInfo') || {}) as { role: string }
  const roles = to.meta?.roles as string[]

  if (to.path === '/login') {
    next()
  }
  else {
    if (token) {
      if (roles && !roles.includes(user.role))
        // Toast({ message: '您没有权利访问，请联系管理员升级' })
        next('/404')

      else
        next()
    }
    else {
      Toast({ message: '您还没有登录，请先登录' })
      next('/login')
    }
  }
})
