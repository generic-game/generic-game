import { Currency } from 'classes'
import { clone } from 'helpers'

class Bank {
  constructor ({currencies = []}) {
    if (Array.isArray(currencies)) {
      currencies = currencies.reduce((obj, currency) => {
        obj[this._parseName(currency.getName())] = currency
        return obj
      }, {})
    }
    this._currencies = currencies
  }
  getCurrencies () {
    return this._currencies
  }
  lose (currency) {
    return new Promise((resolve, reject) => {
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
}

export default Bank
