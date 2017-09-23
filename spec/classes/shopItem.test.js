import { gg, factory } from '../helpers'

const shopItem = factory.shopItem(factory.sword(), 11)

describe('shop item', () => {
  test(`price should be instance of Currency`, () => {
    expect(() => {
      new gg.class.ShopItem({
        item: factory.sword()
      })
    }).toThrow(new Error('Price must be a Currency instance'))
  })
  test(`item should be instance of Item`, () => {
    expect(() => {
      new gg.class.ShopItem({
        price: factory.goldCurrency(10)
      })
    }).toThrow(new Error(`Item must be a Item instance`))
  })
  test('should set and get price', () => {
    expect(shopItem.getPrice().getValue()).toBe(11)
    expect(() => shopItem.setPrice(15)).toThrow(new Error('Price must be a Currency instance'))
    shopItem.setPrice(factory.goldCurrency(9))
    expect(shopItem.getPrice().getValue()).toBe(9)
  })
  test('should set and get item', () => {
    expect(() => shopItem.setItem('item')).toThrow(new Error(`Item must be a Item instance`))
    const sword = factory.sword()
    shopItem.setItem(sword)
    expect(shopItem.getItem().getName()).toBe(sword.getName())
  })
  test('should set and get quantity', () => {
    shopItem.setQuantity(10)
    expect(shopItem.getQuantity()).toBe(10)
  })
})
