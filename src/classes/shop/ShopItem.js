import { Currency } from '../general'

class ShopItem {
  constructor ({item, price, quantity = 1}) {
    if (!(price instanceof Currency)) throw new Error('Price must be a Currency instance')
    Object.assign(this, {item, price, quantity})
  }
  addUnit () {
    return ++this.quantity
  }
  getPrice () {
    return this.price
  }
  removeUnit () {
    return --this.quantity
  }
}

export default ShopItem
