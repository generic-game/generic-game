import { gg, factory } from '../helpers'

let hero = factory.hero()

describe('bank', () => {
  let pack = new gg.class.Currency({
    name: 'Gold',
    symbol: 'G',
    value: 1000
  })
  test('should earn gold', () => {
    hero.bank.earn(pack).then(() => {
      expect(hero.bank.get({name: 'Gold'}).value).toBe(1000)
    })
  })
  test('should earn more gold', () => {
    pack.value = 100
    hero.bank.earn(pack).then(() => {
      expect(hero.bank.get({name: 'Gold'}).value).toBe(1100)
    })
  })
  test('should earn cash', () => {
    pack.name = 'Cash'
    pack.symbol = 'C'
    hero.bank.earn(pack).then(() => {
      expect(hero.bank.get({name: 'Cash'}).value).toBe(100)
    })
  })
  test('should lose gold', () => {
    hero.bank.lose(new gg.class.Currency({
      name: 'Gold',
      symbol: 'G',
      value: 1100
    })).then(() => {
      expect(hero.bank.get({name: 'Gold'}).value).toBe(0)
    })
  })
  test('should lose unset currency', () => {
    hero.bank.lose(new gg.class.Currency({
      name: 'Ethereum',
      symbol: 'ETH',
      value: 1
    })).then(() => {
      expect(hero.bank.get({name: 'Ethereum'}).value).toBe(-1)
    })
  })
})
