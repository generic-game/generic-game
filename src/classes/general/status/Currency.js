class Currency {
  constructor ({name, symbol, value = 0}) {
    this.setValue(value)
    Object.assign(this, {name, symbol})
  }
  setValue (value) {
    if (typeof value !== 'number') throw new Error('Currency value must be a number')
    this.value = value
  }
  getValue () {
    return this.value
  }
  format () {
    return `${this.symbol} ${this.value}`
  }
}

export default Currency
