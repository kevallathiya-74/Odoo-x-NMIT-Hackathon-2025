import { useEffect, useRef } from "react";

/**
 * InfiniteScroll component using Intersection Observer
 * Triggers loadMore callback when user scrolls near the bottom
 */
const InfiniteScroll = ({
  children,
  loadMore,
  hasMore,
  loading,
  threshold = 0.5,
  className = "",
}) => {
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    // Disconnect previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new Intersection Observer
    const options = {
      root: null, // Use viewport as root
      rootMargin: "200px", // Trigger 200px before reaching the element
      threshold: threshold,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      // If element is intersecting, has more data, and not currently loading
      if (firstEntry.isIntersecting && hasMore && !loading) {
        console.log("✅ InfiniteScroll: Triggering loadMore");
        loadMore();
      }
    }, options);

    // Observe the load more trigger element
    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef);
    }

    // Cleanup function
    return () => {
      if (observerRef.current && currentLoadMoreRef) {
        observerRef.current.unobserve(currentLoadMoreRef);
      }
    };
  }, [hasMore, loading, loadMore, threshold]);

  return (
    <div className={className}>
      {children}

      {/* Load More trigger with button */}
      {hasMore && (
        <div
          ref={loadMoreRef}
          style={{
            minHeight: "120px",
            margin: "3rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <div style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem"
            }}>
              <div className="loader"></div>
              <span>Loading more products...</span>
            </div>
          ) : (
            <button
              onClick={() => {
                console.log("🖱️ Load More Button Clicked");
                loadMore();
              }}
              className="btn btn-primary"
              style={{
                padding: "1rem 2.5rem",
                fontSize: "1.05rem",
              }}
            >
              Load More Products
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
