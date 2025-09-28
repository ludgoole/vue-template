// !export default ZHOUYI：默认导出
declare module '@/mock/*/index' {
  // const ZHOUYI: MOCK.BOOK
  // export = ZHOUYI
}

declare module 'num2capital' {
  const num2Capital: (num: number) => string
  export { num2Capital }
}

declare namespace MOCK {
  interface PINYIN {
    [key: string]: string
  }
  interface NOTE {
    [key: string]: string
  }
  interface PILE {
    id: number
    info: string | number[]
    note: string
  }
  interface IMAGE {
    id: number
    path: string
    width: number
    height: number
    name: string
    book: string
    piles: PILE[]
  }

  interface BOOK {
    name: string
    film: string
    col: number
    images: IMAGE[],
    detail?: string[][]
  }
}




