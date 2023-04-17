import Dexie from 'dexie'

export class LudgooleDatabase extends Dexie {
  zhouyi!: Dexie.Table<DATABASE.Zhouyi, number>

  constructor() {
    super('LudgooleDatabase')

    this.version(1).stores({
      zhouyi: '&卦序, 卦名, 卦象, 卦辞, 爻辞',
    })
  }
}

const db = new LudgooleDatabase()

export default db
