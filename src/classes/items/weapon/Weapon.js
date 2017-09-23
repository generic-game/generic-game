import { Item } from '../../general'
import { clone } from 'helpers'

class Weapon extends Item {
  constructor ({name, type, weight, slotType, attacks, floorDamage = 0}) {
    super({name, type, weight, slotType})
    this._attacks = attacks
    this._floorDamage = floorDamage
  }
  getAttacks () {
    return this._attacks.map(attack => {
      attack = clone(attack)
      attack.setDamage(attack.getDamage() + this.getFloorDamage())
      return attack
    })
  }
  setAttacks (attacks) {
    this._attacks = attacks
  }
  setFloorDamage (floorDamage) {
    this._floorDamage = floorDamage
  }
  getFloorDamage () {
    return this._floorDamage
  }
}

export default Weapon
