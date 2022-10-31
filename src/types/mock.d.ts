// !export default ZHOUYI：默认导出
declare module '@/mock/*/index' {
  // const ZHOUYI: MOCK.BOOK
  // export = ZHOUYI
}

declare module '@/mock/*' {

}

declare namespace MOCK {
  interface PINYIN {
    [key: string]: string
  }
  interface PILE {
    id: string
    name: string
    sentence: string
    note: string
  }
  interface IMAGE {
    id: string
    name: string
    path: string
    piles: PILE[]
  }

  interface BOOK {
    book: string
    poem: string
    words: string
    images: IMAGE[]
  }
}




