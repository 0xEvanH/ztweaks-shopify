import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
  videoPath, // 👈 Add the videoPath prop
}: {
  image: ProductVariantFragment['image'];
  videoPath?: string; // 👈 Add the type
}) {
  console.log(videoPath)
  // 1. Check for video first
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

  // 2. Fallback to image logic
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