class Status {
  constructor ({character}) {
    Object.assign(this, {character})
  }
  get () {
    let status = {}
    this._addToStatus(status, this.character.equipament.getModifiers())
    this._addToStatus(status, this.character.characteristics.getAll())
    return status
  }
  _addToStatus (status, characteristics) {
    characteristics.forEach(characteristic => {
      if (!characteristic || !characteristic.name) return
      if (status[characteristic.name]) {
        status[characteristic.name] += (characteristic.value)
      } else {
        status[characteristic.name] = (characteristic.value)
      }
    })
    return status
  }
}

export default Status
