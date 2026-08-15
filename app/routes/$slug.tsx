// app/routes/$slug.tsx
//
// Catch-all single-segment route that handles your affiliate short-links
// (e.g. /cobraxz, /pixel, /jaydenz, etc.) ported from the old Netlify
// _redirects file.
//
// Notes:
//  - More specific Hydrogen routes (products.$handle, collections.$handle,
//    pages.$handle, account, cart, etc.) take precedence, so this only fires
//    for un-matched single-segment paths.
//  - If you use locale prefixes (e.g. /en-us/cobraxz), rename this file to
//    `($locale).$slug.tsx` instead — same code body works.
//  - Resource route (loader only, no default component export) so that the
//    PROXY_REWRITES 200 passthrough is served as the document. See the note
//    above the loader's return for why a component would break the proxy.

import {redirect, type LoaderFunctionArgs} from 'react-router';

/**
 * UpPromote affiliate links.
 *
 * Kept pointed at ztweaks-3.myshopify.com on purpose: in "Redirect to Shopify"
 * mode UpPromote needs the click to briefly hit the .myshopify.com domain so
 * its script can read `sca_ref` and set the tracking cookie before the
 * customer lands on ztweaks.com. If you switch UpPromote to "Go straight to
 * third-party site" mode AND have the linker/cart tracking script wired into
 * your Hydrogen <head>, you can change these to ztweaks.com.
 */
const AFFILIATE_REDIRECTS: Record<string, string> = {
  cobraxz:   'https://ztweaks-3.myshopify.com/?sca_ref=10694630.KUPMNMKMHyYg8',
  pixel:     'https://ztweaks-3.myshopify.com/?sca_ref=10850216.ccogciQJEtNJQ2',
  edge:      'https://ztweaks-3.myshopify.com/?sca_ref=10702326.55l4RD4BTTQ8',
  slam:      'https://ztweaks.com/?sca_ref=10932559.m4yhb00CfyW1',
  jaydenz:   'https://ztweaks-3.myshopify.com/?sca_ref=10694633.TyW5sbmPb8',
  jaydenz1x: 'https://ztweaks-3.myshopify.com/?sca_ref=10694633.TyW5sbmPb8',
  joshreyli: 'https://ztweaks.com/?sca_ref=10700626.5BU9JnzIrpPS',
  bren:      'https://ztweaks-3.myshopify.com/?sca_ref=10909769.3cv7pr9IbbIcV',
  kozi:      'https://ztweaks.com/?sca_ref=10701721.cUG2O7xj5lbOc',
  dc:        'https://checkout.ztweaks.com/?sca_ref=10835407.pVnwjmbtwnxiy',
  guppy:     'https://ztweaks.com/?sca_ref=10700789.0sfGdblJqUj',
  muz:       'https://ztweaks.com/?sca_ref=10700626.5BU9JnzIrpPS',
  muzz:      'https://ztweaks.com/?sca_ref=10700626.5BU9JnzIrpPS',
  tiktok:    'https://ztweaks.com/?sca_ref=10700626.5BU9JnzIrpPS',
  victerv:   'https://ztweaks.com/?sca_ref=10700626.5BU9JnzIrpPS',
  status:    'https://ztweaks.com/?sca_ref=10700626.5BU9JnzIrpPS',
  kurk:      'https://ztweaks.com/?sca_ref=10700626.5BU9JnzIrpPS',
  verz:      'https://ztweaks-3.myshopify.com/?sca_ref=10851122.Ftv882NNqojBFVwo',
  cold:      'https://ztweaks.com/?sca_ref=10957672.N4jUoo5tubz',
  semaj:     'https://ztweaks.com/?sca_ref=11022726.3Hw47pZCa4fyDUE',
  arkeez:    'https://ztweaks.com/?sca_ref=11022794.aU1vENOMjJ1',
  peterbot:  'https://ztweaks.com/?sca_ref=10957672.N4jUoo5tubz',
  reydy:     'https://ztweaks-3.myshopify.com/?sca_ref=11129535.1T9TglXtOxCXBVds',
  tarit:     'https://ztweaks-3.myshopify.com/?sca_ref=11373592.hRhylo0IDXc',
  zenmonsta: 'https://ztweaks-3.myshopify.com/?sca_ref=11463165.hPPEM6xV2S',
  palm:      'https://ztweaks-3.myshopify.com/?sca_ref=11444252.zH66m1i9IEz',
  induur:    'https://ztweaks-3.myshopify.com/?sca_ref=11491453.dT0KMcmrlEeJq',
  plux:      'https://ztweaks-3.myshopify.com/?sca_ref=11916008.5UckesSQ4T29Tc',
};

/**
 * Generic short-links that previously 200-rewrote to ztweaks.com.
 * Since this IS ztweaks.com now, just send them to the homepage.
 * (If you'd rather drop these slugs entirely, delete this block — they'll 404.)
 */
const HOMEPAGE_REDIRECTS: Record<string, string> = {
  hajuu:  '/',
  tavy:   '/',
  twunti: '/',
  xin:    '/',
  macro:  '/',
  rorvz:  '/',
  wntr:   '/',
  yasr:   '/',
  rezy:   '/',
  zenn:   '/',
  rapid:  '/',
};

/**
 * Special slugs that were previously 200-PROXIED to other Netlify sites.
 * A 200 rewrite preserves the URL bar; a 302 redirect doesn't. If you
 * actually need to keep the URL as ztweaks.com/termsofservice while serving
 * remote content, this won't reproduce that — set up a Traefik proxy in
 * Coolify, or rebuild the page natively in Hydrogen (recommended for ToS).
 */
const EXTERNAL_REDIRECTS: Record<string, string> = {
  termsofservice: 'https://inspiring-baklava-d3ab6b.netlify.app/',
  dazrr:          'https://quiet-cucurucho-b0b70a.netlify.app/',
};

/**
 * Proxy rewrites — the remote HTML is fetched server-side and returned with
 * a 200, so the browser URL bar stays as ztweaks.com/<slug>. A <base> tag
 * is injected so relative asset URLs (CSS, JS, images) resolve correctly
 * against the origin site.
 */
const PROXY_REWRITES: Record<string, string> = {
  ritual: 'https://frabjous-cobbler-f17e2e.netlify.app/',
  vergo:  'https://loquacious-sable-3040f5.netlify.app/',
  josh:   'https://warm-belekoy-f9cb11.netlify.app/',
  king:   'https://quiet-platypus-5704a7.netlify.app/',
  ceeslay: 'https://candid-jelly-490f30.netlify.app/',
};

const REDIRECTS: Record<string, string> = {
  ...AFFILIATE_REDIRECTS,
  ...HOMEPAGE_REDIRECTS,
  ...EXTERNAL_REDIRECTS,
};

export async function loader({params}: LoaderFunctionArgs) {
  const slug = params.slug?.toLowerCase();

  if (!slug) {
    throw new Response('Not Found', {status: 404});
  }

  const proxyTarget = PROXY_REWRITES[slug];
  if (proxyTarget) {
    const upstream = await fetch(proxyTarget);
    const html = await upstream.text();

    // Injected into <head> of the proxied page so UpPromote's linker runs here
    // and can decorate checkout links with sca_ref before the browser crosses
    // to the Shopify checkout domain.
    const upScript = `
<base href="${proxyTarget}">
<script>
  window.upDataLayer = window.upDataLayer || [];
  function upTag() { return upDataLayer.push(arguments); }
  upTag('config', 'myshopify_domain', 'ztweaks-3.myshopify.com');
  upTag('config', 'linker', ['ztweaks-3.myshopify.com', 'ztweaks.com', 'checkout.ztweaks.com']);
</script>
<script async src="https://static-pixel.uppromote.com/collect/v1/collect.js"></script>`;

    const proxied = html.replace(/<head>/i, `<head>${upScript}`);
    return new Response(proxied, {
      status: 200,
      headers: {'Content-Type': 'text/html; charset=utf-8'},
    });
  }

  const destination = REDIRECTS[slug];

  if (!destination) {
    // Unknown slug — let your normal 404 handling take over.
    throw new Response('Not Found', {status: 404});
  }

  // For affiliate short-links, stamp a first-party `ztstore` cookie on the
  // ztweaks.com redirect *before* we bounce out to Shopify. After UpPromote
  // reads sca_ref and lands the visitor back on ztweaks.com, the slug itself
  // is gone — but this cookie persists, so /products can later filter which
  // items show for this affiliate store. 30-day window (~attribution window).
  const headers: HeadersInit = {};
  if (slug in AFFILIATE_REDIRECTS) {
    headers['Set-Cookie'] =
      `ztstore=${slug}; Path=/; Max-Age=2592000; SameSite=Lax; Secure; HttpOnly`;
  }

  // 302 (temporary) on purpose: affiliate destinations rotate, and 301s get
  // cached aggressively by browsers. Switch to 301 only if you're sure.
  return redirect(destination, {status: 302, headers});
}

// NOTE: This is intentionally a RESOURCE ROUTE — no default component export.
// In React Router v7, a loader that returns a 200 `Response` only has its body
// served as the document when the route has no component; if a component exists,
// RR renders the component (and the app shell) and treats the Response as data,
// which silently discards the proxied HTML. Redirects/404s short-circuit either
// way, but the PROXY_REWRITES passthrough only works without a default export.
// Same pattern as [robots.txt].tsx / [sitemap.xml].tsx.