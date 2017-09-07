import { gg, factory } from '../helpers'

let hero = factory.hero()

describe('creating', () => {
  test('should have a name', () => {
    expect(hero.identity.getName()).toBe('Hero: Generic hero')
  })
})

describe('levels', () => {
  test('should gain experience', () => {
    return hero.experience.gain(9).then(success => {
      expect(success).toBe(true)
    })
  })
  test('should level up', () => {
    return hero.experience.gain(1).then(success => {
      expect(success).toBe(true)
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
