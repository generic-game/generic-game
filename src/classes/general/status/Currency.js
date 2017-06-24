class Currency {
  constructor ({name, symbol, value}) {
    Object.assign(this, {name, symbol, value})
  }
  format () {
    return `${this.symbol} ${this.value}`
  }
}

export default Currency
