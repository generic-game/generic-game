import { gg, factory } from '../helpers'

let hero = factory.hero()

describe('character.role', () => {
  const paladinHero = new gg.class.Character({
    role: {
      name: 'Paladin',
      description: 'Made to tank',
      characteristics: [
        {name: gg.const.characteristic.LIFE, value: 100},
        {name: gg.const.characteristic.DEFENSE, value: 10}
      ]
    },
    identity: {
      name: 'Generic hero',
      type: 'Hero'
    },
    experience: 5
  })

  test('should have a name', () => {
    expect(paladinHero.identity.getRole()).toBe('Paladin')
  })
  test('should have a description', () => {
    expect(paladinHero.role.getDescription()).toBe('Made to tank')
    paladinHero.role.setDescription('Made to defend')
    expect(paladinHero.role.getDescription()).toBe('Made to defend')
  })
  test('should change characteristics', () => {
    expect(paladinHero.status.get('life')).toBe(200)
    expect(paladinHero.status.get('defense')).toBe(10)
  })
  test('should set characteristics', () => {
    const role = new gg.class.Role({characteristics: []})
    role.setCharacteristics([
      {name: 'MyCharacteristic', value: 1234}
    ])
    expect(role.getCharacteristics().length).toBe(1)
    expect(role.getCharacteristics()[0].getName()).toBe('MyCharacteristic')
    expect(role.getCharacteristics()[0].getValue()).toBe(1234)
  })
  test('should set name', () => {
    const role = new gg.class.Role({})
    role.setName('Druid')
    expect(role.getName()).toBe('Druid')
  })
})
