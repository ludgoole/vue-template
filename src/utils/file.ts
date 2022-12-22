// https://www.npmjs.com/package/downloadjs
import download from 'downloadjs'

export function downloadFile<T>(data: T, filename: string) {
  download(JSON.stringify(data), filename)
}
