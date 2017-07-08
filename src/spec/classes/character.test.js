import { gg, error, factory } from '../helpers'

let hero = factory.hero()

describe('generic hero', () => {
  test('should have a name', () => {
    expect(hero.name).toBe('Generic hero')
  })
})

describe('currency', () => {
  let pack = new gg.class.Currency({
    name: 'Gold',
    symbol: 'G',
    value: 1000
  })
  test('should earn gold', () => {
    hero.earnCurrency(pack).then(() => {
      expect(hero.currencies['Gold']).toBe(1000)
    })
  })
  test('should earn more gold', () => {
    pack.value = 100
    hero.earnCurrency(pack).then(() => {
      expect(hero.currencies['Gold']).toBe(1100)
    })
  })
  test('should earn cash', () => {
    pack.name = 'Cash'
    pack.symbol = 'C'
    hero.earnCurrency(pack).then(() => {
      expect(hero.currencies['Cash']).toBe(100)
    })
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
