import { Item } from '../../general'

class Weapon extends Item {
  constructor ({name, type, weight, slotType, attacks, floorDamage = 0}) {
    super({name, type, weight, slotType})
    Object.assign(this, {attacks, floorDamage})
  }
  getAttacks () {
    return this.attacks.map(attack => {
      attack.damage += (this.floorDamage || 0)
      return attack
    })
  }
}

export default Weapon
