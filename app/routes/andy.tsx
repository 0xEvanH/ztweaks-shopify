import {redirect} from 'react-router';
import type {Route} from './+types/andy';

/**
 * Vanity affiliate link.
 *
 * Redirects /andy to the affiliate checkout URL, preserving the referral
 * tag so the referrer is credited.
 *
 * @example
 * /andy  ->  https://ztweaks-3.myshopify.com/?sca_ref=11760457.tPncBnbO46Y7H8s
 */
const AFFILIATE_URL =
  'https://ztweaks-3.myshopify.com/?sca_ref=11760457.tPncBnbO46Y7H8s';

export async function loader(_args: Route.LoaderArgs) {
  return redirect(AFFILIATE_URL, {status: 302});
}
