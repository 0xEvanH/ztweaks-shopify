import {useLoaderData} from 'react-router';
import {motion} from 'framer-motion';
import type {Route} from './+types/policies.$handle';

export const meta: Route.MetaFunction = ({data}) => [
  {title: `${data?.policy?.title ?? 'Policy'} — ZTweaks`},
];

const POLICY_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body handle id title url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy   @include(if: $privacyPolicy)   { ...Policy }
      shippingPolicy  @include(if: $shippingPolicy)  { ...Policy }
      termsOfService  @include(if: $termsOfService)  { ...Policy }
      refundPolicy    @include(if: $refundPolicy)    { ...Policy }
    }
  }
` as const;

type PolicyHandle = 'privacy-policy' | 'terms-of-service' | 'refund-policy' | 'shipping-policy';

const POLICY_META: Record<PolicyHandle, {tag: string; title: string}> = {
  'privacy-policy':   {tag: '// privacy',  title: 'PRIVACY POLICY'},
  'terms-of-service': {tag: '// legal',    title: 'TERMS OF SERVICE'},
  'refund-policy':    {tag: '// refunds',  title: 'REFUND POLICY'},
  'shipping-policy':  {tag: '// shipping', title: 'SHIPPING POLICY'},
};

export async function loader({params, context}: Route.LoaderArgs) {
  if (!params.handle) throw new Response('No handle', {status: 404});

  const policyName = params.handle.replace(
    /-([a-z])/g,
    (_: string, m: string) => m.toUpperCase(),
  );

  try {
    const data = await context.storefront.query(POLICY_QUERY, {
      variables: {
        privacyPolicy:  false,
        shippingPolicy: false,
        termsOfService: false,
        refundPolicy:   false,
        [policyName]:   true,
        language: context.storefront.i18n?.language,
      },
    });

    const policy = (data.shop as Record<string, {title: string; handle: string; body: string} | null>)?.[policyName];
    if (!policy) throw new Response('Policy not found', {status: 404});
    return {policy, source: 'shopify' as const};
  } catch {
    const meta = POLICY_META[params.handle as PolicyHandle];
    if (!meta) throw new Response('Policy not found', {status: 404});
    return {
      policy: {title: meta.title, handle: params.handle, body: null as string | null},
      source: 'placeholder' as const,
    };
  }
}

const PLACEHOLDER_SECTIONS = [
  {heading: 'Section 1', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
  {heading: 'Section 2', body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {heading: 'Section 3', body: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.'},
];

export default function Policy() {
  const {policy, source} = useLoaderData<typeof loader>();
  const meta = POLICY_META[policy.handle as PolicyHandle] ?? {
    tag: '// policy',
    title: policy.title?.toUpperCase(),
  };

  return (
    <section className="pt-36 pb-28 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div
        initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
        className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4"
      >
        {meta.tag}
      </motion.div>

      <motion.h1
        initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1]}}
        className="font-display text-[clamp(40px,6vw,80px)] leading-[0.88] tracking-[0.02em] text-white mb-12"
      >
        {meta.title}
      </motion.h1>

      <motion.div
        initial={{opacity: 0, y: 16}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.15}}
        className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 md:p-12"
      >
        {source === 'shopify' && policy.body ? (
          <div
            className="policy-body text-white/40 text-[14px] font-light leading-relaxed"
            dangerouslySetInnerHTML={{__html: policy.body}}
          />
        ) : (
          <div className="flex flex-col gap-8">
            {source === 'placeholder' && (
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                <span className="font-mono text-[9px] tracking-widest text-white/25 uppercase">
                  Preview — add policy content in Shopify Admin → Settings → Policies
                </span>
              </div>
            )}
            {PLACEHOLDER_SECTIONS.map((s, i) => (
              <div key={i}>
                <div className="font-mono text-[9px] tracking-[0.18em] text-white/25 uppercase mb-3">{s.heading}</div>
                <p className="text-white/40 text-[14px] font-light leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
