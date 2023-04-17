import db from '../db'
import zhouyiData from '../database/zhouyi.js'

const zhouyi = db.zhouyi

db.transaction('rw', zhouyi, async () => {
  // Make sure we have something in DB:
  zhouyi.bulkPut(zhouyiData)

  // Query:
  const 乾 = await db.zhouyi.where({ 卦序: 1 }).toArray()

  // Show result:
  console.log('🚀 ~ file: zhouyi.ts:13 ~ db.transaction ~ smithzhouyi:', 乾, zhouyi)
}).catch((e) => {
  console.log('🚀 ~ file: zhouyi.ts:17 ~ db.transaction ~ e:', e)
})

export const add = (data: DATABASE.Zhouyi) => zhouyi.put(data)
export const remove = (id: number) => zhouyi.delete(id)
export const get = () => zhouyi.toArray()
export const query = (data: Partial<DATABASE.Zhouyi>) => zhouyi.where(data).toArray()
export const filter = (data: string[]) => zhouyi.filter((卦) => data.includes(卦.卦象.toString())).toArray()

export default {
  add,
  remove,
  get,
  query,
  filter,
}
