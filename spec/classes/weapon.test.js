import { factory } from '../helpers'

let sword = factory.sword()

describe('weapon', () => {
  test('should return formatted attacks', () => {
    let attack = sword.getAttacks()[0]
    expect(Object.keys(attack)).toContain('damage')
    expect(Object.keys(attack)).toContain('delay')
    expect(Object.keys(attack)).toContain('effects')
    expect(attack.damage).toBe(10)
    expect(attack.delay).toBe(100)
  })
})
