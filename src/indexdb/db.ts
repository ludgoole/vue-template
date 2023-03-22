import Dexie from 'dexie'

export class LudgooleDatabase extends Dexie {
  contacts!: Dexie.Table<DATABASE.Contact, number>
  emails!: Dexie.Table<DATABASE.Email, number>
  phones!: Dexie.Table<DATABASE.Phone, number>

  constructor() {
    super('LudgooleDatabase')

    this.version(1).stores({
      contacts: '++id, first, last',
      emails: '++id, contactId, type, email',
      phones: '++id, contactId, type, phone',
    })
  }
}

const db = new LudgooleDatabase()

export default db
