class Experience {
  constructor ({value = 0}) {
    this._value = value
    this._algorithm = (value) => Math.floor(value / 10)
  }
  getExperience () {
    return this._value
  }
  setAlgorithm (algorithm) {
    this._algorithm = algorithm
  }
  gain (amount) {
    if (amount instanceof Experience) {
      this._value += amount.getExperience()
    } else if (typeof amount === 'number') {
      this._value += amount
    }
    return Promise.resolve(true)
  }
  lose (amount) {
    this._value -= amount
    if (this._value < 0) {
      this._value = 0
    }
    return Promise.resolve(true)
  }
  computeLevel () {
    return this._algorithm(this._value)
  }
}

export default Experience
