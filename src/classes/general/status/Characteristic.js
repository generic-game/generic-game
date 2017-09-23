class Characteristic {
  constructor ({name, value = 0}) {
    this._name = name
    this._value = value
  }
  getName () {
    return this._name
  }
  setName (name) {
    this._name = name
  }
  getValue () {
    return this._value
  }
  setValue (value) {
    if (isNaN(parseFloat(value))) throw new Error('Value must be a number')
    this._value = value
  }
  putValue (value) {
    if (isNaN(parseFloat(value))) throw new Error('Value must be a number')
    this.setValue(this.getValue() + value)
  }
}

export default Characteristic
