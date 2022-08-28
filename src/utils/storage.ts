import LocalForage from 'localforage'

export function getItem(key = 'MEIHUA') {
  return LocalForage.getItem(key)
}

export function setItem(key = 'MEIHUA', value: object[]) {
  return LocalForage.setItem(key, value)
}

export function removeItem(key = 'MEIHUA') {
  return LocalForage.removeItem(key)
}
