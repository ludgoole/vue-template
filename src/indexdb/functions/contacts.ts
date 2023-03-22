import db from '../db'
import contactsData from '../database/contacts.json'

const contacts = db.contacts

db.transaction('rw', db.contacts, async () => {
  // Make sure we have something in DB:
  contacts.put({ id: 1, first: '1', last: '2' })
  contacts.bulkAdd(contactsData)

  // Query:
  const smithcontacts = await db.contacts.where({ first: 'Smith' }).toArray()

  // Show result:
  console.log('🚀 ~ file: contacts.ts:13 ~ db.transaction ~ smithcontacts:', smithcontacts)
}).catch((e) => {
  console.log('🚀 ~ file: contacts.ts:17 ~ db.transaction ~ e:', e)
})

export const add = (data: DATABASE.Contact) => contacts.put(data)
export const remove = (id: number) => contacts.delete(id)
export const get = () => contacts.toArray()
export const query = (data: Partial<DATABASE.Contact>) => contacts.where(data).toArray()

export default contacts
