import { gg } from '../helpers'

let slotType = new gg.class.SlotType({
  name: 'handheld'
})

describe('slot type', () => {
  test('should set and get name', () => {
    slotType.setName('name')
    expect(slotType.getName()).toBe('name')
  })
})
