import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Cart from "./models/Cart.js";
import Order from "./models/Order.js";

dotenv.config();

const seedData = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});
    console.log("🧹 Cleared existing data");

    // Create sample users
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.insertMany([
      {
        username: "john_doe",
        email: "john@example.com",
        password: hashedPassword,
        phone: "+1234567890",
        address: "123 Main St, New York, NY 10001",
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: hashedPassword,
        phone: "+1234567891",
        address: "456 Oak Ave, Los Angeles, CA 90001",
      },
      {
        username: "mike_wilson",
        email: "mike@example.com",
        password: hashedPassword,
        phone: "+1234567892",
        address: "789 Pine Rd, Chicago, IL 60601",
      },
      {
        username: "sarah_johnson",
        email: "sarah@example.com",
        password: hashedPassword,
        phone: "+1234567893",
        address: "321 Elm St, Houston, TX 77001",
      },
      {
        username: "demo_user",
        email: "demo@example.com",
        password: hashedPassword,
        phone: "+1234567894",
        address: "555 Demo St, San Francisco, CA 94102",
      },
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Sample product data
    const productsData = [
      // Electronics
      {
        title: "iPhone 12 Pro - Like New",
        description: "Barely used iPhone 12 Pro with 256GB storage. Comes with original box and accessories. No scratches, excellent condition.",
        price: 699,
        category: "Electronics",
        condition: "Like New",
        images: ["https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?w=400"],
        seller: users[0]._id,
        status: "available",
        views: 145,
        brand: "Apple",
        avgRating: 4.8,
        numReviews: 24,
      },
      {
        title: "MacBook Air M1 2020",
        description: "8GB RAM, 256GB SSD. Perfect working condition. Includes charger and case.",
        price: 850,
        category: "Electronics",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"],
        seller: users[1]._id,
        status: "available",
        views: 203,
        brand: "Apple",
        avgRating: 4.9,
        numReviews: 15,
      },
      {
        title: "Sony WH-1000XM4 Headphones",
        description: "Premium noise-cancelling headphones. Works perfectly, minor wear on ear pads.",
        price: 180,
        category: "Electronics",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400"],
        seller: users[2]._id,
        status: "available",
        views: 89,
        brand: "Sony",
        avgRating: 4.7,
        numReviews: 320,
      },
      {
        title: "iPad Pro 11-inch 2021",
        description: "128GB WiFi model with Apple Pencil 2nd gen. Excellent condition with screen protector.",
        price: 650,
        category: "Electronics",
        condition: "Like New",
        images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"],
        seller: users[3]._id,
        status: "available",
        views: 167,
      },

      // Furniture
      {
        title: "Solid Wood Dining Table",
        description: "Beautiful oak dining table seats 6 people. Well maintained, just moving to smaller place.",
        price: 250,
        category: "Furniture",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=400"],
        seller: users[0]._id,
        status: "available",
        views: 76,
        brand: "Generic",
        avgRating: 4.2,
        numReviews: 8,
      },
      {
        title: "IKEA Leather Sofa",
        description: "3-seater brown leather sofa. Comfortable and stylish. Non-smoking home.",
        price: 320,
        category: "Furniture",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
        seller: users[1]._id,
        status: "available",
        views: 112,
      },
      {
        title: "Modern Office Desk",
        description: "Spacious white desk with cable management. Perfect for home office setup.",
        price: 120,
        category: "Furniture",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400"],
        seller: users[2]._id,
        status: "available",
        views: 94,
      },

      // Clothing
      {
        title: "Nike Air Jordan 1 Retro",
        description: "Size 10 US. Gently worn, authentic sneakers. Cleaned and ready to wear.",
        price: 160,
        category: "Clothing",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
        seller: users[3]._id,
        status: "available",
        views: 201,
        brand: "Nike",
        avgRating: 4.6,
        numReviews: 54,
      },
      {
        title: "Winter Coat - North Face",
        description: "Men's large, black winter jacket. Warm and waterproof, barely used.",
        price: 90,
        category: "Clothing",
        condition: "Like New",
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"],
        seller: users[0]._id,
        status: "available",
        views: 67,
      },
      {
        title: "Designer Handbag - Michael Kors",
        description: "Authentic leather handbag in excellent condition. Comes with dust bag.",
        price: 180,
        category: "Clothing",
        condition: "Like New",
        images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"],
        seller: users[1]._id,
        status: "available",
        views: 143,
      },

      // Books
      {
        title: "Programming Book Collection",
        description: "Set of 5 programming books including JavaScript, Python, and React. All in great condition.",
        price: 45,
        category: "Books",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400"],
        seller: users[2]._id,
        status: "available",
        views: 55,
      },
      {
        title: "Harry Potter Complete Series",
        description: "All 7 books in hardcover. Well maintained, great for collectors.",
        price: 85,
        category: "Books",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"],
        seller: users[3]._id,
        status: "available",
        views: 98,
      },

      // Sports
      {
        title: "Mountain Bike - Trek",
        description: "26-inch wheels, 21-speed. Perfect for trails. Recently serviced.",
        price: 280,
        category: "Sports",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400"],
        seller: users[0]._id,
        status: "available",
        views: 134,
      },
      {
        title: "Yoga Mat Set with Blocks",
        description: "High-quality yoga mat with two blocks and carrying strap. Barely used.",
        price: 35,
        category: "Sports",
        condition: "Like New",
        images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400"],
        seller: users[1]._id,
        status: "available",
        views: 42,
      },
      {
        title: "Dumbbell Set 5-50 lbs",
        description: "Complete adjustable dumbbell set. Perfect for home gym.",
        price: 220,
        category: "Sports",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400"],
        seller: users[2]._id,
        status: "available",
        views: 78,
      },

      // Home & Garden
      {
        title: "Coffee Maker - Nespresso",
        description: "Vertuo model with milk frother. Works perfectly, includes cleaning kit.",
        price: 95,
        category: "Home & Garden",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400"],
        seller: users[3]._id,
        status: "available",
        views: 89,
      },
      {
        title: "Garden Tool Set",
        description: "Complete set of gardening tools including spade, rake, and pruners.",
        price: 40,
        category: "Home & Garden",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"],
        seller: users[0]._id,
        status: "available",
        views: 34,
      },
      {
        title: "Instant Pot 6 Quart",
        description: "Multi-functional pressure cooker. Barely used, includes recipe book.",
        price: 65,
        category: "Home & Garden",
        condition: "Like New",
        images: ["https://images.unsplash.com/photo-1585515320310-259814833e62?w=400"],
        seller: users[1]._id,
        status: "available",
        views: 71,
      },

      // Toys
      {
        title: "PlayStation 5 Console",
        description: "Disc version with two controllers. Perfect condition, includes box.",
        price: 450,
        category: "Toys",
        condition: "Like New",
        images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400"],
        seller: users[2]._id,
        status: "available",
        views: 289,
      },
      {
        title: "LEGO Star Wars Millennium Falcon",
        description: "Complete set with all pieces and manual. Already assembled, can disassemble if needed.",
        price: 120,
        category: "Toys",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400"],
        seller: users[3]._id,
        status: "available",
        views: 156,
      },
      {
        title: "Board Game Collection",
        description: "5 popular board games: Catan, Ticket to Ride, Pandemic, Carcassonne, and Codenames.",
        price: 75,
        category: "Toys",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400"],
        seller: users[0]._id,
        status: "available",
        views: 63,
      },

      // Other
      {
        title: "Canon EOS Rebel T7 Camera",
        description: "DSLR camera with 18-55mm lens. Includes bag, memory card, and extra battery.",
        price: 380,
        category: "Other",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400"],
        seller: users[1]._id,
        status: "available",
        views: 178,
      },
      {
        title: "Electric Guitar - Fender Stratocaster",
        description: "Mexican-made Strat with amp and accessories. Great for beginners.",
        price: 420,
        category: "Other",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400"],
        seller: users[2]._id,
        status: "available",
        views: 145,
      },
      {
        title: "Pet Carrier for Small Dogs/Cats",
        description: "Airline-approved carrier. Clean and in excellent condition.",
        price: 30,
        category: "Other",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400"],
        seller: users[3]._id,
        status: "available",
        views: 41,
      },
    ];

    const products = await Product.insertMany(productsData);
    console.log(`✅ Created ${products.length} products`);

    // Create some sample carts (some users have items in cart)
    const carts = await Cart.insertMany([
      {
        user: users[0]._id,
        items: [
          {
            product: products[1]._id, // MacBook
            quantity: 1,
          },
          {
            product: products[7]._id, // Nike shoes
            quantity: 1,
          },
        ],
      },
      {
        user: users[1]._id,
        items: [
          {
            product: products[3]._id, // iPad Pro
            quantity: 1,
          },
        ],
      },
    ]);

    console.log(`✅ Created ${carts.length} sample carts`);

    // Create some sample orders
    const orders = await Order.insertMany([
      {
        user: users[2]._id,
        items: [
          {
            product: products[2]._id, // Sony Headphones
            quantity: 1,
            price: products[2].price,
            title: products[2].title,
            image: products[2].images[0],
          },
        ],
        totalAmount: products[2].price,
        shippingAddress: {
          street: "789 Pine Rd",
          city: "Chicago",
          state: "IL",
          zipCode: "60601",
          country: "USA",
        },
        status: "completed",
      },
      {
        user: users[3]._id,
        items: [
          {
            product: products[10]._id, // Harry Potter books
            quantity: 1,
            price: products[10].price,
            title: products[10].title,
            image: products[10].images[0],
          },
          {
            product: products[13]._id, // Yoga Mat
            quantity: 1,
            price: products[13].price,
            title: products[13].title,
            image: products[13].images[0],
          },
        ],
        totalAmount: products[10].price + products[13].price,
        shippingAddress: {
          street: "321 Elm St",
          city: "Houston",
          state: "TX",
          zipCode: "77001",
          country: "USA",
        },
        status: "completed",
      },
      {
        user: users[0]._id,
        items: [
          {
            product: products[15]._id, // Coffee Maker
            quantity: 1,
            price: products[15].price,
            title: products[15].title,
            image: products[15].images[0],
          },
        ],
        totalAmount: products[15].price,
        shippingAddress: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        status: "pending",
      },
    ]);

    console.log(`✅ Created ${orders.length} sample orders`);

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Carts: ${carts.length}`);
    console.log(`   - Orders: ${orders.length}`);
    console.log("\n🔑 Login credentials for all users:");
    console.log("   - Email: john@example.com (or any other user email)");
    console.log("   - Password: password123");
    console.log("\n   - Demo User:");
    console.log("     Email: demo@example.com");
    console.log("     Password: password123\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedData();
