import { useState, useEffect, useCallback } from "react";
import { productService } from "../services";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import InfiniteScroll from "../components/InfiniteScroll";
import ProductSkeleton from "../components/ProductSkeleton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    // Reset and fetch from beginning when filters change
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [selectedCategory, sortBy, selectedCondition]);

  const fetchProducts = async (pageNum = 1, isNewSearch = false) => {
    if (isNewSearch) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const params = {
        page: pageNum,
        limit: 12, // Load 12 products at a time
      };

      if (selectedCategory !== "all") {
        params.category = selectedCategory;
      }
      if (sortBy !== "newest") {
        params.sort = sortBy;
      }
      if (selectedCondition) {
        params.condition = selectedCondition;
      }
      if (priceRange.min) params.minPrice = priceRange.min;
      if (priceRange.max) params.maxPrice = priceRange.max;

      const response = await productService.getAllProducts(params);

      if (isNewSearch) {
        setProducts(response.data);
      } else {
        setProducts((prev) => [...prev, ...response.data]);
      }

      setTotalPages(response.pages || 1);
      setHasMore(pageNum < (response.pages || 1));
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreProducts = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, false);
    }
  }, [page, hasMore, loadingMore]);

  const handleSearch = async () => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);

    try {
      const params = {
        search: searchTerm,
        page: 1,
        limit: 12,
      };
      if (selectedCategory !== "all") {
        params.category = selectedCategory;
      }
      if (selectedCondition) params.condition = selectedCondition;
      if (priceRange.min) params.minPrice = priceRange.min;
      if (priceRange.max) params.maxPrice = priceRange.max;

      const response = await productService.getAllProducts(params);
      setProducts(response.data);
      setTotalPages(response.pages || 1);
      setHasMore(1 < (response.pages || 1));
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceApply = () => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  };

  return (
    <div className="home-container">
      <div className="hero-section hero">
        <div className="hero-content">
          <h1 className="hero-title">🌱 Spring Sale: <span>50% Off!</span></h1>
          <p className="hero-subtitle">Buy Sustainable. Save Money. Save Earth.</p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <button
              onClick={() => document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' })}
              className="btn"
              style={{ background: 'white', color: 'var(--primary)', padding: '0.8rem 2rem', fontWeight: 'bold' }}>
              Shop Now
            </button>
            <button
              onClick={() => navigate('/add-product')}
              className="btn"
              style={{ background: 'rgba(0,0,0,0.2)', color: 'white', padding: '0.8rem 2rem', border: '1px solid rgba(255,255,255,0.3)' }}>
              Sell Item
            </button>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="main-content">
        <aside className="sidebar">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="filter-section">
            <h3>Condition</h3>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="filter-select"
            >
              <option value="">All Conditions</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              />
            </div>
            <button className="apply-price-btn" onClick={handlePriceApply}>Apply Price</button>
          </div>

          <div className="sort-section">
            <h3>Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </aside>

        <main className="products-section">
          {loading ? (
            <div className="products-grid">
              <ProductSkeleton count={8} />
            </div>
          ) : products.length === 0 ? (
            <div className="no-products" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No products found</h3>
              <p>Try adjusting your category, search term, or filters to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                  setSelectedCondition("");
                  setPriceRange({ min: "", max: "" });
                }}
                className="btn btn-secondary"
                style={{ marginTop: '1.5rem' }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <InfiniteScroll
              loadMore={loadMoreProducts}
              hasMore={hasMore}
              loading={loadingMore}
            >
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}

                {/* Show loading skeletons while loading more */}
                {loadingMore && <ProductSkeleton count={4} />}
              </div>
            </InfiniteScroll>
          )}

          {/* Loading indicator */}
          {loadingMore && (
            <div className="loading-more">
              <Loader />
              <p>Loading more products...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
