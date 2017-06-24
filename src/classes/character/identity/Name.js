class Name {
  constructor ({name = '', type = ''}) {
    Object.assign(this, {name, type})
  }
  getName () {
    return `${this.type}: ${this.name}`
  }
}

export default Name
