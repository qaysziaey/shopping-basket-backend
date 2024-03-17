# Shopping Basket API Endpoints

## Welcome Screen:

https://shopping-basket-backend-u4xp.onrender.com

- response: {message}

```json
{ "message": "Welcome to our Shopping Basket API" }
```

---

### Create new Product

#### POST Method

https://shopping-basket-backend-u4xp.onrender.com/products/product

```json
body: {
  productName,
    description,
    price,
    availableInStock,
    thumbnail,
    size,
    color,
    delivery,
    category,
    rating,
    vatText,
    about;
}

response: {
  product;
}
```

---

### Delete a Product

#### DELETE Methode

https://shopping-basket-backend-u4xp.onrender.com/products/product/{productId}

```json
body: {
  productId;
}
response: {
  message;
}
```

---

### Get all products

#### GET Methode

https://shopping-basket-backend-u4xp.onrender.com/products

response: {product}

---

### Get a single Product by id

#### GET Methode

https://shopping-basket-backend-u4xp.onrender.com/products/{productId}

```json
response: {product}
```

---

### Get a single Product by name

#### GET Methode

https://shopping-basket-backend-u4xp.onrender.com/products/{productName}

```json
response: {product}
```

### Create new user

#### POST Method

https://shopping-basket-backend-u4xp.onrender.com/users/user

```json
body: {userName, email, password, profileImg}
```

response: {user}

---

### Get all user

#### GET Methode

https://shopping-basket-backend-u4xp.onrender.com/users

- response: {user}

---

### Get user By id

#### GET Methode

https://shopping-basket-backend-u4xp.onrender.com/users/{userId}

- response: {user}
- status: 404

---

### Add product to cart

#### POST Methode

https://shopping-basket-backend-u4xp.onrender.com/users/{userId}/product/{productId}

```json
body: {cartItem}
```
