function runPromiseInSequence(array, value) {
  return array.reduce((promiseChain, currPromiseFn) => {
    return promiseChain.then((val) => currPromiseFn(val))
  }, Promise.resolve(value))
}

function pile(array, val) {
  return array.reduce((val, fn) => fn(val), val)
}

// y = (x + 3) * 2 - 1
const p1 = (val) => {
  console.log('🚀 ~ file: reduce.ts ~ line 8 ~ p1 ~ val', val)
  return Promise.resolve(val + 3)
}
const p2 = (val) => {
  console.log('🚀 ~ file: reduce.ts ~ line 12 ~ p2 ~ val', val)
  return new Promise((resolve) => {
    setTimeout(() => resolve(val * 2), 1000)
  })
}
const p3 = (val) => {
  console.log('🚀 ~ file: reduce.ts ~ line 18 ~ p3 ~ val', val)
  return Promise.resolve(val - 1)
}

runPromiseInSequence([p1, p2, p3], 1).then((res) => {
  console.log('🚀 ~ file: reduce.ts ~ line 20 ~ res', res)
})

const y = pile([(x) => x + 3, (x) => x * 2, (x) => x - 1], 1)
console.log('🚀 ~ file: reduce.js ~ line 34 ~ y', y)
