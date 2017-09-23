import { Currency, Item } from 'classes'

class ShopItem {
  constructor ({item, price, quantity = 1}) {
    if (!(price instanceof Currency)) throw new Error('Price must be a Currency instance')
    if (!(item instanceof Item)) throw new Error(`Item must be a Item instance`)
    this._item = item
    this._price = price
    this._quantity = quantity
  }
  removeUnit () {
    return --this._quantity
  }
  addUnit () {
    return ++this._quantity
  }
  setPrice (price) {
    if (!(price instanceof Currency)) throw new Error('Price must be a Currency instance')
    this._price = price
  }
  getPrice () {
    return this._price
  }
  setItem (item) {
    if (!(item instanceof Item)) throw new Error(`Item must be a Item instance`)
    this._item = item
  }
  getItem () {
    return this._item
  }
  setQuantity (quantity) {
    this._quantity = quantity
  }
  getQuantity () {
    return this._quantity
  }
}

export default ShopItem
