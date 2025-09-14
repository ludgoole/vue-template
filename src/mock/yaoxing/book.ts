export default [
  {
    id: 1,
    sentences: [
      '人参',
      '黄芪',
      '白术',
      '茯苓',
      '甘草',
      '当归',
      '白芍',
      '赤芍',
      '生地黄',
      '熟地黄',
    ],
  },
].map((v) => {
  return {
    ...v,
    name: v.sentences[0],
  }
})
