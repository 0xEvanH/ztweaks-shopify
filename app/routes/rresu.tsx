import {redirect} from 'react-router';
import type {Route} from './+types/rresu';

/**
 * Vanity affiliate link.
 *
 * Redirects /rresu to the affiliate checkout URL, preserving the referral
 * tag so the referrer is credited.
 *
 * @example
 * /rresu  ->  https://ztweaks-3.myshopify.com/?sca_ref=11776854.wi3p6MqyBcK2
 */
const AFFILIATE_URL =
  'https://ztweaks-3.myshopify.com/?sca_ref=11776854.wi3p6MqyBcK2';

export async function loader(_args: Route.LoaderArgs) {
  return redirect(AFFILIATE_URL, {status: 302});
}
