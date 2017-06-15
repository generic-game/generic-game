class Character {
  constructor ({name, experience, items, currencies, statuses}) {
    Object.assign(this, {name, experience, items, currencies, statuses})
  }
}

export default Character
