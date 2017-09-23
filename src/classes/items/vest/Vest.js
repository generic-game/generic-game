import { Item } from '../../general'

class Vest extends Item {
  constructor ({name, type, slotType, effects}) {
    super({name, type, slotType})
    this._effects = effects
  }
  setEffects (effects) {
    this._effects = effects
  }
  getEffects () {
    return this._effects
  }
}

export default Vest
