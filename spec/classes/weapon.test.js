import { gg, factory } from '../helpers'

let sword = factory.sword()

describe('weapon', () => {
  test('should set attacks', () => {
    sword.setAttacks([
      new gg.class.Attack({damage: 10, delay: 100})
    ])
    expect(sword.getAttacks().length).toBe(1)
  })
  test('should return formatted attacks', () => {
    let attack = sword.getAttacks()[0]
    expect(attack.getDamage()).toBe(10)
    expect(attack.getDelay()).toBe(100)
  })
  test('should be able to set delay', () => {
    let attack = sword.getAttacks()[0]
    attack.setDelay(1)
    expect(attack.getDelay()).toBe(1)
  })
  test('should be able to set effects', () => {
    let attack = sword.getAttacks()[0]
    attack.setEffects([
      factory.effect({
        characteristic: factory.health()
      })
    ])
    expect(attack.getEffects().length).toBe(1)
  })
})
