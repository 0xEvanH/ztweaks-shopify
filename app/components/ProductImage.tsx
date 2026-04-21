// app/components/ProductImage.tsx
import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
  videoPath, // 👈 1. Accept the new prop
}: {
  image: ProductVariantFragment['image'];
  videoPath?: string; // 👈 2. Add the type
}) {
  // 3. Priority logic: If a video exists, show it instead of the image
  if (videoPath) {
    return (
      <div className="product-image">
        <video
          src={videoPath}
          autoPlay
          muted
          loop
          playsInline
          style={{aspectRatio: '1/1', objectFit: 'cover', width: '100%'}}
        />
      </div>
    );
  }

  if (!image) {
    return <div className="product-image" />;
  }

  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}