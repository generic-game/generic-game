import { gg } from '../helpers'

describe('item', () => {
  test('should throw if type is not listed in allowed types', () => {
    expect(() => new gg.class.Item({name: 'MyCharacteristic', slotType: 'SomeRandom'})).toThrow(new Error('Unknow item type'))
  })
})
