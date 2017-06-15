import Inventory from './Inventory'
import Equipament from './Equipament'

class Character {
  constructor ({name, experience = 0, items = [], currencies = [], statuses = []}) {
    this.inventory = new Inventory(items)
    this.equipament = new Equipament({})
    Object.assign(this, {name, experience, items, currencies, statuses})
  }
  status () {
    let statuses = {}
    this.equipament.getModifiers().forEach(characteristic => {
      if (statuses[characteristic.name]) {
        statuses[characteristic.name].value += characteristic.value
      } else {
        statuses[characteristic.name] = characteristic.value
      }
    })
    return statuses
  }
}

export default Character
