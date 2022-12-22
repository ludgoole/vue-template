import book from './book'
import images from './images'

export default {
  book: '道德经',
  poem: '数字码',
  words: '00-99',
  images: images.map((image, i) => {
    return {
      id: `道德经_${book[i].name}`,
      name: book[i].name,
      path: image,
      piles: Array(10).fill(1).map((v, j) => {
        return {
          id: `道德经_${book[i].name}_${j}`,
          order: j + 1,
          sentence: book[i].sentences[j] || '',
          note: '',
        }
      }),
    }
  }),
}
