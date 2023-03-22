declare namespace DATABASE {
  interface Contact {
    id?: number // Primary key. Optional (autoincremented)
    first: string // First name
    last: string // Last name
  }

  interface Email {
    id?: number
    contactId: number
    type: string
    email: string
  }

  interface Phone {
    id?: number
    contactId: number
    type: string
    phone: string
  }
}


