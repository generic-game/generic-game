class QuestStep {
  constructor ({text, reward = null}) {
    this._text = text
    this._reward = reward
    this._completed = false
  }
  getText () {
    return this._text
  }
  getReward () {
    return this._reward
  }
  completeStep () {
    this._completed = true
  }
  isCompleted () {
    return this._completed
  }
}

export default QuestStep
