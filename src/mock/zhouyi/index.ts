import book from './book'

export default {
  name: '周易',
  film: '标题',
  col: 8,
  images: book.map((item, i) => {
    return {
      id: i + 1,
      path: new URL(`./images/${i + 1}.jpg`, import.meta.url).href,
      name: book[i].guaMing,
      book: '周易',
      piles: [item.guaMing, item.guaXiang, item.daXiang, ...item.yaoCi].map((v, j) => {
        return {
          id: j + 1,
          info: v,
          note: '',
        }
      }),
    }
  }),
}
