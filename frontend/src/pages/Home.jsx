import { useState, useEffect, useCallback } from "react";
import { productService } from "../services";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import InfiniteScroll from "../components/InfiniteScroll";
import ProductSkeleton from "../components/ProductSkeleton";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Reset and fetch from beginning when filters change
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [selectedCategory, sortBy]);

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

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🌿 Discover Sustainable Treasures</h1>
        <p>Buy and sell pre-loved items, reduce waste, and save money!</p>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>

      <div className="main-content">
        <aside className="sidebar">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

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
            <div className="no-products">
              <p>No products found</p>
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
