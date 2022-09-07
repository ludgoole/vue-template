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
}


