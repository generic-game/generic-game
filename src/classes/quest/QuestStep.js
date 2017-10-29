class QuestStep {
  constructor ({text, reward = null, action = () => Promise.resolve(true)}) {
    this._text = text
    this._reward = reward
    this._action = action
    this._completed = false
  }
  getText () {
    return this._text
  }
  getReward () {
    return this._reward
  }
  completeStep () {
    return this._action().then((isCompleted) => (this._completed = isCompleted))
  }
  isCompleted () {
    return this._completed
  }
}

export default QuestStep
