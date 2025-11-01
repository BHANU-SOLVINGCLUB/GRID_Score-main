# Backend API Test URLs

Base URL: `http://localhost:5000`

## ✅ Simple GET Endpoints (No Authentication Required)

### 1. Get All Add-ons
```
http://localhost:5000/api/add-ons
```
**Method:** GET  
**Description:** Returns all available add-ons  
**Expected Response:** Array of add-on objects

---

### 2. Get Categories by Meal Type

#### Snacks Categories
```
http://localhost:5000/api/categories/snacks
```

#### Tiffins Categories  
```
http://localhost:5000/api/categories/tiffins
```

#### Lunch-Dinner Categories
```
http://localhost:5000/api/categories/lunch-dinner
```

#### Breakfast Categories
```
http://localhost:5000/api/categories/breakfast
```

**Method:** GET  
**Description:** Returns categories for a specific meal type  
**Expected Response:** Array of category objects

---

### 3. Get Dishes by Meal Type

#### All Snacks
```
http://localhost:5000/api/dishes/snacks
```

#### All Tiffins
```
http://localhost:5000/api/dishes/tiffins
```

#### All Lunch-Dinner Dishes
```
http://localhost:5000/api/dishes/lunch-dinner
```

**Method:** GET  
**Description:** Returns all dishes for a meal type  
**Expected Response:** Array of dish objects

---

### 4. Get Dishes by Category

#### Snacks → Beverages
```
http://localhost:5000/api/dishes/snacks/beverages
```

#### Snacks → All Categories
```
http://localhost:5000/api/dishes/snacks/all
```

#### Tiffins → South Indian Tiffins
```
http://localhost:5000/api/dishes/tiffins/south-indian-tiffins
```

**Method:** GET  
**Description:** Returns dishes filtered by meal type and category  
**Expected Response:** Array of dish objects

---

### 5. Get Dish Types for a Category
```
http://localhost:5000/api/dish-types/beverages
```

**Method:** GET  
**Description:** Returns distinct dish types for a category  
**Expected Response:** Array of dish type objects

---

## 🔐 Authentication Endpoints (POST - Use Postman)

### 6. Send OTP
```
POST http://localhost:5000/api/auth/send-otp
Content-Type: application/json

{
  "phone": "1234567890"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "123456"  // Only in development mode
}
```

---

### 7. Verify OTP
```
POST http://localhost:5000/api/auth/verify-otp
Content-Type: application/json

{
  "phone": "1234567890",
  "otp": "123456",
  "username": "testuser"  // Optional, for signup
}
```

**Expected Response:**
```json
{
  "user": {
    "id": "...",
    "phone": "1234567890",
    "username": "testuser"
  }
}
```

---

### 8. Check Phone Number
```
POST http://localhost:5000/api/auth/check-phone
Content-Type: application/json

{
  "phone": "1234567890"
}
```

**Expected Response:**
```json
{
  "exists": true,
  "isVerified": true
}
```

---

## 📦 Protected Endpoints (Require Authentication - Cookie Session)

### 9. Get Cart Items
```
GET http://localhost:5000/api/cart
```
**Note:** Returns 401 if not logged in (this is expected)

---

### 10. Get Order Details
```
GET http://localhost:5000/api/orders/ORDER_ID_HERE
```
**Note:** Replace `ORDER_ID_HERE` with actual order ID

---

## 🧪 Quick Test in Browser

**Copy and paste these directly into your browser address bar:**

1. **Test Add-ons:**
   ```
   http://localhost:5000/api/add-ons
   ```

2. **Test Categories (Snacks):**
   ```
   http://localhost:5000/api/categories/snacks
   ```

3. **Test Dishes (Snacks):**
   ```
   http://localhost:5000/api/dishes/snacks
   ```

---

## 📮 Postman Collection Setup

### Headers for POST Requests:
```
Content-Type: application/json
```

### Headers for Authenticated Requests:
```
Content-Type: application/json
Cookie: connect.sid=YOUR_SESSION_ID
```
*(Get cookie after logging in via /api/auth/verify-otp)*

---

## 🎯 Recommended Test Order

1. **Start with:** `http://localhost:5000/api/add-ons` (simplest endpoint)
2. **Then try:** `http://localhost:5000/api/categories/snacks`
3. **Then try:** `http://localhost:5000/api/dishes/snacks`

If these work, your backend is properly connected! ✅

---

## ⚠️ Troubleshooting

**If you get errors:**
- Make sure server is running: `npm run dev`
- Check `.env` file has database credentials
- For REST API: Set `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Check browser console for CORS errors

**Common Issues:**
- `401 Unauthorized` on `/api/cart` = Normal (you're not logged in)
- `500 Error` = Database connection issue
- `404 Not Found` = Check server is running on port 5000

