import { Slot, Weapon, Item } from 'classes'
import { parseToInstance } from 'helpers'

class Equipment {
  constructor ({items = [], slots = []}) {
    this._items = this._parseItems(items)
    this._slots = this._parseSlots(slots)
  }
  getSlots () {
    return this._slots
  }
  getWeapons () {
    return this._items.filter(item => item instanceof Weapon)
  }
  getModifiers () {
    return this._items.filter(item => item.getEffects || item.getAttacks).reduce((modifiers, item) => {
      if (item.getEffects) modifiers = modifiers.concat(item.getEffects())
      if (item.getAttacks) modifiers = modifiers.concat(item.getAttacks())
      return modifiers
    }, [])
  }
  equip (item) {
    return new Promise((resolve, reject) => {
      if (!this._slots.length) return reject(new Error('No available slot'))
      for (let i = 0, l = this._slots.length; i < l; i++) {
        let slot = this._slots[i]
        if (slot.getType().getName() === item.getSlotType().getName()) {
          if ((this._countItemsFromSlot(slot) + 1) <= slot.getCapacity()) {
            this._items.push(item)
            resolve(this._items[this._items.length - 1])
          } else {
            reject(new Error('Exceeded slot capacity'))
          }
          break
        }
      }
    })
  }
  addSlot ({type, capacity = 1}) {
    this._slots.push(new Slot({type, capacity}))
  }
  _parseItems (items) {
    return parseToInstance(Item, items)
  }
  _parseSlots (slots) {
    return parseToInstance(Slot, slots)
  }
  _countItemsFromSlot (slot) {
    return this._items.filter(item => item.getSlotType().getName() === slot.getType().getName()).length
  }
}

export default Equipment
