import { gg, factory } from '../helpers'

let hero = factory.hero()
let questText = 'You should kill something'
let quest = new gg.class.Quest({
  text: questText
})
let sword = factory.sword()
const multipleSteps = () => {
  return new gg.class.Quest({
    text: questText,
    steps: [{
      text: 'A jelly',
      reward: new gg.class.Experience({
        value: 10
      })
    }, {
      text: 'A dwarf',
      reward: new gg.class.Currency({
        name: 'Gold',
        value: 100
      })
    }, {
      text: 'An orc',
      reward: sword
    }, {
      text: 'Another orc'
    }]
  })
}

describe('quest', () => {
  test('should have a text', () => {
    expect(quest.getText()).toBe(questText)
  })
  test('should have a text and item reward', () => {
    let sword = factory.sword()
    quest = new gg.class.Quest({
      text: questText,
      steps: [{
        text: 'An orc',
        reward: sword
      }]
    })
    expect(quest.getText()).toBe(questText)
    expect(quest.getSteps()[0].getReward()).toBe(sword)
  })
  test('should have a text and currency reward', () => {
    let reward = new gg.class.Currency({
      name: 'Gold',
      symbol: 'G',
      value: 1000
    })
    quest = new gg.class.Quest({
      text: questText,
      steps: [{
        text: 'A dwarf',
        reward
      }]
    })
    expect(quest.getText()).toBe(questText)
    expect(quest.getSteps()[0].getReward()).toBe(reward)
  })
  test('should have a text and experience reward', () => {
    let experience = new gg.class.Experience({
      value: 10
    })
    quest = new gg.class.Quest({
      text: questText,
      steps: [{
        text: 'A jelly',
        reward: experience
      }]
    })
    expect(quest.getText()).toBe(questText)
    expect(quest.getSteps()[0].getReward()).toBe(experience)
  })
  test('should have steps and each step should have description', () => {
    quest = multipleSteps()
    expect(quest.getSteps()[0].getText()).toBe('A jelly')
    expect(quest.getSteps()[1].getText()).toBe('A dwarf')
    expect(quest.getSteps()[2].getText()).toBe('An orc')
  })
  test('should be able to join quest', () => {
    return hero.interact(quest).join().then(() => {
      expect(hero.quests.getQuests()[0].getText()).toBe(questText)
    })
  })
  test(`should'nt allow hero to interact if he didn't join the quest`, () => {
    let newQuest = new gg.class.Quest({
      text: questText,
      steps: [{
        text: 'Something'
      }]
    })
    return expect(hero.interact(newQuest).completeStep(0)).rejects.toEqual(new Error(`Hero haven't joined this quest`))
  })
  test('should be able to complete steps', () => {
    quest = multipleSteps()
    return hero.interact(quest).join().then(() => {
      return hero.interact(quest).completeStep(0).then(() => {
        return hero.interact(quest).completeStep(2).then(() => {
          expect(hero.quests.findQuest(quest).getSteps()[0].isCompleted()).toBe(true)
          expect(hero.quests.findQuest(quest).getSteps()[1].isCompleted()).toBe(false)
          expect(hero.quests.findQuest(quest).getSteps()[2].isCompleted()).toBe(true)
          expect(hero.quests.findQuest(quest).getSteps()[3].isCompleted()).toBe(false)
        })
      })
    })
  })
  test('should be able to show the quest progress', () => {
    quest = hero.quests.getQuests()[1]
    expect(quest.getProgress()).toBe(0.5)
  })
  test('should be able to drop quest', () => {
    quest = hero.quests.getQuests()[0]
    expect(hero.quests.getQuests().length).toBe(2)
    return hero.interact(quest).drop().then(() => {
      expect(hero.quests.getQuests().length).toBe(1)
    })
  })
  test(`shouldn't be able to receive reward if quest isn't complete`, () => {
    quest = hero.quests.getQuests()[0]
    return expect(hero.interact(quest).claimReward()).rejects.toEqual(new Error(`Hero cannot claim quest reward because the quest isn't completed`))
  })
  test('should be able to complete quest', () => {
    quest = hero.quests.getQuests()[0]
    return hero.interact(quest).completeStep(1).then(() => {
      return hero.interact(quest).completeStep(3).then(() => {
        expect(quest.isCompleted()).toBe(true)
      })
    })
  })
  test('should be able to receive reward', () => {
    quest = hero.quests.getQuests()[0]
    return hero.interact(quest).claimReward().then(() => {
      expect(quest.isCompleted()).toBe(true)
      expect(hero.experience.getExperience()).toBe(10)
      expect(hero.bank.get({name: 'gold'}).getValue()).toBe(100)
      expect(hero.inventory.get(0)).toEqual(sword)
    })
  })
  test(`should'n be able to receive reward if already received reward`, () => {
    quest = hero.quests.getQuests()[0]
    return expect(hero.interact(quest).claimReward()).rejects.toEqual(new Error('Quest reward already claimed'))
  })
})
