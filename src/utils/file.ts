export function readFile<T>(path = 'fs://meihua.json'): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      window.api.readFile(
        {
          path,
        },
        (ret: Util.FileResult, err: any) => {
          ret.status && ret.data ? resolve(JSON.parse(ret.data)) : reject(err)
        },
      )
    }
    catch (err) {
      reject(err)
    }
  })
}

export function writeFile<T>(path = 'fs://meihua.json', data: T) {
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
