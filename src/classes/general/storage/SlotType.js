class SlotType {
  constructor ({name}) {
    this._name = name
  }
  setName (name) {
    this._name = name
  }
  getName () {
    return this._name
  }
}

export default SlotType
