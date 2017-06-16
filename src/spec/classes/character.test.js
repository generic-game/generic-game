import { gg, error, factory } from '../helpers'

let hero = factory.hero()
let sword = factory.sword()
let dagger = factory.dagger()
let helmet = factory.helmet()

describe('generic hero', () => {
  test('should have a name', () => {
    expect(hero.name).toBe('Generic hero')
  })
})

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

describe('equipament', () => {
  test('should not unable to equip in unexistent slots', () => {
    expect(hero.equipament.equip(dagger)).rejects.toEqual(new Error('No available slot'))
  })
  test('should able to equip a item', () => {
    hero.equipament.addSlot({type: 'handheld'})
    return hero.equipament.equip(sword).then((equiped) => {
      expect(equiped.name).toBe('Great sword')
    }).catch(error)
  })
  test('should prevent to equip in unavailable slots', () => {
    expect(hero.equipament.equip(dagger)).rejects.toEqual(new Error('Exceeded slot capacity'))
  })
  test('should compute items characteristic changes', () => {
    hero.equipament.addSlot({type: 'helmet'})
    return hero.equipament.equip(helmet).then(() => {
      expect(hero.equipament.getModifiers()[1].value).toBe(1)
    })
  })
  test('should change character characteristics after the item is equiped', () => {
    expect(hero.status().defense).toBe(1)
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
