import { characteristic } from '../../../constants'

class Battle {
  constructor ({character}) {
    this.const = {
      events: {
        BATTLE_BEFORE_ATTACK: 'battle:[before]attack',
        BATTLE_AFTER_ATTACK: 'battle:[after]attack',
        BATTLE_BEFORE_DEFEND: 'battle:[before]defend',
        BATTLE_AFTER_DEFEND: 'battle:[after]defend',
        BATTLE_BEFORE_TAKING_DAMAGE: 'battle:[before]takingDamage',
        BATTLE_AFTER_TAKING_DAMAGE: 'battle:[after]takingDamage'
      }
    }
    Object.assign(this, {character})
  }
  conflict (character) {
    return new Promise((resolve, reject) => {
      const noWeapons = (result) => {
        if (typeof result === 'boolean') {
          return false
        } else {
          console.error(result)
          return false
        }
      }
      const selfReact = () => {
        return this.character.battle.attack(character).then(enemyIsAlive => {
          return this._react(this.character, enemyIsAlive, selfReact)
        }).catch(noWeapons)
      }
      const characterReact = () => {
        return character.battle.attack(this.character).then(enemyIsAlive => {
          this._react(character, enemyIsAlive, characterReact)
        }).catch(noWeapons)
      }

      Promise.all([selfReact(), characterReact()]).then(resolve)
    })
  }
  _react (self, enemyIsAlive, payback) {
    if (!self.battle.isAlive()) return false
    if (enemyIsAlive) return payback()
    return true
  }
  isAlive () {
    let life = this.character.characteristics.getValueByName(characteristic.LIFE)
    let damageTaken = this.character.characteristics.getValueByName(characteristic.DAMAGE_TAKEN)
    return (life - damageTaken) > 0
  }
  attack (character) {
    return new Promise((resolve, reject) => {
      let attack = this.character.status.get().attack
      let weapons = this.character.equipament.getWeapons()
      if (!weapons.length) {
        reject(new Error('Character can\'t attack without a weapon'))
      }
      Promise.all(weapons.map(weapon => {
        return new Promise((resolve, reject) => {
          weapon.floorDamage += (attack || 0)
          weapon.getAttacks().reduce((iterator, attack) => {
            return iterator.then(() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  let data = { attack }
                  this.character.events.emit(this.const.events.BATTLE_BEFORE_ATTACK, data)
                  character.battle.defend(data.attack).then(resolve)
                  this.character.events.emit(this.const.events.BATTLE_AFTER_ATTACK, data)
                }, attack.delay || 0)
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
      this.character.events.emit(this.const.events.BATTLE_BEFORE_DEFEND, data)
      this._takeDamage(data.attack.damage)
      this.character.events.emit(this.const.events.BATTLE_AFTER_DEFEND, data)
      resolve()
    })
  }
  _takeDamage (damage) {
    let defense = this.character.characteristics.getValueByName(characteristic.DEFENSE)
    damage = damage - defense < 0 ? 0 : damage - defense
    let data = {status: { damage }}
    this.character.events.emit(this.const.events.BATTLE_BEFORE_TAKING_DAMAGE, data)
    this.character.characteristics.increase(characteristic.DAMAGE_TAKEN, data.status.damage)
    this.character.events.emit(this.const.events.BATTLE_AFTER_TAKING_DAMAGE, data)
  }
}

export default Battle
