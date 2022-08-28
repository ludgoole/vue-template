export function readFile(path = 'fs://meihua.json') {
  return new Promise((resolve, reject) => {
    try {
      window.api.readFile(
        {
          path,
        },
        (ret: Util.Result, err: any) => {
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
        (ret: Util.Result, err: any) => {
          ret.status ? resolve(ret.data) : reject(err)
        },
      )
    }
    catch (err) {
      reject(err)
    }
  })
}
