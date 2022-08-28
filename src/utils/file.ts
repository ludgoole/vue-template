export function readFile(path = 'fs://meihua.json') {
  return new Promise((resolve, reject) => {
    try {
      window.api.readFile(
        {
          path,
        },
        (ret: Util.FileResult, err: any) => {
          ret.status ? resolve(JSON.parse(ret.data || '[]')) : reject(err)
        },
      )
    }
    catch (err) {
      reject(err)
    }
  })
}

export function writeFile(path = 'fs://meihua.json', data: Object[]) {
  return new Promise((resolve, reject) => {
    try {
      window.api.writeFile(
        {
          path,
          data: JSON.stringify(data),
        },
        (ret: Util.FileResult, err: any) => {
          ret.status ? resolve(ret.data) : reject(err)
        },
      )
    }
    catch (err) {
      reject(err)
    }
  })
}

export function getPicture() {
  return new Promise((resolve, reject) => {
    try {
      window.api.getPicture(
        {
          sourceType: 'album',
          encodingType: 'jpg',
          mediaValue: 'pic',
          destinationType: 'base64',
          allowEdit: true,
          quality: 50,
          targetWidth: 800,
          saveToPhotoAlbum: false,
        },
        (ret: Util.ImageResult, err: any) => {
          ret.base64Data ? resolve(ret.base64Data) : reject(err)
        },
      )
    }
    catch (err) {
      reject(err)
    }
  })
}
