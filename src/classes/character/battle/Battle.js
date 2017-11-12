import { characteristic } from '../../../constants'

class Battle {
  constructor ({character}) {
    const constants = {
      events: {
        BATTLE_BEFORE_ATTACK: 'battle:[before]attack',
        BATTLE_AFTER_ATTACK: 'battle:[after]attack',
        BATTLE_BEFORE_DEFEND: 'battle:[before]defend',
        BATTLE_AFTER_DEFEND: 'battle:[after]defend',
        BATTLE_BEFORE_TAKING_DAMAGE: 'battle:[before]takingDamage',
        BATTLE_AFTER_TAKING_DAMAGE: 'battle:[after]takingDamage'
      }
    }
    this._const = constants
    this._character = character
  }
  conflict (character) {
    return new Promise((resolve, reject) => {
      const selfReact = () => {
        return this._character.battle.attack(character).then(enemyIsAlive => {
          return this._react(this._character, enemyIsAlive, selfReact)
        })
      }
      const characterReact = () => {
        return character.battle.attack(this._character).then(enemyIsAlive => {
          return this._react(character, enemyIsAlive, characterReact)
        })
      }

      Promise.all([
        selfReact(),
        characterReact()
      ]).then(resolve)
    })
  }
  isAlive () {
    let life = this._character.characteristics.getValueByName(characteristic.LIFE)
    let damageTaken = this._character.characteristics.getValueByName(characteristic.DAMAGE_TAKEN)
    return (life - damageTaken) > 0
  }
  attack (character) {
    return new Promise((resolve, reject) => {
      let attack = this._character.status.get('attack')
      let weapons = this._character.equipment.getWeapons()
      if (!weapons.length) {
        reject(new Error('Character can\'t attack without a weapon'))
      }
      Promise.all(weapons.map(weapon => {
        return new Promise((resolve, reject) => {
          weapon.setFloorDamage(attack || 0)
          weapon.getAttacks().reduce((iterator, attack) => {
            return iterator.then(() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  let data = { attack }
                  this._character.events.emit(this._const.events.BATTLE_BEFORE_ATTACK, data)
                  character.battle.defend(data.attack).then(() => {
                    this._character.events.emit(this._const.events.BATTLE_AFTER_ATTACK, data)
                    resolve()
                  })
                }, attack.getDelay() || 0)
              })
            })
          }, Promise.resolve([])).then(resolve)
        })
      })).then(() => {
        resolve(character.battle.isAlive())
      })
    })
  }
  defend (attack) {
    return new Promise(resolve => {
      let data = { attack }
      this._character.events.emit(this._const.events.BATTLE_BEFORE_DEFEND, data)
      this._takeDamage(data.attack.getDamage())
      this._character.events.emit(this._const.events.BATTLE_AFTER_DEFEND, data)
      resolve()
    })
  }
  _react (self, enemyIsAlive, payback) {
    if (!self.battle.isAlive()) return false
    if (enemyIsAlive) return payback()
    return true
  }
  _takeDamage (damage) {
    let defense = this._character.characteristics.getValueByName(characteristic.DEFENSE)
    damage = damage - defense < 0 ? 0 : damage - defense
    let data = {status: { damage }}
    this._character.events.emit(this._const.events.BATTLE_BEFORE_TAKING_DAMAGE, data)
    this._character.characteristics.increase(characteristic.DAMAGE_TAKEN, data.status.damage)
    this._character.events.emit(this._const.events.BATTLE_AFTER_TAKING_DAMAGE, data)
  }
}

export default Battle
