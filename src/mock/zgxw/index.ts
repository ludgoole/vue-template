import { chunk } from 'lodash'
import poems from '../poems'
import images from './images'
import piles from './piles'
import book from './book'

const poem = poems.find((poem) => poem.poem === '芙蓉楼送辛渐')
const size = 10
export default {
  book: '增广贤文',
  ...poem,
  images: images.map((image, i) => {
    return {
      id: i + 1,
      name: (poem?.words.match(/[\u4e00-\u9fa5]/g) || [])[i],
      path: image,
      piles: piles[i].map((pile, j) => {
        return {
          id: j + 1,
          name: pile,
          sentence: chunk(book, size)[i * size + j] || [],
        }
      }),
    }
  }),
}
