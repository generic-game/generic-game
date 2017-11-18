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
    let currentLevel = this.computeLevel()
    let levelUp = false
    let levels = 0
    if (amount instanceof Experience) {
      this._value += amount.getExperience()
    } else if (typeof amount === 'number') {
      this._value += amount
    }
    let newLevel = this.computeLevel()
    if (newLevel > currentLevel) {
      levels = newLevel - currentLevel
      levelUp = true
    }

    return Promise.resolve({ levelUp, levels })
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
