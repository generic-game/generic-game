import Item from './Item'

class Vest extends Item {
  constructor ({name, type, slotType, effects}) {
    super({name, type, slotType})
    Object.assign(this, {effects})
  }
}

export default Vest
