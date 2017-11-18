import { factory } from '../helpers'

let hero = factory.hero()

describe('identity', () => {
  test('should set/get name', () => {
    hero.identity.setName('Joana Dark')
    expect(hero.identity.getName()).toBe('Joana Dark')
  })
  test('should set/get type', () => {
    hero.identity.setType('knight')
    expect(hero.identity.getType()).toBe('knight')
  })
  test('should set/get gender', () => {
    hero.identity.setGender('female')
    expect(hero.identity.getGender()).toBe('female')
  })
})
