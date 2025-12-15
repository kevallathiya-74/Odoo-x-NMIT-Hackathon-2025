import {
  FaList,
  FaLaptop,
  FaTshirt,
  FaChair,
  FaBook,
  FaBasketballBall,
  FaGamepad,
  FaLeaf,
  FaCar,
  FaBox,
} from "react-icons/fa";

const categories = [
  { name: "All", icon: FaList, value: "all" },
  { name: "Electronics", icon: FaLaptop, value: "Electronics" },
  { name: "Clothing", icon: FaTshirt, value: "Clothing" },
  { name: "Furniture", icon: FaChair, value: "Furniture" },
  { name: "Books", icon: FaBook, value: "Books" },
  { name: "Sports", icon: FaBasketballBall, value: "Sports" },
  { name: "Toys", icon: FaGamepad, value: "Toys" },
  { name: "Home & Garden", icon: FaLeaf, value: "Home & Garden" },
  { name: "Automotive", icon: FaCar, value: "Automotive" },
  { name: "Other", icon: FaBox, value: "Other" },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="filter-section category-filter-section">
      <h3>Categories</h3>
      <div className="category-list">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              className={`category-item ${selectedCategory === cat.value ? "active" : ""}`}
              onClick={() => onSelectCategory(cat.value)}
            >
              <span className="cat-icon"><Icon /></span>
              <span className="cat-name">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;

