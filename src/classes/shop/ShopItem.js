class ShopItem {
  constructor ({item, quantity = 1}) {
    Object.assign(this, {item, quantity})
  }
  addUnit () {
    return ++this.quantity
  }
  removeUnit () {
    return --this.quantity
  }
}

export default ShopItem
