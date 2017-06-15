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
})
