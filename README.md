# 🌿 EcoFinds - Sustainable Second-Hand Marketplace

EcoFinds is a full-stack MERN (MongoDB, Express, React, Node.js) application that enables users to buy and sell pre-owned goods, promoting sustainability and responsible consumption. This application matches buyers with sellers in a seamless, secure, and user-friendly environment.

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

EcoFinds is a **Sustainable Second-Hand Marketplace**. It provides users with the ability to list items for sale, browse products by category, condition, and price, and securely purchase items using a built-in cart and order system. 

The goal of this project is to reduce waste by encouraging the reuse of goods and to provide a cost-effective shopping alternative. This application is built using **React 19**, **Node.js**, **Express**, and **MongoDB**, ensuring a modern, scalable, and maintainable approach.

## ✨ Features

### User Authentication
- **Secure Registration & Login**: JWT-based authentication with password hashing (bcrypt).
- **Profile Management**: Users can update their personal details and shipping address.

### Product Management
- **Create Listings**: Sellers can upload products with images, description, price, and condition.
- **Search & Filter**: Advanced filtering by category, price range, and condition.
- **Sort**: Sort products by newest, price, or popularity.
- **Product Details**: Comprehensive view with images, seller info, and specifications.

### Shopping Experience
- **Interactive Cart**: Add to cart, update quantities, and remove items.
- **Order System**: Checkout process with order value calculation and status tracking.
- **Wishlist**: Users can engage with products (views/stars).

### Dashboard
- **Seller Dashboard**: Manage your listings and view status.
- **Order History**: Track past purchases and orders.

## 🚀 Installation

Follow these steps to set up EcoFinds locally:

### Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- npm or yarn

### Steps to Install

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Odoo-x-NMIT-Hackathon-2025
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables:**

   **Backend (`backend/.env`):**
   ```env
   MONGO_URI=mongodb://localhost:27017/ecofinds
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   **Frontend (`frontend/.env`):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## Usage

### Running the Project Locally

To run EcoFinds locally, you need to start both the backend and frontend servers.

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5000`.

2. **Start the Frontend Development Server:**
   ```bash
   # Open a new terminal
   cd frontend
   npm run dev
   ```
   Application runs on `http://localhost:5173`.

3. **Access the Application:**
   Open your browser and go to [http://localhost:5173](http://localhost:5173).

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request to the main repository.

For larger changes, please open an issue first to discuss the feature or bug fix.

## 📄 License

This project is part of the **Odoo x NMIT Hackathon 2025**.

## 🙏 Acknowledgments

- **Odoo**: For organizing the hackathon and providing the platform.
- **NMIT**: For hosting the event.
- **Open Source Community**: For the amazing libraries used in this project (React, Mongoose, Axios, etc.).

---

**Happy Coding! 🌿♻️**
