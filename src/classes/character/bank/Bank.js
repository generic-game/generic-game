class Bank {
  constructor ({currencies = []}) {
    if (Array.isArray(currencies)) {
      currencies = currencies.reduce((obj, currency) => {
        obj[this._parseName(currency.name)] = currency
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
      currency = Object.assign({}, currency)
      let name = this._parseName(currency.name)
      if (this._currencies[name]) {
        this._currencies[name].value -= Math.abs(currency.value)
      } else {
        currency.value = -Math.abs(currency.value)
        this._currencies[name] = currency
      }
      resolve(this._currencies[name])
    })
  }
  get ({name}) {
    name = this._parseName(name)
    return name ? (this._currencies[name] || {}) : {}
  }
  earn (currency) {
    return new Promise((resolve, reject) => {
      let name = this._parseName(currency.name)
      if (this._currencies[name]) {
        this._currencies[name].value += Math.abs(currency.value)
      } else {
        this._currencies[name] = Object.assign(Object.create(currency), currency)
      }
      resolve(this._currencies[name])
    })
  }
  _parseName (name) {
    return String(name).toLowerCase()
  }
}

export default Bank
