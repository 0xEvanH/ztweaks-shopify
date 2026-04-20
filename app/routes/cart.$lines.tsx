import {redirect} from 'react-router';
import type {Route} from './+types/cart.$lines';

/**
 * Automatically creates a new cart based on the URL and redirects straight to checkout.
 * Expected URL structure: /cart/<variant_id>:<quantity>
 *
 * More than one `<variant_id>:<quantity>` separated by a comma can be supplied
 * for carts with more than one product variant.
 *
 * @example
 * /cart/41007289663544:1,41007289696312:2?discount=HYDROBOARD
 */
export async function loader({request, context, params}: Route.LoaderArgs) {
  const {cart} = context;
  const {lines} = params;
  if (!lines) return redirect('/cart');

  const linesMap = lines.split(',').map((line) => {
    const [variantId, qty] = line.split(':');
    return {
      merchandiseId: `gid://shopify/ProductVariant/${variantId}`,
      quantity: parseInt(qty, 10),
    };
  });

  const url = new URL(request.url);
  const discount = new URLSearchParams(url.search).get('discount');
  const discountArray = discount ? [discount] : [];

  const result = await cart.create({
    lines: linesMap,
    discountCodes: discountArray,
  });

  const cartResult = result.cart;

  if (result.errors?.length || !cartResult) {
    throw new Response('Link may be expired. Try checking the URL.', {
      status: 410,
    });
  }

  const headers = cart.setCartId(cartResult.id);

  if (cartResult.checkoutUrl) {
    return redirect(cartResult.checkoutUrl, {headers});
  } else {
    throw new Error('No checkout URL found');
  }
}

export default function Component() {
  return null;
}
