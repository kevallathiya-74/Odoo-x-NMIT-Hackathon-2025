# 🌿 EcoFinds - Sustainable Second-Hand Marketplace

EcoFinds is a full-stack MERN (MongoDB, Express, React, Node.js) application that enables users to buy and sell pre-owned goods, promoting sustainability and responsible consumption.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)

## ✨ Features

### User Authentication
- ✅ User registration with secure password hashing
- ✅ Login with JWT token authentication
- ✅ Protected routes for authenticated users
- ✅ User profile management

### Product Management
- ✅ Create product listings with details (title, description, price, category, condition)
- ✅ View all available products
- ✅ Filter products by category
- ✅ Search products by keywords
- ✅ Sort products (newest, price, popularity)
- ✅ View detailed product information
- ✅ Edit and delete own listings
- ✅ Track product views

### Shopping Cart
- ✅ Add products to cart
- ✅ Update item quantities
- ✅ Remove items from cart
- ✅ Cart persistence for logged-in users
- ✅ Visual cart count indicator

### Order Management
- ✅ Checkout and place orders
- ✅ View order history
- ✅ Order details with items purchased
- ✅ Order status tracking

### User Dashboard
- ✅ View and edit profile information
- ✅ Update personal details
- ✅ Manage shipping address
- ✅ View purchase history

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Odoo-x-NMIT-Hackathon-2025/
├── backend/
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   └── upload.js        # File upload middleware
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── Product.js       # Product schema
│   │   ├── Cart.js          # Cart schema
│   │   └── Order.js         # Order schema
│   ├── routes/
│   │   ├── authRoutes.js    # Authentication endpoints
│   │   ├── productRoutes.js # Product CRUD endpoints
│   │   ├── cartRoutes.js    # Cart management endpoints
│   │   └── orderRoutes.js   # Order management endpoints
│   ├── uploads/             # Image uploads directory
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Express server setup
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── CategoryFilter.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── Loader.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Home.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── AddProduct.jsx
    │   │   ├── EditProduct.jsx
    │   │   ├── MyListings.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Orders.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   └── index.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── .env
    ├── package.json
    └── vite.config.js
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Clone the Repository
```bash
git clone <repository-url>
cd Odoo-x-NMIT-Hackathon-2025
```

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/ecofinds
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
NODE_ENV=development
```

**Important:** 
- Replace `MONGO_URI` with your MongoDB connection string
- Use a strong, random `JWT_SECRET` in production

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Running the Application

### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
mongod

# Linux/Mac
sudo service mongod start
```

### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?category=Electronics&search=laptop&sort=price-asc
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Vintage Camera",
  "description": "Classic film camera in excellent condition",
  "price": 150,
  "category": "Electronics",
  "condition": "Good",
  "images": ["https://example.com/image.jpg"]
}
```

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 120
}
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

#### Get My Listings
```http
GET /api/products/user/mylistings
Authorization: Bearer <token>
```

### Cart Endpoints

#### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 1
}
```

#### Update Cart Item
```http
PUT /api/cart/update/:productId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 2
}
```

#### Remove from Cart
```http
DELETE /api/cart/remove/:productId
Authorization: Bearer <token>
```

#### Clear Cart
```http
DELETE /api/cart/clear
Authorization: Bearer <token>
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "Cash on Delivery"
}
```

#### Get My Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

#### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

#### Cancel Order
```http
PUT /api/orders/:id/cancel
Authorization: Bearer <token>
```

## 📝 Product Categories

- Electronics
- Clothing
- Furniture
- Books
- Sports
- Toys
- Home & Garden
- Automotive
- Other

## 🎨 Product Conditions

- New
- Like New
- Good
- Fair
- Poor

## 🔒 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token authentication
- Protected routes
- Input validation
- CORS configuration
- Secure HTTP headers

## 🌟 Key Features Implementation

### User Authentication Flow
1. User registers with username, email, and password
2. Password is hashed before storing in database
3. On login, JWT token is generated and sent to client
4. Token is stored in localStorage
5. Token is included in Authorization header for protected requests
6. Token is verified on backend for each protected route

### Product Listing Flow
1. User creates a product listing with details
2. Product is associated with the seller (logged-in user)
3. Product appears in the marketplace feed
4. Users can search, filter, and sort products
5. Product owner can edit or delete their listings

### Shopping Cart Flow
1. User adds products to cart
2. Cart is stored in database, linked to user
3. User can modify quantities or remove items
4. Cart persists across sessions
5. On checkout, order is created and cart is cleared

### Order Management Flow
1. User proceeds to checkout from cart
2. Order is created with all cart items
3. Products are marked as "sold"
4. Cart is cleared after successful order
5. Order appears in user's purchase history

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the `MONGO_URI` in `.env`
- Verify network connectivity

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### CORS Errors
- Ensure backend CORS is configured correctly
- Check that `VITE_API_URL` matches backend URL

## 📄 License

This project is part of the Odoo x NMIT Hackathon 2025.

## 👥 Contributors

- Your Team Name

## 🙏 Acknowledgments

- Odoo for organizing the hackathon
- NMIT for hosting the event
- All open-source libraries used in this project

---

**Happy Coding! 🌿♻️**
