class Identity {
  constructor ({name = '', type = ''}) {
    this._name = name
    this._type = type
  }
  getName () {
    return this._name
  }
  getFullName () {
    return this._type ? `${this._type}: ${this._name}` : this.getName()
  }
  getType () {
    return this._type
  }
}

export default Identity
