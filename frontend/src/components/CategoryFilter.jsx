const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Furniture",
  "Books",
  "Sports",
  "Toys",
  "Home & Garden",
  "Automotive",
  "Other",
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category.toLowerCase() ? "active" : ""
            }`}
            onClick={() => onSelectCategory(category.toLowerCase())}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
