import Slot from './Slot'
import Weapon from './Weapon'

class Equipament {
  constructor ({items = [], slots = []}) {
    if (slots.length && !this._isValidSlots(slots)) throw new Error('Invalid slots')
    Object.assign(this, {items, slots})
  }
  equip (item) {
    return new Promise((resolve, reject) => {
      if (!this.slots.length) return reject(new Error('No available slot'))
      for (let i = 0, l = this.slots.length; i < l; i++) {
        let slot = this.slots[i]
        if (slot.type.name === item.slotType.name) {
          if ((this._countItemsFromSlot(slot) + 1) <= slot.capacity) {
            this.items.push(item)
            resolve(this.items[this.items.length - 1])
          } else {
            reject(new Error('Exceeded slot capacity'))
          }
          break
        }
      }
    })
  }
  addSlot ({type, capacity = 1}) {
    this.slots.push(new Slot({type, capacity}))
  }
  getWeapons () {
    return this.items.filter(item => item instanceof Weapon)
  }
  getModifiers () {
    return this.items.filter(item => item.effects || item.attacks).reduce((modifiers, item) => {
      if (item.effects) modifiers = modifiers.concat(item.effects)
      if (item.attacks) modifiers = modifiers.concat(item.attacks)
      return modifiers
    }, [])
  }
  _isValidSlots (slots) {
    return slots.filter(slot => !(slot instanceof Slot)).length === 0
  }
  _countItemsFromSlot (slot) {
    return this.items.filter(item => item.slotType.name === slot.type.name).length
  }
}

export default Equipament
