import Inventory from './Inventory'
import Equipament from './Equipament'
import Characteristic from './Characteristic'
import { characteristic, character } from '../constants'

class Character {
  constructor ({name, experience = 0, items = [], equipaments = [], currencies = [], statuses = []}) {
    this.inventory = new Inventory(items)
    this.equipament = new Equipament({items: equipaments})
    Object.assign(this, {name, experience, items, currencies, statuses})
    if (!this._getLife().length) {
      this.statuses.push(new Characteristic({
        name: characteristic.LIFE,
        value: character.LIFE
      }))
    }
  }
  isAlive () {
    return this._getLife().reduce((total, status) => {
      total += status.value
      return total
    }, 0) - this._getDamageTaken().reduce((total, status) => {
      total += status.value
      return total
    }, 0) > 0
  }
  getLife () {
    return this._getLife()
  }
  _getLife () {
    return this.statuses.filter(status => status.name === characteristic.LIFE)
  }
  _getLifeIndex () {
    let filledLife = this.statuses.filter(status => status.name === characteristic.LIFE && status.value > 0)
    if (filledLife.length) {
      return this.statuses.indexOf(filledLife[0])
    }
    return -1
  }
  attack (character) {
    return new Promise((resolve, reject) => {
      let attack = this.status().attack
      let weapons = this.equipament.getWeapons()
      if (!weapons.length) {
        reject(new Error('Character can\'t attack without a weapon'))
      }
      Promise.all(weapons.map(weapon => {
        return new Promise(resolve => {
          console.log('weapon.delay', weapon.delay)
          setTimeout(() => {
            weapon.floorDamage += (attack || 0)
            console.log(`${this.name} attacked ${character.name} dealing ${weapon.floorDamage}`)
            character.defend(weapon).then(resolve)
          }, weapon.delay || 0)
        })
      })).then(() => {
        resolve(character.isAlive())
      })
    })
  }
  defend (weapon) {
    return new Promise(resolve => {
      weapon.getAttacks().forEach(attack => {
        console.log(`${this.name} deffended ${character.name} ${attack.damage} attack`, attack)
        this._takeDamage(attack.damage)
      })
      resolve()
    })
  }
  _takeDamage (damage) {
    let damageTaken = this._getDamageTakenIndex()
    if (damageTaken > -1) {
      this.statuses[damageTaken].value += damage
    } else {
      this.statuses.push(new Characteristic({
        name: characteristic.DAMAGE_TAKEN,
        value: damage
      }))
    }
  }
  _getDamageTaken () {
    return this.statuses.filter(status => status.name === characteristic.DAMAGE_TAKEN)
  }
  _getDamageTakenIndex () {
    let damageTaken = this._getDamageTaken()
    if (damageTaken.length) {
      return this.statuses.indexOf(damageTaken[0])
    }
    return -1
  }
  status () {
    let statuses = {}
    this._addToStatus(statuses, this.equipament.getModifiers())
    this._addToStatus(statuses, this.statuses)
    return statuses
  }
  _addToStatus (statuses, characteristics) {
    characteristics.forEach(characteristic => {
      if (!characteristic || !characteristic.name) return
      if (statuses[characteristic.name]) {
        statuses[characteristic.name].value += (characteristic.value)
      } else {
        statuses[characteristic.name] = (characteristic.value)
      }
    })
    return statuses
  }
  earnCurrency (currency) {
    return new Promise((resolve, reject) => {
      if (this.currencies[currency.name]) {
        this.currencies[currency.name] += currency.value
      } else {
        this.currencies[currency.name] = currency.value
      }
      resolve(this.currencies[currency.name])
    })
  }
}

export default Character
