#### 0.2.5 (2017-11-18)

- `Character.Experience` returns values if the character leveled up and how many levels: `hero.experience.gain(10).then({levelUp, levels})`
- `Character.Identity` added getters/setters and gender attribute

#### 0.2.4 (2017-11-17)

- `Character.Bank` constructor now accepts a object of currencies as `currencies` argument
- `Character` fix experience constructor

#### 0.2.3 (2017-11-12)

- [Issue #3](https://github.com/generic-game/generic-game/issues/2): Equipment typo. Changed `Equipament` to `Equipment`.

#### 0.2.2 (2017-10-29)

- [Issue #2](https://github.com/generic-game/generic-game/issues/2): [Battle] Improvement: Update quest if requirements match @theTechie. `QuestStep` now have an `action` method, if the method return `true`, the quest step is done.

#### 0.2.1 (2017-09-30)

- `Weapon` now allows `attacks` argument to be an array of objects instead an array `Attack` instances
- `Character` now allows `characteristics` argument to be an array of objects instead an array `Characteristic` instances
- `Equipment` now allows `slots` argument to be an array of objects instead an array `Slot` instances
- `Vest` now allows `effects` argument to be an array of objects instead an array `Characteristic` instances
- `Bank` now allows `currencies` argument to be an array of objects instead an array `Currency` instances
- `Bank` now allows to use object for `currency` in `earn` and `lose` methods

### 0.2.0 (2017-09-23)

- All classes only have private variables. Must use getters and setters.

#### 0.1.4 (2017-09-08)

- `Character` now instanciates `Identity`, `Equipment` and `Bank` using the
parametters with names accordingly it's names istead several parametters for
each class. Ex.: before was `new gg.class.Character({name, type})`, now is
`new gg.class.Character({identity})`.

#### 0.1.3 (2017-09-07)

- Updating NPM package

#### 0.1.2 (2017-09-07)

- Removing depreciated diagram and updating main script

#### 0.1.1 (2017-09-02)

- `ShopItem` now accepts `Currency` as price
- `Currency` has a `setValue` and only accepts number type

### 0.1.0 (2017-09-02)

- Adding quest feature

#### 0.0.12 (2017-08-25)

- Removing diagrams and unnecessary example
- Improved earning tests
- Changed `Wallet` to `Bank`
- `Bank` now allows to lose empty currency, causing to set the value as negative
