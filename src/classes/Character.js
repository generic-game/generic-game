import Inventory from './Inventory'

class Character {
  constructor ({name, experience = 0, items = [], currencies = [], statuses = []}) {
    this.inventory = new Inventory(items)
    Object.assign(this, {name, experience, items, currencies, statuses})
  }
}

export default Character
