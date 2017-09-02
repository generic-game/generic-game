import { Quest } from '../../quest'

class Quests {
  constructor () {
    this._quests = []
  }
  addQuest (quest) {
    if (!(quest instanceof Quest)) throw new Error('Adding a quest to character, not a quest instance')
    this._quests.push(quest)
  }
  removeQuest (quest) {
    this._quests.splice(this._quests.indexOf(quest), 1)
  }
  getQuests () {
    return this._quests
  }
  findQuest (quest) {
    return this._quests.filter(_quest => quest === _quest)[0] || null
  }
}

export default Quests
