import { gg } from '../helpers'

const characteristic = new gg.class.Characteristic({name: 'MyCharacteristic', value: 10})

describe('characteristic', () => {
  test('should initialize with 0 case argument is undefined', () => {
    expect(characteristic.getValue()).toBe(10)
  })
  test('should set and get name', () => {
    characteristic.setName('custom name')
    expect(characteristic.getName()).toBe('custom name')
  })
  test('should only allow number as value', () => {
    expect(() => characteristic.putValue('a')).toThrow(new Error('Value must be a number'))
    expect(() => characteristic.setValue('b')).toThrow(new Error('Value must be a number'))
  })
})
