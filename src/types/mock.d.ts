// !export default []  (默认导出)
declare module '@/mock/test' {
  const TEST: MOCK.ZHI_NANG_ITEM
  export = TEST
}

// !export const TEST = []  (模块导出)
// declare module '@/mock/test' {
//   export const LUNYU: MOCK.ZHOUYI
// }

// !export default []  (默认导出批量处理)
// declare module '@/mock/*' {

// }

declare namespace MOCK {
  interface YILI_ITEM {
    situation: string,
    how: string,
    premise: string,
    why: string,
    or: string,
    story: string,
    note: string,
  }

  interface GUA {
    guaXu: number,
    guaMing: string,
    guaXiang: string,
    daXiang: string,
    guaCi: string,
    yaoCi: string [],
    yiXiang: string,
    yiLi: YILI_ITEM [],
    leiXiang: string,
    yaoXiang: string [],
    baGong: string,
    baGongOrder: 10,
    chongHe: string,
    naJia: string [],
    shiYing: {
      [key: number]: string
    },
  }

  interface HOOK {
    id: number,
    name: string,
    tags: string[]
  }
  interface PILE {
    id: number,
    name: string,
    keyword: string,
    hooks: HOOK[]
  }

  interface IMAGE {
    id: number,
    name: string,
    path: string,
    piles: PILE[]
  }

  interface ZHI_NANG_ITEM {
    book: string,
    poem: string,
    words: string,
    images: IMAGE[]
  }

  type ZHOUYI = GUA []
  type ZHI_NANG = ZHI_NANG_ITEM []
}


