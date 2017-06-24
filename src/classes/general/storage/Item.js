import { item } from '../../../constants'
import SlotType from './SlotType'

class Item {
  constructor ({name, weight = 1, type, slotType}) {
    if (!this._getTypes().includes(type)) throw new Error('Invalid item type')
    if (!(slotType instanceof SlotType)) slotType = new SlotType(slotType)
    Object.assign(this, {name, weight, type, slotType})
  }
  _getTypes () {
    return [item.EQUIPABLE, item.CONSUMABLE]
  }
}

export default Item
