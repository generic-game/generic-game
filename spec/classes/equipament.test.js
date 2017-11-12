import { gg, factory } from '../helpers'

let hero = factory.hero()

let sword = factory.sword()
let dagger = factory.dagger()
let helmet = factory.helmet()

describe('equipment', () => {
  test('should initialize without slots intances', () => {
    let equipment = new gg.class.Equipment({
      slots: [
        {type: 'Some type'}
      ]
    })
    expect(equipment.getSlots().length).toBe(1)
  })
  test('should initialize with slots instances', () => {
    let equipment = new gg.class.Equipment({
      slots: [
        new gg.class.Slot({type: 'Some type'})
      ]
    })
    expect(equipment.getSlots().length).toBe(1)
  })
  test('should not unable to equip in unexistent slots', () => {
    expect(hero.equipment.equip(dagger)).rejects.toEqual(new Error('No available slot'))
  })
  test('should able to equip a item', () => {
    hero.equipment.addSlot({type: 'handheld'})
    return hero.equipment.equip(sword).then((equiped) => {
      expect(equiped.getName()).toBe('Great sword')
    })
  })
  test('should prevent to equip in unavailable slots', () => {
    expect(hero.equipment.equip(dagger)).rejects.toEqual(new Error('Exceeded slot capacity'))
  })
  test('should compute items characteristic changes', () => {
    hero.equipment.addSlot({type: 'helmet'})
    return hero.equipment.equip(helmet).then(() => {
      expect(hero.equipment.getModifiers()[1].getValue()).toBe(1)
    })
  })
  test('should change character characteristics after the item is equiped', () => {
    expect(hero.status.get().defense).toBe(1)
  })
})
