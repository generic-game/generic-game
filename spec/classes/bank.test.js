import { gg, factory } from '../helpers'

const hero = factory.hero()

describe('bank', () => {
  const pack = new gg.class.Currency({
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
    return hero.bank.earn(pack).then(() => {
      expect(hero.bank.get('Gold').getValue()).toBe(1000)
    })
  })
  test('should earn more gold', () => {
    pack.setValue(100)
    return hero.bank.earn(pack).then(() => {
      expect(hero.bank.get('Gold').getValue()).toBe(1100)
    })
  })
  test('should earn cash', () => {
    pack.setName('Cash')
    pack.setSymbol('C')
    return hero.bank.earn(pack).then(() => {
      expect(hero.bank.get('Cash').getValue()).toBe(100)
    })
  })
  test('should lose gold', () => {
    return hero.bank.lose(new gg.class.Currency({
      name: 'Gold',
      symbol: 'G',
      value: 1100
    })).then(() => {
      expect(hero.bank.get('Gold').getValue()).toBe(0)
    })
  })
  test('should lose unset currency', () => {
    return hero.bank.lose(new gg.class.Currency({
      name: 'Ethereum',
      symbol: 'ETH',
      value: 1
    })).then(() => {
      expect(hero.bank.get('Ethereum').getValue()).toBe(-1)
    })
  })
  test('should list currencies', () => {
    let currencies = hero.bank.getCurrencies()
    expect(Object.keys(currencies).length).toBe(3)
    expect(currencies.gold.getSymbol()).toBe('G')
    expect(currencies.cash.getSymbol()).toBe('C')
    expect(currencies.ethereum.getSymbol()).toBe('ETH')
  })
  test(`should return empty currency if currency isn't defined`, () => {
    const bank = new gg.class.Bank({})
    expect(bank.get().getValue()).toBe(0)
    expect(bank.get('nothing').getValue()).toBe(0)
    expect(bank.get(new gg.class.Currency({
      name: ''
    })).getValue()).toBe(0)
  })
})
