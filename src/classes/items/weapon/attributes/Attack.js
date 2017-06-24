class Attack {
  constructor ({damage = 0, delay = 0, effects = []}) {
    Object.assign(this, {damage, delay, effects})
  }
}

export default Attack
