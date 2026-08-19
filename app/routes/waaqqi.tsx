import {redirect} from 'react-router';
import type {Route} from './+types/waaqqi';

/**
 * Vanity affiliate link.
 *
 * Redirects /waaqqi to the affiliate checkout URL, preserving the referral
 * tag so the referrer is credited.
 *
 * @example
 * /waaqqi  ->  https://ztweaks-3.myshopify.com/?sca_ref=12102871.8ldJXNfUZRa
 */
const AFFILIATE_URL =
  'https://ztweaks-3.myshopify.com/?sca_ref=12102871.8ldJXNfUZRa';

export async function loader(_args: Route.LoaderArgs) {
  return redirect(AFFILIATE_URL, {status: 302});
}
