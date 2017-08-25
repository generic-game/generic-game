import { factory } from '../helpers'

let shop = factory.shop()
let hero = factory.hero()
let sword = factory.sword()
let dagger = factory.dagger()
let goldCurrency = factory.goldCurrency()

describe('shop', () => {
  test('should be able add items', () => {
    shop.addItem(sword)
    shop.addItem(dagger)
    let shopItems = shop.getItems()
    expect(shopItems[0].item.name).toEqual(sword.name)
    expect(shopItems[1].item.name).toEqual(dagger.name)
  })
  test('should be able remove items', () => {
    shop.removeItem(shop.getItems()[0])
    expect(shop.getItems()[0].item.name).toEqual(dagger.name)
  })
  test('should be able to set default currency', () => {
    shop.setCurrency(goldCurrency)
    expect(shop.getCurrency().name, goldCurrency.name)
  })
  test('should be able to sell item', () => {
    hero.inventory.carry(sword).then(() => {
      hero.interact(shop).sell(sword).then((currency) => {
        expect(hero.bank.get(goldCurrency).value).toEqual(1000)
      })
    })
  })
  test('should be able to buy item', () => {
    let shopItem = shop.getItems()[0]
    goldCurrency.value = 1
    hero.bank.earn(goldCurrency).then(() => {
      hero.interact(shop).buy(shopItem).then(() => {
        expect(hero.inventory.hasItem(shopItem.item)).toEqual(true)
        expect(hero.bank.get(goldCurrency).value).toEqual(1)
      })
    })
  })
})
