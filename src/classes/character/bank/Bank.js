class Bank {
  constructor ({currencies}) {
    Object.assign(this, {currencies})
  }
  getCurrencies () {
    return this.currencies
  }
  lose (currency) {
    return new Promise((resolve, reject) => {
      if (this.currencies[currency.name]) {
        this.currencies[currency.name].value -= Math.abs(currency.value)
      } else {
        if (!currency.value) currency.value = 0
        currency.value = -Math.abs(currency.value)
        this.currencies[currency.name] = Object.assign({}, currency)
      }
      resolve(this.currencies[currency.name])
    })
  }
  get ({name}) {
    return name ? (this.currencies[name] || {}) : {}
  }
  earn (currency) {
    return new Promise((resolve, reject) => {
      if (this.currencies[currency.name]) {
        this.currencies[currency.name].value += Math.abs(currency.value)
      } else {
        this.currencies[currency.name] = Object.assign({}, currency)
      }
      resolve(this.currencies[currency.name])
    })
  }
}

export default Bank
