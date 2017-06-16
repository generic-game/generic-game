import { gg, factory, error } from '../src/spec/helpers'

let hero = factory.hero()
hero.equipament.addSlot({type: 'handheld'})
hero.equipament.equip(factory.sword())

let villian = factory.villian()
let battle = new gg.class.Battle({
  attackers: [hero],
  defenders: [villian]
})

battle.conflict(hero, villian).then(() => {
  console.log('Done')
}).catch(error)
