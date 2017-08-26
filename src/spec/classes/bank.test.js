import { gg, factory } from '../helpers'

let hero = factory.hero()

describe('bank', () => {
  let pack = new gg.class.Currency({
    name: 'Gold',
    symbol: 'G',
    value: 1000
  })
  test('should initialize with a list of currencies', () => {
    const bank = new gg.class.Bank({
      currencies: [
        new gg.class.Currency({
          name: 'Gold',
          symbol: 'G',
          value: 1000
        }),
        new gg.class.Currency({
          name: 'Cash',
          symbol: 'CASH',
          value: 10
        })
      ]
    })
    expect(Object.keys(bank.getCurrencies()).length).toBe(2)
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
  test('should list currencies', () => {
    let currencies = hero.bank.getCurrencies()
    expect(Object.keys(currencies).length).toBe(3)
    expect(currencies.gold.symbol).toBe('G')
    expect(currencies.cash.symbol).toBe('C')
    expect(currencies.ethereum.symbol).toBe('ETH')
  })
})
