import { characteristic } from '../constants'

class Battle {
  constructor ({character}) {
    Object.assign(this, {character})
  }
  conflict (character) {
    return new Promise((resolve, reject) => {
      console.log('Starting conflict')
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
        return new Promise(resolve => {
          setTimeout(() => {
            weapon.floorDamage += (attack || 0)
            console.log(`${this.character.name} attacked ${character.name}`)
            character.battle.defend(weapon).then(resolve)
          }, weapon.delay || 0)
        })
      })).then(() => {
        resolve(character.battle.isAlive())
      })
    })
  }
  defend (weapon) {
    return new Promise(resolve => {
      weapon.getAttacks().forEach(attack => {
        console.log(`${this.character.name} deffended ${attack.damage} attack`)
        this._takeDamage(attack.damage)
      })
      resolve()
    })
  }
  _takeDamage (damage) {
    let defense = this.character.characteristics.getValueByName(characteristic.DEFENSE)
    this.character.characteristics.increase(characteristic.DAMAGE_TAKEN, damage - defense < 0 ? 0 : damage - defense)
  }
}

export default Battle
