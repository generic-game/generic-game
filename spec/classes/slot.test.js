import { gg } from '../helpers'

let slot = new gg.class.Slot({
  type: {
    name: 'handheld'
  },
  capacity: 10
})

describe('slot', () => {
  test('should set and get type', () => {
    slot.setType('handheld')
    expect(slot.getType().getName()).toBe('handheld')
    slot.setType({
      name: 'handheld'
    })
    expect(slot.getType().getName()).toBe('handheld')
    slot.setType(new gg.class.SlotType({
      name: 'handheld'
    }))
    expect(slot.getType().getName()).toBe('handheld')
  })
  test('should set and get capacity', () => {
    slot.setCapacity(9)
    expect(slot.getCapacity()).toBe(9)
  })
})
