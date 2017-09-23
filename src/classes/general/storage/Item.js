import { item } from '../../../constants'
import SlotType from './SlotType'

class Item {
  constructor ({name, weight = 1, type, slotType}) {
    this._validateType(type)
    if (!(slotType instanceof SlotType)) slotType = new SlotType(slotType)
    this._name = name
    this._weight = weight
    this._type = type
    this._slotType = slotType
  }
  setName (name) {
    this._name = name
  }
  getName () {
    return this._name
  }
  setWeight (weight) {
    this._weight = weight
  }
  getWeight () {
    return this._weight
  }
  setType (type) {
    this._validateType(type)
    this._type = type
  }
  getType () {
    return this._type
  }
  setSlotType (slotType) {
    if (!(slotType instanceof SlotType)) slotType = new SlotType(slotType)
    this._slotType = slotType
  }
  getSlotType () {
    return this._slotType
  }
  _validateType (type) {
    if (!this._getTypes().includes(type)) throw new Error('Unknow item type')
  }
  _getTypes () {
    return [item.EQUIPABLE, item.CONSUMABLE]
  }
}

export default Item
