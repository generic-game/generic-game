import { error, factory } from '../helpers'

let hero = factory.hero()

describe('creating', () => {
  test('should have a name', () => {
    expect(hero.identity.getName()).toBe('Hero: Generic hero')
  })
})

describe('levels', () => {
  test('should gain experience', () => {
    return hero.experience.gain(9).then(success => {
      expect(success).toBe(true)
    }).catch(error)
  })
  test('should level up', () => {
    return hero.experience.gain(1).then(success => {
      expect(success).toBe(true)
      expect(hero.getLevel()).toBe(1)
    }).catch(error)
  })
})
