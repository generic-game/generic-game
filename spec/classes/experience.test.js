import { factory } from '../helpers'

const experience = factory.experience()

describe('experience', () => {
  test('should allow custom leveling algorithm', () => {
    const computeLevel = (experience) => {
      return Math.floor(experience / 100)
    }
    experience.setAlgorithm(computeLevel)
    return experience.gain(100).then(() => {
      expect(experience.computeLevel()).toBe(1)
    })
  })
  test('should lose experience', () => {
    return experience.lose(1000).then(({levelOld, experienceOld, levelChange, experienceChange, levelNew, experienceNew}) => {
      expect(levelOld).toBe(1)
      expect(levelChange).toBe(-1)
      expect(levelNew).toBe(0)
      expect(experienceOld).toBe(100)
      expect(experienceChange).toBe(-100)
      expect(experienceNew).toBe(0)
    })
  })
  test('should return if leveled up and how many levels', () => {
    expect(experience.computeLevel()).toBe(0)
    return experience.gain(200).then(({levelOld, experienceOld, levelChange, experienceChange, levelNew, experienceNew}) => {
      expect(levelOld).toBe(0)
      expect(levelChange).toBe(2)
      expect(levelNew).toBe(2)
      expect(experienceOld).toBe(0)
      expect(experienceChange).toBe(200)
      expect(experienceNew).toBe(200)
    })
  })
})
