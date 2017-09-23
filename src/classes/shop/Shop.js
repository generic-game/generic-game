import { Currency } from '../general'
import ShopItem from './ShopItem'
import { clone } from 'helpers'

class Shop {
  constructor ({name, items = []}) {
    this._shopItems = []
    this._name = name
    items.forEach(this.addItem)
  }
  getName () {
    return this._name
  }
  setName (name) {
    this._name = name
  }
  addItem ({item, price}) {
    if (!(price instanceof Currency)) throw new Error('Price must be a Currency instance')
    if (!(item instanceof ShopItem)) {
      item = clone(item)
      if (!this._getItem(item)) {
        item = new ShopItem({item, price})
        this._shopItems.push(item)
      } else {
        this._getItem(item).addUnit()
      }
    }
  }
  getShopItems () {
    return this._shopItems
  }
  removeItem (item) {
    if (item instanceof ShopItem) {
      if (this._shopItems.indexOf(item) === -1) {
        this._errorItemDoesntExist()
      } else if (this._shopItems.indexOf(item) > -1) {
        let listItem = this._shopItems[this._shopItems.indexOf(item)]
        listItem.removeUnit()
        if (listItem.getQuantity() <= 0) {
          this._shopItems.splice(this._shopItems.indexOf(item), 1)
        }
      }
    } else {
      let shopItem = this._getItem(item)
      if (!shopItem) this._errorItemDoesntExist()
      shopItem.removeUnit()
    }
  }
  interaction (character) {
    return {
      buy: this._buyer(character),
      sell: this._seller(character)
    }
  }
  _seller (character) {
    return (shopItem) => {
      return new Promise((resolve, reject) => {
        if (!(shopItem instanceof ShopItem)) shopItem = new ShopItem(shopItem)
        let characterItem = shopItem.getItem()
        if (!character.inventory.hasItem(characterItem)) {
          return reject(new Error('Character must have the item to sell'))
        }
        character.inventory.drop(characterItem)
        return character.bank.earn(shopItem.getPrice()).then(resolve).catch(reject)
      })
    }
  }
  _buyer (character) {
    return (shopItem) => {
      return new Promise((resolve, reject) => {
        if (this._shopItems.indexOf(shopItem) === -1) return reject(new Error('Item not available in shop'))
        let price = shopItem.getPrice()
        let characterCurrency = character.bank.get(price.getName())
        if (characterCurrency.getValue() >= price.getValue()) {
          character.bank.lose(price).then(() => {
            this.removeItem(shopItem)
            return character.inventory.carry(shopItem.getItem())
          }).then(resolve).catch(reject)
        } else {
          reject(new Error(`Character can't afford`))
        }
      })
    }
  }
  _getItem (item) {
    return this._shopItems.filter(shopItem => shopItem.getItem().getName() === item.getName())[0] || null
  }
  _errorItemDoesntExist () {
    throw new Error('Shop item doesn\'t exist')
  }
}

export default Shop
