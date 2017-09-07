import { gg, factory } from '../helpers'

describe('shop item', () => {
  test(`price should be instance of Currency`, () => {
    expect(() => {
      const shopItem = new gg.class.ShopItem({
        item: factory.sword()
      })
    }).toThrow(new Error('Price must be a Currency instance'))
  })
})
