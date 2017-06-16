class Battle {
  constructor ({attackers, defenders}) {
    Object.assign(this, {attackers, defenders})
  }
  conflict (attacker, defender) {
    return new Promise((resolve, reject) => {
      const attackerPerformer = () => {
        attacker.attack(defender).then(enemyIsAlive => {
          if (!attacker.isAlive()) return false
          if (enemyIsAlive) return attackerPerformer()
          return true
        }).catch(() => {
          return false
        })
      }
      const defenderPerformer = () => {
        defender.attack(attacker).then(enemyIsAlive => {
          if (!defender.isAlive()) return false
          if (enemyIsAlive) return defenderPerformer()
          return true
        }).catch(() => {
          return false
        })
      }

      Promise.all([attackerPerformer(), defenderPerformer()]).then(resolve)
    })
  }
}

export default Battle
