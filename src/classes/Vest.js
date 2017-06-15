import Item from './Item'

class Vest extends Item {
  constructor ({name, type, effects}) {
    super({name, type})
    Object.assign(this, {effects})
  }
}

export default Vest
