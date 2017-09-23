class Attack {
  constructor ({damage = 0, delay = 0, effects = []}) {
    this._damage = damage
    this._delay = delay
    this._effects = effects
  }
  setDamage (damage) {
    this._damage = damage
  }
  getDamage () {
    return this._damage
  }
  setDelay (delay) {
    this._delay = delay
  }
  getDelay () {
    return this._delay
  }
  setEffects (effects) {
    this._effects = effects
  }
  getEffects () {
    return this._effects
  }
}

export default Attack
