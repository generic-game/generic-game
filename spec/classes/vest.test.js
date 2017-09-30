import { factory } from '../helpers'
import { characteristic as characteristicTypes } from 'constants'

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
  test('should be able to set effects', () => {
    helmet.setEffects([
      {
        characteristic: {
          name: characteristicTypes.DEFENSE,
          value: 10
        }
      }
    ])
    expect(helmet.getEffects().length).toBe(1)
  })
})
