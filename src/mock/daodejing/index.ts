import book from './book'

export default {
  name: '道德经',
  film: '数字',
  col: 9,
  images: book.map((item, i) => {
    return {
      id: i + 1,
      path: new URL(`./images/${i + 1}.JPG`, import.meta.url).href,
      name: book[i].name,
      book: '道德经',
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
