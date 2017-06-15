class Item {
  constructor ({name, type}) {
    this._types = ['equipable', 'consumable']
    if (!this._types.includes(type)) throw new Error('Invalid item type')

    Object.assign(this, {name, type})
  }
}

export default Item
