import { gg, factory } from '../helpers'

let hero = factory.hero()

describe('characteristics', () => {
  test('should initialize with valid characteristics', () => {
    let characteristics = new gg.class.Characteristics({
      characteristics: [
        new gg.class.Characteristic({name: 'MyCharacteristic', value: 1})
      ]
    })
    expect(characteristics.characteristics.length).toBe(3) // MyCharacteristic characteristic and life & defense defaults
  })
  test('should\'nt initialize with invalid characteristics', () => {
    expect(() => new gg.class.Characteristics({characteristics: [{name: 'Dummy characteristic', value: 1}]})).toThrow(new Error('Invalid characteristics'))
  })
  test('should increase a characteristic', () => {
    hero.characteristics.increase('defense', 1)
    expect(hero.characteristics.getValueByName('defense')).toBe(1)
  })

  test('should decrease a characteristic', () => {
    hero.characteristics.decrease('defense', 1)
    expect(hero.characteristics.getValueByName('defense')).toBe(0)
  })
})
