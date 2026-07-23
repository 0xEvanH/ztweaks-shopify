import {redirect} from 'react-router';
import type {Route} from './+types/atrix';

/**
 * Vanity affiliate link.
 *
 * Redirects /atrix to the affiliate checkout URL, preserving the referral
 * tag so the referrer is credited.
 *
 * @example
 * /atrix  ->  https://ztweaks-3.myshopify.com/?sca_ref=11860568.88P23sLmlzS
 */
const AFFILIATE_URL =
  'https://ztweaks-3.myshopify.com/?sca_ref=11860568.88P23sLmlzS';

export async function loader(_args: Route.LoaderArgs) {
  return redirect(AFFILIATE_URL, {status: 302});
}
