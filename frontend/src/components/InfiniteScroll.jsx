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
      rootMargin: "100px", // Trigger 100px before reaching the element
      threshold: threshold, // Trigger when element is 50% visible
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      
      // If element is intersecting, has more data, and not currently loading
      if (firstEntry.isIntersecting && hasMore && !loading) {
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
      
      {/* Invisible trigger element for intersection observer */}
      {hasMore && (
        <div
          ref={loadMoreRef}
          style={{
            height: "20px",
            margin: "20px 0",
            visibility: "hidden",
          }}
        />
      )}
    </div>
  );
};

export default InfiniteScroll;
