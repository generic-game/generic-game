import { factory } from '../helpers'

let hero = factory.hero()

describe('status', () => {
  test('should return an object with characteristic name as key', () => {
    let status = hero.status.get()
    expect(Object.keys(status)).toContain('life')
    expect(Object.keys(status)).toContain('defense')
    expect(status.life).toBe(100)
    expect(status.defense).toBe(0)
  })
  test('should return experience and level', () => {
    hero.experience.setAlgorithm((x) => x)
    expect(hero.status.get('experience')).toBe(5)
    expect(hero.status.get('level')).toBe(5)
  })
  test('should return currencies', () => {
    return hero.bank.earn({
      name: 'Gold',
      symbol: 'G',
      value: 1000
    }).then(() => {
      expect(hero.status.get('gold')).toBe(1000)
    })
  })
})
