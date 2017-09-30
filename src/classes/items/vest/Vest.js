import { Item, Characteristic } from 'classes'
import { parseToInstance } from 'helpers'

class Vest extends Item {
  constructor ({name, type, slotType, effects}) {
    super({name, type, slotType})
    this._effects = this._parseEffects(effects)
  }
  setEffects (effects) {
    this._effects = this._parseEffects(effects)
  }
  getEffects () {
    return this._effects
  }
  _parseEffects (effects) {
    return parseToInstance(Characteristic, effects)
  }
}

export default Vest
