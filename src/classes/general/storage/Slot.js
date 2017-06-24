import SlotType from './SlotType'

class Slot {
  constructor ({type, capacity = 1}) {
    if (!(type instanceof SlotType)) type = new SlotType({name: type})
    Object.assign(this, {type, capacity})
  }
}

export default Slot
