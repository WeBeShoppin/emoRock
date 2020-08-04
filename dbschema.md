### USER
  1. first name (req)
  2. last name (req)
  3. email (req)
  4. password (req)
  5. address (not req)
  6. other contact info (phone, not req)
  7. isAdmin?
  8. cart state (array)

### PRODUCT
  1. name
  2. category
  3. color
  4. price

### ORDER
  1. user FK
  2. product FK
  3. order number


### Associations
* USER hasMany ORDER
* ORDER belongTo USER

* ORDER hasMany PRODUCT
* PRODUCT belongsToMany ORDER
