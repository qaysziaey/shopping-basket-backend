// Shopping Basket API Endpoints

/**
 * Welcome Screen
 * https://shopping-basket-backend-u4xp.onrender.com
 * status: 200
 * response: {message}
 * example: {message: "Welcome to our Shopping Basket API"}
 * status: 404
 * response: {message}
 */

/**
 * Create new Product
 * https://shopping-basket-backend-u4xp.onrender.com/products/product
 * body: {productName, description, price, availableInStock, thumbnail, size, color, delivery, category, rating, vatText, about}
 * status: 201
 * response: {product}
 */

/**
 * Delete a Product
 * https://shopping-basket-backend-u4xp.onrender.com/products/product/:productId
 * body: {productId}
 * status: 200
 * response: {message}
 * status: 404
 * response: {message}
 */

/**
 * Get all products
 * https://shopping-basket-backend-u4xp.onrender.com/products
 * status: 200
 * response: {product}
 * status: 404
 * response: {message}
 */

/**
 * Get a single Product by id
 * https://shopping-basket-backend-u4xp.onrender.com/products/:productId
 * status: 200
 * response: {product}
 * status: 404
 * response: {message}
 * status: 400
 * response: {message}
 */

/**
 * Get a single Product by name
 * https://shopping-basket-backend-u4xp.onrender.com/products/:productName
 * status: 200
 * response: {product}
 * status: 404
 * response: {message}
 */

/**
 * Create new user
 * https://shopping-basket-backend-u4xp.onrender.com/users/user
 * body: {userName, email, password, profileImg}
 * status: 201
 * response: {user}
 * status: 400
 * response: {message}
 */

/**
 * Get all user
 * https://shopping-basket-backend-u4xp.onrender.com/users
 * status: 200
 * response: {user}
 * status: 404
 * response: {message}
 */

/**
 * Get user By id
 * https://shopping-basket-backend-u4xp.onrender.com/users/:userId
 * status: 200
 * response: {user}
 * status: 404
 * response: {message}
 */

/**
 * Add product to cart
 * https://shopping-basket-backend-u4xp.onrender.com/users/:userId/product/:productId
 * body: {cartItem}
 * status: 200
 * response: {message}
 * status: 404
 * response: {message}
 */
