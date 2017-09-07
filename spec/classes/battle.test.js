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
    villian.equipament.equip(factory.sword())

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
