import Item from './Item'

class Weapon extends Item {
  constructor ({name, type, slotType, attacks}) {
    super({name, type, slotType})
    Object.assign(this, {attacks})
  }
}

export default Weapon
