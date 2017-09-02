import EventEmmiter from 'events'
import Inventory from './inventory/Inventory'
import Equipament from './equipament/Equipament'
import Characteristics from './characteristics/Characteristics'
import Battle from './battle/Battle'
import Status from './status/Status'
import Bank from './bank/Bank'
import Identity from './identity/Identity'
import Experience from './experience/Experience'
import Quests from './quests/Quests'

class Character {
  constructor ({type, name, experience = 0, items = [], equipaments = [], currencies = [], characteristics = []}) {
    this.identity = new Identity({type, name})
    this.events = new EventEmmiter()
    this.inventory = new Inventory(items)
    this.equipament = new Equipament({items: equipaments})
    this.characteristics = new Characteristics({characteristics})
    this.battle = new Battle({character: this})
    this.status = new Status({character: this})
    this.bank = new Bank({currencies})
    this.experience = new Experience({})
    this.quests = new Quests()
  }
  interact (thing) {
    return thing.interaction(this)
  }
  getLevel () {
    return this.experience.computeLevel()
  }
}

export default Character
