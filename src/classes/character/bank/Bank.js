import { Currency } from 'classes'
import { clone, parseToInstance } from 'helpers'

class Bank {
  constructor ({currencies = []}) {
    this._currencies = this._parseCurrencies(currencies)
  }
  setCurrencies (currencies) {
    this._currencies = this._parseCurrencies(currencies)
  }
  getCurrencies () {
    return this._currencies
  }
  lose (currency) {
    return new Promise((resolve, reject) => {
      currency = this._parseCurrency(currency)
      currency = clone(currency)
      let name = this._parseName(currency.getName())
      if (this._currencies[name]) {
        this._currencies[name].putValue(-Math.abs(currency.getValue()))
      } else {
        currency.setValue(-Math.abs(currency.getValue()))
        this._currencies[name] = currency
      }
      resolve(this._currencies[name])
    })
  }
  get (currency) {
    let name = currency && typeof currency !== 'string' && currency.getName ? currency.getName() : currency
    name = this._parseName(name)
    return name ? (this._currencies[name] || this._emptyCurrency()) : this._emptyCurrency()
  }
  earn (currency) {
    return new Promise((resolve, reject) => {
      currency = this._parseCurrency(currency)
      currency = clone(currency)
      let name = this._parseName(currency.getName())
      if (this._currencies[name]) {
        this._currencies[name].putValue(Math.abs(currency.getValue()))
      } else {
        this._currencies[name] = currency
      }
      resolve(this._currencies[name])
    })
  }
  _parseName (name) {
    return String(name).toLowerCase()
  }
  _emptyCurrency () {
    return new Currency({
      name: 'Empty',
      symbol: 'N/A',
      value: 0
    })
  }
  _parseCurrencies (currencies) {
    if (Array.isArray(currencies)) {
      return currencies.reduce((obj, currency) => {
        obj[this._parseName((currency.name || currency.getName()))] = this._parseCurrency(currency)
        return obj
      }, {})
    } else if (currencies instanceof Object) {
      return Object.keys(currencies).reduce((obj, name) => {
        let data = { name }
        if (typeof currencies[name] === 'number') {
          data.value = currencies[name]
        } else if (currencies[name] instanceof Object) {
          data = Object.assign(data, currencies[name])
        }
        obj[this._parseName(name)] = this._parseCurrency(data)
        return obj
      }, {})
    } else {
      return []
    }
  }
  _parseCurrency (currency) {
    return parseToInstance(Currency, [currency])[0]
  }
}

export default Bank
