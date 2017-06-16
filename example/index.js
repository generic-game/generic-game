import { gg, factory, error } from '../src/spec/helpers'

let hero = factory.hero()
hero.equipament.addSlot({type: 'handheld'})
hero.equipament.equip(factory.sword())

let villian = factory.villian()
villian.equipament.addSlot({type: 'handheld'})
villian.equipament.equip(factory.dagger())

hero.battle.attack(villian).then(() => {
  return villian.battle.attack(hero).then(() => {
    console.log('Done')
  })
}).catch(error)

process.on('unhandledException', (err) => console.log(err))
