import EventEmmiter from 'events'
import Inventory from './inventory/Inventory'
import Equipament from './equipament/Equipament'
import Characteristics from './characteristics/Characteristics'
import Battle from './battle/Battle'
import Status from './status/Status'
import Name from './identity/Name'

class Character {
  constructor ({type, name, experience = 0, items = [], equipaments = [], currencies = [], characteristics = []}) {
    this.name = new Name({type, name})
    this.events = new EventEmmiter()
    this.inventory = new Inventory(items)
    this.equipament = new Equipament({items: equipaments})
    this.characteristics = new Characteristics({characteristics})
    this.battle = new Battle({character: this})
    this.status = new Status({character: this})
    Object.assign(this, {name, experience, items, currencies})
  }
  earnCurrency (currency) {
    return new Promise((resolve, reject) => {
      if (this.currencies[currency.name]) {
        this.currencies[currency.name] += currency.value
      } else {
        this.currencies[currency.name] = currency.value
      }
      resolve(this.currencies[currency.name])
    })
  }
}

export default Character
