class Name {
  constructor ({nickname, content, type}) {
    Object.assign(this, {nickname, content, type})
  }
  getNickname () {
    return this.nickname
  }
}

export default Name
