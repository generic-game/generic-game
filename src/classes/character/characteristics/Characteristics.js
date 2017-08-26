import { Characteristic } from '../../general'
import { characteristic, character } from '../../../constants'

class Characteristics {
  constructor ({characteristics = []}) {
    if (characteristics.length && !this._isValidCharacteristics(characteristics)) throw new Error('Invalid characteristics')
    Object.assign(this, {characteristics})
    this._checkDefaultCharacteristics()
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
  increase (name, value) {
    this.add(name, value)
  }
  decrease (name, value) {
    this.add(name, -value)
  }
  getAll () {
    return this.characteristics
  }
  add (name, value) {
    let index = this.getIndexByName(name)
    if (index > -1) {
      this.characteristics[index].value += value
    } else {
      this.characteristics.push(new Characteristic({name, value}))
    }
  }
  _isValidCharacteristics (characteristics) {
    return characteristics.filter(characteristic => !(characteristic instanceof Characteristic)).length === 0
  }
  getValueByName (name) {
    return this.getByName(name).reduce((total, characteristic) => {
      if (characteristic instanceof Characteristic && characteristic.name === name) {
        total += (characteristic.value || 0)
      }
      return total
    }, 0)
  }
  getIndexByName (name) {
    return this.characteristics.indexOf(this.getByName(name)[0])
  }
  getByName (name) {
    return this.characteristics.filter(characteristic => characteristic instanceof Characteristic && characteristic.name === name)
  }
}

export default Characteristics
