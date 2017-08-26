class Bank {
  constructor ({currencies}) {
    if (Array.isArray(currencies)) {
      currencies = currencies.reduce((obj, currency) => {
        obj[this._parseName(currency.name)] = currency
        return obj
      }, {})
    }
    Object.assign(this, {currencies})
  }
  getCurrencies () {
    return this.currencies
  }
  lose (currency) {
    return new Promise((resolve, reject) => {
      currency = Object.assign({}, currency)
      let name = this._parseName(currency.name)
      if (this.currencies[name]) {
        this.currencies[name].value -= Math.abs(currency.value)
      } else {
        currency.value = -Math.abs(currency.value)
        this.currencies[name] = currency
      }
      resolve(this.currencies[name])
    })
  }
  get ({name}) {
    name = this._parseName(name)
    return name ? (this.currencies[name] || {}) : {}
  }
  earn (currency) {
    return new Promise((resolve, reject) => {
      let name = this._parseName(currency.name)
      if (this.currencies[name]) {
        this.currencies[name].value += Math.abs(currency.value)
      } else {
        this.currencies[name] = Object.assign({}, currency)
      }
      resolve(this.currencies[name])
    })
  }
  _parseName (name) {
    return String(name).toLowerCase()
  }
}

export default Bank
