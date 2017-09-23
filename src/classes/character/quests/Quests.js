import { Quest } from '../../quest'

class Quests {
  constructor () {
    this._quests = []
  }
  getQuests () {
    return this._quests
  }
  findQuest (quest) {
    return this._quests.filter(_quest => quest === _quest)[0] || null
  }
  addQuest (quest) {
    if (!(quest instanceof Quest)) this._throwNotInstance()
    this._quests.push(quest)
  }
  removeQuest (quest) {
    if (!(quest instanceof Quest)) this._throwNotInstance()
    if (this._quests.indexOf(quest) === -1) throw new Error(`Cannot remove a quest that the character didn't join`)
    this._quests.splice(this._quests.indexOf(quest), 1)
  }
  _throwNotInstance () {
    throw new Error('Adding a quest to character, not a quest instance')
  }
}

export default Quests
