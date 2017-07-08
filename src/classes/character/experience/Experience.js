class Experience {
  constructor ({initialExperience}) {
    this.value = initialExperience || 0
    this.algorithm = (value) => Math.floor(value / 10)
  }
  gain (amount) {
    this.value += amount
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
