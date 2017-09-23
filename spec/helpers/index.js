import GenericGame from '../../src/index'
import { characteristic } from 'constants'

const gg = new GenericGame()
const factory = {
  experience () {
    return new gg.class.Experience({})
  },
  effect ({characteristic, amount = 1}) {
    return new gg.class.Effect({characteristic, amount})
  },
  health () {
    return new gg.class.Characteristic({
      name: characteristic.LIFE,
      value: 1
    })
  },
  goldCurrency (value = null) {
    let gold = {
      name: 'Gold',
      symbol: 'G'
    }
    if (value != null) gold.value = value
    return new gg.class.Currency(gold)
  },
  shop () {
    return new gg.class.Shop({
      name: 'Generic shop'
    })
  },
  shopItem (item, value = null) {
    let gold = this.goldCurrency(value)
    return new gg.class.ShopItem({
      item,
      price: gold
    })
  },
  hero () {
    return new gg.class.Character({
      identity: {
        name: 'Generic hero',
        type: 'Hero'
      }
    })
  },
  villian () {
    return new gg.class.Character({
      identity: {
        name: 'Generic villain'
      }
    })
  },
  sword () {
    return new gg.class.Weapon({
      name: 'Great sword',
      type: gg.const.item.EQUIPABLE,
      slotType: {name: 'handheld'},
      attacks: [
        new gg.class.Attack({damage: 10, delay: 100})
      ],
      effects: [
        new gg.class.Effect({characteristic: 'defense', amount: -1})
      ]
    })
  },
  dagger () {
    return new gg.class.Weapon({
      name: 'Dagger',
      type: gg.const.item.EQUIPABLE,
      slotType: {name: 'handheld'},
      attacks: [
        new gg.class.Attack({damage: 1, delay: 100})
      ]
    })
  },
  helmet () {
    return new gg.class.Vest({
      name: 'Armet',
      slotType: {name: 'helmet'},
      type: gg.const.item.EQUIPABLE,
      effects: [
        new gg.class.Characteristic({name: gg.const.characteristic.DEFENSE, value: 1})
      ]
    })
  }
}

export {
  gg,
  factory
}
