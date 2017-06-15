import { item } from '../constants'

class Item {
  constructor ({name, weight = 1, type}) {
    if (!this._getTypes().includes(type)) throw new Error('Invalid item type')
    Object.assign(this, {name, weight, type})
  }
  _getTypes () {
    return [item.EQUIPABLE, item.CONSUMABLE]
  }
}

export default Item
