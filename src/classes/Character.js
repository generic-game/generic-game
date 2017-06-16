import Inventory from './Inventory'
import Equipament from './Equipament'
import Characteristics from './Characteristics'
import Battle from './Battle'
import Status from './Status'
import { characteristic } from '../constants'

class Character {
  constructor ({name, experience = 0, items = [], equipaments = [], currencies = [], characteristics = []}) {
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
