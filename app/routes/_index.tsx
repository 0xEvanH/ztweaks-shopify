import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router';
import {
  RiCpuLine,
  RiTerminalBoxLine,
  RiWifiLine,
  RiStackLine,
  RiPulseLine,
  RiShieldCheckLine,
} from 'react-icons/ri';
import { FaDiscord } from 'react-icons/fa';

export const meta = () => [
  { title: 'ZTweaks | Maximum Performance, Zero Lag' },
  { name: 'description', content: 'Elite PC optimization and macro automation for competitive players.' },
  { property: 'og:title', content: 'ZTweaks | Maximum Performance, Zero Lag' },
  { property: 'og:description', content: 'Elite PC optimization and macro automation for competitive players. Maximum performance, zero lag.' },
];

const heroStats = [
  { val: '5,000+', label: 'Active Users' },
  { val: '99.9%',  label: 'Satisfaction' },
  { val: '24/7',   label: 'Support' },
];

const features = [
  {
    icon: RiCpuLine,
    num: '01',
    title: 'OS-Level Tweaks',
    desc: 'Deep Windows optimization targeting scheduler priorities, IRQ balancing, and power plan configuration for maximum sustained throughput.',
  },
  {
    icon: RiTerminalBoxLine,
    num: '02',
    title: 'Precision Macros',
    desc: 'Sub-millisecond macro automation built for competitive play. Custom profiles for any game, any scenario, any hardware.',
  },
  {
    icon: RiWifiLine,
    num: '03',
    title: 'Network Stack',
    desc: 'TCP/IP tuning, DNS optimization, and buffer configuration to reduce network jitter and stabilize packet delivery under load.',
  },
  {
    icon: RiStackLine,
    num: '04',
    title: 'GPU Pipeline',
    desc: 'Driver-level configuration and render queue optimization designed to push your GPU to its true ceiling.',
  },
  {
    icon: RiPulseLine,
    num: '05',
    title: 'Real-Time Monitor',
    desc: 'Live performance telemetry: FPS, 1% lows, input latency, and system load in a minimal overlay.',
  },
  {
    icon: RiShieldCheckLine,
    num: '06',
    title: 'Safe & Reversible',
    desc: 'Full system snapshot before any change. Restore your exact original configuration in one click, any time.',
  },
];

const tickerItems = [
  'PC Optimization', 'Macro Automation', 'Zero Input Lag', 'Maximum FPS',
  'Registry Tweaks', 'Network Stack', 'GPU Pipeline', 'Elite Performance',
];

const bottomStats = [
  { val: '5K+',    label: 'Active Users',       desc: 'and growing daily' },
  { val: '340ms',  label: 'Avg. Latency Cut',   desc: 'across all products' },
  { val: '6',      label: 'Products',           desc: 'ready out of the box' },
  { val: '+150fps',label: 'Avg. Frame Rate Gain',desc: 'using our products' },
];

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden text-center">
      {/* Horizontal accent lines */}
      <div className="absolute left-0 right-0 top-1/3 h-px bg-linear-to-r from-transparent via-white/4 to-transparent pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-1/3 h-px bg-linear-to-r from-transparent via-white/4 to-transparent pointer-events-none" />

      {/* Corner brackets */}
      <div className="absolute top-24 left-8 hidden lg:block">
        <div className="w-5 h-5 border-l border-t border-white/10" />
      </div>
      <div className="absolute top-24 right-8 hidden lg:block">
        <div className="w-5 h-5 border-r border-t border-white/10" />
      </div>
      <div className="absolute bottom-16 left-8 hidden lg:block">
        <div className="w-5 h-5 border-l border-b border-white/10" />
      </div>
      <div className="absolute bottom-16 right-8 hidden lg:block">
        <div className="w-5 h-5 border-r border-b border-white/10" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">

        {/* Badge - matches Badge component pattern */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/8 bg-white/4 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-25" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/50" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-white/40 uppercase">
            5,000+ Active Users
          </span>
        </motion.div>

        {/* Title - matches HeroSection font-display pattern */}
        <h1 className="font-display text-[clamp(64px,10vw,128px)] leading-[0.88] tracking-[0.02em] mb-8">
          <motion.span
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="text-white block"
          >
            ELITE GAMING
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/60 block"
          >
            PERFORMANCE
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/40 text-[15px] font-light leading-relaxed max-w-lg mb-10"
        >
          ZTweaks delivers next-generation PC optimization and macro automation,
          engineered for players who refuse to leave a single frame on the table.
        </motion.p>

        {/* CTAs - matches HeroSection button styles exactly */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-3 justify-center mb-14"
        >
          <Link
            to="/products"
            className="px-7 py-3.5 bg-white text-black text-[13px] font-semibold tracking-wider rounded-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.18)] hover:-translate-y-0.5"
          >
            View Products
          </Link>
          <a
            href="https://discord.gg/WjAZH8KUWd"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/4 border border-white/10 text-white/70 text-[13px] font-medium tracking-wider rounded-xl transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:text-white hover:-translate-y-0.5"
          >
            <FaDiscord className="text-[15px]" />
            Join Discord
          </a>
        </motion.div>

        {/* Stats row - matches HeroSection stats pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex gap-10 items-center justify-center"
        >
          {heroStats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-display text-[28px] tracking-wider text-white">{s.val}</span>
              <span className="font-mono text-[9px] tracking-[0.18em] text-white/30 uppercase mt-0.5">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function TickerSection() {
  return (
    <div
      className="relative overflow-hidden border-y border-white/5 py-3"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div className="flex w-max animate-ticker">
        {[...Array(2)].flatMap((_, arrIdx) =>
          tickerItems.map((item, i) => (
            <span
              key={`${arrIdx}-${i}`}
              className="inline-flex items-center gap-4 px-8 font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase whitespace-nowrap"
            >
              {item}
              <span className="text-white/8">◆</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative z-10 py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section header - matches FeaturesSection pattern */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4"
        >
          // what we do
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(48px,7vw,88px)] leading-[0.9] tracking-[0.02em] text-white mb-5"
        >
          BUILT FOR THE<br />
          <span className="text-white/60">COMPETITIVE EDGE</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/35 text-[14px] font-light leading-relaxed max-w-md mx-auto"
        >
          Every millisecond is contested. Our toolset eliminates every source of
          latency between your brain and your screen.
        </motion.p>
      </div>

      {/* Grid - matches FeaturesSection gap-4 pattern */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 rounded-xl border border-white/8 bg-white/2 backdrop-blur-sm group transition-colors duration-300 hover:bg-white/4"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/7 flex items-center justify-center">
                  <Icon className="text-white/50 group-hover:text-white/70 transition-colors duration-300 text-[17px]" />
                </div>
                <span className="font-mono text-[11px] text-white/10 tracking-widest">{f.num}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-3 tracking-tight">{f.title}</h3>
              <p className="text-[13px] text-white/35 leading-relaxed font-light">{f.desc}</p>
              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative z-10 py-16 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.9 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto rounded-2xl border border-white/[0.07] bg-white/2 backdrop-blur-sm overflow-hidden"
      >
        {/* Top glow line */}
        <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/6">
          {bottomStats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="px-8 py-8 text-center group hover:bg-white/2 transition-colors duration-300"
            >
              <div className="font-display text-[42px] tracking-wider text-white mb-1">{s.val}</div>
              <div className="font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase">{s.label}</div>
              <div className="font-mono text-[9px] tracking-widest text-white/18 mt-0.5">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <>
      <HeroSection />
      <TickerSection />
      <FeaturesSection />
      <StatsSection />
    </>
  );
}