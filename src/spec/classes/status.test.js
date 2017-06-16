import { factory } from '../helpers'

let hero = factory.hero()

describe('status', () => {
  test('should return an object with characteristic name as key', () => {
    let status = hero.status.get()
    expect(Object.keys(status)).toContain('life')
    expect(Object.keys(status)).toContain('defense')
    expect(status.life).toBe(100)
    expect(status.defense).toBe(0)
  })
})
