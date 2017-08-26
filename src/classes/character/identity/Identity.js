class Identity {
  constructor ({name = '', type = ''}) {
    Object.assign(this, {name, type})
  }
  getName () {
    return this.type ? `${this.type}: ${this.name}` : this.name
  }
}

export default Identity
