import QuestStep from './QuestStep'
import { Experience } from '../character'
import { Item, Currency } from '../general'

class Quest {
  constructor ({text, steps = []}) {
    this._text = text
    this._steps = []
    this._rewarded = false
    steps.forEach((step) => this.addStep(step))
  }
  getText () {
    return this._text
  }
  getSteps () {
    return this._steps
  }
  addStep (step) {
    if (!(step instanceof QuestStep)) {
      step = new QuestStep(step)
    }
    this._steps.push(step)
  }
  getProgress () {
    return this._steps.filter(_step => _step.isCompleted()).length / this._steps.length
  }
  isCompleted () {
    return this.getProgress() === 1
  }
  isRewardClaimed () {
    return this._rewarded
  }
  interaction (character) {
    return {
      join: this._joiner(character),
      drop: this._droper(character),
      completeStep: this._stepCompleter(character),
      claimReward: this._claimRewarder(character)
    }
  }
  _claimRewarder (character) {
    return () => {
      return new Promise((resolve, reject) => {
        if (!this.isCompleted()) return reject(new Error(`Hero cannot claim quest reward because the quest isn't completed`))
        if (this.isRewardClaimed()) return reject(new Error(`Quest reward already claimed`))
        let rewards = this._getRewards()
        rewards.reduce((iterator, reward) => {
          return iterator.then(() => {
            if (reward instanceof Experience) {
              return character.experience.gain(reward)
            } else if (reward instanceof Currency) {
              return character.bank.earn(reward)
            } else if (reward instanceof Item) {
              return character.inventory.carry(reward)
            }
          })
        }, Promise.resolve([])).then(() => {
          this._rewarded = true
          resolve()
        })
      })
    }
  }
  _getRewards () {
    return (this._steps || []).map(step => {
      return step.getReward()
    })
  }
  _validatePossession (character) {
    return new Promise((resolve, reject) => {
      let quest = character.quests.findQuest(this)
      if (!quest) return reject(new Error(`Hero haven't joined this quest`))
      resolve(true)
    })
  }
  _stepCompleter (character) {
    return (stepIndex) => {
      return this._validatePossession(character).then(() => {
        return this.getSteps()[stepIndex].completeStep()
      })
    }
  }
  _droper (character) {
    return () => {
      return new Promise((resolve, reject) => {
        character.quests.removeQuest(this)
        resolve()
      })
    }
  }
  _joiner (character) {
    return () => {
      return new Promise((resolve, reject) => {
        character.quests.addQuest(this)
        resolve()
      })
    }
  }
}

export default Quest
