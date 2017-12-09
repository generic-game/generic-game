class Status {
  constructor ({character}) {
    this._character = character
  }
  get (name) {
    let status = {}
    this._addToStatus(status, this._character.equipment.getModifiers())
    this._addToStatus(status, this._character.characteristics.getCharacteristics())
    this._addToStatus(status, this._character.role.getCharacteristics())
    this._addCurrencies(status)

    status.experience = this._character.experience.getExperience()
    status.level = this._character.experience.computeLevel()

    return name ? status[name] || 0 : status
  }
  _addCurrencies (status) {
    let currencies = this._character.bank.getCurrencies()
    Object.keys(currencies).forEach(key => {
      status[key] = currencies[key].getValue()
    })
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
