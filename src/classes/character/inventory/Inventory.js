import { Item } from '../../general'

class Inventory {
  constructor ({items = [], capacity = 1}) {
    Object.assign(this, {items, capacity})
  }
  carry (item) {
    return new Promise((resolve, reject) => {
      if (!(item instanceof Item)) return reject(new Error('Not an Item instance'))

      if (this.getWeight() + item.weight > this.capacity) {
        reject(new Error('Exceeded inventory capacity'))
      } else {
        this.items.push(item)
        resolve(this.items[this.items.length - 1])
      }
    })
  }
  drop (item) {
    return new Promise((resolve, reject) => {
      if (!(item instanceof Item)) return reject(new Error('Not an Item instance'))
      this.items.splice(this.items.indexOf(item), 1)
      resolve(item)
    })
  }
  get (index) {
    if (index >= 0 && index <= this.items.length - 1) {
      let item = this.items[index]
      this.items.splice(index, 1)
      return item
    } else {
      return null
    }
  }
  getWeight () {
    if (this.items.length > 0) {
      return this.items.reduce((a, b) => a + b.weight, 0)
    } else {
      return 0
    }
  }
}

export default Inventory
