import {useRef, useState} from 'react';
import {useLoaderData} from 'react-router';
import {motion, useInView} from 'framer-motion';
import type {Route} from './+types/products';

export const meta: Route.MetaFunction = () => [
  {title: 'Products — ZTweaks'},
  {name: 'description', content: 'Browse the full ZTweaks product lineup.'},
];

const PRODUCTS_QUERY = `#graphql
  query ZTweaksProducts {
    products(first: 10, sortKey: CREATED_AT) {
      nodes {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
            selectedOptions { name value }
          }
        }
        featuredImage { url altText }
        metafields(identifiers: [
          { namespace: "ztweaks", key: "category" }
          { namespace: "ztweaks", key: "video"    }
          { namespace: "ztweaks", key: "tags"     }
          { namespace: "ztweaks", key: "badge"    }
          { namespace: "ztweaks", key: "original_price" }
          { namespace: "ztweaks", key: "featured" }
          { namespace: "ztweaks", key: "period"   }
        ]) { key value }
      }
    }
  }
` as const;

interface ShapedProduct {
  id: string;
  name: string;
  cat: string;
  desc: string;
  price: string;
  period: string;
  tags: string[];
  featured: boolean;
  badge: string | null;
  originalPrice: string | null;
  video: string | null;
  image: string | null;
  variantId: string | null;
  available: boolean;
  checkoutUrl: string;
}

export async function loader({context}: Route.LoaderArgs) {
  const {storefront} = context;
  try {
    const {products} = await storefront.query(PRODUCTS_QUERY);
    const shaped: ShapedProduct[] = products.nodes.map((p: any) => {
      const meta = Object.fromEntries(
        (p.metafields ?? []).filter(Boolean).map((m: {key: string; value: string}) => [m.key, m.value]),
      );
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      const currency =
        p.priceRange.minVariantPrice.currencyCode === 'USD'
          ? '$'
          : p.priceRange.minVariantPrice.currencyCode;
      return {
        id: p.handle,
        name: p.title,
        cat: meta.category ?? 'Product',
        desc: p.description,
        price: `${currency}${price % 1 === 0 ? price : price.toFixed(2)}`,
        period: meta.period ?? 'one-time',
        tags: meta.tags ? JSON.parse(meta.tags) : [],
        featured: meta.featured === 'true',
        badge: meta.badge ?? null,
        originalPrice: meta.original_price ?? null,
        video: meta.video ?? null,
        image: p.featuredImage?.url ?? null,
        variantId: p.variants.nodes[0]?.id ?? null,
        available: p.variants.nodes[0]?.availableForSale ?? false,
        checkoutUrl: `/cart/${p.variants.nodes[0]?.id.split('/').pop()}:1`,
      };
    });
    return {products: shaped, source: 'shopify' as const};
  } catch {
    return {products: STATIC_PRODUCTS, source: 'static' as const};
  }
}

const STATIC_PRODUCTS: ShapedProduct[] = [
  {
    id: 'core',
    cat: 'Optimization Suite',
    name: 'ZTweaks Core',
    desc: 'Full system optimization targeting scheduler, memory, GPU pipeline, and network stack. The foundational tweak package for any serious setup.',
    price: '$24',
    period: 'one-time',
    tags: ['Windows 10/11', 'OS-Level', 'Registry'],
    featured: false,
    badge: null,
    originalPrice: null,
    video: '/videos/ProTweaks.mp4',
    image: null,
    variantId: null,
    checkoutUrl: '#',
    available: true,
  },
  {
    id: 'macro',
    cat: 'Macro Automation',
    name: 'Macro Pro Pack',
    desc: '200+ battle-tested macro sequences for top competitive titles. Drag-and-drop profile management with hardware-level timing precision.',
    price: '$19',
    period: 'per month',
    tags: ['All Games', 'Sub-1ms', 'Profiles'],
    featured: false,
    badge: null,
    originalPrice: null,
    video: '/videos/Macro.mp4',
    image: null,
    variantId: null,
    checkoutUrl: '#',
    available: true,
  },
  {
    id: 'network',
    cat: 'Network Tuning',
    name: 'Network Stack+',
    desc: 'Eliminate packet jitter, fix bufferbloat, and reduce ping variance. One-click profiles for fibre, cable, and 5G connections.',
    price: '$14',
    period: 'one-time',
    tags: ['TCP/IP', 'DNS', 'Bufferbloat'],
    featured: false,
    badge: null,
    originalPrice: null,
    video: null,
    image: null,
    variantId: null,
    checkoutUrl: '#',
    available: true,
  },
  {
    id: 'bundle',
    cat: 'Complete Bundle',
    name: 'Elite Bundle',
    desc: 'Everything in ZTweaks — Core optimizations, macro library, network tuning, GPU pipeline, and direct Discord support with our engineers. For life.',
    price: '$39',
    period: 'lifetime',
    tags: ['All Products', 'Priority Support', 'Lifetime Updates'],
    featured: true,
    badge: '★ Best Value',
    originalPrice: '$57',
    video: '/videos/ZeroDelay.mp4',
    image: null,
    variantId: null,
    checkoutUrl: '#',
    available: true,
  },
];

function FallbackThumb({id}: {id: string}) {
  const patterns: Record<string, React.ReactNode> = {
    core: (
      <svg width="100%" height="100%" viewBox="0 0 400 220" className="absolute inset-0 opacity-[0.06]">
        {Array.from({length: 8}, (_, r) =>
          Array.from({length: 12}, (_, c) => (
            <rect key={`${r}-${c}`} x={c * 36 + 10} y={r * 28 + 10} width={22} height={18} rx={3}
              fill="none" stroke="white" strokeWidth={0.8} />
          ))
        )}
        <polyline points="20,180 80,130 140,150 200,80 260,100 320,40 380,60"
          fill="none" stroke="white" strokeWidth={1.5} opacity={0.4} />
      </svg>
    ),
    macro: (
      <svg width="100%" height="100%" viewBox="0 0 400 220" className="absolute inset-0 opacity-[0.07]">
        <circle cx="200" cy="110" r="80" fill="none" stroke="white" strokeWidth={0.8} />
        <circle cx="200" cy="110" r="55" fill="none" stroke="white" strokeWidth={0.5} />
        <circle cx="200" cy="110" r="30" fill="none" stroke="white" strokeWidth={0.5} />
        <line x1="200" y1="110" x2="250" y2="60" stroke="white" strokeWidth={1.5} />
        <line x1="200" y1="110" x2="200" y2="55" stroke="white" strokeWidth={1} />
        <circle cx="200" cy="110" r="5" fill="white" opacity={0.6} />
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return <line key={i}
            x1={200 + Math.cos(rad) * 78} y1={110 + Math.sin(rad) * 78}
            x2={200 + Math.cos(rad) * 85} y2={110 + Math.sin(rad) * 85}
            stroke="white" strokeWidth={1} />;
        })}
      </svg>
    ),
    network: (
      <svg width="100%" height="100%" viewBox="0 0 400 220" className="absolute inset-0 opacity-[0.07]">
        {([[200,110],[120,60],[280,60],[100,160],[300,160],[200,30],[50,110],[350,110]] as [number,number][]).map(([cx,cy],i)=>
          <circle key={i} cx={cx} cy={cy} r={i===0?8:5} fill="white" opacity={i===0?0.5:0.3}/>
        )}
        {([[200,110,120,60],[200,110,280,60],[200,110,100,160],[200,110,300,160],[120,60,200,30],[280,60,350,110],[100,160,50,110]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i)=>
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth={0.7}/>
        )}
      </svg>
    ),
    bundle: (
      <svg width="100%" height="100%" viewBox="0 0 400 220" className="absolute inset-0 opacity-[0.06]">
        <defs>
          <pattern id="bg-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0L0 0L0 30" fill="none" stroke="white" strokeWidth={0.5}/>
          </pattern>
        </defs>
        <rect width="400" height="220" fill="url(#bg-grid)" />
        <rect x="120" y="60" width="160" height="100" rx="8" fill="none" stroke="white" strokeWidth={1} opacity={0.4} />
        <line x1="155" y1="95" x2="245" y2="95" stroke="white" strokeWidth={1} />
        <line x1="155" y1="110" x2="220" y2="110" stroke="white" strokeWidth={1} />
        <line x1="155" y1="125" x2="235" y2="125" stroke="white" strokeWidth={1} />
      </svg>
    ),
  };
  return <>{patterns[id] ?? null}</>;
}

function ProductThumb({
  id,
  video,
  image,
  label,
  small = false,
}: {
  id: string;
  video: string | null;
  image: string | null;
  label: string;
  small?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [videoErrored, setVideoErrored] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = video && !videoErrored;

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-full bg-black/40 overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)'}} />

      {showVideo ? (
        <video ref={videoRef} src={video} className="absolute inset-0 w-full h-full object-cover"
          loop muted playsInline
          onError={() => setVideoErrored(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)} />
      ) : image ? (
        <img src={image} alt={label} className="absolute inset-0 w-full h-full object-cover opacity-60" />
      ) : (
        <FallbackThumb id={id} />
      )}

      <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
        style={{
          background: small
            ? 'linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 60%)'
            : 'linear-gradient(to right,transparent 40%,rgba(0,0,0,0.6) 100%)',
          opacity: playing ? 0.4 : 1,
        }} />

      {showVideo && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <button onClick={handlePlay}
            className={`rounded-full border border-white/[0.12] flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10 group ${small ? 'w-11 h-11' : 'w-12 h-12'}`}
            style={{background: 'rgba(255,255,255,0.06)'}}>
            {playing ? (
              <div className="flex gap-[3px]">
                <div className="w-[3px] h-[14px] bg-white/70 rounded-sm" />
                <div className="w-[3px] h-[14px] bg-white/70 rounded-sm" />
              </div>
            ) : (
              <div className="border-t-transparent border-b-transparent border-l-white/70 ml-0.5"
                style={small
                  ? {width:0,height:0,borderTopWidth:7,borderBottomWidth:7,borderLeftWidth:12,borderStyle:'solid',borderTopColor:'transparent',borderBottomColor:'transparent'}
                  : {width:0,height:0,borderTopWidth:8,borderBottomWidth:8,borderLeftWidth:14,borderStyle:'solid',borderTopColor:'transparent',borderBottomColor:'transparent'}
                } />
            )}
          </button>
        </div>
      )}

      <div className="absolute bottom-3 left-4 z-20 font-mono text-[9px] tracking-widest text-white/25 uppercase">
        {label}
      </div>
    </div>
  );
}

export default function Products() {
  const {products, source} = useLoaderData<typeof loader>();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {once: true, margin: '-60px'});

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
            className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4">
            // our arsenal
          </motion.div>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
            transition={{duration:0.7,delay:0.06,ease:[0.22,1,0.36,1]}}
            className="font-display text-[clamp(56px,9vw,110px)] leading-[0.88] tracking-[0.02em] text-white mb-6">
            THE FULL<br /><span className="text-white/[0.18]">LOADOUT</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.18}}
            className="text-white/35 text-[14px] font-light max-w-md leading-relaxed mx-auto">
            Click any product to go straight to checkout. Every tool ships with a 30-day satisfaction guarantee.
          </motion.p>
          {source === 'static' && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
              <span className="font-mono text-[9px] tracking-widest text-white/25 uppercase">Preview mode — connect Shopify to go live</span>
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section ref={ref} className="pb-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((p, i) => (
            <motion.div key={p.id}
              initial={{opacity:0,y:28}} animate={inView ? {opacity:1,y:0} : {}}
              transition={{duration:0.65,delay:i*0.09,ease:[0.22,1,0.36,1]}}
              className={p.featured ? 'md:col-span-2' : ''}>

              <a href={p.checkoutUrl} className="block group">
                <div className={`glass-card overflow-hidden ${p.featured ? 'border-white/[0.12]' : ''}`}>

                  {p.featured ? (
                    <div className="grid md:grid-cols-2">
                      <div className="relative aspect-video md:aspect-auto min-h-[200px]">
                        {p.badge && (
                          <div className="absolute top-4 left-4 z-30">
                            <span className="font-mono text-[9px] tracking-[0.15em] text-white/60 uppercase px-3 py-1.5 bg-white/[0.08] border border-white/[0.12] rounded-full">
                              {p.badge}
                            </span>
                          </div>
                        )}
                        <ProductThumb id={p.id} video={p.video} image={p.image} label="Full Walkthrough" small={false} />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="font-mono text-[9px] tracking-[0.18em] text-white/30 uppercase mb-3">{p.cat}</div>
                        <div className="font-display text-[38px] tracking-wider text-white mb-4">{p.name}</div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {p.tags.map((t) => (
                            <span key={t} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded-md font-mono text-[9px] tracking-widest text-white/30 uppercase">{t}</span>
                          ))}
                        </div>
                        <p className="text-[13px] text-white/38 leading-relaxed font-light mb-6">{p.desc}</p>
                        <div className="flex items-end justify-between">
                          <div>
                            {p.originalPrice && (
                              <div className="font-mono text-[10px] text-white/25 line-through tracking-wider mb-1">{p.originalPrice} separately</div>
                            )}
                            <div className="font-display text-[36px] tracking-wider text-white leading-none">
                              {p.price}
                              <span className="font-mono text-[11px] text-white/30 tracking-widest ml-2">/{p.period}</span>
                            </div>
                          </div>
                          <div className="px-6 py-3 bg-white text-z-black text-[12px] font-semibold tracking-wider rounded-xl group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:-translate-y-0.5">
                            {p.available ? 'Get Bundle →' : 'Sold Out'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative aspect-video">
                        <ProductThumb id={p.id} video={p.video} image={p.image} label="Preview Available" small={true} />
                      </div>
                      <div className="p-6">
                        <div className="font-mono text-[9px] tracking-[0.18em] text-white/30 uppercase mb-2">{p.cat}</div>
                        <div className="font-display text-[26px] tracking-wider text-white mb-3">{p.name}</div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {p.tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded font-mono text-[9px] tracking-widest text-white/[0.28] uppercase">{t}</span>
                          ))}
                        </div>
                        <p className="text-[12px] text-white/35 leading-relaxed font-light mb-5">{p.desc}</p>
                        <div className="flex items-center justify-between">
                          <div className="font-display text-[24px] tracking-wider text-white">
                            {p.price}
                            <span className="font-mono text-[9px] text-white/30 tracking-widest ml-1.5">/{p.period}</span>
                          </div>
                          <div className="px-4 py-2 bg-white/[0.05] border border-white/10 text-white/75 text-[11px] font-semibold tracking-wider rounded-lg group-hover:bg-white group-hover:text-z-black group-hover:border-transparent transition-all duration-300">
                            {p.available ? 'Get Access →' : 'Sold Out'}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
