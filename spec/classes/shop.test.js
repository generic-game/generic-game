import { gg, factory } from '../helpers'

let shop = factory.shop()
let hero = factory.hero()
let sword = factory.sword()
let dagger = factory.dagger()
let armet = factory.helmet()
let goldCurrency = factory.goldCurrency()

describe('shop', () => {
  test('should be able add items', () => {
    shop.addItem({item: sword, price: goldCurrency})
    shop.addItem({item: dagger, price: goldCurrency})
    let shopItems = shop.getItems()
    expect(shopItems[0].item.name).toEqual(sword.name)
    expect(shopItems[1].item.name).toEqual(dagger.name)
  })
  test('should stack existent items', () => {
    shop.addItem({item: sword, price: goldCurrency})
    let swords = shop.getItems().filter(shopItem => shopItem.item.name === 'Great sword')[0].quantity
    expect(swords).toBe(2)
  })
  test('should unstack existent items', () => {
    shop.removeItem(sword)
    let swords = shop.getItems().filter(shopItem => shopItem.item.name === 'Great sword')
    expect(swords.length).toBe(1)
  })
  test('should throw if remove unexistent item', () => {
    expect(() => shop.removeItem(armet)).toThrow(new Error(`Shop item doesn't exist`))
  })
  test('should throw if remove unexistent shop item', () => {
    let swordShopItem = shop.getItems()[0]
    shop.removeItem(swordShopItem)
    expect(() => shop.removeItem(swordShopItem)).toThrow(new Error(`Shop item doesn't exist`))
  })
  test('should be able remove items', () => {
    shop.removeItem(dagger)
    expect(shop.getItems()[0].item.name).toEqual(dagger.name)
    expect(shop.getItems()[0].quantity).toBe(0)
  })
  test('should be able to set default currency', () => {
    shop.setCurrency(goldCurrency)
    expect(shop.getCurrency().name, goldCurrency.name)
  })
  test(`should'nt be able to set default with invalid currency`, () => {
    expect(() => shop.setCurrency({
      name: 'Some currency',
      symbol: 'SOME'
    })).toThrow(new Error('Invalid currency'))
  })
  test('should be able to sell item', () => {
    let heroSword = factory.sword()
    return hero.inventory.carry(heroSword).then(() => {
      return hero.interact(shop).sell(heroSword).then((currency) => {
        expect(hero.bank.get(goldCurrency).value).toEqual(1000)
      })
    })
  })
  test(`should'nt be able to sell item which doesn't posses`, () => {
    let heroSword = factory.sword()
    return expect(hero.interact(shop).sell(heroSword)).rejects.toEqual(new Error('Character must have the item to sell'))
  })
  test('should be able to buy item', () => {
    goldCurrency.setValue(1000)
    shop.addItem({item: sword, price: goldCurrency})
    let shopItem = shop.getItems()[1]
    return hero.interact(shop).buy(shopItem).then(() => {
      hero.inventory.increaseCapacity(1)
      expect(hero.inventory.hasItem(shopItem.item)).toEqual(true)
      expect(hero.bank.get({name: 'gold'}).value).toEqual(0)
    })
  })
  test(`should'nt be able to buy item without gold`, () => {
    shop.addItem({item: sword, price: goldCurrency})
    let shopItem = shop.getItems()[1]
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
