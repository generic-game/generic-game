import GenericGame from '../src'

const gg = new GenericGame()

let hero = new gg.class.Character({
  name: 'Generic hero',
  statuses: [
    new gg.class.Characteristic({name: gg.const.LIFE, value: 100})
  ]
})

console.log(hero)
