import SlotType from './SlotType'

class Slot {
  constructor ({type, capacity = 1}) {
    if (!(type instanceof SlotType) && typeof type === 'string') type = new SlotType({name: type})
    if (!(type instanceof SlotType) && typeof type === 'object') type = new SlotType(type)
    this._type = type
    this._capacity = capacity
  }
  setType (type) {
    if (!(type instanceof SlotType) && typeof type === 'string') type = new SlotType({name: type})
    if (!(type instanceof SlotType) && typeof type === 'object') type = new SlotType(type)
    this._type = type
  }
  getType () {
    return this._type
  }
  setCapacity (capacity) {
    this._capacity = capacity
  }
  getCapacity () {
    return this._capacity
  }
}

export default Slot
