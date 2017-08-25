import { Currency } from '../general'
import ShopItem from './ShopItem'

class Shop {
  constructor ({name, items = []}) {
    this.items = []
    items.forEach(this.addItem)
    Object.assign(this, {name})
  }
  addItem (item) {
    if (!(item instanceof ShopItem)) item = new ShopItem({item})
    if (this.items.indexOf(item) !== -1) {
      this.items[this.items.indexOf(item)].addUnit()
    } else {
      this.items.push(item)
    }
  }
  getItems () {
    return this.items
  }
  removeItem (item) {
    if (this.items.indexOf(item) === -1) {
      throw new Error('Item doesn\'t exist')
    } else if (this.items.indexOf(item) > -1) {
      let listItem = this.items[this.items.indexOf(item)]
      listItem.removeUnit()
      if (listItem.quantity <= 0) {
        this.items.splice(this.items.indexOf(item), 1)
      }
    }
  }
  setCurrency (currency) {
    if (currency instanceof Currency) {
      this.currency = currency
    } else {
      throw new Error('Invalid currency')
    }
  }
  getCurrency () {
    return this.currency
  }
  interaction (character) {
    return {
      buy: this._buyer(character),
      sell: this._seller(character)
    }
  }
  _seller (character) {
    return (item) => {
      return new Promise((resolve, reject) => {
        if (!character.inventory.hasItem(item)) return reject(new Error('Character must have the item to sell'))
        character.inventory.drop(item)
        character.bank.earn(this._getItemPrice({item}))
        resolve(true)
      })
    }
  }
  _buyer (character) {
    return (shopItem) => {
      return new Promise((resolve, reject) => {
        if (this.items.indexOf(shopItem) === -1) return reject(new Error('Item not available in shop'))
        character.bank.lose(this._getItemPrice()).then(() => {
          this.removeItem(shopItem)
          return character.inventory.carry(shopItem.item)
        }).then(resolve).catch(reject)
      })
    }
  }
  _getItemPrice () {
    let price = Object.assign({}, this.getCurrency())
    price.value = 1000 // #TODO generate a value according item's attributes and level
    return price
  }
}

export default Shop
