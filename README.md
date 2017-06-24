<img src="https://github.com/filipemeneses/generic-game/blob/master/design/gg-bbg.png?raw=true" width="300"/>

# generic-game

A generic game composed of usual RPG game components.

### Usage

`npm install --save generic-game`

Simple example using ES6:

```
import gg from 'generic-game'

// Relevant classes are available for manipulation
const hero = new gg.class.Character({
  name: 'Generic hero'
})
const mob = new gg.class.Character({
  name: 'Generic mob'
})

hero.events.on('battle:[after]takingDamage', ({ status }) => {
  console.log(`Hero received ${status.damage} damage!`)
})

hero.battle.conflict(mob).then(() => {
  if (hero.battle.isAlive()) console.log('Hero is alive. :)')
})
```


### Documentation

Documentation is [available here](https://github.com/filipemeneses/generic-game/wiki).
