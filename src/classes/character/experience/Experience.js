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
    let snapshot = this._getSnapshot()
    if (amount instanceof Experience) {
      this._value += amount.getExperience()
    } else if (typeof amount === 'number') {
      this._value += amount
    }
    return Promise.resolve(snapshot.compare())
  }
  lose (amount) {
    let snapshot = this._getSnapshot()
    this._value -= amount
    if (this._value < 0) {
      this._value = 0
    }
    return Promise.resolve(snapshot.compare())
  }
  _getSnapshot () {
    let snapshot = {
      experienceOld: this.getExperience(),
      experienceChange: 0,
      levelOld: this.computeLevel(),
      levelChange: 0
    }
    return {
      compare: function () {
        let newLevel = this.computeLevel()
        let newExperience = this.getExperience()
        snapshot.levelChange = Math.abs(newLevel) - Math.abs(snapshot.levelOld)
        snapshot.experienceChange = Math.abs(newExperience) - Math.abs(snapshot.experienceOld)
        snapshot.levelNew = newLevel
        snapshot.experienceNew = newExperience
        return snapshot
      }.bind(this)
    }
  }
  computeLevel () {
    return this._algorithm(this._value)
  }
}

export default Experience
