import Characteristics from '../characteristics/Characteristics'

class Role {
  constructor ({name = '', description = '', characteristics = []}) {
    this._name = name
    this._description = description
    this._characteristics = new Characteristics({characteristics, setDefault: false})
  }
  setCharacteristics (characteristics) {
    this._characteristics = new Characteristics({characteristics, setDefault: false})
  }
  getCharacteristics () {
    return this._characteristics.getCharacteristics()
  }
  setName (name) {
    this._name = name
  }
  getName () {
    return this._name
  }
  setDescription (description) {
    this._description = description
  }
  getDescription () {
    return this._description
  }
}

export default Role
