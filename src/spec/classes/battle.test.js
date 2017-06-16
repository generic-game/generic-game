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
  test('should battle until death', () => {
    return hero.battle.conflict(villian).then(() => {
      expect(villian.battle.isAlive()).toBe(false)
    }).catch(error)
  })
})
