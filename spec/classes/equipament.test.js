import { gg, factory } from '../helpers'

let hero = factory.hero()

let sword = factory.sword()
let dagger = factory.dagger()
let helmet = factory.helmet()

describe('equipament', () => {
  test('should initialize with valid slots', () => {
    let equipament = new gg.class.Equipament({
      slots: [
        new gg.class.Slot({type: 'Valid type'})
      ]
    })
    expect(equipament.getSlots().length).toBe(1)
  })
  test('should\'nt initialize with invalid slots', () => {
    expect(() => new gg.class.Equipament({slots: [{type: {name: 'Dummy name'}}]})).toThrow(new Error('Invalid slots'))
  })
  test('should not unable to equip in unexistent slots', () => {
    expect(hero.equipament.equip(dagger)).rejects.toEqual(new Error('No available slot'))
  })
  test('should able to equip a item', () => {
    hero.equipament.addSlot({type: 'handheld'})
    return hero.equipament.equip(sword).then((equiped) => {
      expect(equiped.getName()).toBe('Great sword')
    })
  })
  test('should prevent to equip in unavailable slots', () => {
    expect(hero.equipament.equip(dagger)).rejects.toEqual(new Error('Exceeded slot capacity'))
  })
  test('should compute items characteristic changes', () => {
    hero.equipament.addSlot({type: 'helmet'})
    return hero.equipament.equip(helmet).then(() => {
      expect(hero.equipament.getModifiers()[1].getValue()).toBe(1)
    })
  })
  test('should change character characteristics after the item is equiped', () => {
    expect(hero.status.get().defense).toBe(1)
  })
})
