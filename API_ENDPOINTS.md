# API Endpoints Reference

Base URL: `http://localhost:5000`

## Public Endpoints (No Authentication Required)

### Categories
- **GET** `/api/categories/:mealType`
  - Examples:
    - `http://localhost:5000/api/categories/snacks`
    - `http://localhost:5000/api/categories/tiffins`
    - `http://localhost:5000/api/categories/lunch-dinner`
    - `http://localhost:5000/api/categories/breakfast`

### Dishes
- **GET** `/api/dishes/:mealType`
  - Examples:
    - `http://localhost:5000/api/dishes/snacks`
    - `http://localhost:5000/api/dishes/tiffins`
    - `http://localhost:5000/api/dishes/lunch-dinner`

- **GET** `/api/dishes/:mealType/:categoryId`
  - Examples:
    - `http://localhost:5000/api/dishes/snacks/beverages`
    - `http://localhost:5000/api/dishes/tiffins/south-indian-tiffins`

### Dish Types
- **GET** `/api/dish-types/:categoryId`
  - Example: `http://localhost:5000/api/dish-types/beverages`

### Add-ons
- **GET** `/api/add-ons`
  - Example: `http://localhost:5000/api/add-ons`
  - Returns all available add-ons

### Authentication (Public)
- **POST** `/api/auth/send-otp`
  - Body: `{ "phone": "1234567890" }` (10 digits)

- **POST** `/api/auth/verify-otp`
  - Body: `{ "phone": "1234567890", "otp": "123456", "username": "optional" }`

- **POST** `/api/auth/check-phone`
  - Body: `{ "phone": "1234567890" }`

## Protected Endpoints (Authentication Required)

### Cart
- **GET** `/api/cart` - Get user's cart items
- **POST** `/api/cart` - Add item to cart
  - Body: `{ "dishId": "...", "quantity": 1 }`
- **PUT** `/api/cart/:id` - Update cart item quantity
- **DELETE** `/api/cart/:id` - Remove item from cart

### Addresses
- **POST** `/api/addresses` - Create new address
- (GET endpoint not shown in routes, might be client-side only)

### Orders
- **GET** `/api/orders/:orderId` - Get order details
- **POST** `/api/orders` - Create new order

### Payments
- **POST** `/api/create-payment-intent` - Create Stripe payment intent

### Account
- **DELETE** `/api/account` - Delete user account

## Testing Examples

### Using Browser
Just open these URLs in your browser:
- `http://localhost:5000/api/add-ons`
- `http://localhost:5000/api/categories/snacks`
- `http://localhost:5000/api/dishes/snacks`

### Using PowerShell
```powershell
# Get add-ons
Invoke-RestMethod -Uri "http://localhost:5000/api/add-ons"

# Get categories
Invoke-RestMethod -Uri "http://localhost:5000/api/categories/snacks"

# Get dishes
Invoke-RestMethod -Uri "http://localhost:5000/api/dishes/snacks"
```

### Using curl (if available)
```bash
curl http://localhost:5000/api/add-ons
curl http://localhost:5000/api/categories/snacks
curl http://localhost:5000/api/dishes/snacks
```

### Using JavaScript (in browser console)
```javascript
// Get add-ons
fetch('http://localhost:5000/api/add-ons')
  .then(r => r.json())
  .then(console.log);

// Get categories
fetch('http://localhost:5000/api/categories/snacks')
  .then(r => r.json())
  .then(console.log);

// Get dishes
fetch('http://localhost:5000/api/dishes/snacks')
  .then(r => r.json())
  .then(console.log);
```

## Notes

1. The 401 error on `/api/cart` is **normal** - it means you're not logged in
2. Make sure your database is configured in `.env` for endpoints that query the database
3. Authentication uses session cookies - you'll need to login via `/api/auth/verify-otp` first

