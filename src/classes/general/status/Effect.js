import { Characteristic } from 'classes'

class Effect {
  constructor ({characteristic, amount = undefined}) {
    if (!(characteristic instanceof Characteristic)) characteristic = new Characteristic(characteristic)
    this._characteristic = characteristic
    if (typeof amount === 'undefined') {
      amount = characteristic.getValue()
    }
    this._amount = amount
  }
  setCharacteristic (characteristic) {
    if (!(characteristic instanceof Characteristic)) characteristic = new Characteristic(characteristic)
    this._characteristic = characteristic
  }
  getCharacteristic () {
    return this._characteristic
  }
  setAmount (amount) {
    this._amount = amount
  }
  getAmount () {
    return this._amount
  }
}

export default Effect
