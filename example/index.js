import GenericGame from '../src'

const gg = new GenericGame()

let hero = new gg.class.Character({
  name: 'Generic hero',
  statuses: [
    new gg.class.Characteristic({name: gg.const.characteristic.LIFE, value: 100})
  ]
})
let sword = new gg.class.Weapon({
  name: 'Greatsword',
  type: gg.const.item.EQUIPABLE,
  attacks: [
    new gg.class.Characteristic({name: gg.const.characteristic.ATTACK, value: 10})
  ]
})

console.log(sword)
