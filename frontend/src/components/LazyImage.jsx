import { useState, useEffect, useRef } from "react";
import "./LazyImage.css";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E",
  threshold = 0.1,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    let observer;
    const imageElement = imageRef.current;

    if (imageElement && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Load the actual image
              const img = new Image();
              img.src = src;
              img.onload = () => {
                setImageSrc(src);
                setImageLoaded(true);
              };
              img.onerror = () => {
                // Fallback to placeholder on error
                setImageSrc(placeholderSrc);
                setImageLoaded(true);
              };
              
              // Stop observing once loaded
              if (observer && imageElement) {
                observer.unobserve(imageElement);
              }
            }
          });
        },
        {
          threshold: threshold,
          rootMargin: "50px", // Start loading 50px before image enters viewport
        }
      );

      observer.observe(imageElement);
    } else {
      // Fallback for browsers without IntersectionObserver
      setImageSrc(src);
      setImageLoaded(true);
    }

    return () => {
      if (observer && imageElement) {
        observer.unobserve(imageElement);
      }
    };
  }, [src, placeholderSrc, threshold]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${imageLoaded ? "loaded" : "loading"} ${className}`}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;
