#### 0.1.4 (2017-09-08)

- `Character` now instanciates `Identity`, `Equipament` and `Bank` using the
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
