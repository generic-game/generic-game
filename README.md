<img src="https://github.com/filipemeneses/generic-game/blob/master/design/gg-bbg.png?raw=true" width="300"/>

# generic-game

[![Travis branch](https://img.shields.io/travis/generic-game/generic-game/master.svg)]()
[![Code Climate](https://img.shields.io/codeclimate/github/generic-game/generic-game.svg)]()
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/generic-game/generic-game.svg)]()
[![npm](https://img.shields.io/npm/v/generic-game.svg)]()
[![npm](https://img.shields.io/npm/dw/generic-game.svg)]()
[![npm](https://img.shields.io/npm/dm/generic-game.svg)]()
[![npm](https://img.shields.io/npm/dy/generic-game.svg)]()

### Introduction

Generic Game is a fully covered object oriented ES6 Javascript library for creating
RPG games. This set of tools will be the start point to any RPG game Javascript based.

### What is it for?

Considering most games usually follows the same structure, character creation,
leveling, items, skills. This would be a fully tested implementation of those
features. It is useful for creating a controlled enviroment for RPG based
systems. Here's some tips: _board/card games_; _chatbot games_; _MUD games_.

### Features

Check out this [mindmap with the features](https://mm.tt/980332006?t=50iwwoQgIE).

### Usage

After installing Generic Game in your project by using:

`npm install --save generic-game`

you can take advantage of it's prebuilt classes. Let's say you need to make a
game where a hero can be equiped with a sword to kill things (like every RPG game).

So you use GenericGame:

```
import GenericGame from 'generic-game'
const gg = new GenericGame()
```

then create the hero scope:

```
const hero = new gg.class.Character({
  name: 'Generic hero'
})
hero.equipment.addSlot({type: 'handheld'})
```

and the hero's enemy:

```
const mob = new gg.class.Character({
  name: 'Generic mob'
})
mob.equipment.addSlot({type: 'handheld'})
```

equip them:

```
hero.equipment.equip(new gg.class.Weapon({
  name: 'Great sword',
  type: gg.const.item.EQUIPABLE,
  slotType: {name: 'handheld'},
  attacks: [
    {damage: 10, delay: 100}
  ]
}))
mob.equipment.equip(new gg.class.Weapon({
  name: 'Dagger',
  type: gg.const.item.EQUIPABLE,
  slotType: {name: 'handheld'},
  attacks: [
    {damage: 1, delay: 100}
  ]
}))
```

to finally battle:

```
hero.events.on('battle:[after]takingDamage', ({ status }) => {
  console.log(`Hero received ${status.damage} damage!`)
})
hero.battle.conflict(mob).then(() => {
  if (hero.battle.isAlive()) console.log('Hero is alive. :)')
  if (!mob.battle.isAlive()) console.log('And mob is dead. :)')
})
```

### Examples

I'll disapoint you for a moment here, I'm currently building something with it. If you want to contribute, let me know to add here.

### Documentation

Documentation is [available here](https://generic-game.github.io/docs).


### In case any bug

Feel free to add issues in the [repository project](https://github.com/generic-game/generic-game/issues)


### Contributing

```sh
git clone https://github.com/generic-game/generic-game.git
cd generic-game
npm i
```

Read the [CONTRIBUTING.md](https://github.com/generic-game/generic-game/blob/master/README.md) for more information.
