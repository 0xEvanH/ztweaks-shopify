import {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {Link} from 'react-router';

export const meta = () => [
  {title: 'FAQ | ZTweaks'},
  {name: 'description', content: 'Answers to the most common questions about ZTweaks products, safety, and support.'},
  {property: 'og:title', content: 'FAQ | ZTweaks'},
  {property: 'og:description', content: 'Answers to the most common questions about ZTweaks products, safety, and support.'},
];

const groups = [
  {
    label: 'General',
    faqs: [
      {
        q: 'What is ZTweaks?',
        a: 'ZTweaks is a suite of PC optimization tools engineered for competitive gaming. Our products target every layer of the stack , OS scheduler, registry, GPU pipeline, network, and macro automation , to eliminate latency and maximize frames.',
      },
      {
        q: 'Who is ZTweaks for?',
        a: 'Anyone who plays competitive games and wants their hardware to perform the way it was built to. Whether you\'re a casual ranked player or a professional, the gains are real and measurable.',
      },
      {
        q: 'How much FPS improvement can I expect?',
        a: 'Results vary by system, but our users report an average of +150fps on systems that were running well below their hardware ceiling. Older or stock-configured systems typically see the biggest gains.',
      },
    ],
  },
  {
    label: 'Safety',
    faqs: [
      {
        q: 'Is ZTweaks safe? Will it break my PC?',
        a: 'Yes, ZTweaks is safe. Every product creates a full Windows restore point before applying a single change. If anything feels wrong , even after a week , you can roll back to your exact pre-ZTweaks state in one click. We\'ve never had a user lose data from a ZTweaks optimization.',
      },
      {
        q: 'Will I get banned in competitive games?',
        a: 'ZTweaks does not inject code into game processes, does not modify game files, and does not interact with anti-cheat drivers. Our optimizations work at the OS and hardware layer, well outside the scope of any game\'s anti-cheat. We have zero ban reports across 5,000+ users.',
      },
      {
        q: 'Does ZTweaks affect my warranty?',
        a: 'No. ZTweaks makes software-level changes only , registry settings, Windows configuration, and network parameters. No hardware modifications are made and no firmware is touched. Your manufacturer warranty is unaffected.',
      },
      {
        q: 'How do I undo ZTweaks?',
        a: 'Open the ZTweaks app, go to Settings → Restore, and click "Roll Back All Changes". Alternatively, use Windows System Restore and select the restore point labelled "ZTweaks , [date]". See the Docs page for full instructions.',
      },
    ],
  },
  {
    label: 'Compatibility',
    faqs: [
      {
        q: 'What Windows versions are supported?',
        a: 'Windows 10 (version 1903 or later) and Windows 11. All editions are supported , Home, Pro, and Enterprise. macOS and Linux are not supported.',
      },
      {
        q: 'What games does ZTweaks work with?',
        a: 'ZTweaks optimizes the entire system, so it benefits every game. Our macro profiles specifically cover Valorant, CS2, Apex Legends, Fortnite, Warzone, Escape from Tarkov, and Overwatch 2, with more added regularly based on community requests.',
      },
      {
        q: 'Do I need specific hardware?',
        a: 'A minimum of an Intel Core i5 / AMD Ryzen 5 with 8 GB RAM and Windows 10 or 11 is required. A dedicated GPU (NVIDIA or AMD) is recommended to get the most from the GPU pipeline optimization.',
      },
    ],
  },
  {
    label: 'Billing & Access',
    faqs: [
      {
        q: 'How do I receive my product after purchasing?',
        a: 'Your license key and download link are emailed to you immediately after checkout. Check your spam folder if it doesn\'t arrive within 5 minutes. If you still don\'t receive it, contact us on Discord or at hello@ztweaks.com.',
      },
      {
        q: 'Can I use my license on multiple PCs?',
        a: 'Each license can be activated on up to 2 machines simultaneously. If you need more, contact support and we\'ll sort it out.',
      },
      {
        q: 'Do I get updates included?',
        a: 'Yes. All one-time purchases include lifetime updates. Subscription products (Macro Pro Pack) receive updates for the duration of the subscription. The Elite Bundle includes lifetime updates for every product, forever.',
      },
      {
        q: 'What is your refund policy?',
        a: 'We offer a 30-day satisfaction guarantee on all products. If you\'re not happy for any reason, email hello@ztweaks.com with your order number and we\'ll issue a full refund, no questions asked.',
      },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <section className="pt-36 pb-10 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
          className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4"
        >
          // faq
        </motion.div>
        <motion.h1
          initial={{opacity: 0, y: 24}} animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1]}}
          className="font-display text-[clamp(48px,7vw,90px)] leading-[0.88] tracking-[0.02em] text-white mb-6"
        >
          QUESTIONS
        </motion.h1>
        <motion.p
          initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.15}}
          className="text-white/40 text-[14px] font-light leading-relaxed max-w-md"
        >
          The most common questions about ZTweaks, answered. Can't find what you're looking for?{' '}
          <Link to="/contact" className="text-white/60 hover:text-white underline underline-offset-2 transition-colors duration-200">Get in touch.</Link>
        </motion.p>
      </section>

      <section className="px-6 md:px-12 pb-28 max-w-4xl mx-auto">
        <div className="space-y-10">
          {groups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.2 + gi * 0.08}}
            >
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/25 uppercase mb-3">{group.label}</div>
              <div className="flex flex-col gap-2">
                {group.faqs.map((faq, i) => {
                  const key = `${gi}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={key} className="rounded-2xl border border-white/[0.07] bg-white/2 overflow-hidden">
                      <button
                        onClick={() => setOpen(isOpen ? null : key)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left group"
                      >
                        <span className="text-[14px] font-medium text-white/70 group-hover:text-white transition-colors duration-200 pr-4">{faq.q}</span>
                        <span className={`font-mono text-[18px] text-white/25 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{height: 0, opacity: 0}}
                            animate={{height: 'auto', opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 border-t border-white/5">
                              <p className="text-[13px] text-white/38 font-light leading-relaxed pt-4">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{opacity: 0, y: 16}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.6}}
          className="mt-10 relative rounded-2xl border border-dashed border-white/8 p-10 text-center overflow-hidden"
        >
          <div className="absolute inset-0 rounded-2xl" style={{background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 60%)'}} />
          <div className="relative z-10">
            <div className="font-display text-[clamp(22px,4vw,36px)] tracking-wider text-white mb-2">Still have a question?</div>
            <p className="text-[13px] text-white/35 font-light mb-6">We're a small team and we actually read every message.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-[12px] font-semibold tracking-wider rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:-translate-y-0.5"
            >
              Contact Us →
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
