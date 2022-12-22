import LocalForage from 'localforage'

export function getItem<T>(key = 'LUDGOOLE'): Promise<T | null> {
  return LocalForage.getItem(key)
}

export function setItem<T>(key = 'LUDGOOLE', value: T) {
  return LocalForage.setItem(key, value)
}

export function removeItem(key = 'LUDGOOLE') {
  return LocalForage.removeItem(key)
}
