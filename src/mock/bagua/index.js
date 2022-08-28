import bagua from './bagua'
import leiXiangList from './leixiang'
import tianShiList from './tianshi'
import diLiList from './dili'
import renHeList from './renhe'
import kuoZhanList from './kuozhan'

export default bagua.map((v, i) => {
  v.leixiang = [
    ...leiXiangList[i],
    ...tianShiList[i],
    ...diLiList[i],
    ...renHeList[i],
    ...kuoZhanList[i]
  ]

  return v
})
