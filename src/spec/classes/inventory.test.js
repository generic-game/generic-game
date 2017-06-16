import { error, factory } from '../helpers'

let hero = factory.hero()
let sword = factory.sword()
let helmet = factory.helmet()

describe('inventory', () => {
  test('should able to carry a item', () => {
    return hero.inventory.carry(sword).then(() => {
      expect(hero.inventory.items.length).toBe(1)
      expect(hero.inventory.items[0].name).toBe('Great sword')
    }).catch(error)
  })
  test('should not be able to carry excess of items', () => {
    expect(hero.inventory.carry(sword)).rejects.toEqual(new Error('Exceeded inventory capacity'))
  })
  test('should able to drop a item', () => {
    return hero.inventory.drop(sword).then(() => {
      expect(hero.inventory.items.length).toBe(0)
      return hero.inventory.carry(helmet).then(() => {
        expect(hero.inventory.items.length).toBe(1)
        expect(hero.inventory.items[0].name).toBe('Armet')
      }).catch(error)
    }).catch(error)
  })
  test('should able to take item from inventory', () => {
    let shouldBeHelmet = hero.inventory.get(0)
    expect(hero.inventory.items.length).toBe(0)
    expect(shouldBeHelmet.name).toBe('Armet')
  })
})
