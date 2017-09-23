import { gg } from '../helpers'
import { characteristic as characteristicTypes } from 'constants'

let effect

describe('effect', () => {
  test('should use characteristic value if amount argument is empty', () => {
    effect = new gg.class.Effect({
      characteristic: {
        name: characteristicTypes.DEFENSE,
        value: 10
      }
    })
    expect(effect.getAmount()).toBe(10)
  })
  test('should set and get amount', () => {
    effect.setAmount('amount')
    expect(effect.getAmount()).toBe('amount')
  })
  test('should set and get characteristic', () => {
    effect.setCharacteristic({
      name: characteristicTypes.LIFE,
      value: 1
    })
    expect(effect.getCharacteristic().getName()).toBe(characteristicTypes.LIFE)
    effect.setCharacteristic(new gg.class.Characteristic({
      name: characteristicTypes.LIFE,
      value: 1
    }))
    expect(effect.getCharacteristic().getName()).toBe(characteristicTypes.LIFE)
  })
})
