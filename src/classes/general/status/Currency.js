class Currency {
  constructor ({name, symbol, value = 0}) {
    Object.assign(this, {name, symbol, value})
  }
  format () {
    return `${this.symbol} ${this.value}`
  }
}

export default Currency
