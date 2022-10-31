import LocalForage from 'localforage'

export function getItem(key = 'MEIHUA') {
  return LocalForage.getItem(key)
}

export function setItem<T>(key = 'MEIHUA', value: T) {
  return LocalForage.setItem(key, value)
}

export function removeItem(key = 'MEIHUA') {
  return LocalForage.removeItem(key)
}
