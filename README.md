<img src="https://github.com/filipemeneses/generic-game/blob/master/design/gg-bbg.png?raw=true" width="300"/>

# generic-game

[![Travis branch](https://img.shields.io/travis/filipemeneses/generic-game/master.svg)]()
[![Code Climate](https://img.shields.io/codeclimate/github/filipemeneses/generic-game.svg)]()
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/filipemeneses/generic-game.svg)]()
[![npm](https://img.shields.io/npm/v/generic-game.svg)]()
[![npm](https://img.shields.io/npm/dw/generic-game.svg)]()
[![npm](https://img.shields.io/npm/dm/generic-game.svg)]()
[![npm](https://img.shields.io/npm/dy/generic-game.svg)]()

### Usage

`npm install --save generic-game`

Simple example using ES6:

```
import GenericGame from 'generic-game'
const gg = new GenericGame()

const hero = new gg.class.Character({
  name: 'Generic hero'
})
const mob = new gg.class.Character({
  name: 'Generic mob'
})

hero.equipament.addSlot({type: 'handheld'})
hero.equipament.equip(new gg.class.Weapon({
  name: 'Great sword',
  type: gg.const.item.EQUIPABLE,
  slotType: {name: 'handheld'},
  attacks: [
    new gg.class.Attack({damage: 10, delay: 100})
  ]
}))
mob.equipament.addSlot({type: 'handheld'})
mob.equipament.equip(new gg.class.Weapon({
  name: 'Dagger',
  type: gg.const.item.EQUIPABLE,
  slotType: {name: 'handheld'},
  attacks: [
    new gg.class.Attack({damage: 1, delay: 100})
  ]
}))

hero.events.on('battle:[after]takingDamage', ({ status }) => {
  console.log(`Hero received ${status.damage} damage!`)
})
hero.battle.conflict(mob).then(() => {
  if (hero.battle.isAlive()) console.log('Hero is alive. :)')
  if (!mob.battle.isAlive()) console.log('And mob is dead. :)')
})
```


### Documentation

Documentation is [available here](https://github.com/filipemeneses/generic-game/wiki).
