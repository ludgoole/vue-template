import book from './book'
import detail from './detail'

export default {
  name: '药性歌赋',
  film: '我不是药神',
  col: 10,
  images: book.map((item, i) => {
    return {
      id: i + 1,
      book: '药性歌赋',
      path: new URL(`./images/${i + 1}.webp`, import.meta.url).href,
      width: 800,
      height: 450,
      name: book[i].name,
      piles: item.sentences.map((v, j) => {
        return {
          id: j + 1,
          info: v,
          note: '',
        }
      }),
    }
  }),
  detail,
}
