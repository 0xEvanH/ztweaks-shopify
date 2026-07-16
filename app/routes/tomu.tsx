import {redirect} from 'react-router';
import type {Route} from './+types/tomu';

/**
 * Vanity affiliate link.
 *
 * Redirects /tomu to the affiliate checkout URL, preserving the referral
 * tag so the referrer is credited.
 *
 * @example
 * /tomu  ->  https://ztweaks-3.myshopify.com/?sca_ref=11825786.ZalFcyY9y98S
 */
const AFFILIATE_URL =
  'https://ztweaks-3.myshopify.com/?sca_ref=11825786.ZalFcyY9y98S';

export async function loader(_args: Route.LoaderArgs) {
  return redirect(AFFILIATE_URL, {status: 302});
}
