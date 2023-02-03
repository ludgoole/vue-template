declare namespace MOCK {
  interface STOCk_BASE_ITEM {
    id: string
    area: string
    name: string
    price: string
    time: number
    note?: string
  }
  interface STOCk_SUB_ITEM {
    color: string
    size: string
  }


  type STOCk_ITEM = STOCk_BASE_ITEM & STOCk_SUB_ITEM
  type STOCk = STOCk_ITEM []

  type WUXING = '金' | '木' | '水' | '火' | '土'
  type TIANGAN = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸'
  type DIHZI = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥'

  interface BUGUA {
    '占问': string
    '占类': string
    '卦主': string
    '卦象': string
    '月建': string
    '日辰': string
    '旬空': string
    '用神': string
    '吉凶': string
    '应期': string
    '启示': string
  }
}


