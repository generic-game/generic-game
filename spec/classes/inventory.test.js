import { gg, error, factory } from '../helpers'

let hero = factory.hero()
let sword = factory.sword()
let helmet = factory.helmet()

describe('inventory', () => {
  test('should initialize with valid slots', () => {
    let inventory = new gg.class.Inventory({
      items: [
        new gg.class.Item({name: 'Item name', type: 'equipable', slotType: 'handheld'})
      ]
    })
    expect(inventory.items.length).toBe(1)
  })
  test('should\'nt initialize with invalid items', () => {
    expect(() => new gg.class.Inventory({items: [{name: 'Item name', type: 'sword', slotType: 'handheld'}]})).toThrow(new Error('Invalid items'))
  })
  test('should able to carry an item', () => {
    return hero.inventory.carry(sword).then(() => {
      expect(hero.inventory.items.length).toBe(1)
      expect(hero.inventory.items[0].name).toBe('Great sword')
    }).catch(error)
  })
  test('should\'nt be able to carry an invalid item', () => {
    return expect(hero.inventory.carry({name: 'Sword', attack: 100})).rejects.toEqual(new Error(`Not an Item instance`))
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
  test('should\'nt be able to drop an invalid item', () => {
    return expect(hero.inventory.drop({name: 'Sword', attack: 100})).rejects.toEqual(new Error(`Not an Item instance`))
  })
  test('should able to take item from inventory', () => {
    let shouldBeHelmet = hero.inventory.get(0)
    expect(hero.inventory.items.length).toBe(0)
    expect(shouldBeHelmet.name).toBe('Armet')
  })
  test('should return null if index is invalid', () => {
    let item = hero.inventory.get(10)
    expect(item).toBe(null)
  })
})
