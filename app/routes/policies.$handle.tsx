import {useLoaderData} from 'react-router';
import {motion} from 'framer-motion';
import type {Route} from './+types/policies.$handle';

export const meta: Route.MetaFunction = ({data}) => [
  {title: `${data?.policy?.title ?? 'Policy'} | ZTweaks`},
  {property: 'og:title', content: `${data?.policy?.title ?? 'Policy'} | ZTweaks`},
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

const PLACEHOLDER_CONTENT: Record<PolicyHandle, {heading: string; body: string}[]> = {
  'privacy-policy': [
    {
      heading: 'Information We Collect',
      body: 'When you purchase or create an account with ZTweaks, we collect your name, email address, and payment information (processed securely through Shopify). We also collect standard technical data such as IP address, browser type, and pages visited to help us improve our services.',
    },
    {
      heading: 'How We Use Your Information',
      body: 'Your information is used to process orders, deliver license keys, send product updates and security notices, and provide customer support. We do not sell, rent, or share your personal data with third parties for marketing purposes.',
    },
    {
      heading: 'Data Storage and Security',
      body: 'All personal data is stored securely using industry-standard encryption. Payment information is handled entirely by Shopify Payments and is never stored on our servers. We retain order records for up to 5 years for legal and accounting purposes.',
    },
    {
      heading: 'Third-Party Services',
      body: 'We use Shopify to power our store and process payments. Discord is used for community support. These services have their own privacy policies and handle your data according to their respective terms. We are not responsible for their data practices.',
    },
    {
      heading: 'Your Rights',
      body: 'You may request access to, correction of, or deletion of your personal data at any time by emailing hello@ztweaks.com. We will respond within 30 days. Customers in the EU and UK have additional rights under GDPR, including the right to data portability and the right to object to processing.',
    },
    {
      heading: 'Updates to This Policy',
      body: 'We may update this policy from time to time. Material changes will be communicated via email or a notice on our website. Continued use of ZTweaks products after changes are posted constitutes acceptance of the updated policy.',
    },
    {
      heading: 'Contact',
      body: 'For any privacy-related questions or requests, contact us at hello@ztweaks.com.',
    },
  ],
  'terms-of-service': [
    {
      heading: 'Acceptance of Terms',
      body: 'By purchasing or downloading any ZTweaks product, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our products. These terms apply to all users, including purchasers, trial users, and visitors.',
    },
    {
      heading: 'License Grant',
      body: 'Upon purchase, ZTweaks grants you a limited, non-exclusive, non-transferable license to use the purchased software product on up to 2 personal computers that you own or control. This license is for personal use only.',
    },
    {
      heading: 'Permitted Use',
      body: 'You may install and use ZTweaks products on your own personal hardware for the purpose of improving gaming performance. You may not use our products in any way that violates the terms of service of any game or platform.',
    },
    {
      heading: 'Restrictions',
      body: 'You may not redistribute, resell, sublicense, lease, or share your license with others. You may not reverse engineer, decompile, or disassemble any ZTweaks software. You may not use our products for commercial purposes without a separate written agreement.',
    },
    {
      heading: 'Intellectual Property',
      body: 'All ZTweaks software, branding, and content are the exclusive property of ZTweaks and are protected by copyright and intellectual property laws. Nothing in these terms transfers any intellectual property rights to you.',
    },
    {
      heading: 'Disclaimer of Warranties',
      body: 'ZTweaks products are provided "as is" without warranties of any kind. While we take every precaution to ensure our optimizations are safe and effective, we cannot guarantee specific performance outcomes as results vary by system configuration, hardware, and usage.',
    },
    {
      heading: 'Limitation of Liability',
      body: 'To the maximum extent permitted by law, ZTweaks shall not be liable for any indirect, incidental, or consequential damages arising from use of our products. Our total liability for any claim is limited to the amount you paid for the applicable product.',
    },
    {
      heading: 'Termination',
      body: 'We reserve the right to terminate or suspend your license if you breach these terms. Upon termination, you must uninstall and cease using all ZTweaks software. Refunds upon termination for breach are not guaranteed.',
    },
    {
      heading: 'Governing Law',
      body: 'These terms are governed by applicable law. Any disputes will be resolved through good-faith negotiation or, if necessary, binding arbitration.',
    },
    {
      heading: 'Contact',
      body: 'Questions about these terms? Email us at hello@ztweaks.com.',
    },
  ],
  'refund-policy': [
    {
      heading: '30-Day Satisfaction Guarantee',
      body: 'We stand behind every product we sell. If you are not satisfied with your purchase for any reason, you may request a full refund within 30 days of the purchase date. No questions asked.',
    },
    {
      heading: 'Eligibility',
      body: 'Refunds are available for all one-time and subscription purchases made within the 30-day window. Subscription plans are refunded on a pro-rata basis for the unused portion of the billing period. Refund requests submitted after 30 days will be reviewed on a case-by-case basis.',
    },
    {
      heading: 'How to Request a Refund',
      body: 'Email hello@ztweaks.com with your order number and the email address used at checkout. We aim to respond and process refunds within 1-2 business days. You do not need to provide a reason, though feedback is always welcome.',
    },
    {
      heading: 'Processing Time',
      body: 'Once approved, refunds are issued back to your original payment method. Processing time is typically 3-5 business days depending on your bank or card issuer. You will receive a confirmation email when the refund is initiated.',
    },
    {
      heading: 'License Revocation',
      body: 'Upon a successful refund, your license key will be deactivated and you will lose access to the product. We ask that you uninstall the software following a refund.',
    },
    {
      heading: 'Contact',
      body: 'For refund requests or questions, email hello@ztweaks.com or reach us on Discord.',
    },
  ],
  'shipping-policy': [
    {
      heading: 'Digital Delivery',
      body: 'All ZTweaks products are delivered digitally. There is no physical shipping. Upon completing your purchase, your license key and download link will be sent to the email address provided at checkout.',
    },
    {
      heading: 'Delivery Time',
      body: 'Digital delivery is instant in most cases. If you do not receive your license key within 10 minutes of purchase, check your spam or junk folder. If it is still missing, contact us at hello@ztweaks.com with your order number.',
    },
    {
      heading: 'Contact',
      body: 'For delivery issues, email hello@ztweaks.com or open a ticket in our Discord server.',
    },
  ],
};

const PLACEHOLDER_SECTIONS = PLACEHOLDER_CONTENT['terms-of-service'];

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
        className="rounded-2xl border border-white/[0.07] bg-white/2 p-8 md:p-12"
      >
        {source === 'shopify' && policy.body ? (
          <div
            className="policy-body text-white/40 text-[14px] font-light leading-relaxed"
            dangerouslySetInnerHTML={{__html: policy.body}}
          />
        ) : (
          <div className="flex flex-col gap-8">
            {(PLACEHOLDER_CONTENT[policy.handle as PolicyHandle] ?? PLACEHOLDER_SECTIONS).map((s, i) => (
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
