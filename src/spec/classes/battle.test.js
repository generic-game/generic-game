import { gg, factory, error } from '../helpers'

let hero = factory.hero()
hero.equipament.addSlot({type: 'handheld'})
hero.equipament.equip(factory.sword())

let villian = factory.villian()
let battle = new gg.class.Battle({
  attackers: [hero],
  defenders: [villian]
})

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('battle', () => {
  test('attacker should attack', () => {
    return hero.attack(villian).then(() => {
      expect(villian.status().life).toBe(90)
    }).catch(error)
  })
  test('should battle until death', () => {
    return battle.conflict(hero, villian).then(() => {
      expect(villian.isAlive()).toBe(false)
    }).catch(error)
  })
})
