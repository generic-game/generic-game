import EventEmmiter from 'events'
import Inventory from './inventory/Inventory'
import Equipament from './equipament/Equipament'
import Characteristics from './characteristics/Characteristics'
import Battle from './battle/Battle'
import Status from './status/Status'
import Wallet from './wallet/Wallet'
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
    this.wallet = new Wallet({currencies})
    Object.assign(this, {name, experience, items})
  }
  interact (thing) {
    return thing.interaction(this)
  }
}

export default Character
