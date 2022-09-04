export default function useShoe() {
  const pickBy = (data: MOCK.STOCk, key: keyof MOCK.STOCk_ITEM) => {
    const s = new Set()
    const flat: MOCK.STOCk = []
    data.forEach((item) => {
      if (!s.has(item[key])) {
        s.add(item[key])
        flat.push(item)
      }
    })

    console.log('🚀 ~ file: use-shoe.ts ~ line 9 ~ data.forEach ~ flat', flat)
    return flat
  }

  const uniqueBy = (data: MOCK.STOCk, key: keyof MOCK.STOCk_ITEM) => {
    const flat = pickBy(data, key)

    return Array.from(new Set(flat.map((v) => v[key]))).sort().filter((v) => v && v !== '--')
  }

  const getTreeStock = (data: MOCK.STOCk) => {
    const treeStock: MOCK.STOCK_TREE = []
    const treeStockIDs = new Set()
    const treeStockColors = new Set()

    data.forEach((item) => {
      if (treeStockIDs.has(item.id)) {
        const { color, size } = item
        const treeStockItem = treeStock.find((treeStockItem) => treeStockItem.id === item.id)
        if (treeStockColors.has(`${item.id}_${item.color}`)) {
          const treeStockChild = treeStockItem?.children.find((treeStockChild) => treeStockChild.color === item.color)
          treeStockChild?.sizes.push(size)
        }
        else {
          treeStockColors.add(`${item.id}_${item.color}`)
          treeStockItem?.children.push({ color, sizes: [size] })
        }
      }
      else {
        const { id, area, name, desc, price, time, color, size } = item
        treeStockIDs.add(item.id)
        treeStockColors.add(`${item.id}_${item.color}`)
        treeStock.push({
          id,
          area,
          name,
          desc,
          price,
          time,
          children: [
            {
              color,
              sizes: [size],
            },
          ],
        })
      }
    })

    console.log('🚀 ~ file: use-shoe.ts ~ line 37 ~ getTreeStock ~ treeStock', treeStock)
    return treeStock
  }

  return {
    pickBy,
    uniqueBy,
    getTreeStock,
  }
}
