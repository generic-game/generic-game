import { gg, factory, error } from '../src/spec/helpers'

let hero = factory.hero()
hero.equipament.addSlot({type: 'handheld'})
hero.equipament.equip(factory.sword())

let villian = factory.villian()

hero.battle.conflict(villian).then(() => {
  console.log('Done')
}).catch(error)

process.on('unhandledException', (err) => console.log(err))
