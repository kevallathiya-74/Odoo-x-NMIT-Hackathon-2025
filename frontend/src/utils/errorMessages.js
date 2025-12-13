/**
 * User-Friendly Error Messages
 * Converts technical errors into friendly messages
 */

export const getErrorMessage = (error) => {
    // Network errors
    if (!error.response) {
        return "Unable to connect to the server. Please check your internet connection.";
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // Status code based messages
    switch (status) {
        case 400:
            return message || "Invalid request. Please check your input and try again.";

        case 401:
            return "Your session has expired. Please log in again.";

        case 403:
            return "You don't have permission to perform this action.";

        case 404:
            return "The requested item was not found.";

        case 409:
            return message || "This item already exists. Please try a different one.";

        case 422:
            return message || "Please fill in all required fields correctly.";

        case 500:
            return "Something went wrong on our end. Please try again later.";

        case 503:
            return "Service is temporarily unavailable. Please try again in a few moments.";

        default:
            return message || "Something went wrong. Please try again.";
    }
};

/**
 * Success Messages for different actions
 */
export const successMessages = {
    // Auth
    login: "Welcome back! You've successfully logged in.",
    register: "Account created successfully! Welcome to EcoFinds.",
    logout: "You've been logged out successfully.",

    // Products
    productAdded: "Product listed successfully! It's now visible to buyers.",
    productUpdated: "Product updated successfully!",
    productDeleted: "Product removed from your listings.",

    // Cart
    addedToCart: "Item added to your cart!",
    removedFromCart: "Item removed from cart.",
    cartCleared: "Cart cleared successfully.",

    // Orders
    orderPlaced: "Order placed successfully! Check your email for confirmation.",

    // Profile
    profileUpdated: "Profile updated successfully!",
};

/**
 * Validation error messages
 */
export const validationMessages = {
    required: (field) => `${field} is required.`,
    email: "Please enter a valid email address.",
    password: "Password must be at least 6 characters long.",
    passwordMatch: "Passwords do not match.",
    price: "Please enter a valid price.",
    image: "Please upload at least one image.",
    maxImages: "You can upload maximum 5 images.",
    fileSize: "File size should not exceed 5MB.",
    fileType: "Only JPG, PNG, and WEBP images are allowed.",
};

/**
 * Format validation errors from backend
 */
export const formatValidationErrors = (errors) => {
    if (Array.isArray(errors)) {
        return errors.map(err => err.message || err).join(', ');
    }
    if (typeof errors === 'object') {
        return Object.values(errors).flat().join(', ');
    }
    return errors || "Please check your input and try again.";
};

/**
 * Get user-friendly message for any error
 */
export const getUserFriendlyError = (error) => {
    // Validation errors
    if (error.response?.data?.errors) {
        return formatValidationErrors(error.response.data.errors);
    }

    // Custom backend messages
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    // Generic error handling
    return getErrorMessage(error);
};
