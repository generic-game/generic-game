import { gg } from '../helpers'

let gold = new gg.class.Currency({
  name: 'Gold',
  symbol: 'G',
  value: 1000
})

describe('currency', () => {
  test('should return a formatted string', () => {
    expect(gold.format()).toBe('G 1000')
  })
  test(`should throw if value isn't a valid number`, () => {
    let error = new Error('Currency value must be a number')
    expect(() => gold.setValue('a')).toThrow(error)
    expect(() => gold.setValue('1')).toThrow(error)
    expect(() => gold.setValue('!')).toThrow(error)
  })
})
