class Status {
  constructor ({character}) {
    this._character = character
  }
  get (name) {
    let status = {}
    this._addToStatus(status, this._character.equipment.getModifiers())
    this._addToStatus(status, this._character.characteristics.getCharacteristics())
    return name ? status[name] || 0 : status
  }
  _addToStatus (status, characteristics) {
    characteristics.forEach(characteristic => {
      if (!characteristic || !characteristic.getName || !characteristic.getValue) return
      if (status[characteristic.getName()]) {
        status[characteristic.getName()] += characteristic.getValue()
      } else {
        status[characteristic.getName()] = characteristic.getValue()
      }
    })
    return status
  }
}

export default Status
