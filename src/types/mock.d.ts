// !export default []  (默认导出)
declare module '@/mock/test' {
  const TEST: MOCK.List
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
  interface Item {
    id: number,
    name: string,
    gender: 1 | 2,
  }

  type List = Item []
}


