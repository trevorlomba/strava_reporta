import React, { useState, useEffect } from 'react';

interface CachedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CachedImage: React.FC<CachedImageProps> = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = async () => {
  try {
    console.log('Fetched Image URL:', src); // Log the fetched image URL
    const cachedImage = sessionStorage.getItem(src);
    if (cachedImage) {
      setImageSrc(cachedImage);
    } else {
      const response = await fetch(src);
      if (!response.ok) {
        setError(true);
        return;
      }
      const blob = await response.blob();
      console.log('Image Content-Type:', response.headers.get('Content-Type')); // Log the Content-Type header
      const url = URL.createObjectURL(blob);
      console.log('Generated Object URL:', url); // Log the generated object URL
      console.log('Blob size:', blob.size); // Log the blob size
      sessionStorage.setItem(src, url);
      setImageSrc(url);
    }
  } catch (err) {
    setError(true);
  }
};

    loadImage();
  }, [src]);

  return error ? (
    <p></p>
  ) : imageSrc ? (
    <img src={imageSrc} alt={alt} className={className} />
  ) : (
    <p>Loading...</p>
  );
};

export default CachedImage;