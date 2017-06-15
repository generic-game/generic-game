class Name {
  constructor ({nickname, content, type}) {
    Object.assign(this, {nickname, content, type})
  }
  getNickname () {
    return `${this.type}: ${this.nickname}`
  }
}

export default Name
