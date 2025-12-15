import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Electronics",
        "Clothing",
        "Furniture",
        "Books",
        "Sports",
        "Toys",
        "Home & Garden",
        "Automotive",
        "Other",
      ],
    },
    images: [
      {
        type: String,
        default: "https://via.placeholder.com/400x300?text=Product+Image",
      },
    ],
    condition: {
      type: String,
      enum: ["New", "Like New", "Good", "Fair", "Poor"],
      default: "Good",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "reserved"],
      default: "available",
    },
    views: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      default: "Generic",
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Index for search functionality
productSchema.index({ title: "text", description: "text" });

export default mongoose.model("Product", productSchema);
