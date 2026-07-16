import {redirect} from 'react-router';
import type {Route} from './+types/slam';

/**
 * Vanity affiliate link.
 *
 * Redirects /slam to the affiliate checkout URL, preserving the referral
 * tag so the referrer is credited.
 *
 * @example
 * /slam  ->  https://ztweaks-3.myshopify.com/?sca_ref=10932559.m4yhb00CfyW1
 */
const AFFILIATE_URL =
  'https://ztweaks-3.myshopify.com/?sca_ref=10932559.m4yhb00CfyW1';

export async function loader(_args: Route.LoaderArgs) {
  return redirect(AFFILIATE_URL, {status: 302});
}
