import { gg, error } from '../helpers'

let hero = new gg.class.Character({
  name: 'Generic hero',
  statuses: [
    new gg.class.Characteristic({name: gg.const.characteristic.LIFE, value: 100})
  ]
})
let sword = new gg.class.Weapon({
  name: 'Great sword',
  type: gg.const.item.EQUIPABLE,
  slotType: {name: 'handheld'},
  attacks: [
    new gg.class.Characteristic({name: gg.const.characteristic.ATTACK, value: 10})
  ]
})
let dagger = new gg.class.Weapon({
  name: 'Dagger',
  type: gg.const.item.EQUIPABLE,
  slotType: {name: 'handheld'},
  attacks: [
    new gg.class.Characteristic({name: gg.const.characteristic.ATTACK, value: 1})
  ]
})
let helmet = new gg.class.Vest({
  name: 'Armet',
  slotType: {name: 'helmet'},
  type: gg.const.item.EQUIPABLE,
  attacks: [
    new gg.class.Characteristic({name: gg.const.characteristic.LIFE, value: 50})
  ]
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
      expect(hero.inventory.items[0].name).toBe('Great sword')
    }).catch(error)
  })
  test('should not be able to carry excess of items', () => {
    expect(hero.inventory.carry(sword)).rejects.toEqual(new Error('Exceeded inventory capacity'))
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
  test('should able to take item from inventory', () => {
    let shouldBeHelmet = hero.inventory.get(0)
    expect(hero.inventory.items.length).toBe(0)
    expect(shouldBeHelmet.name).toBe('Armet')
  })
})

describe('equipament', () => {
  test('should not unable to equip in unexistent slots', () => {
    expect(hero.equipament.equip(dagger)).rejects.toEqual(new Error('No available slot'))
  })
  test('should able to equip a item', () => {
    hero.equipament.addSlot({type: 'handheld'})
    hero.equipament.equip(sword).then((equiped) => {
      expect(equiped.name).toBe('Great sword')
    }).catch(error)
  })
  test('should prevent to equip in unavailable slots', () => {
    expect(hero.equipament.equip(dagger)).rejects.toEqual(new Error('Exceeded slot capacity'))
  })
  test('should compute items characteristic changes', () => {
    // Only the Great sword should be equipped, therefore attack should equal 10
    expect(hero.equipament.getModifiers()[0].value).toBe(10)
  })
  test('should change character characteristics after the item is equiped', () => {
    expect(hero.status().attack).toBe(10)
  })
})

describe('currency', () => {
  let pack = new gg.class.Currency({
    name: 'Gold',
    symbol: 'G',
    value: 1000
  })
  test('should earn gold', () => {
    hero.earnCurrency(pack).then(() => {
      expect(hero.currencies['Gold']).toBe(1000)
    })
  })
  test('should earn more gold', () => {
    pack.value = 100
    hero.earnCurrency(pack).then(() => {
      expect(hero.currencies['Gold']).toBe(1100)
    })
  })
  test('should earn cash', () => {
    pack.name = 'Cash'
    pack.symbol = 'C'
    hero.earnCurrency(pack).then(() => {
      expect(hero.currencies['Cash']).toBe(100)
    })
  })
})
