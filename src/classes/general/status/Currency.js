class Currency {
  constructor ({name, symbol, value = 0}) {
    this.setValue(value)
    this._name = name
    this._symbol = symbol
  }
  getName () {
    return this._name
  }
  setName (name) {
    this._name = name
  }
  getSymbol () {
    return this._symbol
  }
  setSymbol (symbol) {
    this._symbol = symbol
  }
  setValue (value) {
    if (typeof value !== 'number') throw new Error('Currency value must be a number')
    this._value = value
  }
  putValue (value) {
    this._value += value
  }
  getValue () {
    return this._value
  }
  format () {
    return `${this._symbol} ${this._value}`
  }
}

export default Currency
