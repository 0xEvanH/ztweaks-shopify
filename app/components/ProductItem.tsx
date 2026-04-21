import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment
} from 'storefrontapi.generated';
import { useVariantUrl } from '~/lib/variants';

export function ProductItem({
  product,
  loading,
}: {
  product:
  | CollectionItemFragment
  | ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  // TypeScript is now happy!
  const videoPath = (product as ProductItemFragment).video?.value;
  
  return (
    <Link className="product-item" prefetch="intent" to={variantUrl}>
      {videoPath ? (
        <video
          src={videoPath}
          autoPlay
          muted
          loop
          playsInline
          style={{ aspectRatio: '1/1', objectFit: 'cover', width: '100%' }}
        />
      ) : (
        image && (
          <Image
            data={image}
            aspectRatio="1/1"
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        )
      )}
      <h4>{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
}