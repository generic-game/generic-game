import { gg, factory } from '../helpers'

let hero = factory.hero()

describe('characteristics', () => {
  test('should initialize without characteristics instances', () => {
    let characteristics = new gg.class.Characteristics({
      characteristics: [
        {name: 'MyCharacteristic', value: 1}
      ]
    })
    expect(characteristics.getCharacteristics().length).toBe(3) // MyCharacteristic characteristic and life & defense defaults
  })
  test('should initialize with characteristics instances', () => {
    let characteristics = new gg.class.Characteristics({
      characteristics: [
        new gg.class.Characteristic({name: 'MyCharacteristic', value: 1})
      ]
    })
    expect(characteristics.getCharacteristics().length).toBe(3) // MyCharacteristic characteristic and life & defense defaults
  })
  test('should set characteristics', () => {
    let characteristics = new gg.class.Characteristics({
      characteristics: [
        new gg.class.Characteristic({name: 'MyCharacteristic', value: 1})
      ]
    })
    characteristics.setCharacteristics([
      {name: 'MyCharacteristic', value: 2}
    ])
    expect(characteristics.getCharacteristics().length).toBe(3) // MyCharacteristic characteristic and life & defense defaults
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
