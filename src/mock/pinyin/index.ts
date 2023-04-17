import pinyin from './pinyin'
import images from './images'
export default images.reduce((a: MOCK.PINYIN, c, i) => {
  a[pinyin[i]] = c
  return a
}, {})
