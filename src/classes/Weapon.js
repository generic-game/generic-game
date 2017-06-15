import Item from './Item'

class Weapon extends Item {
  constructor ({name, type, attacks}) {
    super({name, type})
    Object.assign(this, {attacks})
  }
}

export default Weapon
