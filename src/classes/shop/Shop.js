import { Currency } from '../general'
import ShopItem from './ShopItem'

class Shop {
  constructor ({name, items = []}) {
    this.shopItems = []
    items.forEach(this.addItem)
    Object.assign(this, {name})
  }
  addItem (item) {
    if (!(item instanceof ShopItem)) {
      if (!this._getItem(item)) {
        item = new ShopItem({item})
        this.shopItems.push(item)
      } else {
        this._getItem(item).addUnit()
      }
    }
  }
  getItems () {
    return this.shopItems
  }
  removeItem (item) {
    if (item instanceof ShopItem) {
      if (this.shopItems.indexOf(item) === -1) {
        this._errorItemDoesntExist()
      } else if (this.shopItems.indexOf(item) > -1) {
        let listItem = this.shopItems[this.shopItems.indexOf(item)]
        listItem.removeUnit()
        if (listItem.quantity <= 0) {
          this.shopItems.splice(this.shopItems.indexOf(item), 1)
        }
      }
    } else {
      let shopItem = this._getItem(item)
      if (!shopItem) this._errorItemDoesntExist()
      shopItem.removeUnit()
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
        if (this.shopItems.indexOf(shopItem) === -1) return reject(new Error('Item not available in shop'))
        let price = this._getItemPrice()
        let characterCurrency = character.bank.get({name: price.name})
        if (characterCurrency.value >= price.value) {
          character.bank.lose(price).then(() => {
            this.removeItem(shopItem)
            return character.inventory.carry(shopItem.item)
          }).then(resolve).catch(reject)
        } else {
          reject(new Error(`Character can't afford`))
        }
      })
    }
  }
  _getItemPrice () {
    let price = Object.assign({}, this.getCurrency())
    price.value = 1000 // #TODO generate a value according item's attributes and level
    return price
  }
  _getItem (item) {
    return this.shopItems.filter(shopItem => shopItem.item === item)[0] || null
  }
  _errorItemDoesntExist () {
    throw new Error('Shop item doesn\'t exist')
  }
}

export default Shop
