import { error, factory } from '../helpers'

let hero = factory.hero()

let sword = factory.sword()
let dagger = factory.dagger()
let helmet = factory.helmet()

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
    expect(hero.status.get().defense).toBe(1)
  })
})
