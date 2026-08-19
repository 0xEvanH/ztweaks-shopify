import {redirect} from 'react-router';
import type {Route} from './+types/fly';

/**
 * Vanity affiliate link.
 *
 * Redirects /fly to the affiliate checkout URL, preserving the referral
 * tag so the referrer is credited.
 *
 * @example
 * /fly  ->  https://ztweaks-3.myshopify.com/?sca_ref=12085697.lQsHFxr7lvF05J1
 */
const AFFILIATE_URL =
  'https://ztweaks-3.myshopify.com/?sca_ref=12085697.lQsHFxr7lvF05J1';

export async function loader(_args: Route.LoaderArgs) {
  return redirect(AFFILIATE_URL, {status: 302});
}
