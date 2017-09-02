class Experience {
  constructor ({value = 0}) {
    this.value = value
    this.algorithm = (value) => Math.floor(value / 10)
  }
  getExperience () {
    return this.value
  }
  gain (amount) {
    if (amount instanceof Experience) {
      this.value += amount.getExperience()
    } else if (typeof amount === 'number') {
      this.value += amount
    }
    return Promise.resolve(true)
  }
  lose (amount) {
    this.value -= amount
    if (this.value < 0) {
      this.value = 0
    }
    return Promise.resolve(true)
  }
  setAlgorithm (algorithm) {
    this.algorithm = algorithm
  }
  computeLevel () {
    return this.algorithm(this.value)
  }
}

export default Experience
