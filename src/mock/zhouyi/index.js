import zhouyi from './zhouyi'
import yiXiangList from './yixiang'
import yiliList from './yili'
import leiXiangList from './leixiang'
import yaoXiangList from './yaoxiang'
import liuyao from './liuyao'

export default zhouyi.map((v, i) => {
  v.yiXiang = yiXiangList[i]
  v.yiLi = yiliList[i]
  v.leiXiang = leiXiangList[i]
  v.yaoXiang = yaoXiangList[i]

  return { ...v, ...liuyao[i] }
})
