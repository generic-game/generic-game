class Wallet {
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
        return reject(new Error('No currency available'))
      }
      resolve(this.currencies[currency.name])
    })
  }
  get (currency) {
    return currency ? (this.currencies[currency.name] || {}) : {}
  }
  earn (currency) {
    return new Promise((resolve, reject) => {
      if (this.currencies[currency.name]) {
        this.currencies[currency.name].value += Math.abs(currency.value)
      } else {
        this.currencies[currency.name] = currency
      }
      resolve(this.currencies[currency.name])
    })
  }
}

export default Wallet
