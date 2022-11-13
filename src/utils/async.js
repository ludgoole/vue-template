const loadImg = (uid) => {
  const imgUrl = `https://image.baidu.com/${uid}`
  console.log('🚀 ~ file: async.js ~ line 3 ~ loadImg ~ uid', uid)
  return new Promise((resolve, reject) => {
    // const Img = new Image()
    const Img = {}
    Img.src = imgUrl
    // Img.onload = () => resolve(uid)
    // Img.error = () => reject(uid)
    setTimeout(() => uid === 2 ? reject(uid) : resolve(uid), 100)
  })
}

const loadImgOneByOne = (uids, limit) => {
  const copyUids = uids.slice(0)

  if (copyUids.length <= limit) return Promise.all(uids.map(loadImg))

  const PromiseArray = copyUids.slice(0, limit).map(loadImg)
  Promise.race(PromiseArray)
    .then((uid) => {
      copyUids.splice(copyUids.indexOf(uid), 1)
    })
    .catch((uid) => {
      copyUids.splice(copyUids.indexOf(uid), 1)
    })
    .finally(() => {
      loadImgOneByOne(copyUids, limit)
    })
}

loadImgOneByOne([1, 2, 3, 4, 5], 3)
