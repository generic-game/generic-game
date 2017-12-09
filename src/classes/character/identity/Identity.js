class Identity {
  constructor ({name = '', gender = '', type = '', role = ''}) {
    this._name = name
    this._type = type
    this._role = role
    this._gender = gender
  }
  setGender (gender) {
    this._gender = gender
  }
  getGender () {
    return this._gender
  }
  setName (name) {
    this._name = name
  }
  getName () {
    return this._name
  }
  getFullName () {
    return this._type ? `${this._type}: ${this._name}` : this.getName()
  }
  setType (type) {
    this._type = type
  }
  getType () {
    return this._type
  }
  setRole (role) {
    this._role = role
  }
  getRole () {
    return this._role
  }
}

export default Identity
