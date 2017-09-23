import { factory } from '../helpers'

let hero = factory.hero()
hero.equipament.addSlot({type: 'handheld'})
hero.equipament.equip(factory.sword())

let villian = factory.villian()

describe('battle', () => {
  test('attacker should attack', () => {
    return hero.battle.attack(villian).then(() => {
      let status = villian.status.get()
      expect(status.life - status.damageTaken).toBe(90)
    })
  })
  test('attacker should equip weapon to attack', () => {
    let villian = factory.villian()
    return expect(villian.battle.attack(hero)).rejects.toEqual(new Error(`Character can't attack without a weapon`))
  })
  describe('battle events', () => {
    villian = factory.villian()
    villian.equipament.addSlot({type: 'handheld'})
    villian.equipament.equip(factory.dagger())
    test('should trigger events', () => {
      const mockCallback = jest.fn()
      villian.events.on('battle:[before]defend', mockCallback)
      villian.events.on('battle:[before]takingDamage', mockCallback)
      villian.events.on('battle:[after]takingDamage', mockCallback)
      villian.events.on('battle:[after]defend', mockCallback)
      villian.events.on('battle:[before]attack', mockCallback)
      villian.events.on('battle:[after]attack', mockCallback)
      return hero.battle.attack(villian).then((isAlive) => {
        return villian.battle.attack(hero)
      }).then(() => {
        expect(mockCallback.mock.calls.length).toBe(6)
        // battle:[before]defend
        expect(typeof mockCallback.mock.calls[0][0].attack.getDamage).toBe('function')
        expect(typeof mockCallback.mock.calls[0][0].attack.getDelay).toBe('function')
        expect(typeof mockCallback.mock.calls[0][0].attack.getEffects).toBe('function')
        // battle:[before]takingDamage
        expect(Object.keys(mockCallback.mock.calls[1][0].status)).toContain('damage')
        // battle:[after]takingDamage
        expect(Object.keys(mockCallback.mock.calls[2][0].status)).toContain('damage')
        // battle:[after]defend
        expect(typeof mockCallback.mock.calls[3][0].attack.getDamage).toBe('function')
        expect(typeof mockCallback.mock.calls[3][0].attack.getDelay).toBe('function')
        expect(typeof mockCallback.mock.calls[3][0].attack.getEffects).toBe('function')
        // battle:[before]attack
        expect(typeof mockCallback.mock.calls[4][0].attack.getDamage).toBe('function')
        expect(typeof mockCallback.mock.calls[4][0].attack.getDelay).toBe('function')
        expect(typeof mockCallback.mock.calls[4][0].attack.getEffects).toBe('function')
        // battle:[after]attack
        expect(typeof mockCallback.mock.calls[5][0].attack.getDamage).toBe('function')
        expect(typeof mockCallback.mock.calls[5][0].attack.getDelay).toBe('function')
        expect(typeof mockCallback.mock.calls[5][0].attack.getEffects).toBe('function')
      })
    })
  })
  test('should battle until death', () => {
    villian = factory.villian()
    villian.equipament.addSlot({type: 'handheld'})
    villian.equipament.equip(factory.dagger())
    return hero.battle.conflict(villian).then(() => {
      expect(villian.battle.isAlive()).toBe(false)
    })
  })
})
