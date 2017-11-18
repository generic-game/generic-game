import { gg, factory } from '../helpers'

let hero = factory.hero()

describe('creating', () => {
  test('should have a name', () => {
    expect(hero.identity.getName()).toBe('Generic hero')
    expect(hero.identity.getType()).toBe('Hero')
    expect(hero.identity.getFullName()).toBe('Hero: Generic hero')
  })
})

describe('levels', () => {
  test('should gain experience', () => {
    // Hero constructs with 5 experience
    return hero.experience.gain(4).then(({levelUp}) => {
      expect(hero.experience.getExperience()).toBe(9)
      expect(levelUp).toBe(false)
    })
  })
  test('should level up', () => {
    return hero.experience.gain(1).then(({levelUp, levels}) => {
      expect(levelUp).toBe(true)
      expect(levels).toBe(1)
      expect(hero.getLevel()).toBe(1)
    })
  })
})

describe('quests', () => {
  test(`shouldn't allow to add an object not instance of quest`, () => {
    expect(() => {
      hero.quests.addQuest({
        text: 'Quest object, but not an instance'
      })
    }).toThrow(new Error('Adding a quest to character, not a quest instance'))
  })

  test(`shouldn't allow to remove an object not instance of quest`, () => {
    expect(() => {
      hero.quests.removeQuest({
        text: 'Quest object, but not an instance'
      })
    }).toThrow(new Error('Adding a quest to character, not a quest instance'))
  })

  test(`shouldn't allow to remove an quest that hero did'nt joined`, () => {
    expect(() => {
      hero.quests.removeQuest(new gg.class.Quest({
        text: 'Quest instance'
      }))
    }).toThrow(new Error(`Cannot remove a quest that the character didn't join`))
  })
})
