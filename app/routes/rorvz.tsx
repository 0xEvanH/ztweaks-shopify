import {redirect} from 'react-router';
import type {Route} from './+types/rorvz';

/**
 * Vanity affiliate link.
 *
 * Redirects /rorvz to the affiliate checkout URL, preserving the referral
 * tag so the referrer is credited.
 *
 * @example
 * /rorvz  ->  https://checkout.ztweaks.com/?sca_ref=11730952.1P9DrcVeAW8Z
 */
const AFFILIATE_URL =
  'https://checkout.ztweaks.com/?sca_ref=11730952.1P9DrcVeAW8Z';

export async function loader(_args: Route.LoaderArgs) {
  return redirect(AFFILIATE_URL, {status: 302});
}
