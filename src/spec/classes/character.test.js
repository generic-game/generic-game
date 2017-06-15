import { gg, error } from '../helpers'

let hero = new gg.class.Character({
  name: 'Generic hero',
  statuses: [
    new gg.class.Characteristic({name: gg.const.characteristic.LIFE, value: 100})
  ]
})
let sword = new gg.class.Weapon({
  name: 'Greatsword',
  type: gg.const.item.EQUIPABLE,
  attacks: [
    new gg.class.Characteristic({name: gg.const.characteristic.ATTACK, value: 10})
  ]
})
let helmet = new gg.class.Vest({
  name: 'Armet',
  type: gg.const.item.EQUIPABLE
})

describe('generic hero', () => {
  test('should have a name', () => {
    expect(hero.name).toBe('Generic hero')
  })
})

describe('inventory', () => {
  test('should able to carry a item', () => {
    hero.inventory.carry(sword).then(() => {
      expect(hero.inventory.items.length).toBe(1)
      expect(hero.inventory.items[0].name).toBe('Greatsword')
    }).catch(error)
  })
  test('should not be able to carry excess of items', () => {
    hero.inventory.carry(sword).catch(message => {
      expect(message).toBe('Exceeded inventory capacity')
    })
  })
  test('should able to drop a item', () => {
    hero.inventory.drop(sword).then(() => {
      expect(hero.inventory.items.length).toBe(0)
      hero.inventory.carry(helmet).then(() => {
        expect(hero.inventory.items.length).toBe(1)
        expect(hero.inventory.items[0].name).toBe('Armet')
      }).catch(error)
    }).catch(error)
  })
})
