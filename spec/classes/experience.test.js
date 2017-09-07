import { factory } from '../helpers'

const experience = factory.experience()

describe('experience', () => {
  test('should allow custom leveling algorithm', () => {
    const computeLevel = (experience) => {
      return Math.floor(experience / 100)
    }
    experience.setAlgorithm(computeLevel)
    return experience.gain(100).then(success => {
      expect(experience.computeLevel()).toBe(1)
    })
  })
  test('should lose experience', () => {
    return experience.lose(1000).then(success => {
      expect(experience.computeLevel()).toBe(0)
    })
  })
})
