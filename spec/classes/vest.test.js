import { factory } from '../helpers'

let helmet = factory.helmet()

describe('vest', () => {
  test('should be able to set effects', () => {
    helmet.setEffects([
      factory.effect({
        characteristic: factory.health()
      })
    ])
    expect(helmet.getEffects().length).toBe(1)
  })
})
