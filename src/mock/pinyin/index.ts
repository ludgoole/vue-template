import pinyin from './pinyin'
import images from './images'
interface PINYIN {
  [key: string]: string
}
export default images.reduce((a: PINYIN, c, i) => {
  a[pinyin[i]] = c
  return a
}, {})
