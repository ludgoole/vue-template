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

  type ZHOUYI = GUA []
}


