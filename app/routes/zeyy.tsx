import {redirect} from 'react-router';
import type {Route} from './+types/zeyy';

/**
 * Vanity affiliate link.
 *
 * Redirects /zeyy to the affiliate checkout URL, preserving the referral
 * tag so the referrer is credited.
 *
 * @example
 * /zeyy  ->  https://ztweaks-3.myshopify.com/?sca_ref=11639324.mPxm7bq9QzyYv
 */
const AFFILIATE_URL =
  'https://ztweaks-3.myshopify.com/?sca_ref=11639324.mPxm7bq9QzyYv';

export async function loader(_args: Route.LoaderArgs) {
  return redirect(AFFILIATE_URL, {status: 302});
}
