class Map {
  constructor ({width, height}) {
    this._grid = Array.prototype.concat.apply([], Array(height)).map(() => {
      return new Int16Array(width)
    })
  }
  generateFromSeed (seed) {

  }
  generate () {

  }
}

export default Map
