import { parseToInstance } from 'helpers'
import { Characteristic } from 'classes'
import { characteristic, character } from 'constants'

class Characteristics {
  constructor ({characteristics = [], setDefault = true}) {
    this._characteristics = this._parseCharacteristics(characteristics)
    if (setDefault) this._checkDefaultCharacteristics()
  }
  setCharacteristics (characteristics) {
    return this._parseCharacteristics(characteristics)
  }
  getCharacteristics () {
    return this._characteristics
  }
  increase (name, value) {
    this.add(name, value)
  }
  decrease (name, value) {
    this.add(name, -value)
  }
  add (name, value) {
    let index = this.getIndexByName(name)
    if (index > -1) {
      this._characteristics[index].putValue(value)
    } else {
      this._characteristics.push(new Characteristic({name, value}))
    }
  }
  getValueByName (name) {
    return this.getByName(name).reduce((total, characteristic) => {
      if (characteristic instanceof Characteristic && characteristic.getName() === name) {
        total += (characteristic.getValue() || 0)
      }
      return total
    }, 0)
  }
  getIndexByName (name) {
    return this._characteristics.indexOf(this.getByName(name)[0])
  }
  getByName (name) {
    return this._characteristics.filter(characteristic => characteristic instanceof Characteristic && characteristic.getName() === name)
  }
  _checkDefaultCharacteristics () {
    let defaults = [
      [characteristic.LIFE, character.LIFE],
      [characteristic.DEFENSE, character.DEFENSE]
    ]
    defaults.forEach(characteristic => this._addDefault.apply(this, characteristic))
  }
  _addDefault (name, value) {
    if (!this.getByName(name).length) {
      this.add(name, value)
    }
  }
  _parseCharacteristics (characteristics) {
    return parseToInstance(Characteristic, characteristics)
  }
}

export default Characteristics
