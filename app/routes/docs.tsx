import {useRef, useState} from 'react';
import {motion, useInView} from 'motion/react';
import {Link} from 'react-router';
import {RiCheckLine, RiAlertLine} from 'react-icons/ri';

export const meta = () => [
  {title: 'Docs | ZTweaks'},
  {name: 'description', content: 'Installation guides, product references, and setup instructions for all ZTweaks products.'},
  {property: 'og:title', content: 'Docs | ZTweaks'},
  {property: 'og:description', content: 'Installation guides, product references, and setup instructions for all ZTweaks products.'},
];

const sections = [
  {id: 'requirements', label: 'Requirements'},
  {id: 'quickstart', label: 'Quick Start'},
  {id: 'products', label: 'Products'},
  {id: 'rollback', label: 'Rollback'},
  {id: 'support', label: 'Support'},
];

const products = [
  {
    name: 'ZTweaks Core',
    cat: 'Optimization Suite',
    desc: 'The foundational package. Targets Windows scheduler, IRQ affinity, power plan configuration, memory management, and GPU pipeline. Apply to any serious competitive setup before anything else.',
    steps: [
      'Run ZTweaks Core installer as Administrator',
      'Select your hardware profile (CPU tier, GPU vendor)',
      'Choose optimization level: Conservative, Balanced, or Aggressive',
      'Click Apply , a restore point is created automatically before any change',
      'Reboot when prompted',
    ],
  },
  {
    name: 'Macro Pro Pack',
    cat: 'Macro Automation',
    desc: '200+ macro sequences for top competitive titles, built with hardware-level timing precision. Supports drag-and-drop profile management and per-game configuration.',
    steps: [
      'Install Macro Pro Pack and launch the manager',
      'Select your game from the profile list',
      'Import or edit macro sequences in the visual editor',
      'Assign macros to mouse buttons or keyboard keys',
      'Enable the runtime overlay to confirm macros are active in-game',
    ],
  },
  {
    name: 'Network Stack+',
    cat: 'Network Tuning',
    desc: 'Eliminates packet jitter, fixes bufferbloat, and reduces ping variance. One-click profiles tuned for fibre, cable, and 5G connections.',
    steps: [
      'Run Network Stack+ as Administrator',
      'Click "Detect Connection" to auto-identify your ISP type',
      'Select your connection profile or configure manually',
      'Apply , TCP/IP stack, DNS, and buffer settings are updated instantly',
      'Run the built-in latency test to confirm improvement',
    ],
  },
];

export default function Docs() {
  const [active, setActive] = useState('requirements');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, margin: '-60px'});

  return (
    <>
      <section className="pt-36 pb-10 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
          className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4"
        >
          // documentation
        </motion.div>
        <motion.h1
          initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1]}}
          className="font-display text-[clamp(48px,7vw,90px)] leading-[0.88] tracking-[0.02em] text-white mb-4"
        >
          DOCS
        </motion.h1>
        <motion.p
          initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.15}}
          className="text-white/40 text-[14px] font-light leading-relaxed max-w-md"
        >
          Everything you need to install, configure, and get the most out of every ZTweaks product.
        </motion.p>
      </section>

      <section ref={ref} className="px-6 md:px-12 pb-28 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <motion.div
            initial={{opacity: 0, x: -12}} animate={inView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.6}}
            className="md:w-48 shrink-0"
          >
            <div className="sticky top-28 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`whitespace-nowrap px-3 py-2 rounded-lg text-left font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                    active === s.id
                      ? 'bg-white/8 text-white border border-white/10'
                      : 'text-white/30 hover:text-white/55'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.6, delay: 0.1}}
            className="flex-1 min-w-0"
          >

            {active === 'requirements' && (
              <div className="space-y-4">
                <h2 className="font-display text-[28px] tracking-wider text-white mb-6">System Requirements</h2>
                <div className="glass-card p-7">
                  <h3 className="text-[13px] font-semibold text-white/80 mb-4 uppercase tracking-wider">Minimum</h3>
                  <ul className="space-y-2">
                    {[
                      'Windows 10 (version 1903 or later) or Windows 11',
                      'Intel Core i5 / AMD Ryzen 5 or better',
                      '8 GB RAM',
                      'Administrator account privileges',
                      '200 MB free disk space',
                    ].map((req) => (
                      <li key={req} className="flex items-start gap-3 text-[13px] text-white/40 font-light">
                        <RiCheckLine className="text-white/30 mt-0.5 shrink-0" size={14} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-7">
                  <h3 className="text-[13px] font-semibold text-white/80 mb-4 uppercase tracking-wider">Recommended</h3>
                  <ul className="space-y-2">
                    {[
                      'Windows 11 22H2 or later',
                      'Intel Core i7 / AMD Ryzen 7 or better',
                      '16 GB RAM (dual-channel)',
                      'Dedicated GPU (NVIDIA or AMD)',
                      'SSD system drive',
                    ].map((req) => (
                      <li key={req} className="flex items-start gap-3 text-[13px] text-white/40 font-light">
                        <RiCheckLine className="text-white/30 mt-0.5 shrink-0" size={14} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-white/8 bg-white/2">
                  <RiAlertLine className="text-white/30 mt-0.5 shrink-0" size={16} />
                  <p className="text-[13px] text-white/38 font-light leading-relaxed">
                    ZTweaks is Windows-only. macOS and Linux are not supported. All products require an active internet connection to verify your license on first launch.
                  </p>
                </div>
              </div>
            )}

            {active === 'quickstart' && (
              <div className="space-y-4">
                <h2 className="font-display text-[28px] tracking-wider text-white mb-6">Quick Start</h2>
                <div className="glass-card p-7">
                  <p className="text-[13px] text-white/40 font-light leading-relaxed mb-6">
                    Follow these steps after purchasing any ZTweaks product. The entire process takes under 10 minutes.
                  </p>
                  <ol className="space-y-5">
                    {[
                      {step: '01', title: 'Check your email', desc: 'After purchase you\'ll receive a license key and download link. Check your spam folder if it doesn\'t arrive within 5 minutes.'},
                      {step: '02', title: 'Download the installer', desc: 'Click the download link in your email. Your browser may flag the file , this is expected for system-level tools. Click "Keep" or "Allow" to proceed.'},
                      {step: '03', title: 'Run as Administrator', desc: 'Right-click the installer and select "Run as administrator". This is required to apply system-level optimizations.'},
                      {step: '04', title: 'Enter your license key', desc: 'Paste your license key when prompted. Each key can be activated on up to 2 machines simultaneously.'},
                      {step: '05', title: 'Apply and reboot', desc: 'Select your preferred optimization profile and click Apply. A system restore point is created automatically. Reboot when prompted to finalize all changes.'},
                    ].map((item) => (
                      <li key={item.step} className="flex gap-5">
                        <span className="font-display text-[20px] text-white/10 tracking-wider shrink-0">{item.step}</span>
                        <div>
                          <div className="text-[13px] font-semibold text-white/80 mb-1">{item.title}</div>
                          <div className="text-[13px] text-white/38 font-light leading-relaxed">{item.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {active === 'products' && (
              <div className="space-y-5">
                <h2 className="font-display text-[28px] tracking-wider text-white mb-6">Product Guides</h2>
                {products.map((p) => (
                  <div key={p.name} className="glass-card p-7">
                    <div className="font-mono text-[9px] tracking-[0.18em] text-white/28 uppercase mb-2">{p.cat}</div>
                    <h3 className="font-display text-[22px] tracking-wider text-white mb-3">{p.name}</h3>
                    <p className="text-[13px] text-white/38 font-light leading-relaxed mb-5">{p.desc}</p>
                    <div className="font-mono text-[9px] tracking-[0.15em] text-white/28 uppercase mb-3">Installation Steps</div>
                    <ol className="space-y-2">
                      {p.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-[13px] text-white/40 font-light">
                          <span className="font-mono text-[10px] text-white/20 mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}

            {active === 'rollback' && (
              <div className="space-y-4">
                <h2 className="font-display text-[28px] tracking-wider text-white mb-6">Rollback & Safety</h2>
                <div className="glass-card p-7">
                  <p className="text-[13px] text-white/40 font-light leading-relaxed mb-6">
                    Every ZTweaks product creates a full system restore point before applying any changes. If you ever want to undo everything, you have two options.
                  </p>
                  <div className="space-y-5">
                    <div>
                      <div className="text-[13px] font-semibold text-white/80 mb-2">Option 1 , One-Click Rollback (recommended)</div>
                      <p className="text-[13px] text-white/38 font-light leading-relaxed">Open the ZTweaks app, go to Settings → Restore, and click "Roll Back All Changes". This reverts every modification made by ZTweaks and leaves the rest of your system untouched.</p>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div>
                      <div className="text-[13px] font-semibold text-white/80 mb-2">Option 2 , Windows System Restore</div>
                      <p className="text-[13px] text-white/38 font-light leading-relaxed">Search for "Create a restore point" in Windows, click "System Restore", and select the restore point labelled "ZTweaks , [date]". This restores your entire OS to the pre-ZTweaks state.</p>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div>
                      <div className="text-[13px] font-semibold text-white/80 mb-2">What ZTweaks never touches</div>
                      <ul className="space-y-1.5 mt-2">
                        {[
                          'Your personal files and documents',
                          'Third-party software and game files',
                          'Browser data or saved credentials',
                          'GPU driver versions (we only configure, not replace)',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[13px] text-white/38 font-light">
                            <RiCheckLine className="text-white/25 mt-0.5 shrink-0" size={14} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === 'support' && (
              <div className="space-y-4">
                <h2 className="font-display text-[28px] tracking-wider text-white mb-6">Getting Support</h2>
                <div className="glass-card p-7">
                  <p className="text-[13px] text-white/40 font-light leading-relaxed mb-6">
                    We offer support through two channels. Discord is fastest for technical issues; email is best for billing and account questions.
                  </p>
                  <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-white/2 border border-white/5">
                      <div className="text-[13px] font-semibold text-white/80 mb-1">Discord , #support channel</div>
                      <p className="text-[12px] text-white/35 font-light leading-snug mb-3">Typical response within 1–3 hours. Include your OS version, product name, and a description of the issue.</p>
                      <a href="https://discord.gg/WjAZH8KUWd" target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#6875f5] text-white text-[11px] font-semibold tracking-wider rounded-lg transition-all duration-300">
                        Open Discord →
                      </a>
                    </div>
                    <div className="p-5 rounded-xl bg-white/2 border border-white/5">
                      <div className="text-[13px] font-semibold text-white/80 mb-1">Email , hello@ztweaks.com</div>
                      <p className="text-[12px] text-white/35 font-light leading-snug mb-3">Response within 24 hours on business days. Include your order number for billing issues.</p>
                      <a href="mailto:hello@ztweaks.com"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-[11px] font-semibold tracking-wider rounded-lg transition-all duration-300">
                        Send Email →
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl border border-white/[0.07] bg-white/2 text-center">
                  <p className="text-[13px] text-white/38 font-light mb-3">Can't find what you're looking for?</p>
                  <Link to="/faq" className="font-mono text-[11px] tracking-widest text-white/50 uppercase hover:text-white/80 transition-colors duration-200">
                    Browse the FAQ →
                  </Link>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </section>
    </>
  );
}
