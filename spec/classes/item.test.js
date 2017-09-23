import { gg } from '../helpers'
import { item as itemTypes } from 'constants'

describe('item', () => {
  let item = new gg.class.Item({
    name: 'Some item',
    type: itemTypes.EQUIPABLE,
    slotType: {
      name: 'handheld'
    }
  })
  test('should throw if type is not listed in allowed types', () => {
    expect(() => new gg.class.Item({name: 'MyCharacteristic', slotType: 'SomeRandom'})).toThrow(new Error('Unknow item type'))
  })
  test('should set and get name', () => {
    item.setName('name')
    expect(item.getName()).toBe('name')
  })
  test('should set and get weight', () => {
    item.setWeight(99)
    expect(item.getWeight()).toBe(99)
  })
  test('should set slot type', () => {
    item.setSlotType({
      name: 'rings'
    })
    expect(item.getSlotType().getName()).toBe('rings')
  })
  test('should set and get proper type (equipable or consumable)', () => {
    expect(() => item.setType('unknownType')).toThrow(new Error('Unknow item type'))
    item.setType(itemTypes.EQUIPABLE)
    expect(item.getType()).toBe(itemTypes.EQUIPABLE)
  })
})
