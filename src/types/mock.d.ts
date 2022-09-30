// !export default ZHOUYI：默认导出
// declare module '@/mock/ZHOUYI' {
//   const ZHOUYI: MOCK.ZHOUYI
//   export = ZHOUYI
// }

// !export const LUNYU：模块导出
// declare module '@/mock/lunyu' {
//   export const LUNYU: MOCK.ZHOUYI
// }

// !export default ZHOUYI：默认导出批量处理
// declare module '@/mock/*' {

// }
declare module '@/mock/*' {

}

declare namespace MOCK {
  interface PILE {
    id: number
    name: string
    sentence: string
  }
  interface IMAGE {
    id: number
    name: string
    path: string
    piles: PILE[]
  }

  interface ZHOUYI {
    book: string
    poem: string
    words: string
    images: IMAGE[]
  }
}




