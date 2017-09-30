import { Item, Attack } from 'classes'
import { clone } from 'helpers'

class Weapon extends Item {
  constructor ({name, type, weight, slotType, attacks, floorDamage = 0}) {
    super({name, type, weight, slotType})
    this._attacks = this._parseAttacks(attacks)
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
    this._attacks = this._parseAttacks(attacks)
  }
  setFloorDamage (floorDamage) {
    this._floorDamage = floorDamage
  }
  getFloorDamage () {
    return this._floorDamage
  }
  _parseAttacks (attacks) {
    return (attacks && attacks.map(attack => attack instanceof Attack ? attack : new Attack(attack))) || []
  }
}

export default Weapon
