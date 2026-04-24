import {useRef} from 'react';
import {motion, useInView} from 'motion/react';
import {Link} from 'react-router';
import {FaDiscord} from 'react-icons/fa';
import {RiBookOpenLine, RiQuestionLine} from 'react-icons/ri';

export const meta = () => [
  {title: 'About | ZTweaks'},
  {name: 'description', content: 'Built by competitive gamers who refused to leave FPS on the table.'},
  {property: 'og:title', content: 'About | ZTweaks'},
  {property: 'og:description', content: 'Built by competitive gamers who refused to leave FPS on the table.'},
];

const values = [
  {num: '01', title: 'Transparency First', desc: 'Every tweak is documented. You always know exactly what changed, which registry key was touched, and why.'},
  {num: '02', title: 'Safety by Default', desc: 'Full system snapshot before any change. One-click rollback to your exact original state, guaranteed.'},
  {num: '03', title: 'Community-Driven', desc: 'Our roadmap is shaped entirely by our Discord community of 5,000+ players. If the community wants it, it ships.'},
  {num: '04', title: 'Always Improving', desc: 'Lifetime updates ship with every purchase. What you buy today gets better forever , no upgrade fees, ever.'},
];

const team = [
  {initials: 'Z', name: 'Zuls', role: 'Founder & Lead Engineer'},
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, margin: '-60px'});

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-8 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
            className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4"
          >
            // our story
          </motion.div>
          <motion.h1
            initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1]}}
            className="font-display text-[clamp(52px,9vw,110px)] leading-[0.88] tracking-[0.02em] text-white"
          >
            WE PLAY.<br /><span className="text-white/60">WE OPTIMIZE.</span><br />WE WIN.
          </motion.h1>
        </div>
      </section>

      {/* Mission pullquote */}
      <section className="px-6 md:px-12 pb-8 max-w-6xl mx-auto">
        <motion.div
          initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 0.3}}
          className="relative rounded-2xl border border-white/[0.07] bg-white/2 p-10 md:p-14 overflow-hidden"
        >
          <div className="absolute top-0 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <img src="/favicon.svg" alt="ZTweaks" className="w-12 h-12 rounded-full absolute top-5 right-8 select-none opacity-60" />
          <p className="font-display text-[clamp(26px,4vw,48px)] leading-[1.05] tracking-[0.02em] text-white mb-5">
            Built by players<br />
            <span className="text-white/20">who got tired of</span><br />
            leaving FPS on the table.
          </p>
          <p className="text-[14px] text-white/38 font-light leading-relaxed max-w-lg">
            ZTweaks was born from a simple frustration: elite hardware being held back by bloated OS defaults.
            We set out to fix every layer of the stack , from registry to router , so your rig finally performs
            the way it was built to.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section ref={ref} className="px-6 md:px-12 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Mission */}
          <motion.div
            initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.6, delay: 0.0}}
          >
            <div className="glass-card p-8 h-full">
              <h2 className="font-display text-[22px] tracking-wider text-white mb-5">THE MISSION</h2>
              <p className="text-[14px] text-white/40 leading-relaxed font-light mb-4">
                Every optimization we ship is <strong className="text-white/70 font-medium">tested under real competitive conditions</strong> , not synthetic benchmarks, not isolated lab scenarios. If it doesn't hold up in ranked, it doesn't ship.
              </p>
              <p className="text-[14px] text-white/40 leading-relaxed font-light">
                No bloatware. No hidden subscriptions. No vague promises. Every claim we make is <strong className="text-white/70 font-medium">backed by reproducible data</strong> and a 30-day satisfaction guarantee.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.6, delay: 0.1}}
          >
            <div className="glass-card p-8 h-full">
              <h2 className="font-display text-[22px] tracking-wider text-white mb-5">CORE VALUES</h2>
              <div className="flex flex-col gap-3">
                {values.map((v) => (
                  <div key={v.num} className="flex items-start gap-4 p-3.5 rounded-xl bg-white/2 border border-white/5">
                    <span className="font-display text-[20px] text-white/12 tracking-wider mt-0.5 shrink-0">{v.num}</span>
                    <div>
                      <div className="text-[13px] font-semibold text-white/80 mb-0.5">{v.title}</div>
                      <div className="text-[12px] text-white/32 font-light leading-snug">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            className="md:col-span-2"
            initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.6, delay: 0.18}}
          >
            <div className="glass-card p-8">
              <h2 className="font-display text-[22px] tracking-wider text-white mb-3">THE TEAM</h2>
              <p className="text-[13px] text-white/35 font-light mb-6 leading-relaxed">
                A small, focused crew of competitive gamers, systems engineers, and performance obsessives. We keep the team intentionally lean , everyone ships.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {team.map((m) => (
                  <div key={m.initials} className="flex items-center gap-3 p-4 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 hover:bg-white/4 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center font-display text-[13px] tracking-wider text-white/55 shrink-0">{m.initials}</div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-white truncate">{m.name}</div>
                      <div className="font-mono text-[9px] tracking-[0.08em] text-white/28 uppercase truncate">{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            className="md:col-span-2"
            initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.6, delay: 0.22}}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/docs" className="group relative rounded-2xl border border-white/[0.07] bg-white/2 p-7 overflow-hidden hover:border-white/13 hover:bg-white/4 transition-all duration-300">
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.07] flex items-center justify-center text-white/50">
                    <RiBookOpenLine size={16} />
                  </div>
                  <span className="font-mono text-[18px] text-white/15 group-hover:text-white/30 transition-colors duration-300">→</span>
                </div>
                <div className="font-display text-[20px] tracking-wider text-white mb-1.5">DOCUMENTATION</div>
                <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase leading-relaxed">Guides, references &amp; setup instructions</p>
              </Link>

              <Link to="/faq" className="group relative rounded-2xl border border-white/[0.07] bg-white/2 p-7 overflow-hidden hover:border-white/13 hover:bg-white/4 transition-all duration-300">
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/[0.07] flex items-center justify-center text-white/50">
                    <RiQuestionLine size={16} />
                  </div>
                  <span className="font-mono text-[18px] text-white/15 group-hover:text-white/30 transition-colors duration-300">→</span>
                </div>
                <div className="font-display text-[20px] tracking-wider text-white mb-1.5">FAQ</div>
                <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase leading-relaxed">Common questions, answered</p>
              </Link>
            </div>
          </motion.div>

          {/* Discord CTA */}
          <motion.div
            className="md:col-span-2"
            initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.6, delay: 0.26}}
          >
            <div className="relative rounded-2xl border border-dashed border-white/8 p-12 text-center overflow-hidden">
              <div className="absolute inset-0 rounded-2xl" style={{background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 60%)'}} />
              <div className="relative z-10">
                <div className="font-display text-[clamp(30px,5vw,54px)] tracking-wider text-white mb-3">JOIN 5,000+ PLAYERS</div>
                <p className="text-[14px] text-white/38 font-light mb-8 max-w-sm mx-auto leading-relaxed">
                  Get support, share configs, and stay ahead of every update inside our community.
                </p>
                <a
                  href="https://discord.gg/WjAZH8KUWd"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#6875f5] text-white text-[13px] font-semibold tracking-wider rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(88,101,242,0.4)] hover:-translate-y-0.5"
                >
                  <FaDiscord size={16} />
                  Join the Discord
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
