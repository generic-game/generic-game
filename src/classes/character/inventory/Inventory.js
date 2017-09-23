import { Item } from '../../general'

class Inventory {
  constructor ({items = [], capacity = 1}) {
    if (items.length && !this._isValidItems(items)) throw new Error('Invalid items')
    this._items = items
    this._capacity = capacity
  }
  carry (item) {
    return new Promise((resolve, reject) => {
      if (!(item instanceof Item)) return reject(new Error('Not an Item instance'))

      if (this.getWeight() + item.getWeight() > this._capacity) {
        reject(new Error('Exceeded inventory capacity'))
      } else {
        this._items.push(item)
        resolve(this._items[this._items.length - 1])
      }
    })
  }
  drop (item) {
    return new Promise((resolve, reject) => {
      if (!(item instanceof Item)) return reject(new Error('Not an Item instance'))
      this._items.splice(this._items.indexOf(item), 1)
      resolve(item)
    })
  }
  get (index) {
    if (index >= 0 && index <= this._items.length - 1) {
      let item = this._items[index]
      this._items.splice(index, 1)
      return item
    } else {
      return null
    }
  }
  getItems () {
    return this._items
  }
  getWeight () {
    if (this._items.length > 0) {
      return this._items.reduce((a, b) => a + b.getWeight(), 0)
    } else {
      return 0
    }
  }
  hasItem (item) {
    return this._items.filter(_item => _item.getName() === item.getName()).length > 0
  }
  increaseCapacity (amount) {
    if (isNaN(parseFloat(amount))) throw new Error('Inventory increase capacity argument must be a number')
    this._capacity += amount
  }
  _isValidItems (items) {
    return items.filter(item => !(item instanceof Item)).length === 0
  }
}

export default Inventory
