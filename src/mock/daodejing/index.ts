import book from './book'

export default {
  name: '道德经',
  film: '数字',
  width: 800,
  height: 600,
  col: 9,
  images: book.map((item, i) => {
    return {
      id: i + 1,
      book: '道德经',
      path: new URL(`./images/${i + 1}.webp`, import.meta.url).href,
      width: 800,
      height: 600,
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
}
