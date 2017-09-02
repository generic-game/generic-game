class Currency {
  constructor ({name, symbol, value = 0}) {
    this.value = value
    Object.assign(this, {name, symbol})
  }
  getValue () {
    return this.value
  }
  format () {
    return `${this.symbol} ${this.value}`
  }
}

export default Currency
