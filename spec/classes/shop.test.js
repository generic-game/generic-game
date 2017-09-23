import { gg, factory } from '../helpers'

const shop = factory.shop()
const sword = factory.sword()
const dagger = factory.dagger()
const armet = factory.helmet()
const goldCurrency = factory.goldCurrency()

let hero = factory.hero()

describe('shop', () => {
  test('should set and get name', () => {
    shop.setName('New shop name')
    expect(shop.getName()).toBe('New shop name')
  })
  test('should be able add items', () => {
    shop.addItem({item: sword, price: goldCurrency})
    shop.addItem({item: dagger, price: goldCurrency})
    let shopItems = shop.getShopItems()
    expect(shopItems[0].getItem().getName()).toEqual(sword.getName())
    expect(shopItems[1].getItem().getName()).toEqual(dagger.getName())
  })
  test('should stack existent items', () => {
    shop.addItem({item: sword, price: goldCurrency})
    let swords = shop.getShopItems().filter(shopItem => shopItem.getItem().getName() === 'Great sword')[0].getQuantity()
    expect(swords).toBe(2)
  })
  test('should unstack existent items', () => {
    shop.removeItem(sword)
    let swords = shop.getShopItems().filter(shopItem => shopItem.getItem().getName() === 'Great sword')
    expect(swords.length).toBe(1)
  })
  test('should throw if remove unexistent item', () => {
    expect(() => shop.removeItem(armet)).toThrow(new Error(`Shop item doesn't exist`))
  })
  test('should throw if remove unexistent shop item', () => {
    let swordShopItem = shop.getShopItems()[0]
    shop.removeItem(swordShopItem)
    expect(() => shop.removeItem(swordShopItem)).toThrow(new Error(`Shop item doesn't exist`))
  })
  test('should be able remove items', () => {
    shop.removeItem(dagger)
    expect(shop.getShopItems()[0].getItem().getName()).toEqual(dagger.getName())
    expect(shop.getShopItems()[0].getQuantity()).toBe(0)
  })
  test('should be able to sell item', () => {
    let heroSword = factory.sword()
    return hero.inventory.carry(heroSword).then(() => {
      return hero.interact(shop).sell({
        item: heroSword,
        price: factory.goldCurrency(1000)
      }).then((currency) => {
        expect(hero.bank.get(goldCurrency).getValue()).toEqual(1000)
      })
    })
  })
  test(`should'nt be able to sell item which doesn't posses`, () => {
    return expect(hero.interact(shop).sell({
      item: factory.sword(),
      price: factory.goldCurrency(1000)
    })).rejects.toEqual(new Error('Character must have the item to sell'))
  })
  test(`should throw if item price is'nt a currency`, () => {
    expect(() => {
      shop.addItem({
        item: factory.sword(),
        price: 1000
      })
    }).toThrow(new Error('Price must be a Currency instance'))
  })
  test('should be able to buy item', () => {
    goldCurrency.setValue(1000)
    shop.addItem({item: sword, price: goldCurrency})
    let shopItem = shop.getShopItems()[1]
    return hero.interact(shop).buy(shopItem).then(() => {
      hero.inventory.increaseCapacity(1)
      expect(hero.inventory.hasItem(shopItem.getItem())).toEqual(true)
      expect(hero.bank.get('gold').getValue()).toEqual(0)
    })
  })
  test(`should'nt be able to buy item without gold`, () => {
    shop.addItem({item: sword, price: goldCurrency})
    let shopItem = shop.getShopItems()[1]
    return expect(hero.interact(shop).buy(shopItem)).rejects.toEqual(new Error(`Character can't afford`))
  })
  test(`should'nt be able to buy an unexistent item in shop`, () => {
    hero = factory.hero()
    let armetShopitem = new gg.class.ShopItem({
      item: armet,
      price: goldCurrency,
      quantity: 1
    })
    return hero.bank.earn(goldCurrency).then(() => {
      return expect(hero.interact(shop).buy(armetShopitem)).rejects.toEqual(new Error('Item not available in shop'))
    })
  })
})
