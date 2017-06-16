import { factory, error } from '../helpers'

let hero = factory.hero()
hero.equipament.addSlot({type: 'handheld'})
hero.equipament.equip(factory.sword())

let villian = factory.villian()

describe('battle', () => {
  test('attacker should attack', () => {
    return hero.battle.attack(villian).then(() => {
      let status = villian.status.get()
      expect(status.life - status.damageTaken).toBe(90)
    }).catch(error)
  })
  describe('battle events', () => {
    villian = factory.villian()

    test('should trigger events', () => {
      villian.events.on('battle:[before]attack', ({ attack }) => {
        expect(Object.keys(attack)).toContain('damage')
        expect(Object.keys(attack)).toContain('delay')
        expect(Object.keys(attack)).toContain('effects')
      })
      villian.events.on('battle:[after]attack', ({ attack }) => {
        expect(Object.keys(attack)).toContain('damage')
        expect(Object.keys(attack)).toContain('delay')
        expect(Object.keys(attack)).toContain('effects')
      })
      villian.events.on('battle:[before]defend', ({ attack }) => {
        expect(Object.keys(attack)).toContain('damage')
        expect(Object.keys(attack)).toContain('delay')
        expect(Object.keys(attack)).toContain('effects')
      })
      villian.events.on('battle:[after]defend', ({ attack }) => {
        expect(Object.keys(attack)).toContain('damage')
        expect(Object.keys(attack)).toContain('delay')
        expect(Object.keys(attack)).toContain('effects')
      })
      villian.events.on('battle:[before]takingDamage', ({ status }) => {
        expect(Object.keys(status)).toContain('damage')
      })
      villian.events.on('battle:[after]takingDamage', ({ status }) => {
        expect(Object.keys(status)).toContain('damage')
      })
      return hero.battle.attack(villian).then(() => {
        return villian.battle.attack(hero)
      }).catch(error)
    })
  })
  test('should battle until death', () => {
    return hero.battle.conflict(villian).then(() => {
      expect(villian.battle.isAlive()).toBe(false)
    }).catch(error)
  })
})
