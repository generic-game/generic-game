import { gg } from '../helpers'

describe('characteristic', () => {
  test('should initialize with 0 case argument is undefined', () => {
    let characteristic = new gg.class.Characteristic({name: 'MyCharacteristic'})
    expect(characteristic.value).toBe(0)
  })
})
