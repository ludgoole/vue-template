declare namespace MOCK {
  interface STOCk_BASE_ITEM {
    id: string
    area: string
    name: string
    price: string
    desc?: string
    time?: number
  }
  interface STOCk_SUB_ITEM {
    color: string
    size: string
  }
  interface STOCk_CHILD_ITEM {
    color: string
    sizes: string[]
  }

  interface STOCK_OPTION {
    label: string
    value: string
  }

  interface STOCK_TREE_ITEM extends STOCk_BASE_ITEM {
    children: STOCk_CHILD_ITEM[]
  }

  type STOCk_ITEM = STOCk_BASE_ITEM & STOCk_SUB_ITEM
  type STOCk = STOCk_ITEM []
  type STOCK_UNIQUE = Partial<STOCk_ITEM>[]
  type STOCK_TREE = STOCK_TREE_ITEM[]
  type STOCK_SELECT = STOCK_OPTION[]
}


